<?php
namespace App\Services;

use App\Interfaces\CategoryServiceInterface;
use App\EloquentModels\Category;
use App\EloquentModels\Template;
use App\EloquentModels\Color;
use App\EloquentModels\CategoryColor;
use App\EloquentModels\CategorySize;
use App\EloquentModels\Size;
use App\EloquentModels\Menu;
use Illuminate\Support\Facades\Storage;

class CategoryService implements CategoryServiceInterface
{
    public function create($data)
    {
      $hasCategory = Category::where('name', $data['name'])->first();
      if ($hasCategory) {
        return response()->json([
          'message' => 'Category has exist',
        ], 422);
      }
      $newCategory = new Category;
      $newCategory->name = $data['name'];
      $newCategory->description = $data['description'];
      $newCategory->gender = $data['gender'];
      $newCategory->menu_id = $data['menu_id'];
      $newCategory->save();
      if ($newCategory->id) {
        $this->saveTemplate($data['template'], $newCategory->id, $data['color_code']);
        $this->saveSizeCategory($newCategory->id);
      }
      return response()->json([
        'message' => 'Create new category successfull',
      ], 200);
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
  
    private function saveTemplate($file, $categoryId, $color)
    {
        $file = Storage::disk('public')->put('', $file);
        $url = Storage::url($file);
        $newTemplate = new Template;
        $newTemplate->url = $url;
        $newTemplate->color = $color;
        $newTemplate->category_id = $categoryId;
        $newTemplate->save();
    }

    public function get($conditions)
    {
      $category = Category::with('size')->with('template')->with('menu');

      if (isset($conditions['menu_id'])) {
        $category = $category->where('menu_id', $conditions['menu_id']);
      }

      $category = $category->paginate(10, ['*'], 'page', $conditions['page'])->toArray();
      return response()->json([
        'data' => $category['data'],
        'total' => $category['total'],
        'currentPage' => $category['current_page'],
        'message' => 'Create new category successfull',
      ], 200);
    }

    public function getTemp()
    {
      $categoryTemp = Category::with('template')->get()->toArray();
      return response()->json([
        'data' => $categoryTemp,
      ], 200);
    }
}
