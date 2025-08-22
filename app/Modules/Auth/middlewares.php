<?php

return [
    'global' => [
        \App\Modules\Auth\Middlewares\AuthMiddleware::class
    ],
    'api' => [
        // Si quieres proteger APIs con JWT u otro método, aquí iría
    ],
];