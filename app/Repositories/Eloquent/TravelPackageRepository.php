<?php

namespace App\Repositories\Eloquent;

use App\Models\TravelPackage;
use App\Repositories\Contracts\TravelPackageRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class TravelPackageRepository implements TravelPackageRepositoryInterface
{
    public function findById(int $id): ?TravelPackage
    {
        return TravelPackage::with(['galleries'])->find($id);
    }

    public function findBySlug(string $slug): ?TravelPackage
    {
        return TravelPackage::with(['galleries'])
            ->where('slug', $slug)
            ->first();
    }

    public function getAll(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = TravelPackage::with(['galleries']);

        return $this->applyFilters($query, $filters)->paginate($perPage);
    }

    public function getActivePackages(int $perPage = 15): LengthAwarePaginator
    {
        return TravelPackage::with(['galleries'])
            ->active()
            ->orderBy('departure_date', 'asc')
            ->paginate($perPage);
    }

    public function getFeaturedPackages(int $limit = 10): Collection
    {
        return TravelPackage::with(['galleries'])
            ->featured()
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function search(string $query, array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $searchQuery = TravelPackage::with(['galleries'])
            ->active()
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%")
                  ->orWhere('destination', 'like', "%{$query}%")
                  ->orWhere('short_description', 'like', "%{$query}%");
            });

        return $this->applyFilters($searchQuery, $filters)->paginate($perPage);
    }

    public function filter(array $filters, int $perPage = 15): LengthAwarePaginator
    {
        $query = TravelPackage::with(['galleries'])->active();

        return $this->applyFilters($query, $filters)->paginate($perPage);
    }

    protected function applyFilters($query, array $filters)
    {
        if (isset($filters['destination']) && $filters['destination']) {
            $query->where('destination', 'like', "%{$filters['destination']}%");
        }

        if (isset($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }

        if (isset($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        if (isset($filters['duration_days'])) {
            $query->where('duration_days', $filters['duration_days']);
        }

        if (isset($filters['min_duration'])) {
            $query->where('duration_days', '>=', $filters['min_duration']);
        }

        if (isset($filters['max_duration'])) {
            $query->where('duration_days', '<=', $filters['max_duration']);
        }

        if (isset($filters['featured'])) {
            $query->where('featured', $filters['featured']);
        }

        if (isset($filters['departure_from'])) {
            $query->where('departure_date', '>=', $filters['departure_from']);
        }

        if (isset($filters['departure_to'])) {
            $query->where('departure_date', '<=', $filters['departure_to']);
        }

        if (isset($filters['has_discount']) && $filters['has_discount']) {
            $query->whereNotNull('discount_price')
                  ->where('discount_price', '>', 0);
        }

        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortDir = $filters['sort_dir'] ?? 'desc';
        $query->orderBy($sortBy, $sortDir);

        return $query;
    }

    public function getPopularPackages(int $limit = 10): Collection
    {
        return TravelPackage::with(['galleries'])
            ->active()
            ->withCount('bookings')
            ->orderBy('bookings_count', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getRelatedPackages(int $packageId, int $limit = 4): Collection
    {
        $package = $this->findById($packageId);
        if (!$package) {
            return collect();
        }

        return TravelPackage::with(['galleries'])
            ->active()
            ->where('id', '!=', $packageId)
            ->where(function ($query) use ($package) {
                $query->where('destination', $package->destination)
                      ->orWhere('duration_days', $package->duration_days);
            })
            ->limit($limit)
            ->get();
    }

    public function getByDestination(string $destination, int $perPage = 15): LengthAwarePaginator
    {
        return TravelPackage::with(['galleries'])
            ->active()
            ->where('destination', 'like', "%{$destination}%")
            ->orderBy('departure_date', 'asc')
            ->paginate($perPage);
    }

    public function create(array $data): TravelPackage
    {
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        return TravelPackage::create($data);
    }

    public function update(int $id, array $data): ?TravelPackage
    {
        $package = $this->findById($id);
        if (!$package) {
            return null;
        }

        if (isset($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $package->update($data);
        return $package->fresh();
    }

    public function delete(int $id): bool
    {
        $package = $this->findById($id);
        if (!$package) {
            return false;
        }
        return $package->delete();
    }
}
