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
use Illuminate\Support\Facades\DB;

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
      $applySize = false;
      if (intval($data['apply_size'])) {
        $applySize = true;
      }
      $newCategory = new Category;
      $newCategory->name = $data['name'];
      $newCategory->description = $data['description'];
      $newCategory->gender = $data['gender'];
      $newCategory->menu_id = $data['menu_id'];
      $newCategory->apply_size = $applySize;
      $newCategory->save();
      if ($newCategory->id) {
        $this->saveTemplate($data['templates'], $newCategory->id);
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
  
    private function saveTemplate($templates, $categoryId)
    {
      foreach ($templates as $key => $template) {
        if ($template['color_code'] && $template['temp_front'] && $template['temp_back']) {
          $tempFront = Storage::disk('public')->put('', $template['temp_front']);
          $tempBack = Storage::disk('public')->put('', $template['temp_back']);
          $tempFrontUrl = Storage::url($tempFront);
          $tempBackUrl = Storage::url($tempBack);
          $newTemplate = new Template;
          $newTemplate->front = $tempFrontUrl;
          $newTemplate->back = $tempBackUrl;
          $newTemplate->color = $template['color_code'];
          $newTemplate->category_id = $categoryId;
          $newTemplate->save();
        }
      }
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
      $menu = Menu::get()->toArray();
      foreach ($menu as $key => $value) {
        $templateData = Category::where('menu_id', $value['id'])->with('template')->get()->toArray();
        $menu[$key]['category'] = $templateData;
      }

      return response()->json([
        'data' => $menu,
      ], 200);
    }
}
