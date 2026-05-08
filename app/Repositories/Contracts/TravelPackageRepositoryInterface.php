<?php

namespace App\Repositories\Contracts;

use App\DTOs\PackageDTO;
use App\Models\TravelPackage;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface TravelPackageRepositoryInterface
{
    public function findById(int $id): ?TravelPackage;
    
    public function findBySlug(string $slug): ?TravelPackage;
    
    public function getAll(array $filters = [], int $perPage = 15): LengthAwarePaginator;
    
    public function getActivePackages(int $perPage = 15): LengthAwarePaginator;
    
    public function getFeaturedPackages(int $limit = 10): Collection;
    
    public function search(string $query, array $filters = [], int $perPage = 15): LengthAwarePaginator;
    
    public function filter(array $filters, int $perPage = 15): LengthAwarePaginator;
    
    public function getPopularPackages(int $limit = 10): Collection;
    
    public function getRelatedPackages(int $packageId, int $limit = 4): Collection;
    
    public function getByDestination(string $destination, int $perPage = 15): LengthAwarePaginator;
    
    public function create(array $data): TravelPackage;
    
    public function update(int $id, array $data): ?TravelPackage;
    
    public function delete(int $id): bool;
}
