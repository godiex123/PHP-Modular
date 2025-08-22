<?php
namespace App\Auth;

class Session
{
    public static function start(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            $config = config('session');

            session_name($config['cookie']);
            session_set_cookie_params([
                'lifetime' => $config['lifetime'] * 60,
                'path' => $config['path'],
                'secure' => $config['secure'],
                'httponly' => $config['http_only'],
                'samesite' => 'Lax',
            ]);

            session_start();
        }
    }

    public static function get(string $key, $default = null)
    {
        $keys = explode('.', $key);
        $value = $_SESSION;

        foreach ($keys as $k) {
            if (is_array($value) && array_key_exists($k, $value)) {
                $value = $value[$k];
            } else {
                return $default;
            }
        }

        return $value;
    }

    public static function set(string $key, $value): void
    {
        $keys = explode('.', $key);
        $session =& $_SESSION;

        while (count($keys) > 1) {
            $k = array_shift($keys);
            if (!isset($session[$k]) || !is_array($session[$k])) {
                $session[$k] = [];
            }
            $session =& $session[$k];
        }

        $session[array_shift($keys)] = $value;
    }

    public static function has(string $key): bool
    {
        $keys = explode('.', $key);
        $value = $_SESSION;

        foreach ($keys as $k) {
            if (is_array($value) && array_key_exists($k, $value)) {
                $value = $value[$k];
            } else {
                return false;
            }
        }

        return true;
    }

    public static function remove(string $key): void
    {
        $keys = explode('.', $key);
        $session =& $_SESSION;

        while (count($keys) > 1) {
            $k = array_shift($keys);
            if (!isset($session[$k]) || !is_array($session[$k])) {
                return; // no existe la clave para eliminar
            }
            $session =& $session[$k];
        }

        unset($session[array_shift($keys)]);
    }

    public static function destroy(): void
    {
        if(session_status() === PHP_SESSION_ACTIVE) {
            $_SESSION = [];
            session_destroy();
            setcookie(session_name(), '', time() - 3600);
        }
    }
}