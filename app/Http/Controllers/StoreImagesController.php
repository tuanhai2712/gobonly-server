<?php

namespace App\Http\Controllers;
use App\Interfaces\StoreImagesServiceInterface;
use Illuminate\Http\Request;

class StoreImagesController extends Controller
{
    public function __construct(StoreImagesServiceInterface $storeImagesService)
    {
        $this->storeImagesService = $storeImagesService;
        
    }
    public function create(Request $request) {
        $createImages = $this->storeImagesService->create($request->all());
        return $createImages;
    }

}
