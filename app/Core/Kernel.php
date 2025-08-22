<?php
namespace App\Core;

use App\Http\Router;
use Illuminate\Database\Capsule\Manager as Capsule;

class Kernel
{
    protected array $middlewares = [
        \App\Middlewares\CsrfMiddleware::class,
    ];

    public function __construct()
    {
        // Inicializar la base de datos después de cargar el .env
        $this->initializeEloquent();
    }

    private function initializeEloquent(): void
    {
        $capsule = new Capsule;

        // Cargar la configuración de la base de datos
        $conn = config('database.default');
        $databaseConfig = config("database.connections.$conn");

        $capsule->addConnection($databaseConfig);

        // Hace que Eloquent esté disponible globalmente (opcional pero muy conveniente)
        $capsule->setAsGlobal();

        // Inicia el ORM
        $capsule->bootEloquent();
    }

    protected array $middlewareGroups = [
        'api' => [
            \App\Middlewares\ForceJsonResponse::class,
            \App\Middlewares\RateLimitMiddleware::class,
            \App\Middlewares\JwtAuthMiddleware::class,
            \App\Middlewares\ApiLogMiddleware::class,
        ],
    ];

    public function handle(): void
    {
        $container = ContainerFactory::create();
        $router = new Router($container);

        // Cargar rutas globales
        #require base_path('routes/web.php');
        #require base_path('routes/api.php');

        // 🔹 Cargar rutas de cada módulo automáticamente
        $modulesPath = base_path('app/Modules');
        $router->loadModuleRoutes($modulesPath);

        // 🔹 Cargar rutas API de cada módulo automáticamente
        foreach (glob($modulesPath . '/*/api_routes.php') as $apiRouteFile) {
            require $apiRouteFile;
        }

        // Ejecutar middlewares globales (web)
        foreach ($this->middlewares as $middleware) {
            (new $middleware())->handle();
        }

        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $isApi = preg_match('#^' . config('api.prefix') . '#', $path) === 1;
        $cleanPath = rtrim($path, '/');
        $publicRoutes = array_map(fn($route) => rtrim($route, '/'), config('api.public_routes'));
        $authRequired = config('api.auth_required');

        if ($isApi) {
            foreach ($this->middlewareGroups['api'] as $middleware) {
                if ($middleware === \App\Middlewares\JwtAuthMiddleware::class) {
                    if ($authRequired && !in_array($cleanPath, $publicRoutes, true)) {
                        (new $middleware())->handle();
                    }
                } else {
                    (new $middleware())->handle();
                }
            }
        }

        // Despachar la petición
        $router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
    }
}