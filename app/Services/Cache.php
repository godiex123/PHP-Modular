<?php
namespace App\Services;

class Cache
{
    private static string $cacheDir;

    public static function init(string $dir): void
    {
        self::$cacheDir = $dir;
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }
    }

    public static function get(string $key)
    {
        $file = self::$cacheDir . '/' . md5($key) . '.cache';
        if (file_exists($file)) {
            $data = file_get_contents($file);
            $cache = unserialize($data);
            if (($cache['expires'] ?? 0) > time()) {
                return $cache['value'];
            }
            unlink($file);
        }
        return null;
    }

    public static function set(string $key, $value, int $ttl = 60): void
    {
        $file = self::$cacheDir . '/' . md5($key) . '.cache';
        $cache = [
            'value' => $value,
            'expires' => time() + $ttl,
        ];
        file_put_contents($file, serialize($cache));
    }
}