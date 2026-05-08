<?php

namespace App\DTOs;

use App\Models\Booking;
use Carbon\Carbon;

class BookingDTO
{
    public function __construct(
        public readonly ?int $id,
        public readonly int $userId,
        public readonly int $travelPackageId,
        public readonly string $bookingNumber,
        public readonly string $status,
        public readonly Carbon $bookingDate,
        public readonly Carbon $travelDate,
        public readonly Carbon $returnDate,
        public readonly int $numberOfTravelers,
        public readonly float $subtotal,
        public readonly float $taxAmount,
        public readonly float $discountAmount,
        public readonly float $totalAmount,
        public readonly ?string $specialRequests,
        public readonly string $paymentStatus,
        public readonly ?string $paymentMethod,
        public readonly ?string $notes,
        public readonly ?array $travelers = null,
    ) {}

    public static function fromModel(Booking $booking): self
    {
        return new self(
            id: $booking->id,
            userId: $booking->user_id,
            travelPackageId: $booking->travel_package_id,
            bookingNumber: $booking->booking_number,
            status: $booking->status,
            bookingDate: $booking->booking_date,
            travelDate: $booking->travel_date,
            returnDate: $booking->return_date,
            numberOfTravelers: $booking->number_of_travelers,
            subtotal: (float) $booking->subtotal,
            taxAmount: (float) $booking->tax_amount,
            discountAmount: (float) $booking->discount_amount,
            totalAmount: (float) $booking->total_amount,
            specialRequests: $booking->special_requests,
            paymentStatus: $booking->payment_status,
            paymentMethod: $booking->payment_method,
            notes: $booking->notes,
            travelers: $booking->relationLoaded('travelers') 
                ? $booking->travelers->map(fn($t) => TravelerDTO::fromModel($t))->toArray()
                : null,
        );
    }

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            userId: $data['user_id'],
            travelPackageId: $data['travel_package_id'],
            bookingNumber: $data['booking_number'] ?? '',
            status: $data['status'] ?? Booking::STATUS_PENDING,
            bookingDate: $data['booking_date'] instanceof Carbon 
                ? $data['booking_date'] 
                : Carbon::parse($data['booking_date']),
            travelDate: $data['travel_date'] instanceof Carbon 
                ? $data['travel_date'] 
                : Carbon::parse($data['travel_date']),
            returnDate: $data['return_date'] instanceof Carbon 
                ? $data['return_date'] 
                : Carbon::parse($data['return_date']),
            numberOfTravelers: $data['number_of_travelers'],
            subtotal: (float) ($data['subtotal'] ?? 0),
            taxAmount: (float) ($data['tax_amount'] ?? 0),
            discountAmount: (float) ($data['discount_amount'] ?? 0),
            totalAmount: (float) ($data['total_amount'] ?? 0),
            specialRequests: $data['special_requests'] ?? null,
            paymentStatus: $data['payment_status'] ?? Booking::PAYMENT_STATUS_PENDING,
            paymentMethod: $data['payment_method'] ?? null,
            notes: $data['notes'] ?? null,
            travelers: $data['travelers'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->userId,
            'travel_package_id' => $this->travelPackageId,
            'booking_number' => $this->bookingNumber,
            'status' => $this->status,
            'booking_date' => $this->bookingDate->toDateString(),
            'travel_date' => $this->travelDate->toDateString(),
            'return_date' => $this->returnDate->toDateString(),
            'number_of_travelers' => $this->numberOfTravelers,
            'subtotal' => $this->subtotal,
            'tax_amount' => $this->taxAmount,
            'discount_amount' => $this->discountAmount,
            'total_amount' => $this->totalAmount,
            'special_requests' => $this->specialRequests,
            'payment_status' => $this->paymentStatus,
            'payment_method' => $this->paymentMethod,
            'notes' => $this->notes,
        ];
    }
}
