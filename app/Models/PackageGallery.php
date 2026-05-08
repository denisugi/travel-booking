<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PackageGallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'travel_package_id',
        'image',
        'caption',
        'sort_order',
        'is_primary',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function travelPackage(): BelongsTo
    {
        return $this->belongsTo(TravelPackage::class);
    }
}
