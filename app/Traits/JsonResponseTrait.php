<?php
namespace App\Traits;

use App\Http\Response;

trait JsonResponseTrait
{
    protected function json(array|object $data, int $status = 200, array $headers = []): Response
    {
        return new Response($data, $status, $headers);
    }
}
