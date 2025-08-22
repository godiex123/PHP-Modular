<?php
namespace App\Modules\Auth\Controllers;

use App\Auth\Auth;
use App\Http\Controller;
use App\Modules\Auth\Services\AuthService;
use App\Modules\Auth\Model\ExternalUser;

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $authService
    )
    {}


    public function showAdminLoginForm(): void
    {
        $this->rawView('index');
    }

    public function login(): void
    {
        $user = $_POST['user'] ?? null;
        $password = $_POST['password'] ?? null;

        if ($this->authService->loginWithCredentials($user, $password)) {
            header('Location: /home');
            exit;
        }

        $this->rawView('index', ['error' => 'Credenciales incorrectas']);
    }

    public function logout(): void
    {
        Auth::logout();
        header('Location: /login');
    }
}