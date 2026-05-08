<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'booking_id' => $this->booking_id,
            'amount' => $this->amount,
            'payment_method' => $this->payment_method,
            'payment_status' => $this->payment_status,
            'transaction_id' => $this->transaction_id,
            'payment_date' => $this->payment_date,
            'payment_proof' => $this->payment_proof,
            'notes' => $this->notes,
            'metadata' => $this->metadata,
            'is_completed' => $this->isCompleted(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'booking' => new BookingResource($this->whenLoaded('booking')),
        ];
    }
}
