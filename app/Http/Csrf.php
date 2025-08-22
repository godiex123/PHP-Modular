<?php
namespace App\Http;

class Csrf
{
    public static function generateToken(): string
    {
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    public static function getToken(): ?string
    {
        return $_SESSION['csrf_token'] ?? null;
    }

    public static function validateToken(?string $token): bool
    {
        return hash_equals(self::getToken() ?? '', $token ?? '');
    }

    public static function resetToken(): void
    {
        unset($_SESSION['csrf_token']);
    }
}