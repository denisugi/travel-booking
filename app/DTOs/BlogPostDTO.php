<?php

namespace App\DTOs;

use App\Models\BlogPost;
use Carbon\Carbon;

class BlogPostDTO
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $title,
        public readonly string $slug,
        public readonly ?string $excerpt,
        public readonly string $content,
        public readonly ?string $featuredImage,
        public readonly int $authorId,
        public readonly ?int $blogCategoryId,
        public readonly bool $isPublished,
        public readonly ?Carbon $publishedAt,
        public readonly ?string $metaTitle,
        public readonly ?string $metaDescription,
        public readonly ?string $metaKeywords,
        public readonly int $viewCount,
        public readonly bool $featured,
        public readonly ?string $authorName = null,
        public readonly ?string $categoryName = null,
        public readonly ?array $tags = null,
    ) {}

    public static function fromModel(BlogPost $post): self
    {
        return new self(
            id: $post->id,
            title: $post->title,
            slug: $post->slug,
            excerpt: $post->excerpt,
            content: $post->content,
            featuredImage: $post->featured_image,
            authorId: $post->author_id,
            blogCategoryId: $post->blog_category_id,
            isPublished: $post->is_published,
            publishedAt: $post->published_at,
            metaTitle: $post->meta_title,
            metaDescription: $post->meta_description,
            metaKeywords: $post->meta_keywords,
            viewCount: $post->view_count,
            featured: $post->featured,
            authorName: $post->relationLoaded('author') && $post->author 
                ? $post->author->name 
                : null,
            categoryName: $post->relationLoaded('category') && $post->category 
                ? $post->category->name 
                : null,
            tags: $post->relationLoaded('tags') 
                ? $post->tags->map(fn($t) => ['id' => $t->id, 'name' => $t->name, 'slug' => $t->slug])->toArray()
                : null,
        );
    }

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            title: $data['title'],
            slug: $data['slug'] ?? \Str::slug($data['title']),
            excerpt: $data['excerpt'] ?? null,
            content: $data['content'],
            featuredImage: $data['featured_image'] ?? null,
            authorId: $data['author_id'],
            blogCategoryId: $data['blog_category_id'] ?? null,
            isPublished: $data['is_published'] ?? false,
            publishedAt: isset($data['published_at']) 
                ? ($data['published_at'] instanceof Carbon ? $data['published_at'] : Carbon::parse($data['published_at']))
                : null,
            metaTitle: $data['meta_title'] ?? null,
            metaDescription: $data['meta_description'] ?? null,
            metaKeywords: $data['meta_keywords'] ?? null,
            viewCount: $data['view_count'] ?? 0,
            featured: $data['featured'] ?? false,
            authorName: $data['author_name'] ?? null,
            categoryName: $data['category_name'] ?? null,
            tags: $data['tags'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'featured_image' => $this->featuredImage,
            'author_id' => $this->authorId,
            'blog_category_id' => $this->blogCategoryId,
            'is_published' => $this->isPublished,
            'published_at' => $this->publishedAt?->toDateTimeString(),
            'meta_title' => $this->metaTitle,
            'meta_description' => $this->metaDescription,
            'meta_keywords' => $this->metaKeywords,
            'view_count' => $this->viewCount,
            'featured' => $this->featured,
        ];
    }

    public function isVisible(): bool
    {
        return $this->isPublished && $this->publishedAt !== null;
    }
}
