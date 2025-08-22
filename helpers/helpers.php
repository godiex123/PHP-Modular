<?php

// app/Core/helpers.php

function config(string $key, $default = null)
{
    static $configs = [];

    // Separar archivo y clave
    [$file, $item] = explode('.', $key, 2) + [null, null];

    if (!$file) {
        return $default;
    }

    // Cargar archivo config solo una vez
    if (!isset($configs[$file])) {
        $path = __DIR__ . '/../config/' . $file . '.php';

        if (file_exists($path)) {
            $configs[$file] = require $path;
        } else {
            $configs[$file] = null;
        }
    }

    // Buscar la clave en el arreglo config
    if ($configs[$file] === null) {
        return $default;
    }

    if ($item === null) {
        return $configs[$file];
    }

    // Soporta claves con subniveles "database.connections.mysql.host"
    $segments = explode('.', $item);
    $value = $configs[$file];
    foreach ($segments as $segment) {
        if (is_array($value) && array_key_exists($segment, $value)) {
            $value = $value[$segment];
        } else {
            return $default;
        }
    }

    return $value;
}

if (!function_exists('base_path')) {
    function base_path(string $path = ''): string
    {
        return dirname(__DIR__, 1) . ($path ? DIRECTORY_SEPARATOR . $path : '');
    }
}

if (!function_exists('app_path')) {
    function app_path(string $path = ''): string
    {
        return helpers . phpbase_path('app') . ($path ? DIRECTORY_SEPARATOR . $path : '');
    }
}

if (!function_exists('public_path')) {
    function public_path(string $path = ''): string
    {
        return helpers . phpbase_path('public') . ($path ? DIRECTORY_SEPARATOR . $path : '');
    }
}

if (!function_exists('redirect')) {
    function redirect(string $url): void
    {
        header("Location: {$url}");
        exit;
    }
}

if (!function_exists('env')) {
    function env(string $key, $default = null)
    {
        if (array_key_exists($key, $_ENV) && $_ENV[$key] !== false) {
            return $_ENV[$key];
        }

        if (array_key_exists($key, $_SERVER) && $_SERVER[$key] !== false) {
            return $_SERVER[$key];
        }

        $value = getenv($key);
        if ($value !== false) {
            return $value;
        }

        return $default;
    }
}

function asset($path): string
{
    return '/' . ltrim($path, '/');
}
