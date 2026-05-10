#!/usr/bin/env php
<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "Cache driver: " . config('cache.default') . "\n";

$settings = \App\Models\SiteSetting::public()->pluck('value', 'key')->toArray();
echo "Public settings count: " . count($settings) . "\n";

$cached = cache()->get('site_settings_public');
echo "Cached settings count: " . (is_array($cached) ? count($cached) : 0) . "\n";

if (!empty($settings)) {
    cache()->put('site_settings_public', $settings, 3600);
    echo "First 5 keys:\n";
    foreach (array_slice($settings, 0, 5) as $k => $v) {
        echo "  $k => $v\n";
    }
}