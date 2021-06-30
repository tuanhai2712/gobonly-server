<?php

namespace App\Interfaces;

interface CategoriesServiceInterface
{
    public function create($data);
    public function update($data);
    public function get();
}
