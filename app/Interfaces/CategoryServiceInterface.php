<?php

namespace App\Interfaces;

interface CategoryServiceInterface
{
    public function create($data);
    public function get($conditions);
    public function getTemp();
}
