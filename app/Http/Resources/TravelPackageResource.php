<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TravelPackageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'short_description' => $this->short_description,
            'destination' => $this->destination,
            'duration' => $this->duration,
            'duration_days' => $this->duration_days,
            'duration_nights' => $this->duration_nights,
            'price' => (float) $this->price,
            'discount_price' => $this->discount_price ? (float) $this->discount_price : null,
            'is_on_sale' => $this->is_on_sale,
            'savings_amount' => (float) $this->savings_amount,
            'max_participants' => $this->max_participants,
            'min_participants' => $this->min_participants,
            'featured_image' => $this->featured_image,
            'is_featured' => $this->is_featured,
            'status' => $this->status,
            'is_flash_sale' => $this->is_flash_sale,
            'flash_sale_end' => $this->flash_sale_end?->toIso8601String(),
            'includes' => $this->includes,
            'excludes' => $this->excludes,
            'itinerary' => $this->itinerary,
            'highlights' => $this->highlights,
            'gallery_images' => $this->gallery_images,
            'difficulty' => $this->difficulty,
            'published_at' => $this->published_at?->toIso8601String(),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
            'galleries' => PackageGalleryResource::collection($this->whenLoaded('galleries')),
        ];
    }
}
