{{-- Meta Tags Partial --}}
{{-- Usage: @include('seo.meta-tags', ['title' => ..., 'description' => ..., ...]) --}}

{{-- Primary Meta Tags --}}
<meta name="description" content="{{ $description ?? '' }}">
<meta name="keywords" content="{{ $keywords ?? '' }}">
<meta name="author" content="{{ $author ?? config('app.name') }}">
<meta name="robots" content="{{ $robots ?? 'index, follow' }}">

{{-- Open Graph / Facebook --}}
<meta property="og:type" content="{{ $type ?? 'website' }}">
<meta property="og:url" content="{{ $url ?? url()->current() }}">
<meta property="og:title" content="{{ $title ?? config('app.name') }}">
<meta property="og:description" content="{{ $description ?? '' }}">
<meta property="og:image" content="{{ $image ?? asset('images/og-default.jpg') }}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="{{ config('app.name') }}">
<meta property="og:locale" content="{{ str_replace('-', '_', app()->getLocale()) }}">

{{-- Twitter Card --}}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="{{ $url ?? url()->current() }}">
<meta name="twitter:title" content="{{ $title ?? config('app.name') }}">
<meta name="twitter:description" content="{{ $description ?? '' }}">
<meta name="twitter:image" content="{{ $image ?? asset('images/og-default.jpg') }}">

{{-- Article Specific Meta Tags --}}
@if(isset($published_at) && $published_at)
    <meta property="article:published_time" content="{{ $published_at }}">
@endif
@if(isset($author) && $author)
    <meta property="article:author" content="{{ $author }}">
@endif

{{-- Product Specific Meta Tags --}}
@if(isset($price) && $price)
    <meta property="product:price:amount" content="{{ $price }}">
    <meta property="product:price:currency" content="{{ $currency ?? 'USD' }}">
@endif

{{-- Canonical URL --}}
<link rel="canonical" href="{{ $url ?? url()->current() }}">
