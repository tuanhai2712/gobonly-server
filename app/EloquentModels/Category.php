<?php

namespace App\EloquentModels;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'category';
    public $timestamps = true;

    public function size()
    {
        return $this->belongsToMany(Size::class, 'category_size');
    }

    public function template(){
        return $this->hasMany(Template::class);
    }

    public function menu(){
        return $this->belongsTo(Menu::class, 'menu_id');
    }
}
