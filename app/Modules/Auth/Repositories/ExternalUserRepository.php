<?php
namespace App\Modules\Auth\Repositories;

use App\Modules\Auth\Model\ExternalUser;
use App\Modules\Auth\DTOs\UserDTO;

class ExternalUserRepository
{
    public function findByEmail(string $email): ?UserDTO
    {
        $user = ExternalUser::where('email', $email)->first();

        if (!$user) {
            return null;
        }

        return new UserDTO(
            id: $user->id,
            name: $user->nombres,
            email: $user->email,
            password: $user->password,
        );
    }
}