<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\CategoryServiceInterface;
use App\Services\CategoryService;
use App\Interfaces\MenuServiceInterface;
use App\Services\MenuService;

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
            CategoryServiceInterface::class,
            CategoryService::class
        );
        $this->app->singleton(
            MenuServiceInterface::class,
            MenuService::class
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
