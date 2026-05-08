<?php

namespace App\Services;

use App\Models\TravelPackage;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TravelPackageService
{
    public function getAllPackages(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = TravelPackage::with(['galleries']);

        if (!empty($filters['destination'])) {
            $query->where('destination', 'like', '%' . $filters['destination'] . '%');
        }

        if (!empty($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }

        if (!empty($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        if (!empty($filters['duration'])) {
            $query->where('duration_days', $filters['duration']);
        }

        if (!empty($filters['featured'])) {
            $query->featured();
        }

        if (!empty($filters['active'])) {
            $query->active();
        }

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function getPackageById(int $id): ?TravelPackage
    {
        return TravelPackage::with(['galleries', 'bookings'])->find($id);
    }

    public function getPackageBySlug(string $slug): ?TravelPackage
    {
        return TravelPackage::with(['galleries'])
            ->where('slug', $slug)
            ->first();
    }

    public function createPackage(array $data): TravelPackage
    {
        return DB::transaction(function () use ($data) {
            $packageData = [
                'name' => $data['name'],
                'slug' => \Illuminate\Support\Str::slug($data['name']),
                'description' => $data['description'],
                'short_description' => $data['short_description'] ?? null,
                'destination' => $data['destination'],
                'duration_days' => $data['duration_days'],
                'duration_nights' => $data['duration_nights'] ?? $data['duration_days'] - 1,
                'price' => $data['price'],
                'discount_price' => $data['discount_price'] ?? null,
                'max_participants' => $data['max_participants'],
                'departure_date' => $data['departure_date'] ?? null,
                'return_date' => $data['return_date'] ?? null,
                'featured' => $data['featured'] ?? false,
                'is_active' => $data['is_active'] ?? true,
                'includes' => $data['includes'] ?? [],
                'excludes' => $data['excludes'] ?? [],
                'itinerary' => $data['itinerary'] ?? [],
                'highlights' => $data['highlights'] ?? [],
                'terms_conditions' => $data['terms_conditions'] ?? null,
            ];

            return TravelPackage::create($packageData);
        });
    }

    public function updatePackage(TravelPackage $package, array $data): TravelPackage
    {
        return DB::transaction(function () use ($package, $data) {
            $updateData = [
                'name' => $data['name'] ?? $package->name,
                'slug' => isset($data['name']) ? \Illuminate\Support\Str::slug($data['name']) : $package->slug,
                'description' => $data['description'] ?? $package->description,
                'short_description' => $data['short_description'] ?? $package->short_description,
                'destination' => $data['destination'] ?? $package->destination,
                'duration_days' => $data['duration_days'] ?? $package->duration_days,
                'duration_nights' => $data['duration_nights'] ?? $package->duration_nights,
                'price' => $data['price'] ?? $package->price,
                'discount_price' => $data['discount_price'] ?? $package->discount_price,
                'max_participants' => $data['max_participants'] ?? $package->max_participants,
                'departure_date' => $data['departure_date'] ?? $package->departure_date,
                'return_date' => $data['return_date'] ?? $package->return_date,
                'featured' => $data['featured'] ?? $package->featured,
                'is_active' => $data['is_active'] ?? $package->is_active,
                'includes' => $data['includes'] ?? $package->includes,
                'excludes' => $data['excludes'] ?? $package->excludes,
                'itinerary' => $data['itinerary'] ?? $package->itinerary,
                'highlights' => $data['highlights'] ?? $package->highlights,
                'terms_conditions' => $data['terms_conditions'] ?? $package->terms_conditions,
            ];

            $package->update($updateData);

            return $package->fresh();
        });
    }

    public function deletePackage(TravelPackage $package): bool
    {
        foreach ($package->galleries as $gallery) {
            if ($gallery->image) {
                Storage::delete($gallery->image);
            }
        }

        return $package->delete();
    }

    public function getFeaturedPackages(int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return TravelPackage::featured()
            ->with(['galleries'])
            ->limit($limit)
            ->get();
    }

    public function getActivePackages(int $perPage = 15): LengthAwarePaginator
    {
        return TravelPackage::active()
            ->with(['galleries'])
            ->paginate($perPage);
    }

    public function getRelatedPackages(TravelPackage $package, int $limit = 4): \Illuminate\Database\Eloquent\Collection
    {
        return TravelPackage::active()
            ->where('id', '!=', $package->id)
            ->where('destination', $package->destination)
            ->with(['galleries'])
            ->limit($limit)
            ->get();
    }

    public function checkAvailability(TravelPackage $package, int $numberOfTravelers): bool
    {
        $bookedCount = $package->bookings()
            ->whereIn('status', [Booking::STATUS_CONFIRMED, Booking::STATUS_PENDING])
            ->sum('number_of_travelers');

        return ($bookedCount + $numberOfTravelers) <= $package->max_participants;
    }
}
