<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ $siteSettings->meta_description ?? 'Travel booking platform for unforgettable experiences' }}">
    <title>{{ $siteSettings->site_name ?? config('app.name', 'Travel Booking') }}</title>

    @if($siteSettings->favicon ?? false)
        <link rel="icon" type="image/x-icon" href="//{{ request()->getHost() }}/{{ ltrim($siteSettings->favicon, '/') }}">
    @else
        <link rel="icon" type="image/x-icon" href="//{{ request()->getHost() }}/favicon.ico">
    @endif

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <link href="//{{ request()->getHost() }}/build/assets/app.css?v={{ filemtime(public_path('build/assets/app.css')) }}" rel="stylesheet">
</head>
<body class="font-sans antialiased bg-gray-50 text-gray-900">
    <div id="app" data-page="{{ json_encode($page ?? []) }}"></div>

    <script type="module" src="//{{ request()->getHost() }}/build/assets/app.js?v={{ filemtime(public_path('build/assets/app.js')) }}"></script>
</body>
</html>