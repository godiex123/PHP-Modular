<?php

namespace App\Http;

use App\Services\View;

class Controller
{
    private ?string $asset;

    public function __construct()
    {
        $this->asset = sprintf('app/Modules/%s/assets/', $this->getModuleName());
    }
    protected function setTitle(string $title): void {
        View::title($title);
    }

    protected function addStyle(array $paths): void {
        $fullPaths = array_map(fn($p) => $this->asset . $p, $paths);
        View::addStyle($fullPaths);
    }

    protected function addScript(array $paths): void {
        $fullPaths = array_map(fn($p) => $this->asset . $p, $paths);
        View::addScript($fullPaths);
    }

    protected function view(string $view, array $data = []): void
    {
        $module = $this->getModuleName();
        View::render($view, $data, $module);
    }

    protected function rawView(string $view, array $data = []): void
    {
        $module = $this->getModuleName();
        View::rawRender($view, $data, $module);
    }

    /**
     * Detecta automáticamente el módulo del Controller basado en el namespace.
     */
    private function getModuleName(): ?string
    {
        $namespace = get_class($this); // ej: App\Modules\Auth\Controller\AuthController
        $parts = explode('\\', $namespace);

        $moduleIndex = array_search('Modules', $parts);
        if ($moduleIndex !== false && isset($parts[$moduleIndex + 1])) {
            return $parts[$moduleIndex + 1]; // retorna "Auth"
        }

        return null; // Controller global
    }
}