@extends('layouts.public')

@section('title', $package->name . ' - ' . config('app.name'))

@section('seo')
    @include('seo.meta-tags', [
        'title' => $package->meta_title ?: $package->name . ' - Travel Package',
        'description' => $package->meta_description ?: $package->short_description,
        'keywords' => $package->meta_keywords ?? implode(', ', [$package->destination, $package->name]),
        'image' => $package->galleries->first()?->image ?? asset('images/og-package.jpg'),
        'url' => route('packages.show', $package->slug),
        'type' => 'product',
        'price' => $package->discount_price ?? $package->price,
        'currency' => 'USD',
    ])
    @include('seo.structured-data', [
        'type' => 'package',
        'data' => $structuredData ?? null,
    ])
@endsection

@section('content')
    {{-- Breadcrumb --}}
    <nav class="bg-gray-100 py-3" aria-label="Breadcrumb">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol class="flex items-center space-x-2 text-sm">
                <li>
                    <a href="{{ route('home') }}" class="text-gray-500 hover:text-gray-700">Home</a>
                </li>
                <li class="text-gray-400">/</li>
                <li>
                    <a href="{{ route('packages.index') }}" class="text-gray-500 hover:text-gray-700">Packages</a>
                </li>
                <li class="text-gray-400">/</li>
                <li class="text-gray-900 font-medium">{{ $package->name }}</li>
            </ol>
        </div>
    </nav>

    {{-- Package Header --}}
    <section class="py-8 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {{-- Gallery --}}
                <div class="space-y-4">
                    @if($package->galleries->count() > 0)
                        <div class="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                            <img src="{{ $package->galleries->first()->image }}" alt="{{ $package->name }}"
                                 class="w-full h-96 object-cover">
                        </div>
                        @if($package->galleries->count() > 1)
                            <div class="grid grid-cols-4 gap-4">
                                @foreach($package->galleries->skip(1)->take(4) as $gallery)
                                    <img src="{{ $gallery->image }}" alt="{{ $package->name }}"
                                         class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity">
                                @endforeach
                            </div>
                        @endif
                    @else
                        <div class="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                    @endif
                </div>

                {{-- Package Info --}}
                <div>
                    <div class="flex items-center gap-4 mb-4">
                        @if($package->is_on_sale)
                            <span class="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">On Sale</span>
                        @endif
                        @if($package->featured)
                            <span class="px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-medium rounded-full">Featured</span>
                        @endif
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            {{ $package->duration_days }} Days / {{ $package->duration_nights }} Nights
                        </span>
                    </div>

                    <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $package->name }}</h1>

                    <p class="text-lg text-gray-600 mb-6">
                        <svg class="w-5 h-5 inline mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {{ $package->destination }}
                    </p>

                    <div class="mb-6">
                        @if($package->is_on_sale)
                            <span class="text-3xl font-bold text-red-500">${{ number_format($package->discount_price, 2) }}</span>
                            <span class="text-xl text-gray-400 line-through ml-2">${{ number_format($package->price, 2) }}</span>
                            <span class="ml-2 text-sm text-red-500 font-medium">Save ${{ number_format($package->savings_amount, 2) }}</span>
                        @else
                            <span class="text-3xl font-bold text-gray-900">${{ number_format($package->price, 2) }}</span>
                        @endif
                        <span class="text-gray-500 ml-1">per person</span>
                    </div>

                    <p class="text-gray-600 mb-8">{{ $package->short_description ?? $package->description }}</p>

                    {{-- Booking Form --}}
                    @auth
                        <form action="{{ route('bookings.store') }}" method="POST" class="space-y-6">
                            @csrf
                            <input type="hidden" name="travel_package_id" value="{{ $package->id }}">

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="travel_date" class="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                                    <input type="date" name="travel_date" id="travel_date" required
                                           min="{{ now()->addDay()->format('Y-m-d') }}"
                                           class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border">
                                </div>
                                <div>
                                    <label for="number_of_travelers" class="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                                    <select name="number_of_travelers" id="number_of_travelers" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border">
                                        @for($i = 1; $i <= min($package->max_participants, 10); $i++)
                                            <option value="{{ $i }}">{{ $i }} {{ $i == 1 ? 'Person' : 'People' }}</option>
                                        @endfor
                                    </select>
                                </div>
                            </div>

                            <button type="submit" class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                Book This Package
                            </button>
                        </form>
                    @else
                        <a href="{{ route('login') }}?redirect={{ urlencode(route('packages.show', $package->slug)) }}"
                           class="block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center">
                            Login to Book This Package
                        </a>
                        <p class="mt-4 text-center text-gray-500">
                            Don't have an account?
                            <a href="{{ route('register') }}" class="text-blue-600 hover:text-blue-800 font-medium">Sign up</a>
                        </p>
                    @endauth
                </div>
            </div>
        </div>
    </section>

    {{-- Package Details --}}
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {{-- Main Content --}}
                <div class="lg:col-span-2 space-y-12">
                    {{-- Description --}}
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">About This Package</h2>
                        <div class="prose max-w-none text-gray-600">
                            {!! nl2br(e($package->description)) !!}
                        </div>
                    </div>

                    {{-- Itinerary --}}
                    @if($package->itinerary)
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-4">Itinerary</h2>
                            <div class="space-y-4">
                                @foreach($package->itinerary as $day => $activities)
                                    <div class="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                                        <h3 class="font-semibold text-gray-900">Day {{ $day }}</h3>
                                        <p class="text-gray-600 mt-1">{{ $activities }}</p>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @endif

                    {{-- Highlights --}}
                    @if($package->highlights)
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
                            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                @foreach($package->highlights as $highlight)
                                    <li class="flex items-start">
                                        <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span class="text-gray-600">{{ $highlight }}</span>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </div>

                {{-- Sidebar --}}
                <div class="space-y-8">
                    {{-- What's Included --}}
                    <div class="bg-white rounded-xl p-6 shadow-sm">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
                        @if($package->includes)
                            <ul class="space-y-3">
                                @foreach($package->includes as $item)
                                    <li class="flex items-start">
                                        <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span class="text-gray-600 text-sm">{{ $item }}</span>
                                    </li>
                                @endforeach
                            </ul>
                        @else
                            <p class="text-gray-500 text-sm">No inclusion information available.</p>
                        @endif
                    </div>

                    {{-- What's Not Included --}}
                    <div class="bg-white rounded-xl p-6 shadow-sm">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Not Included</h3>
                        @if($package->excludes)
                            <ul class="space-y-3">
                                @foreach($package->excludes as $item)
                                    <li class="flex items-start">
                                        <svg class="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                        <span class="text-gray-600 text-sm">{{ $item }}</span>
                                    </li>
                                @endforeach
                            </ul>
                        @else
                            <p class="text-gray-500 text-sm">No exclusion information available.</p>
                        @endif
                    </div>

                    {{-- Terms & Conditions --}}
                    @if($package->terms_conditions)
                        <div class="bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
                            <div class="text-sm text-gray-600 prose max-w-none">
                                {!! nl2br(e($package->terms_conditions)) !!}
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </section>

    {{-- Related Packages --}}
    @if(isset($relatedPackages) && $relatedPackages->count() > 0)
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-8">Similar Packages</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    @foreach($relatedPackages as $related)
                        @include('components.package-card', ['package' => $related])
                    @endforeach
                </div>
            </div>
        </section>
    @endif
@endsection
