<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Title --}}
    <title>@yield('title', config('app.name'))</title>

    {{-- SEO Meta Tags --}}
    @yield('seo')

    {{-- Favicon --}}
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    {{-- Styles --}}
    <link href="{{ asset('build/assets/app.css') }}" rel="stylesheet">

    {{-- Stack for additional styles --}}
    @stack('styles')
</head>
<body class="font-sans antialiased bg-white text-gray-900">
    {{-- Skip to content link for accessibility --}}
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded-lg">
        Skip to content
    </a>

    {{-- Navigation --}}
    @include('partials.navigation')

    {{-- Hero Section (optional) --}}
    @hasSection('hero')
        @yield('hero')
    @endif

    {{-- Main Content --}}
    <main id="main-content" class="min-h-screen">
        @yield('content')
    </main>

    {{-- Footer --}}
    @include('partials.footer')

    {{-- Scripts --}}
    <script src="{{ asset('build/assets/app.js') }}" defer></script>

    {{-- Stack for additional scripts --}}
    @stack('scripts')
</body>
</html>
