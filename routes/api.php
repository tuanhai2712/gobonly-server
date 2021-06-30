<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(['middleware' => 'api'], function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login', 'AuthController@login');
        Route::post('logout', 'AuthController@logout');
        Route::post('refresh', 'AuthController@refresh');
        Route::get('user-profile', 'AuthController@userProfile');
    });
     Route::post('categories', 'CategoriesController@create');
     Route::put('categories', 'CategoriesController@update');
     Route::get('categories', 'CategoriesController@get');
     Route::post('store', 'StoreController@create');
     Route::get('store', 'StoreController@get');
     Route::post('store-images', 'StoreImagesController@create');
    // Route::group(['middleware' => 'auth'], function () {

    // });
});