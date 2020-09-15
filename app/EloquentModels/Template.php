<?php

namespace App\EloquentModels;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $table = 'template';
    public $timestamps = true;

    public function category()
    {
        return $this->hasMany(Category::class, 'id','category_id');
    }
}
