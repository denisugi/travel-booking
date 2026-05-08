<?php

namespace App\Repositories\Contracts;

use App\Models\BlogPost;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface BlogRepositoryInterface
{
    public function findById(int $id): ?BlogPost;
    
    public function findBySlug(string $slug): ?BlogPost;
    
    public function getAll(array $filters = [], int $perPage = 15): LengthAwarePaginator;
    
    public function getPublished(int $perPage = 15): LengthAwarePaginator;
    
    public function getFeatured(int $limit = 10): Collection;
    
    public function getByCategory(int $categoryId, int $perPage = 15): LengthAwarePaginator;
    
    public function getByTag(string $tagSlug, int $perPage = 15): LengthAwarePaginator;
    
    public function search(string $query, int $perPage = 15): LengthAwarePaginator;
    
    public function getRecentPosts(int $limit = 10): Collection;
    
    public function getRelatedPosts(int $postId, int $limit = 4): Collection;
    
    public function create(array $data): BlogPost;
    
    public function update(int $id, array $data): ?BlogPost;
    
    public function delete(int $id): bool;
    
    public function incrementViewCount(int $id): void;
    
    public function getPopularPosts(int $limit = 10): Collection;
}
