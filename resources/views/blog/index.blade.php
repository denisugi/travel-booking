@extends('layouts.public')

@section('title', 'Travel Blog - Guides, Tips & Stories - ' . config('app.name'))

@section('seo')
    @include('seo.meta-tags', [
        'title' => 'Travel Blog - Guides, Tips & Stories - ' . config('app.name'),
        'description' => 'Read our travel blog for destination guides, travel tips, and inspiring stories from around the world.',
        'keywords' => 'travel blog, travel guides, travel tips, vacation ideas, destination guides',
        'image' => asset('images/og-blog.jpg'),
        'url' => route('blog.index'),
        'type' => 'website',
    ])
@endsection

@section('content')
    {{-- Page Header --}}
    <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold mb-4">Travel Blog</h1>
            <p class="text-xl text-blue-100 max-w-3xl">
                Discover travel guides, insider tips, and inspiring stories from our team of seasoned travelers.
            </p>
        </div>
    </section>

    {{-- Featured Post --}}
    @if(isset($featuredPost) && $featuredPost)
        <section class="py-12 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <a href="{{ route('blog.show', $featuredPost->slug) }}" class="block group">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div class="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                            @if($featuredPost->featured_image)
                                <img src="{{ $featuredPost->featured_image }}" alt="{{ $featuredPost->title }}"
                                     class="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300">
                            @else
                                <div class="w-full h-72 bg-gray-200 flex items-center justify-center">
                                    <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                            @endif
                        </div>
                        <div>
                            <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                                Featured
                            </span>
                            <h2 class="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                {{ $featuredPost->title }}
                            </h2>
                            <p class="text-gray-600 mb-4">{{ $featuredPost->excerpt }}</p>
                            <div class="flex items-center text-sm text-gray-500">
                                @if($featuredPost->author)
                                    <span class="font-medium text-gray-700">{{ $featuredPost->author->name }}</span>
                                    <span class="mx-2">•</span>
                                @endif
                                <span>{{ $featuredPost->published_at?->format('M j, Y') }}</span>
                                <span class="mx-2">•</span>
                                <span>{{ $featuredPost->view_count }} views</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </section>
    @endif

    {{-- Category Filter --}}
    <section class="py-6 bg-gray-50 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-wrap gap-2">
                <a href="{{ route('blog.index') }}"
                   class="px-4 py-2 rounded-full text-sm font-medium transition-colors {{ !request('category') ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100' }}">
                    All Posts
                </a>
                @foreach($categories ?? [] as $category)
                    <a href="{{ route('blog.index', ['category' => $category->slug]) }}"
                       class="px-4 py-2 rounded-full text-sm font-medium transition-colors {{ request('category') == $category->slug ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100' }}">
                        {{ $category->name }}
                    </a>
                @endforeach
            </div>
        </div>
    </section>

    {{-- Blog Grid --}}
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            @if($posts->count() > 0)
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    @foreach($posts as $post)
                        @include('components.blog-card', ['post' => $post])
                    @endforeach
                </div>

                {{-- Pagination --}}
                <div class="mt-12">
                    {{ $posts->links() }}
                </div>
            @else
                <div class="text-center py-16">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                    </svg>
                    <h3 class="mt-4 text-lg font-medium text-gray-900">No posts found</h3>
                    <p class="mt-2 text-gray-500">Check back soon for new travel stories and guides.</p>
                </div>
            @endif
        </div>
    </section>

    {{-- Newsletter Section --}}
    <section class="py-16 bg-blue-600">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-bold text-white mb-4">Get Travel Inspiration</h2>
            <p class="text-xl text-blue-100 mb-8">
                Subscribe to our newsletter for exclusive deals, travel tips, and destination guides.
            </p>
            <form class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input type="email" placeholder="Enter your email"
                       class="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
                <button type="submit" class="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                    Subscribe
                </button>
            </form>
        </div>
    </section>
@endsection
