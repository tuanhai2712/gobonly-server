<?php
namespace App\Services;

use App\Interfaces\StoreServiceInterface;
use Illuminate\Support\Facades\DB;

class StoreService implements StoreServiceInterface
{
    public function create($data)
    {
    	$storeExist = DB::table('store')->where('name', $data['name'])->exists();
    	if ($storeExist) {
    		return response()->json([
              'mess' => 'Tên kho lưu trữ đã tồn tại!',
            ], 422);
    	}
    	$storeId = DB::table('store')->insertGetId(['name' => $data['name']]);
    	if ($storeId) {
    		return response()->json([
              'mess' => 'Tạo kho lưu trữ thành công!',
            ], 200);
    	}
    	return response()->json([
          'mess' => 'Có lỗi trong quá trình xử lý!',
        ], 422);
    }

    public function get()
    {
    	$store = DB::table('store')->get();
    	return response()->json([
			'data' => $store,
        ], 200);
    }

}
