<?php
namespace App\Modules\Auth\Model;

use Illuminate\Database\Eloquent\Model;

class ExternalUser extends Model
{
    // Opcional: define la tabla si el nombre de la clase no coincide
    // con la convención de Laravel (singular vs plural).
    protected $table = 'sistema_usuarios_externos';
    // Opcional: especifica los campos que pueden ser asignados masivamente
    protected $fillable = [];
    protected $hidden = ['password'];
}