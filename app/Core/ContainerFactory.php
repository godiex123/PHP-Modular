<?php

namespace App\Core;

use App\Modules\Auth\Interfaces\AuthRepositoryInterface;
use App\Modules\Auth\Repositories\AuthAcademicRepository;
use App\Modules\Hierarchy\Interfaces\ApplicationRepositoryInterface;
use App\Modules\Roles\Interfaces\RoleRepositoryInterface;
use App\Modules\Roles\Repositories\RoleRepository;
use App\Modules\Hierarchy\Repositories\ApplicationRepository;
use DI\Container;
use DI\ContainerBuilder;

class ContainerFactory
{
    public static function create(): Container
    {
        $builder = new ContainerBuilder();

        $builder->addDefinitions([
            AuthRepositoryInterface::class => \DI\autowire(AuthAcademicRepository::class),
            RoleRepositoryInterface::class => \DI\autowire(RoleRepository::class),

            // Agrega aquí más bindings necesarios para tu app
            ApplicationRepositoryInterface::class => \DI\autowire(ApplicationRepository::class),
        ]);

        return $builder->build();
    }
}
