<?php

namespace App\EloquentModels;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    protected $table = 'categories';
    public $timestamps = true;

    public function parent()
    {
        return $this->belongsTo('App\EloquentModels\Categories','parent_id')->where('parent_id',0);
    }

    public function children()
    {
        return $this->hasMany('App\EloquentModels\Categories','parent_id');
    }
}
