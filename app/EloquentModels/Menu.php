<?php

namespace App\EloquentModels;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $table = 'menu';
    public $timestamps = true;

    public function category()
    {
        return $this->hasMany(Category::class);
    }
}
