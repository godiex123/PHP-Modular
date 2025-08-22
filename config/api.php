<?php

return [
    'version' => env('API_VERSION', 'v1'),
    'prefix' => '/api',
    'auth_required' => true, // controla si API exige auth por defecto
    'public_routes' => [
        // Rutas sin auth, ej:
        '/api/v1/login',
    ],
    'rate_limit' => [
        'enabled' => true,
        'requests' => 100,
        'per_minutes' => 1,
    ],
];
