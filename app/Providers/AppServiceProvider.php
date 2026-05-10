<?php

namespace App\Providers;

use App\Models\SiteSetting;
use App\Repositories\Contracts\BlogRepositoryInterface;
use App\Repositories\Contracts\BookingRepositoryInterface;
use App\Repositories\Contracts\PaymentRepositoryInterface;
use App\Repositories\Contracts\TravelPackageRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Eloquent\BlogRepository;
use App\Repositories\Eloquent\BookingRepository;
use App\Repositories\Eloquent\PaymentRepository;
use App\Repositories\Eloquent\TravelPackageRepository;
use App\Repositories\Eloquent\UserRepository;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind Repository Interfaces to Implementations
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(TravelPackageRepositoryInterface::class, TravelPackageRepository::class);
        $this->app->bind(BookingRepositoryInterface::class, BookingRepository::class);
        $this->app->bind(PaymentRepositoryInterface::class, PaymentRepository::class);
        $this->app->bind(BlogRepositoryInterface::class, BlogRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Use varchar(255) as default for string columns
        Schema::defaultStringLength(255);

        // Force HTTPS in production
        if (config('app.env') === 'production') {
            $this->app['request']->server->set('HTTPS', true);
        }

        // Share site_settings globally via View composer
        View::composer('*', function ($view) {
            $siteSettings = cache()->remember('site_settings_public', 3600, function () {
                return SiteSetting::public()
                    ->pluck('value', 'key')
                    ->toArray();
            });
            $view->with('siteSettings', (object) $siteSettings);
        });
    }
}
