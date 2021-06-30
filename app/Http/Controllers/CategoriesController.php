<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\CategoriesServiceInterface;
class CategoriesController extends Controller
{
    public function __construct(CategoriesServiceInterface $categoriesService)
    {
        $this->categoriesService = $categoriesService;
    }

    public function create(Request $request) {
        $createCategories = $this->categoriesService->create($request->all());
        return $createCategories;
    }

    public function update(Request $request) {
        $updateCategories = $this->categoriesService->update($request->all());
        return $updateCategories;
    }

    public function get() {
        $categories = $this->categoriesService->get();
        return $categories;
    }
}
