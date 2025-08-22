<?php

namespace App\Modules\Roles\Middlewares;

use App\Auth\Auth;

class RoleMiddleware
{
    private array $requiredRoles;

    public function __construct(string ...$roles)
    {
        $this->requiredRoles = $roles;
    }

    public function handle(): void
    {
        if (!Auth::check()) {
            header('Location: /login');
            exit;
        }

        foreach ($this->requiredRoles as $role) {
            if (Auth::hasRole($role)) {
                return; // Tiene al menos un rol permitido
            }
        }

        http_response_code(403);
        header('Content-Type: text/plain; charset=utf-8');
        exit('Acceso denegado. Requiere uno de estos roles: ' . implode(', ', $this->requiredRoles));
    }
}