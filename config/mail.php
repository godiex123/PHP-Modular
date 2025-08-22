<?php

return [
    'default' => env('MAIL_MAILER', 'smtp'),

    'mailers' => [
        'smtp' => [
            'host' => env('MAIL_HOST', 'smtp.mailtrap.io'),
            'port' => env('MAIL_PORT', 2525),
            'username' => env('MAIL_USERNAME'),
            'password' => env('MAIL_PASSWORD'),
            'encryption' => env('MAIL_ENCRYPTION', null),
            'timeout' => null,
        ],
        // otros mailers si quieres
    ],

    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'info@miapp.com'),
        'name' => env('MAIL_FROM_NAME', 'Mi App'),
    ],

    'template' => env('MAIL_TEMPLATE', 'email.html'),
    'template_path' => __DIR__ . '/../Templates/', // ruta base de plantillas
];