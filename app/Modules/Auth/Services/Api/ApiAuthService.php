<?php

namespace App\Modules\Auth\Services\Api;

use App\Modules\Auth\Interfaces\AuthRepositoryInterface;
use App\Modules\Auth\Model\ExternalUser;
use App\Modules\Auth\Repositories\AuthByUserAndHashRepository;

class ApiAuthService
{
    protected AuthRepositoryInterface $authRepository;

    public function __construct()
    {
        $this->authRepository = new AuthByUserAndHashRepository();
    }

    public function attemptLogin(string $user, string $password): bool|ExternalUser
    {
        $user = $this->authRepository->attempt($user, $password);

        if (!$user) return false;

        return $user;
    }
}