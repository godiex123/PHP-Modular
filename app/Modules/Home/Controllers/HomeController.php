<?php

namespace App\Modules\Home\Controllers;

use App\Auth\Auth;
use App\Http\Controller;

class HomeController extends Controller
{
    public function index(): void
    {
        $userName = Auth::user('name');
        $this->view('index', compact('userName'));
    }
}