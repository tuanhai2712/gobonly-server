<?php
namespace App\Services;

use App\Interfaces\CategoriesServiceInterface;
use App\EloquentModels\Categories;
use Illuminate\Support\Facades\DB;

class CategoriesService implements CategoriesServiceInterface
{
    public function create($data)
    {
      foreach ($data as $key => $value) {
        if ($value['name']) {
          $findCategoryNameExist = DB::table('categories')->where('name', $value['name'])->exists();
          if ($findCategoryNameExist) {
            return response()->json([
              'mess' => 'Tên danh mục đã tồn tại!',
            ], 422);
          }
          $newCategoryId = DB::table('categories')->insertGetId(['name' => $value['name']]);
          if ($newCategoryId && isset($value['children']) && count($value['children'])) {
            $this->createChildrenCategory($value['children'], $newCategoryId);
          }
        }
      }
       return response()->json([
          'mess' => 'Tạo danh mục thành công!',
        ], 200); 
    }

    private function createChildrenCategory($data, $parentId)
    {
      if (count($data) && $parentId) {
        foreach ($data as $key => $value) {
          if ($value['name']) {
            $newChildCategoryId = DB::table('categories')->insertGetId(['name' => $value['name'], 'parent_id' => $parentId]);
            if (isset($value['children']) && count($value['children'])) {
              $this->createChildrenCategory($value['children'], $newChildCategoryId);
            }
          }
        }
      }
    }

    public function update($data)
    {
      $categoryExist = DB::table('categories')->where('id', $data['id'])->exists();
      if ($categoryExist) {
        DB::table('categories')->where('id', $data['id'])->update(['name' => $data['name']]);
        return response()->json([
          'mess' => 'Cập nhật danh mục thành công!',
        ], 200); 
      }
      return response()->json([
        'mess' => 'Danh mục không tồn tại!',
      ], 422); 
    }

    public function get()
    {
      $data =  Categories::with('children')->get();
      return response()->json([
        'data' => $data,
      ], 200); 
    }

}
