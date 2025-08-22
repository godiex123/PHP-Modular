<?php

namespace App\Services;

class View
{
    private static array $styles = [];
    private static array $scripts = [];
    private static string $title = 'Mi App';

    public static function title(string $title): void {
        self::$title = $title;
    }

    public static function addStyle(string|array $paths): void {
        foreach ((array)$paths as $path) {
            self::$styles[] = $path;
        }
    }

    public static function addScript(string|array $paths): void {
        foreach ((array)$paths as $path) {
            self::$scripts[] = $path;
        }
    }

    public static function render(string $view, array $data = [], ?string $module = null): void
    {
        extract($data);

        ob_start();

        // Buscar vista en módulo si se especifica
        if ($module) {
            $moduleView = base_path("app/Modules/{$module}/Views/{$view}.php");
            if (file_exists($moduleView)) {
                require $moduleView;
            } else {
                throw new \RuntimeException("Vista '{$view}' no encontrada en módulo '{$module}'");
            }
        } else {
            $coreView = base_path("templates/{$view}.php");
            if (file_exists($coreView)) {
                require $coreView;
            } else {
                throw new \RuntimeException("Vista '{$view}' no encontrada en Templates global");
            }
        }

        $content = ob_get_clean();

        $title   = self::$title;
        $styles  = self::$styles;
        $scripts = self::$scripts;

        // Layout principal
        require base_path("templates/layout/main.php");

        // Limpiar para la siguiente vista
        self::$styles = [];
        self::$scripts = [];
        self::$title = 'Mi App';
    }

    public static function rawRender(string $template, array $data = [], ?string $module = null): void
    {
        extract($data);

        if ($module) {
            $moduleView = __DIR__ . "/../Modules/{$module}/Views/{$template}.php";
            if (file_exists($moduleView)) {
                require $moduleView;
                return;
            }
        }

        // Vista global si no se encuentra en módulo
        $coreView = __DIR__ . "/../templates/{$template}.php";
        if (file_exists($coreView)) {
            require $coreView;
        } else {
            throw new \RuntimeException("Vista '{$template}' no encontrada en Templates global");
        }
    }
}