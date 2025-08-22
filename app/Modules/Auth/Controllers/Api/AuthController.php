<?php
namespace App\Modules\Auth\Controllers\Api;

use App\Modules\Auth\Services\Api\ApiAuthService;
use App\Traits\JsonResponseTrait;
use Firebase\JWT\JWT;

class AuthController
{
    use JsonResponseTrait;
    protected ApiAuthService $authService;

    public function __construct()
    {
        $this->authService = new ApiAuthService();
    }

    public function login(): \App\Http\Response
    {
        $input = json_decode(file_get_contents('php://input'), true);
        $user = $input['user'] ?? null;
        $password = $input['password'] ?? null;

        if (!$validUser = $this->authService->attemptLogin($user, $password)) {
            return $this->json(['success' => false, 'error' => 'Credenciales inválidas'], 401);
        }

        $payload = [
            'iss' => 'tu_dominio_o_nombre_app',
            'iat' => time(),
            'exp' => time() + 3600, // 1 hora de expiración
            'sub' => $validUser->getId(),
            'email' => $validUser->getEmail(),
            // puedes agregar más datos
        ];

        $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

        return $this->json(['success' => true, 'token' => $jwt]);
    }
}
