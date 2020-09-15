<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\MenuServiceInterface;
use App\Http\Requests\MenuRequest;

class MenuController extends Controller
{
    public function __construct(MenuServiceInterface $menuService)
    {
        $this->menuService = $menuService;
    }

    public function create(Request $request) {
        $createMenu = $this->menuService->create($request->all());
        return $createMenu;
    }
    public function get() {
        $menuList = $this->menuService->get();
        return $menuList;
    }
}
