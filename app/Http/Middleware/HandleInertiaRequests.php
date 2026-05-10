<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(\Illuminate\Http\Request $request): ?string
    {
        return Facades\Cache::rememberForever('asset_version', function () {
            return date('YmdHis');
        });
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(\Illuminate\Http\Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => $request->user() ? [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
            ] : null,
            'ziggy' => (new \Tighten\Ziggy\Ziggy(null, config('app.url')))->toArray(),
            'siteSettings' => cache()->remember('site_settings_public', 3600, function () {
                return SiteSetting::public()
                    ->pluck('value', 'key')
                    ->toArray();
            }),
        ];
    }
}