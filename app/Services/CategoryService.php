<?php
namespace App\Services;

use App\Interfaces\CategoryServiceInterface;
use Illuminate\Support\Facades\Log;
use App\EloquentModels\Category;
use App\EloquentModels\Template;
use App\EloquentModels\Color;
use App\EloquentModels\CategoryColor;
use App\EloquentModels\CategorySize;
use App\EloquentModels\Size;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CategoryService implements CategoryServiceInterface
{
    public function create($data)
    {
      $hasCategory = Category::where('name', $data['name'])->first();
      if ($hasCategory) {
        return [
          'mess' => 'Category has exist',
          'status' => 422
        ];
      }
      $newCategory = new Category;
      $newCategory->name = $data['name'];
      $newCategory->description = $data['description'];
      $newCategory->save();
      if ($newCategory->id) {
        $this->saveImage($data['template'], $newCategory->id);
        $this->saveColorCategory($data['color_code'], $newCategory->id);
        $this->saveSizeCategory($newCategory->id);
      }
      return [
        'mess' => 'Create new category successfull',
        'status' => 200
      ];
    }

    private function saveSizeCategory($categoryId)
    {
      $size = Size::select('size', 'id')->get()->toArray();
      $data = [];
      foreach ($size as $key => $value) {
         array_push($data, [
          'size_id' => $value['id'],
          'category_id' => $categoryId
        ]);
      }
      CategorySize::insert($data);
    }
    private function saveColorCategory($color, $categoryId)
    {
      $colorId = null;
      $hasColor = Color::where('color_code', $color)->first();
      if (!$hasColor) {
        $newColor = new Color;
        $newColor->color_code = $color;
        $newColor->save();
        $colorId= $newColor->id;
      } else {
        $colorId = $hasColor->id;
      }
      $newCategoryColor = new CategoryColor;
      $newCategoryColor->category_id = $categoryId;
      $newCategoryColor->color_id = $colorId;
      $newCategoryColor->save();
    }

    private function saveImage($file, $categoryId)
    {
        $file = Storage::disk('public')->put('', $file);
        $url = Storage::url($file);
        $newTemplate = new Template;
        $newTemplate->url = $url;
        $newTemplate->category_id = $categoryId;
        $newTemplate->save();
    }

}
