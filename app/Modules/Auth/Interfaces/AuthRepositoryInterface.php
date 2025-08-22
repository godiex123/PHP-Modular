<?php
namespace App\Modules\Auth\Interfaces;

use App\Modules\Auth\DTOs\SessionDTO;

interface AuthRepositoryInterface
{
    public function findByEmail(string $email): ?SessionDTO;
}