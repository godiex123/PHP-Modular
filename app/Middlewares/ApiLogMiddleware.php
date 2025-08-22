<?php
namespace App\Middlewares;

class ApiLogMiddleware
{
    public function handle(): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = $_SERVER['REQUEST_URI'];
        $time = date('Y-m-d H:i:s');
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

        $log = "[$time] $ip - $method $uri\n";

        file_put_contents(base_path('storage/logs/api_requests.log'), $log, FILE_APPEND);
    }
}