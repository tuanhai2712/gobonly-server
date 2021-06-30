<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\StoreServiceInterface;
class StoreController extends Controller
{
    public function __construct(StoreServiceInterface $storeService)
    {
        $this->storeService = $storeService;
        
    }
    public function create(Request $request) {
        $createStore = $this->storeService->create($request->all());
        return $createStore;
    }

    public function get() {
        $store = $this->storeService->get();
        return $store;
    }
}
