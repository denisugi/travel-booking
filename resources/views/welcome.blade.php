@extends('layouts.public')

@section('title', 'Welcome to ' . config('app.name') . ' - Your Dream Travel Awaits')

@section('seo')
    @include('seo.meta-tags', [
        'title' => config('app.name') . ' - Book Your Dream Travel Packages',
        'description' => 'Discover and book amazing travel packages to destinations worldwide. Explore curated tours, compare prices, and create unforgettable travel memories with ' . config('app.name') . '.',
        'keywords' => 'travel, booking, vacation packages, tours, destinations, holiday',
        'image' => asset('images/og-home.jpg'),
        'url' => route('home'),
        'type' => 'website',
    ])
@endsection

@section('hero')
    {{-- Hero Section --}}
    <section class="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('{{ asset('images/hero-bg.jpg') }}'); opacity: 0.15;"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div class="text-center">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Your Dream Travel Awaits
                </h1>
                <p class="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                    Discover amazing destinations, book curated travel packages, and create unforgettable memories with {{ config('app.name') }}.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="{{ route('packages.index') }}" class="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                        Explore Packages
                    </a>
                    <a href="{{ route('blog.index') }}" class="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                        Travel Guides
                    </a>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('content')
    {{-- Featured Packages --}}
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Travel Packages</h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Handpicked destinations and exclusive deals for your next adventure
                </p>
            </div>

            @if(isset($featuredPackages) && $featuredPackages->count() > 0)
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    @foreach($featuredPackages as $package)
                        @include('components.package-card', ['package' => $package])
                    @endforeach
                </div>
            @else
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    @foreach($packages ?? [] as $package)
                        @include('components.package-card', ['package' => $package])
                    @endforeach
                </div>
            @endif

            <div class="text-center mt-12">
                <a href="{{ route('packages.index') }}" class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                    View All Packages
                    <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </a>
            </div>
        </div>
    </section>

    {{-- Latest Blog Posts --}}
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Travel Guides & Tips</h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Get inspired with our latest travel articles and insider tips
                </p>
            </div>

            @if(isset($latestPosts) && $latestPosts->count() > 0)
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    @foreach($latestPosts as $post)
                        @include('components.blog-card', ['post' => $post])
                    @endforeach
                </div>
            @else
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    @foreach($posts ?? [] as $post)
                        @include('components.blog-card', ['post' => $post])
                    @endforeach
                </div>
            @endif

            <div class="text-center mt-12">
                <a href="{{ route('blog.index') }}" class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                    Read All Articles
                    <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </a>
            </div>
        </div>
    </section>

    {{-- Features Section --}}
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Secure Booking</h3>
                    <p class="text-gray-600">Your payments and personal information are protected with industry-leading security.</p>
                </div>
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                    <p class="text-gray-600">Our dedicated support team is available around the clock to assist you.</p>
                </div>
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
                    <p class="text-gray-600">Find a lower price? We'll match it and give you an extra 5% off.</p>
                </div>
            </div>
        </div>
    </section>

    {{-- CTA Section --}}
    <section class="py-16 bg-blue-600">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p class="text-xl text-blue-100 mb-8">
                Join thousands of happy travelers who booked their dream vacations with us.
            </p>
            <a href="{{ route('register') }}" class="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                Create Your Account
            </a>
        </div>
    </section>
@endsection
