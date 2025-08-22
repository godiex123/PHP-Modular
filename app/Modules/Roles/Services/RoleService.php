<?php
namespace App\Modules\Roles\Services;

use App\Modules\Roles\Repositories\RoleRepository;

class RoleService
{
    public function __construct(
        protected RoleRepository $roleRepository
    ){}

    /**
     * Función principal para obtener todos los roles de un usuario.
     */
    public function getRoles(string $email, string $userType, array $attributes = []): array
    {
        // Obtener roles de la base de datos (dinámicos)
        $rolesFromDB = $this->getRolesByEmail($email);

        // Obtener roles por tipo de usuario (estáticos)
        $rolesByType = $this->getRolesByUserType($userType);

        // Obtener roles por cargo (dinámicos por atributos)
        $rolesByCargo = $this->getRolesByUserPosition($userType, $attributes);

        // Unir todos los arrays de roles y eliminar duplicados
        $allRoles = array_merge($rolesFromDB, $rolesByType, $rolesByCargo);

        return array_unique($allRoles);
    }

    /**
     * Obtiene roles desde la tabla sistema_usuarios_perfiles.
     */
    protected function getRolesByEmail(string $email): array
    {
        // Lógica para obtener roles desde el repositorio
        return $this->roleRepository->getRolesByEmail($email);
    }

    /**
     * Obtiene roles estáticos según el tipo de usuario.
     */
    protected function getRolesByUserType(string $userType): array
    {
        return match ($userType) {
            'academico' => ['ACAD'],
            'administrativo' => ['ADMI'],
            default => [],
        };
    }

    /**
     * Obtiene roles basados en la palabra clave del cargo.
     */
    protected function getRolesByUserPosition(string $userType, array $attributes): array
    {
        $roles = [];
        if ($userType === 'academico' || $userType === 'administrativo') {
            $position = $attributes['position'] ?? '';
            $positionLower = strtolower($position);

            if (str_contains($positionLower, 'director') && str_contains($positionLower, 'carrera')) {
                $roles[] = 'DICA';
            }
            if (str_contains($positionLower, 'director') && str_contains($positionLower, 'escuela')) {
                $roles[] = 'DIES';
            }
        }
        return $roles;
    }
}