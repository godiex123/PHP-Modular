<?php

namespace App\Http;

use DI\Container;

class Router {
    private array $routes = [];
    private string $prefix = '';
    private array $middlewares = [];
    private Container $container;

    public function __construct(Container $container) {
        $this->container = $container;
    }

    public function get(string $path, string $controller, string $method): self {
        $this->addRoute('GET', $path, $controller, $method);
        return $this;
    }

    public function post(string $path, string $controller, string $method): self {
        $this->addRoute('POST', $path, $controller, $method);
        return $this;
    }

    private function addRoute(string $method, string $path, string $controller, string $methodName): void {
        $fullPath = $this->prefix . $path;
        $regex = preg_replace('#\{([\w]+)\}#', '(?P<\1>[^/]+)', $fullPath);
        $this->routes[$method][$regex] = [$controller, $methodName, $this->middlewares];
        $this->middlewares = [];
    }

    public function group(string $prefix, callable $callback): void {
        $prev = $this->prefix;
        $this->prefix .= $prefix;
        $callback($this);
        $this->prefix = $prev;
    }

    public function middleware(string|array $middleware): self {
        $this->middlewares[] = $middleware;
        return $this;
    }

    public function dispatch(string $method, string $uri): void {
        $path = parse_url($uri, PHP_URL_PATH);

        $allowedMethods = [];

        // Buscar coincidencias en todas las rutas y métodos
        foreach ($this->routes as $httpMethod => $routesForMethod) {
            foreach ($routesForMethod as $pattern => [$controller, $action, $middlewares]) {
                if (preg_match('#^' . $pattern . '$#', $path, $matches)) {
                    if ($method === $httpMethod) {
                        $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);

                        foreach ($middlewares as $mw) {
                            if (is_string($mw)) {
                                (new $mw)->handle();
                            } elseif (is_array($mw) && class_exists($mw[0])) {
                                $class = array_shift($mw);
                                (new $class(...$mw))->handle();
                            }
                        }

                        $controllerInstance = $this->container->get($controller);
                        $response = call_user_func_array([$controllerInstance, $action], $params);

                        if ($response instanceof \App\Http\Response) {
                            http_response_code($response->status);

                            foreach ($response->headers as $key => $value) {
                                header("$key: $value");
                            }

                            echo json_encode($response->data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                            exit;
                        }

                        return;
                    } else {
                        $allowedMethods[] = strtoupper($httpMethod);
                    }
                }
            }
        }

        $isApi = preg_match('#^/api/#', $path);

        if (!empty($allowedMethods)) {
            // 405 Method Not Allowed
            header("HTTP/1.1 405 Method Not Allowed");
            header('Allow: ' . implode(', ', $allowedMethods));
            if ($isApi) {
                header('Content-Type: application/json');
                echo json_encode(['error' => 'Method Not Allowed']);
            } else {
                echo "<h1>405 Method Not Allowed</h1>";
                echo "<p>Métodos permitidos: " . implode(', ', $allowedMethods) . "</p>";
            }
            return;
        }

        // 404 Not Found
        http_response_code(404);
        if ($isApi) {
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Not Found']);
        } else {
            echo "404 Not Found";
        }
    }

    public function loadModuleRoutes(string $modulesPath): void {
        foreach (glob($modulesPath . '/*/routes.php') as $routeFile) {
            $modulePath = dirname($routeFile);

            // Cargar middlewares específicos del módulo si existen
            $middlewareFile = $modulePath . '/middlewares.php';
            $moduleMiddlewares = [];
            if (file_exists($middlewareFile)) {
                $moduleMiddlewares = require $middlewareFile;
            }

            // Guardar middlewares por tipo (global, api, etc.)
            if (!empty($moduleMiddlewares['global'])) {
                foreach ($moduleMiddlewares['global'] as $mw) {
                    $this->middleware($mw);
                }
            }

            // ⚡ aquí podrías extender para `api` u otros tipos
            if (!empty($moduleMiddlewares['api'])) {
                foreach ($moduleMiddlewares['api'] as $mw) {
                    $this->middleware($mw);
                }
            }

            require $routeFile; // Cada archivo define rutas usando $this->get(), $this->post(), etc.
        }
    }
}