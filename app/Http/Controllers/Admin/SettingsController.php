<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SettingsController extends Controller
{
    /**
     * Display a listing of all settings grouped by category.
     */
    public function index()
    {
        $settings = SiteSetting::orderBy('group')->orderBy('key')->get();

        // Group settings by their 'group' field
        $groupedSettings = $settings->groupBy('group')->map(function ($items) {
            return $items->mapWithKeys(function ($item) {
                return [$item->key => $item];
            });
        });

        return inertia('Admin/Settings/Index', [
            'settings' => $settings,
            'groupedSettings' => $groupedSettings,
        ]);
    }

    /**
     * Update site settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*' => 'nullable',
        ]);

        $settings = $validated['settings'] ?? [];

        foreach ($settings as $key => $value) {
            $setting = SiteSetting::where('key', $key)->first();

            if ($setting) {
                $setting->update(['value' => $value]);
            } else {
                // Create new setting if it doesn't exist
                SiteSetting::create([
                    'key' => $key,
                    'value' => $value,
                    'type' => 'string',
                    'group' => 'general',
                    'is_public' => true,
                ]);
            }
        }

        // Clear the cache so new values are picked up
        Cache::forget('site_settings_public');

        return redirect()->back()->with('success', 'Settings saved successfully.');
    }
}