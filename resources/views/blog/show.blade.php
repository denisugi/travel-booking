@extends('layouts.public')

@section('title', $post->title . ' - ' . config('app.name'))

@section('seo')
    @include('seo.meta-tags', [
        'title' => $post->meta_title ?: $post->title,
        'description' => $post->meta_description ?: $post->excerpt,
        'keywords' => $post->meta_keywords,
        'image' => $post->featured_image,
        'url' => route('blog.show', $post->slug),
        'type' => 'article',
        'published_at' => $post->published_at?->toIso8601String(),
        'author' => $post->author?->name,
    ])
    @include('seo.structured-data', [
        'type' => 'blog',
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
                    <a href="{{ route('blog.index') }}" class="text-gray-500 hover:text-gray-700">Blog</a>
                </li>
                <li class="text-gray-400">/</li>
                <li class="text-gray-900 font-medium truncate max-w-[200px]">{{ $post->title }}</li>
            </ol>
        </div>
    </nav>

    {{-- Article Header --}}
    <article class="py-12 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {{-- Category & Tags --}}
            <div class="flex flex-wrap items-center gap-3 mb-6">
                @if($post->category)
                    <a href="{{ route('blog.index', ['category' => $post->category->slug]) }}"
                       class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors">
                        {{ $post->category->name }}
                    </a>
                @endif
                @if($post->tags->count() > 0)
                    @foreach($post->tags->take(3) as $tag)
                        <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            #{{ $tag->name }}
                        </span>
                    @endforeach
                @endif
            </div>

            {{-- Title --}}
            <h1 class="text-4xl font-bold text-gray-900 mb-6">{{ $post->title }}</h1>

            {{-- Meta --}}
            <div class="flex flex-wrap items-center gap-4 text-gray-500 mb-8 pb-8 border-b">
                @if($post->author)
                    <div class="flex items-center gap-2">
                        @if($post->author->avatar)
                            <img src="{{ $post->author->avatar }}" alt="{{ $post->author->name }}"
                                 class="w-10 h-10 rounded-full object-cover">
                        @else
                            <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                                {{ substr($post->author->name, 0, 1) }}
                            </div>
                        @endif
                        <span class="font-medium text-gray-700">{{ $post->author->name }}</span>
                    </div>
                    <span class="hidden sm:inline">•</span>
                @endif
                <span>{{ $post->published_at?->format('F j, Y') }}</span>
                <span class="hidden sm:inline">•</span>
                <span>{{ $post->view_count }} views</span>
                <span class="hidden sm:inline">•</span>
                <span>{{ ceil(strlen(strip_tags($post->content)) / 1000) }} min read</span>
            </div>

            {{-- Featured Image --}}
            @if($post->featured_image)
                <figure class="mb-10">
                    <img src="{{ $post->featured_image }}" alt="{{ $post->title }}"
                         class="w-full h-auto rounded-xl">
                </figure>
            @endif

            {{-- Content --}}
            <div class="prose prose-lg max-w-none prose-blue">
                {!! $post->content !!}
            </div>

            {{-- Share Links --}}
            <div class="mt-12 pt-8 border-t">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                <div class="flex gap-4">
                    <a href="https://twitter.com/intent/tweet?url={{ urlencode(route('blog.show', $post->slug)) }}&text={{ urlencode($post->title) }}"
                       target="_blank" rel="noopener"
                       class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(route('blog.show', $post->slug)) }}"
                       target="_blank" rel="noopener"
                       class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/shareArticle?mini=true&url={{ urlencode(route('blog.show', $post->slug)) }}&title={{ urlencode($post->title) }}"
                       target="_blank" rel="noopener"
                       class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                        </svg>
                    </a>
                    <button onclick="navigator.clipboard.writeText('{{ route('blog.show', $post->slug) }}')"
                            class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </article>

    {{-- Author Bio --}}
    @if($post->author)
        <section class="py-8 bg-gray-50 border-t">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-start gap-4">
                    @if($post->author->avatar)
                        <img src="{{ $post->author->avatar }}" alt="{{ $post->author->name }}"
                             class="w-16 h-16 rounded-full object-cover">
                    @else
                        <div class="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-medium">
                            {{ substr($post->author->name, 0, 1) }}
                        </div>
                    @endif
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900">Written by {{ $post->author->name }}</h3>
                        @if($post->author->bio ?? false)
                            <p class="mt-2 text-gray-600">{{ $post->author->bio }}</p>
                        @endif
                    </div>
                </div>
            </div>
        </section>
    @endif

    {{-- Related Posts --}}
    @if(isset($relatedPosts) && $relatedPosts->count() > 0)
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    @foreach($relatedPosts as $related)
                        @include('components.blog-card', ['post' => $related])
                    @endforeach
                </div>
            </div>
        </section>
    @endif
@endsection
