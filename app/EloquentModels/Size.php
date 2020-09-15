<?php

namespace App\EloquentModels;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $table = 'size';
    public $timestamps = true;
    public function category()
    {
        return $this->belongsToMany(Category::class, 'category_color');
    }
}
