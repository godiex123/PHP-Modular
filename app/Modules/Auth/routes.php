<?php
use App\Modules\Auth\Controllers\AuthController;

// Formulario de login (GET)
$this->get('/login', AuthController::class, 'showAdminLoginForm');

// Acción de login (POST)
$this->post('/login', AuthController::class, 'login');

// Logout (GET o POST, según prefieras)
$this->get('/logout', AuthController::class, 'logout');