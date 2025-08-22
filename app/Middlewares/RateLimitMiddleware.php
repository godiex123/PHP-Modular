<?php
namespace App\Middlewares;

class RateLimitMiddleware
{
    private int $maxRequests;
    private int $decaySeconds;

    public function __construct()
    {
        $config = config('api.rate_limit');
        $this->maxRequests = $config['requests'] ?? 100;
        $this->decaySeconds = ($config['per_minutes'] ?? 1) * 60;
    }

    public function handle(): void
    {
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $key = "rate_limit_{$ip}";

        $data = \App\Services\Cache::get($key) ?? ['count' => 0, 'start' => time()];

        if (time() - $data['start'] > $this->decaySeconds) {
            $data = ['count' => 0, 'start' => time()];
        }

        $data['count']++;

        if ($data['count'] > $this->maxRequests) {
            http_response_code(429);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Demasiadas solicitudes. Intente más tarde.']);
            exit;
        }

        \App\Services\Cache::set($key, $data, $this->decaySeconds);
    }
}