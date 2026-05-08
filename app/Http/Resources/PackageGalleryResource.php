<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PackageGalleryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'travel_package_id' => $this->travel_package_id,
            'image' => $this->image,
            'caption' => $this->caption,
            'is_primary' => $this->is_primary,
            'created_at' => $this->created_at,
        ];
    }
}
