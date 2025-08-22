<?php
namespace App\Middlewares;

class CsrfMiddleware
{
    protected array $except;

    public function __construct()
    {
        $this->except = config('csrf.except') ?? [];
    }

    public function handle(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return;
        }

        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        foreach ($this->except as $excluded) {
            if ($this->pathMatches($excluded, $path)) {
                return;
            }
        }

        $token = $_POST['csrf_token'] ?? '';
        if (!\App\Http\Csrf::validateToken($token)) {
            http_response_code(419);
            exit('CSRF token inválido o faltante');
        }
    }

    private function pathMatches(string $excluded, string $current): bool
    {
        $pattern = '#^' . str_replace('\*', '.*', preg_quote($excluded, '#')) . '$#';
        return (bool) preg_match($pattern, $current);
    }
}