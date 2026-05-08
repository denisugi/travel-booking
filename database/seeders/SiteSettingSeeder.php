<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General
            ['key' => 'site_name', 'value' => 'Travel Booking', 'group' => 'general', 'type' => 'text'],
            ['key' => 'site_tagline', 'value' => 'Your Dream Vacation Awaits', 'group' => 'general', 'type' => 'text'],
            ['key' => 'site_description', 'value' => 'Premium travel packages and unforgettable experiences worldwide', 'group' => 'general', 'type' => 'textarea'],
            ['key' => 'site_logo', 'value' => '/images/logo.png', 'group' => 'general', 'type' => 'image'],
            ['key' => 'site_favicon', 'value' => '/images/favicon.ico', 'group' => 'general', 'type' => 'image'],

            // Contact
            ['key' => 'contact_email', 'value' => 'contact@travelbooking.com', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'contact_phone', 'value' => '+1 (555) 123-4567', 'group' => 'contact', 'type' => 'text'],
            ['key' => 'contact_address', 'value' => '123 Travel Street, Suite 100, New York, NY 10001', 'group' => 'contact', 'type' => 'textarea'],

            // Social Media
            ['key' => 'social_facebook', 'value' => 'https://facebook.com/travelbooking', 'group' => 'social', 'type' => 'url'],
            ['key' => 'social_twitter', 'value' => 'https://twitter.com/travelbooking', 'group' => 'social', 'type' => 'url'],
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/travelbooking', 'group' => 'social', 'type' => 'url'],
            ['key' => 'social_linkedin', 'value' => 'https://linkedin.com/company/travelbooking', 'group' => 'social', 'type' => 'url'],

            // SEO
            ['key' => 'seo_meta_title', 'value' => 'Travel Booking - Premium Travel Packages', 'group' => 'seo', 'type' => 'text'],
            ['key' => 'seo_meta_description', 'value' => 'Discover amazing travel packages to destinations worldwide. Book your dream vacation today!', 'group' => 'seo', 'type' => 'textarea'],
            ['key' => 'seo_keywords', 'value' => 'travel, vacation, packages, tours, booking', 'group' => 'seo', 'type' => 'text'],

            // Email
            ['key' => 'email_from_address', 'value' => 'noreply@travelbooking.com', 'group' => 'email', 'type' => 'text'],
            ['key' => 'email_from_name', 'value' => 'Travel Booking', 'group' => 'email', 'type' => 'text'],

            // Booking
            ['key' => 'booking_min_travelers', 'value' => '1', 'group' => 'booking', 'type' => 'number'],
            ['key' => 'booking_max_travelers', 'value' => '20', 'group' => 'booking', 'type' => 'number'],
            ['key' => 'booking_confirmation_required', 'value' => '1', 'group' => 'booking', 'type' => 'boolean'],

            // Currency
            ['key' => 'currency_code', 'value' => 'USD', 'group' => 'currency', 'type' => 'text'],
            ['key' => 'currency_symbol', 'value' => '$', 'group' => 'currency', 'type' => 'text'],
            ['key' => 'currency_position', 'value' => 'before', 'group' => 'currency', 'type' => 'select'],

            // Maintenance
            ['key' => 'maintenance_mode', 'value' => '0', 'group' => 'maintenance', 'type' => 'boolean'],
            ['key' => 'maintenance_message', 'value' => 'We are currently under maintenance. Please check back soon.', 'group' => 'maintenance', 'type' => 'textarea'],
        ];

        foreach ($settings as $setting) {
            DB::table('site_settings')->updateOrInsert(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
