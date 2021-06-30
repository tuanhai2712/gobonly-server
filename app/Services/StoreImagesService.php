<?php
namespace App\Services;

use App\Interfaces\StoreImagesServiceInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class StoreImagesService implements StoreImagesServiceInterface
{
    public function create($data)
    {
    	$storeExist = DB::table('store')->find($data['store_id']);
    	if (!$storeExist) {
    		return response()->json([
          'mess' => 'Kho lưu trữ không tồn tại!',
        ], 422);
    	}
    	if (count($data['images'])) {
    		foreach ($data['images'] as $key => $image) {
    			$saveImage = Storage::disk('public')->put('', $image);
    			$imageUrl = Storage::url($saveImage);
    			DB::table('store_images')->insert(['url' => $imageUrl, 'store_id' => $data['store_id']]);
	      }
	      return response()->json([
          'mess' => 'Tạo kho dữ liệu thành công!',
        ], 200);
    	}
    }

}
