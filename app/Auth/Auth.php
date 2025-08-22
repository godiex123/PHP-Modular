<?php
namespace App\Auth;

use App\Modules\Auth\DTOs\SessionDTO;

class Auth
{
    public static function login(SessionDTO $user): void
    {
        Session::start();

        Session::set('user', [
            'id' => $user->id,
            'rut'   => $user->rut,
            'dv'    => $user->dv,
            'fullRut'    => sprintf('%s/%s', $user->rut, $user->dv),
            'name' => $user->name,
            'email' => $user->email,
            'type' => $user->type,
            'categoryId' => $user->categoryId,
            'attributes' => $user->attributes,
            'roles' => $user->roles,
//            'campus_id' => $user->getCampusId(),
//            'campusName'    => $user->getCampusName(),
//            'faculty_id' => $user->getFacultyId(),
//            'facultyName'    => $user->getFacultyName(),
//            'costCenter'    => $user->getCostCenter(),
//            'academicUnit'  => $user->getAcademicUnit(),
//            'hierarchyId'   => $user->getHierarchyId(),
//            'hierarchyName' => $user->getHierarchyName(),
//            'weeklyHours'  => $user->getWeeklyHours(),
//            'entryDate'     => $user->getEntryDate(),
//            'policy'        => $user->getPolicy(),
//            'contractType'  => $user->getContractType(),
//            'categoryId'    => $user->getCategoryId(),
//            'userType'      => $user->getUserType(),
//            'roles' => $roles,
        ]);
    }

    public static function logout(): void
    {
        Session::start();

        Session::remove('user');
        Session::destroy();
    }

    public static function check(): bool
    {
        Session::start();

        return Session::has('user');
    }

    public static function user(?string $info = null): mixed
    {
        Session::start();

        $user = Session::get('user');
        if (!$user) {
            return null;
        }

        return $info ? ($user[$info] ?? null) : $user;
    }

    public static function hasRole(string $role): bool
    {
        Session::start();

        $roles = Session::get('user.roles', []);
        foreach ($roles as $r) {
            if (($r['rol'] ?? $r) === $role) {
                return true;
            }
        }
        return false;
    }
}