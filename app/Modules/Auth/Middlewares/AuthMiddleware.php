<?php

namespace App\Modules\Auth\Middlewares;

use App\Auth\Auth;

class AuthMiddleware
{
    public function handle(): void
    {
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $apiPrefix = '/' . trim(config('api.prefix'), '/');

        // Evitar ejecución en rutas API
        if (strpos($path, $apiPrefix) === 0) {
            return;
        }

        // Rutas públicas sin autenticación
        $publicPaths = ['/login', '/logout'];
        if (in_array($path, $publicPaths, true)) {
            return;
        }

        // Si no está autenticado, redirigir
        if (!Auth::check()) {
            header('Location: /login');
            exit;
        }
    }
}
