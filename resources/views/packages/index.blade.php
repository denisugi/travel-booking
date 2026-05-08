@extends('layouts.public')

@section('title', 'Travel Packages - ' . config('app.name'))

@section('seo')
    @include('seo.meta-tags', [
        'title' => 'Travel Packages - ' . config('app.name'),
        'description' => 'Browse our curated collection of travel packages. Find the perfect vacation to destinations worldwide with exclusive deals and packages.',
        'keywords' => 'travel packages, vacation deals, tours, destinations, holiday packages',
        'image' => asset('images/og-packages.jpg'),
        'url' => route('packages.index'),
        'type' => 'website',
    ])
@endsection

@section('content')
    {{-- Page Header --}}
    <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold mb-4">Travel Packages</h1>
            <p class="text-xl text-blue-100 max-w-3xl">
                Discover our curated collection of travel packages designed to make your dream vacation a reality.
            </p>
        </div>
    </section>

    {{-- Filters --}}
    <section class="py-8 bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <form action="{{ route('packages.index') }}" method="GET" class="flex flex-wrap gap-4 items-end">
                <div class="flex-1 min-w-[200px]">
                    <label for="destination" class="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                    <input type="text" name="destination" id="destination" value="{{ request('destination') }}"
                           class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border"
                           placeholder="Search by destination...">
                </div>
                <div class="w-40">
                    <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <select name="duration" id="duration" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border">
                        <option value="">Any</option>
                        <option value="1-3" {{ request('duration') == '1-3' ? 'selected' : '' }}>1-3 Days</option>
                        <option value="4-7" {{ request('duration') == '4-7' ? 'selected' : '' }}>4-7 Days</option>
                        <option value="8+" {{ request('duration') == '8+' ? 'selected' : '' }}>8+ Days</option>
                    </select>
                </div>
                <div class="w-40">
                    <label for="price" class="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                    <select name="price" id="price" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border">
                        <option value="">Any</option>
                        <option value="low" {{ request('price') == 'low' ? 'selected' : '' }}>Under $500</option>
                        <option value="medium" {{ request('price') == 'medium' ? 'selected' : '' }}>$500-$1500</option>
                        <option value="high" {{ request('price') == 'high' ? 'selected' : '' }}>$1500+</option>
                    </select>
                </div>
                <div>
                    <button type="submit" class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Filter
                    </button>
                    <a href="{{ route('packages.index') }}" class="ml-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
                        Clear
                    </a>
                </div>
            </form>
        </div>
    </section>

    {{-- Packages Grid --}}
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            @if($packages->count() > 0)
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    @foreach($packages as $package)
                        @include('components.package-card', ['package' => $package])
                    @endforeach
                </div>

                {{-- Pagination --}}
                <div class="mt-12">
                    {{ $packages->links() }}
                </div>
            @else
                <div class="text-center py-16">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 class="mt-4 text-lg font-medium text-gray-900">No packages found</h3>
                    <p class="mt-2 text-gray-500">Try adjusting your filters or browse all packages.</p>
                    <a href="{{ route('packages.index') }}" class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                        View All Packages
                    </a>
                </div>
            @endif
        </div>
    </section>
@endsection
