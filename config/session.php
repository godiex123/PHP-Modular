<?php

return [
    'driver' => env('SESSION_DRIVER', 'file'),
    'lifetime' => intval(env('SESSION_LIFETIME', 120)),
    'cookie' => env('SESSION_COOKIE', 'miapp_session'),
    'path' => '/',
    'secure' => env('SESSION_SECURE_COOKIE', 'false') === 'true',
    'http_only' => true,
];