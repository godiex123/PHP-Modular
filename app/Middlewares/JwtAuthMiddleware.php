<?php
namespace App\Middlewares;

use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtAuthMiddleware
{
    private array $publicRoutes;

    public function __construct()
    {
        $this->publicRoutes = array_map(fn($route) => rtrim($route, '/'), config('api.public_routes'));
    }

    /**
     * @throws Exception
     */
    public function handle(): void
    {
        $path = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

        // Permite cualquier ruta pública sin validar token
        foreach ($this->publicRoutes as $publicRoute) {
            if (preg_match("#^" . preg_quote($publicRoute, '#') . "(/.*)?$#", $path)) {
                return;
            }
        }

        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? '';

        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $this->unauthorized();
        }

        $token = $matches[1];
        $secretKey = env('JWT_SECRET', 'tu_clave_secreta');

        if (!is_string($secretKey) || empty($secretKey)) {
            throw new Exception('JWT_SECRET no está definido o no es un string válido');
        }

        try {
            JWT::decode($token, new Key($secretKey, 'HS256'));
        } catch (Exception $e) {
            $this->unauthorized();
        }
    }

    private function unauthorized(): void
    {
        http_response_code(401);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Token inválido o ausente']);
        exit;
    }
}