<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingTravelerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'booking_id' => $this->booking_id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'id_type' => $this->id_type,
            'id_number' => $this->id_number,
            'date_of_birth' => $this->date_of_birth,
            'nationality' => $this->nationality,
            'created_at' => $this->created_at,
        ];
    }
}
