<?php
namespace App\Services;

use App\Interfaces\CategoriesServiceInterface;
use App\EloquentModels\Categories;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoriesService implements CategoriesServiceInterface
{
    public function create($data)
    {
      foreach ($data as $key => $value) {
        if ($value['title']) {
          $findCategoryNameExist = DB::table('categories')->where('title', $value['title'])->exists();
          if ($findCategoryNameExist) {
            return response()->json([
              'mess' => 'Tên danh mục '.$value['title'].' đã tồn tại!',
            ], 422);
          }
          $newCategoryId = DB::table('categories')->insertGetId([
            'title' => $value['title'],
            'key' => $value['key'],
          ]);
          if ($newCategoryId && isset($value['children']) && count($value['children'])) {
            $this->createChildrenCategory($value['children'], $newCategoryId);
          }
          if ($newCategoryId && isset($value['items']) && count($value['items'])) {
            $this->saveItemsOfCategory($value['items'], $newCategoryId);
          }
        }
      }
       return response()->json([
          'mess' => 'Tạo danh mục thành công!',
        ], 200); 
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
      $data =  Categories::with('children.children.children')->where('parent_id', null)->get();
      foreach ($data as $key => $value) {
        $findItems = DB::table('category_images')->where('category_id', $value['id'])->get();
        if ($findItems) {
          $value['items'] = $findItems;
        }
        if ($value['children']) {
          $this->getItemsOfCategory($value['children']);
        }
      }
      return response()->json([
        'data' => $data,
      ], 200); 
    }

     private function createChildrenCategory($data, $parentId)
    {
      if (count($data) && $parentId) {
        foreach ($data as $key => $value) {
          if ($value['title']) {
            $newChildCategoryId = DB::table('categories')->insertGetId([
              'title' => $value['title'],
              'key' => $value['key'],
              'parent_id' => $parentId
            ]);
            if (isset($value['children']) && count($value['children'])) {
              $this->createChildrenCategory($value['children'], $newChildCategoryId);
            }
             if (isset($value['items']) && count($value['items'])) {
              $this->saveItemsOfCategory($value['items'], $newChildCategoryId);
            }
          }
        }
      }
    }

    private function saveItemsOfCategory($data, $categoryId)
    {
      if (count($data) && $categoryId) {
        foreach ($data as $key => $value) {
          if ($value['file']) {
            $fileName = $value['file']->getClientOriginalName();
            $saveImage = Storage::disk('public')->putFileAs('catergories', $value['file'], $fileName);
            $imageUrl = Storage::url($saveImage);
            DB::table('category_images')->insert([
              'url' => $imageUrl,
              'category_id' => $categoryId,
              'color' => $value['color']
            ]);
          }
        }
      }
    }

    private function getItemsOfCategory($data)
    {
      if (count($data)) {
        foreach ($data as $key => $value) {
          $findItemsChild = DB::table('category_images')->where('category_id', $value['id'])->get();
          if ($findItemsChild) {
            $value['items'] = $findItemsChild;
          }
          if ($value['children']) {
            $this->getItemsOfCategory($value['children']);
          }
        }
      }
    }

}
