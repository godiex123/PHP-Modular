<?php
namespace App\Modules\Roles\Repositories;

use App\Modules\Roles\Models\UserRole;

class RoleRepository
{
    public function getRolesByEmail(string $email): array
    {
        return UserRole::where('email', $email)->pluck('perfil_id')->toArray();
    }
}