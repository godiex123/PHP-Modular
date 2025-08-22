<?php
namespace App\Modules\Auth\Services;

use App\Auth\Auth;
use App\Modules\Auth\DTOs\SessionDTO;
use App\Modules\Auth\Repositories\AcademicRepository;
use App\Modules\Auth\Repositories\AdministrativeRepository;
use App\Modules\Auth\Repositories\ExternalUserRepository;
use App\Modules\Roles\Services\RoleService;

class AuthService
{
    public function __construct(
        protected ExternalUserRepository $externalUserRepository,
        protected AcademicRepository $academicRepository,
        protected AdministrativeRepository $administrativeRepository,
        protected RoleService $roleService,
    ){}

    public function loginWithCredentials(string $user, string $password): bool
    {
        $user = $this->externalUserRepository->findByEmail($user);

        if (!$user || !password_verify($password, $user->password)) {
            return false;
        }

        // Obtener los roles usando el servicio de roles
        $roles = $this->roleService->getRoles($user->email, 'externo');

        Auth::login(new SessionDTO(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            type: 'externo',
            roles: $roles
        ));

        return true;
    }
}