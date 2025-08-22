<?php


/** @var \App\Http\Router $router */

$router->post(config('api.prefix') . '/' . config('api.version') . '/login',
    \App\Modules\Auth\Controllers\Api\AuthController::class,
    'login'
);

$router->get(config('api.prefix') . '/' . config('api.version') . '/test',
    \App\Modules\Auth\Controllers\Api\TestController::class,
    'index'
);

$router->group(config('api.prefix') . '/' . config('api.version'), function($router) {
    $router->get('/alumnos', \App\Modules\Auth\Controllers\Api\TestController::class, 'alumnos');
});