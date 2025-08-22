<?php
namespace App\Middlewares;

class ForceJsonResponse
{
    public function handle(): void
    {
        $path = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
        $apiPrefix = rtrim(config('api.prefix'), '/');

        if (!str_starts_with($path, $apiPrefix)) {
            return;
        }

        header('Content-Type: application/json; charset=utf-8');

        $debug = env('APP_DEBUG', false) === 'true';

        set_exception_handler(function (\Throwable $e) use ($debug) {
            http_response_code(500);
            echo json_encode($this->formatError($e->getMessage(), $e->getFile(), $e->getLine(), $debug), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            exit;
        });

        set_error_handler(function ($severity, $message, $file, $line) use ($debug) {
            http_response_code(500);
            echo json_encode($this->formatError($message, $file, $line, $debug), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            exit;
        });

        register_shutdown_function(function () use ($debug) {
            $error = error_get_last();
            if ($error !== null) {
                http_response_code(500);
                echo json_encode($this->formatError($error['message'], $error['file'], $error['line'], $debug), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                exit;
            }
        });
    }

    private function formatError(string $message, string $file, int $line, bool $debug): array
    {
        if ($debug) {
            return [
                'success' => false,
                'error' => $message,
                'file' => $file,
                'line' => $line
            ];
        }

        return [
            'success' => false,
            'error' => 'Ocurrió un error interno. Intente más tarde.'
        ];
    }
}