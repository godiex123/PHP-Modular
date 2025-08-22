<?php
namespace App\Modules\Auth\DTOs;

readonly class SessionDTO
{
    public function __construct(
        public int     $id,
        public string  $name,
        public string  $email,
        public string  $type,
        public ?string $rut = null,
        public ?string $dv = null,
        public ?int    $categoryId = null,
        public ?array $attributes = null,
        public array $roles = [],
    ){}
}