<div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
    {{-- Image --}}
    <div class="relative aspect-w-16 aspect-h-9">
        @if($post->featured_image)
            <img src="{{ $post->featured_image }}" alt="{{ $post->title }}"
                 class="w-full h-48 object-cover">
        @else
            <div class="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <svg class="w-12 h-12 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>
            </div>
        @endif

        {{-- Category Badge --}}
        @if($post->category)
            <a href="{{ route('blog.index', ['category' => $post->category->slug]) }}"
               class="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold rounded-full hover:bg-white transition-colors">
                {{ $post->category->name }}
            </a>
        @endif
    </div>

    {{-- Content --}}
    <div class="p-6 flex flex-col flex-1">
        {{-- Meta --}}
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <span>{{ $post->published_at?->format('M j, Y') }}</span>
            <span class="mx-1">•</span>
            <span>{{ $post->view_count }} views</span>
        </div>

        {{-- Title --}}
        <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 flex-1">
            <a href="{{ route('blog.show', $post->slug) }}" class="hover:text-blue-600 transition-colors">
                {{ $post->title }}
            </a>
        </h3>

        {{-- Excerpt --}}
        <p class="text-sm text-gray-600 mb-4 line-clamp-3">
            {{ $post->excerpt }}
        </p>

        {{-- Author & Read More --}}
        <div class="flex items-center justify-between pt-4 border-t">
            <div class="flex items-center gap-2">
                @if($post->author)
                    @if($post->author->avatar)
                        <img src="{{ $post->author->avatar }}" alt="{{ $post->author->name }}"
                             class="w-8 h-8 rounded-full object-cover">
                    @else
                        <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium">
                            {{ substr($post->author->name, 0, 1) }}
                        </div>
                    @endif
                    <span class="text-sm text-gray-700">{{ $post->author->name }}</span>
                @endif
            </div>
            <a href="{{ route('blog.show', $post->slug) }}"
               class="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center gap-1">
                Read More
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>
        </div>
    </div>
</div>
