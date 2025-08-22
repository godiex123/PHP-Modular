<?php

use App\Modules\Home\Controllers\HomeController;

// Ruta principal
$this->get('/home', HomeController::class, 'index');