<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Check current cache state
$cached = cache()->get('site_settings_public');
echo "Cached count: " . (is_array($cached) ? count($cached) : 'null/empty'). "\n";

// Get fresh from DB
$settings = \App\Models\SiteSetting::public()->pluck('value', 'key')->toArray();
echo "DB public count: " . count($settings) . "\n";

// Force refresh cache
cache()->forget('site_settings_public');
cache()->remember('site_settings_public', 3600, function() use ($settings) {
    return $settings;
});

$verify = cache()->get('site_settings_public');
echo "After manual refresh count: " . (is_array($verify) ? count($verify) : 0) . "\n";

// Now check the HTTP response - use file_get_contents instead of Guzzle
$response = file_get_contents('http://localhost:8080/');
preg_match('/data-page="([^"]+)"/', $response, $m);
if ($m) {
    $data = json_decode(html_entity_decode($m[1]), true);
    $ss = $data['props']['siteSettings'] ?? [];
    echo "siteSettings in page payload: " . count($ss) . " keys\n";
    if (!empty($ss)) {
        echo "First 3: " . implode(', ', array_slice(array_keys($ss), 0, 3)) . "\n";
    }
}