<?php

namespace App\DTOs;

use App\Models\TravelPackage;
use Carbon\Carbon;

class PackageDTO
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $name,
        public readonly string $slug,
        public readonly string $description,
        public readonly ?string $shortDescription,
        public readonly string $destination,
        public readonly int $durationDays,
        public readonly int $durationNights,
        public readonly float $price,
        public readonly ?float $discountPrice,
        public readonly int $maxParticipants,
        public readonly ?Carbon $departureDate,
        public readonly ?Carbon $returnDate,
        public readonly bool $featured,
        public readonly bool $isActive,
        public readonly ?array $includes = null,
        public readonly ?array $excludes = null,
        public readonly ?array $itinerary = null,
        public readonly ?array $highlights = null,
        public readonly ?string $termsConditions = null,
        public readonly ?array $galleries = null,
    ) {}

    public static function fromModel(TravelPackage $package): self
    {
        return new self(
            id: $package->id,
            name: $package->name,
            slug: $package->slug,
            description: $package->description,
            shortDescription: $package->short_description,
            destination: $package->destination,
            durationDays: $package->duration_days,
            durationNights: $package->duration_nights,
            price: (float) $package->price,
            discountPrice: $package->discount_price ? (float) $package->discount_price : null,
            maxParticipants: $package->max_participants,
            departureDate: $package->departure_date,
            returnDate: $package->return_date,
            featured: $package->featured,
            isActive: $package->is_active,
            includes: $package->includes,
            excludes: $package->excludes,
            itinerary: $package->itinerary,
            highlights: $package->highlights,
            termsConditions: $package->terms_conditions,
            galleries: $package->relationLoaded('galleries') 
                ? $package->galleries->map(fn($g) => [
                    'id' => $g->id,
                    'image' => $g->image,
                    'caption' => $g->caption,
                ])->toArray()
                : null,
        );
    }

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            name: $data['name'],
            slug: $data['slug'] ?? \Str::slug($data['name']),
            description: $data['description'],
            shortDescription: $data['short_description'] ?? null,
            destination: $data['destination'],
            durationDays: $data['duration_days'],
            durationNights: $data['duration_nights'],
            price: (float) $data['price'],
            discountPrice: isset($data['discount_price']) ? (float) $data['discount_price'] : null,
            maxParticipants: $data['max_participants'],
            departureDate: isset($data['departure_date']) 
                ? ($data['departure_date'] instanceof Carbon ? $data['departure_date'] : Carbon::parse($data['departure_date']))
                : null,
            returnDate: isset($data['return_date']) 
                ? ($data['return_date'] instanceof Carbon ? $data['return_date'] : Carbon::parse($data['return_date']))
                : null,
            featured: $data['featured'] ?? false,
            isActive: $data['is_active'] ?? true,
            includes: $data['includes'] ?? null,
            excludes: $data['excludes'] ?? null,
            itinerary: $data['itinerary'] ?? null,
            highlights: $data['highlights'] ?? null,
            termsConditions: $data['terms_conditions'] ?? null,
            galleries: $data['galleries'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'short_description' => $this->shortDescription,
            'destination' => $this->destination,
            'duration_days' => $this->durationDays,
            'duration_nights' => $this->durationNights,
            'price' => $this->price,
            'discount_price' => $this->discountPrice,
            'max_participants' => $this->maxParticipants,
            'departure_date' => $this->departureDate?->toDateString(),
            'return_date' => $this->returnDate?->toDateString(),
            'featured' => $this->featured,
            'is_active' => $this->isActive,
            'includes' => $this->includes,
            'excludes' => $this->excludes,
            'itinerary' => $this->itinerary,
            'highlights' => $this->highlights,
            'terms_conditions' => $this->termsConditions,
        ];
    }

    public function getCurrentPrice(): float
    {
        return $this->discountPrice ?? $this->price;
    }

    public function isOnSale(): bool
    {
        return $this->discountPrice !== null && $this->discountPrice > 0;
    }

    public function getSavingsAmount(): float
    {
        if (!$this->isOnSale()) {
            return 0;
        }
        return $this->price - $this->discountPrice;
    }
}
