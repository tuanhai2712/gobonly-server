<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\CategoriesServiceInterface;
use App\Services\CategoriesService;
use App\Interfaces\StoreServiceInterface;
use App\Services\StoreService;
use App\Interfaces\StoreImagesServiceInterface;
use App\Services\StoreImagesService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(
            CategoriesServiceInterface::class,
            CategoriesService::class
        );
        $this->app->singleton(
            StoreServiceInterface::class,
            StoreService::class
        );
        $this->app->singleton(
            StoreImagesServiceInterface::class,
            StoreImagesService::class
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
