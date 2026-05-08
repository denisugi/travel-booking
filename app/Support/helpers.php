<?php

if (!function_exists('route_is')) {
    /**
     * Check if the current route matches a given name or pattern.
     */
    function route_is(string $name): bool
    {
        return \Illuminate\Support\Facades\Route::is($name);
    }
}

if (!function_exists('active_route')) {
    /**
     * Determine if a route is active based on the given name or pattern.
     */
    function active_route(string $name): ?string
    {
        return route_is($name) ? 'active' : null;
    }
}
