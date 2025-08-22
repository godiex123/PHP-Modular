<?php
namespace App\Modules\Auth\Controllers\Api;

use App\Repositories\AlumnoRepository;
use App\Traits\JsonResponseTrait;
use Throwable;

class TestController
{
    use JsonResponseTrait;
    protected AlumnoRepository $alumnoRepository;

    public function __construct()
    {
        $this->alumnoRepository = new AlumnoRepository();
    }
    public function index(): void
    {
        echo json_encode(['status' => 'ok', 'time' => date('Y-m-d H:i:s')]);
    }

    /**
     * @throws Throwable
     */
    public function alumnos(): \App\Http\Response
    {
        $alumnos = $this->alumnoRepository->getAll();
        return $this->json(['success' => true, 'data' => $alumnos]);
    }
}