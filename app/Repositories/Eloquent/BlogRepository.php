<?php

namespace App\Repositories\Eloquent;

use App\Models\BlogPost;
use App\Repositories\Contracts\BlogRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class BlogRepository implements BlogRepositoryInterface
{
    public function findById(int $id): ?BlogPost
    {
        return BlogPost::with(['author', 'category', 'tags'])->find($id);
    }

    public function findBySlug(string $slug): ?BlogPost
    {
        return BlogPost::with(['author', 'category', 'tags'])
            ->where('slug', $slug)
            ->first();
    }

    public function getAll(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = BlogPost::with(['author', 'category', 'tags']);

        return $this->applyFilters($query, $filters)->paginate($perPage);
    }

    public function getPublished(int $perPage = 15): LengthAwarePaginator
    {
        return BlogPost::with(['author', 'category', 'tags'])
            ->published()
            ->orderBy('published_at', 'desc')
            ->paginate($perPage);
    }

    public function getFeatured(int $limit = 10): Collection
    {
        return BlogPost::with(['author', 'category', 'tags'])
            ->published()
            ->featured()
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getByCategory(int $categoryId, int $perPage = 15): LengthAwarePaginator
    {
        return BlogPost::with(['author', 'category', 'tags'])
            ->published()
            ->where('blog_category_id', $categoryId)
            ->orderBy('published_at', 'desc')
            ->paginate($perPage);
    }

    public function getByTag(string $tagSlug, int $perPage = 15): LengthAwarePaginator
    {
        return BlogPost::with(['author', 'category', 'tags'])
            ->published()
            ->whereHas('tags', function ($query) use ($tagSlug) {
                $query->where('slug', $tagSlug);
            })
            ->orderBy('published_at', 'desc')
            ->paginate($perPage);
    }

    public function search(string $query, int $perPage = 15): LengthAwarePaginator
    {
        return BlogPost::with(['author', 'category', 'tags'])
            ->published()
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('content', 'like', "%{$query}%")
                  ->orWhere('excerpt', 'like', "%{$query}%")
                  ->orWhere('meta_keywords', 'like', "%{$query}%");
            })
            ->orderBy('published_at', 'desc')
            ->paginate($perPage);
    }

    protected function applyFilters($query, array $filters)
    {
        if (isset($filters['is_published'])) {
            $query->where('is_published', $filters['is_published']);
        }

        if (isset($filters['featured'])) {
            $query->where('featured', $filters['featured']);
        }

        if (isset($filters['category_id'])) {
            $query->where('blog_category_id', $filters['category_id']);
        }

        if (isset($filters['author_id'])) {
            $query->where('author_id', $filters['author_id']);
        }

        if (isset($filters['published_from'])) {
            $query->where('published_at', '>=', Carbon::parse($filters['published_from']));
        }

        if (isset($filters['published_to'])) {
            $query->where('published_at', '<=', Carbon::parse($filters['published_to']));
        }

        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        $sortBy = $filters['sort_by'] ?? 'published_at';
        $sortDir = $filters['sort_dir'] ?? 'desc';
        $query->orderBy($sortBy, $sortDir);

        return $query;
    }

    public function getRecentPosts(int $limit = 10): Collection
    {
        return BlogPost::with(['author', 'category'])
            ->published()
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getRelatedPosts(int $postId, int $limit = 4): Collection
    {
        $post = $this->findById($postId);
        if (!$post) {
            return collect();
        }

        return BlogPost::with(['author', 'category'])
            ->published()
            ->where('id', '!=', $postId)
            ->where(function ($query) use ($post) {
                $query->where('blog_category_id', $post->blog_category_id)
                    ->orWhereHas('tags', function ($tagQuery) use ($post) {
                        $tagQuery->whereIn('blog_tags.id', $post->tags->pluck('id'));
                    });
            })
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function create(array $data): BlogPost
    {
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        if (!isset($data['published_at']) && isset($data['is_published']) && $data['is_published']) {
            $data['published_at'] = Carbon::now();
        }

        return BlogPost::create($data);
    }

    public function update(int $id, array $data): ?BlogPost
    {
        $post = $this->findById($id);
        if (!$post) {
            return null;
        }

        if (isset($data['title']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        if (isset($data['is_published']) && $data['is_published'] && !$post->published_at) {
            $data['published_at'] = Carbon::now();
        }

        $post->update($data);
        return $post->fresh();
    }

    public function delete(int $id): bool
    {
        $post = $this->findById($id);
        if (!$post) {
            return false;
        }
        return $post->delete();
    }

    public function incrementViewCount(int $id): void
    {
        BlogPost::where('id', $id)->increment('view_count');
    }

    public function getPopularPosts(int $limit = 10): Collection
    {
        return BlogPost::with(['author', 'category'])
            ->published()
            ->orderBy('view_count', 'desc')
            ->limit($limit)
            ->get();
    }
}
