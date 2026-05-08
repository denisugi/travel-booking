<div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
    {{-- Image --}}
    <div class="relative aspect-w-16 aspect-h-9">
        @if($package->galleries->count() > 0)
            <img src="{{ $package->galleries->first()->image }}" alt="{{ $package->name }}"
                 class="w-full h-56 object-cover">
        @else
            <div class="w-full h-56 bg-gray-200 flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
            </div>
        @endif

        {{-- Badges --}}
        <div class="absolute top-4 left-4 flex flex-col gap-2">
            @if($package->is_on_sale)
                <span class="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                    {{ round(($package->savings_amount / $package->price) * 100) }}% OFF
                </span>
            @endif
            @if($package->featured)
                <span class="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
                    Featured
                </span>
            @endif
        </div>

        {{-- Favorite Button --}}
        <button class="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
        </button>
    </div>

    {{-- Content --}}
    <div class="p-6">
        {{-- Destination & Duration --}}
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>{{ $package->destination }}</span>
            <span class="mx-1">•</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{{ $package->duration_days }}D / {{ $package->duration_nights }}N</span>
        </div>

        {{-- Title --}}
        <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            <a href="{{ route('packages.show', $package->slug) }}" class="hover:text-blue-600 transition-colors">
                {{ $package->name }}
            </a>
        </h3>

        {{-- Short Description --}}
        <p class="text-sm text-gray-600 mb-4 line-clamp-2">
            {{ $package->short_description ?? Str::limit(strip_tags($package->description), 100) }}
        </p>

        {{-- Price & CTA --}}
        <div class="flex items-center justify-between pt-4 border-t">
            <div>
                @if($package->is_on_sale)
                    <span class="text-xl font-bold text-red-500">${{ number_format($package->discount_price, 2) }}</span>
                    <span class="text-sm text-gray-400 line-through ml-1">${{ number_format($package->price, 2) }}</span>
                @else
                    <span class="text-xl font-bold text-gray-900">${{ number_format($package->price, 2) }}</span>
                @endif
                <span class="text-xs text-gray-500">/person</span>
            </div>
            <a href="{{ route('packages.show', $package->slug) }}"
               class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                View Details
            </a>
        </div>
    </div>
</div>
