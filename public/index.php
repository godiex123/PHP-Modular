<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../helpers/helpers.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$configApp = config('app');
date_default_timezone_set($configApp['timezone'] ?? 'UTC');

\App\Services\Cache::init(__DIR__ . '/../storage/cache');

$kernel = new \App\Core\Kernel();
// Inicia sesión desde el kernel, no aquí
$kernel->handle();