<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Application Domains Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains the domain configuration for the travel booking
    | application, including main domain and subdomain settings.
    |
    */

    'main' => env('APP_DOMAIN', 'travel-booking.com'),

    'api' => env('API_DOMAIN', 'api.travel-booking.com'),

    'admin' => env('ADMIN_DOMAIN', 'admin.travel-booking.com'),

    /*
    |--------------------------------------------------------------------------
    | Domain Routing
    |--------------------------------------------------------------------------
    */

    'routing' => [
        'api_prefix' => 'api',
        'web_prefix' => '/',
    ],

];
