<?php

return [
    'default' => getenv('CACHE_DRIVER') ?: 'file',

    'stores' => [
        'file' => [
            'path' => __DIR__ . '/../storage/cache',
        ],
        'redis' => [
            'host' => getenv('REDIS_HOST') ?: '127.0.0.1',
            'port' => getenv('REDIS_PORT') ?: 6379,
        ],
    ],

    'ttl' => 3600, // tiempo en segundos
];
