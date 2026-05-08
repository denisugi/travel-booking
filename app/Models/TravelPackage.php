<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class TravelPackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'short_description',
        'destination',
        'duration_days',
        'duration_nights',
        'price',
        'discount_price',
        'max_participants',
        'min_participants',
        'featured_image',
        'is_featured',
        'status',
        'is_flash_sale',
        'flash_sale_end',
        'includes',
        'excludes',
        'itinerary',
        'highlights',
        'gallery_images',
        'difficulty',
        'published_at',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_flash_sale' => 'boolean',
        'flash_sale_end' => 'datetime',
        'published_at' => 'datetime',
        'includes' => 'array',
        'excludes' => 'array',
        'itinerary' => 'array',
        'highlights' => 'array',
        'gallery_images' => 'array',
    ];

    protected $appends = ['is_on_sale', 'savings_amount', 'duration'];

    public function galleries(): HasMany
    {
        return $this->hasMany(PackageGallery::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    protected function isOnSale(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->discount_price !== null && $this->discount_price > 0,
        );
    }

    protected function savingsAmount(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->is_on_sale ? (float) $this->price - (float) $this->discount_price : 0,
        );
    }

    protected function duration(): Attribute
    {
        return Attribute::make(
            get: fn () => "{$this->duration_days} Days / {$this->duration_nights} Nights",
        );
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true)->where('status', 'published');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
