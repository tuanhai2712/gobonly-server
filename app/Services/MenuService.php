<?php
namespace App\Services;

use App\Interfaces\MenuServiceInterface;
use App\EloquentModels\Menu;

class MenuService implements MenuServiceInterface
{
    public function create($data)
    {
      $hasMenu = Menu::where('name', $data['name'])->first();
      if ($hasMenu) {
        return response()->json([
          'message' => 'Menu has exist',
        ], 422);
      }
      $newMenu = new Menu;
      $newMenu->name = $data['name'];
      $newMenu->save();
      return response()->json([
        'message' => 'Create new menu successfull',
      ], 200);
    }
    public function get()
    {
      $menu = Menu::get()->toArray();
      return response()->json([
        'menu' => $menu,
      ], 200);
    }


}
