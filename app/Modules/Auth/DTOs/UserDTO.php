<?php
namespace App\Modules\Auth\DTOs;

readonly class UserDTO
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public ?string $rut = null,
        public ?string $dv = null,
        public ?int $categoryId = null,
        public ?string $password = null,
    ){}
}