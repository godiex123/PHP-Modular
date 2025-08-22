<?php
namespace App\Modules\Auth\Repositories;

use App\Modules\Auth\Model\Administrative;
use App\Modules\Auth\DTOs\UserDTO;

class AdministrativeRepository
{
    public function findByEmail(string $email): ?UserDTO
    {
        $user = Administrative::where('email', $email)->where('activo', 1)->first();

        if (!$user) {
            return null;
        }

        return new UserDTO(
            id: $user->id,
            name: sprintf('%s %s %s', $user->nombres, $user->paterno, $user->materno),
            email: $user->email,
            rut: $user->rut,
            dv: $user->dv,
        );
    }
}