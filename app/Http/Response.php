<?php
namespace App\Http;

class Response
{
    public array|object $data;
    public int $status;
    public array $headers;

    public function __construct(array|object $data, int $status = 200, array $headers = [])
    {
        $this->data = $data;
        $this->status = $status;
        $this->headers = array_merge(['Content-Type' => 'application/json; charset=utf-8'], $headers);
    }
}
