<?php

return [
    'global' => [
        \App\Modules\Auth\Middlewares\AuthMiddleware::class, // Solo usuarios logueados
        [App\Modules\Roles\Middlewares\RoleMiddleware::class, 'ACAD', 'ROOT'],
    ],
    'api' => []
];