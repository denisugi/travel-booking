<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'travel_package_id' => $this->travel_package_id,
            'booking_number' => $this->booking_number,
            'status' => $this->status,
            'booking_date' => $this->booking_date,
            'travel_date' => $this->travel_date,
            'return_date' => $this->return_date,
            'number_of_travelers' => $this->number_of_travelers,
            'subtotal' => $this->subtotal,
            'tax_amount' => $this->tax_amount,
            'discount_amount' => $this->discount_amount,
            'total_amount' => $this->total_amount,
            'special_requests' => $this->special_requests,
            'payment_status' => $this->payment_status,
            'payment_method' => $this->payment_method,
            'notes' => $this->notes,
            'is_paid' => $this->isPaid(),
            'is_confirmed' => $this->isConfirmed(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => new UserResource($this->whenLoaded('user')),
            'travel_package' => new TravelPackageResource($this->whenLoaded('travelPackage')),
            'travelers' => BookingTravelerResource::collection($this->whenLoaded('travelers')),
            'payments' => PaymentResource::collection($this->whenLoaded('payments')),
        ];
    }
}
