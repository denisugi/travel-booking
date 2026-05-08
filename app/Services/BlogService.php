<?php

namespace App\Services;

use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BlogService
{
    public function getAllPosts(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = BlogPost::with(['author', 'category', 'tags']);

        if (!empty($filters['category_id'])) {
            $query->where('blog_category_id', $filters['category_id']);
        }

        if (!empty($filters['author_id'])) {
            $query->where('author_id', $filters['author_id']);
        }

        if (!empty($filters['tag_id'])) {
            $query->whereHas('tags', function ($q) use ($filters) {
                $q->where('blog_tags.id', $filters['tag_id']);
            });
        }

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', '%' . $filters['search'] . '%')
                    ->orWhere('content', 'like', '%' . $filters['search'] . '%');
            });
        }

        if (!empty($filters['published'])) {
            $query->published();
        }

        if (!empty($filters['featured'])) {
            $query->featured();
        }

        return $query->orderBy('published_at', 'desc')->paginate($perPage);
    }

    public function getPostById(int $id): ?BlogPost
    {
        return BlogPost::with(['author', 'category', 'tags'])->find($id);
    }

    public function getPostBySlug(string $slug): ?BlogPost
    {
        return BlogPost::with(['author', 'category', 'tags'])
            ->where('slug', $slug)
            ->first();
    }

    public function createPost(array $data): BlogPost
    {
        return DB::transaction(function () use ($data) {
            $postData = [
                'title' => $data['title'],
                'slug' => \Illuminate\Support\Str::slug($data['title']),
                'excerpt' => $data['excerpt'] ?? null,
                'content' => $data['content'],
                'featured_image' => $data['featured_image'] ?? null,
                'author_id' => $data['author_id'],
                'blog_category_id' => $data['blog_category_id'] ?? null,
                'is_published' => $data['is_published'] ?? false,
                'published_at' => $data['is_published'] ? ($data['published_at'] ?? now()) : null,
                'meta_title' => $data['meta_title'] ?? $data['title'],
                'meta_description' => $data['meta_description'] ?? null,
                'meta_keywords' => $data['meta_keywords'] ?? null,
                'featured' => $data['featured'] ?? false,
            ];

            $post = BlogPost::create($postData);

            if (!empty($data['tags'])) {
                $post->tags()->attach($data['tags']);
            }

            return $post->load(['author', 'category', 'tags']);
        });
    }

    public function updatePost(BlogPost $post, array $data): BlogPost
    {
        return DB::transaction(function () use ($post, $data) {
            $updateData = [
                'title' => $data['title'] ?? $post->title,
                'slug' => isset($data['title']) ? \Illuminate\Support\Str::slug($data['title']) : $post->slug,
                'excerpt' => $data['excerpt'] ?? $post->excerpt,
                'content' => $data['content'] ?? $post->content,
                'featured_image' => $data['featured_image'] ?? $post->featured_image,
                'author_id' => $data['author_id'] ?? $post->author_id,
                'blog_category_id' => $data['blog_category_id'] ?? $post->blog_category_id,
                'is_published' => $data['is_published'] ?? $post->is_published,
                'published_at' => isset($data['is_published']) && $data['is_published'] ? ($data['published_at'] ?? now()) : $post->published_at,
                'meta_title' => $data['meta_title'] ?? $post->meta_title,
                'meta_description' => $data['meta_description'] ?? $post->meta_description,
                'meta_keywords' => $data['meta_keywords'] ?? $post->meta_keywords,
                'featured' => $data['featured'] ?? $post->featured,
            ];

            $post->update($updateData);

            if (isset($data['tags'])) {
                $post->tags()->sync($data['tags']);
            }

            return $post->fresh()->load(['author', 'category', 'tags']);
        });
    }

    public function deletePost(BlogPost $post): bool
    {
        if ($post->featured_image) {
            Storage::delete($post->featured_image);
        }

        $post->tags()->detach();

        return $post->delete();
    }

    public function publishPost(BlogPost $post): BlogPost
    {
        $post->update([
            'is_published' => true,
            'published_at' => now(),
        ]);

        return $post->fresh();
    }

    public function unpublishPost(BlogPost $post): BlogPost
    {
        $post->update([
            'is_published' => false,
        ]);

        return $post->fresh();
    }

    public function getPublishedPosts(int $perPage = 10): LengthAwarePaginator
    {
        return BlogPost::published()
            ->with(['author', 'category', 'tags'])
            ->paginate($perPage);
    }

    public function getFeaturedPosts(int $limit = 5): \Illuminate\Database\Eloquent\Collection
    {
        return BlogPost::published()
            ->featured()
            ->with(['author', 'category', 'tags'])
            ->limit($limit)
            ->get();
    }

    public function getRelatedPosts(BlogPost $post, int $limit = 3): \Illuminate\Database\Eloquent\Collection
    {
        return BlogPost::published()
            ->where('id', '!=', $post->id)
            ->where('blog_category_id', $post->blog_category_id)
            ->with(['author', 'category', 'tags'])
            ->limit($limit)
            ->get();
    }

    public function incrementViewCount(BlogPost $post): void
    {
        $post->incrementViewCount();
    }

    public function getAllCategories(): \Illuminate\Database\Eloquent\Collection
    {
        return BlogCategory::withCount('posts')->get();
    }

    public function getAllTags(): \Illuminate\Database\Eloquent\Collection
    {
        return BlogTag::withCount('posts')->get();
    }
}
