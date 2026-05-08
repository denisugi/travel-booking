<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\TravelPackage;
use App\Models\User;
use App\Events\BookingCreated;
use App\Events\BookingCancelled;
use App\Events\BookingCompleted;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;

class BookingService
{
    public function getAllBookings(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Booking::with(['user', 'travelPackage', 'travelers']);

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['payment_status'])) {
            $query->where('payment_status', $filters['payment_status']);
        }

        if (!empty($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        if (!empty($filters['date_from'])) {
            $query->where('booking_date', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->where('booking_date', '<=', $filters['date_to']);
        }

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function getBookingById(int $id): ?Booking
    {
        return Booking::with(['user', 'travelPackage', 'travelers', 'payments'])->find($id);
    }

    public function getBookingByNumber(string $bookingNumber): ?Booking
    {
        return Booking::with(['user', 'travelPackage', 'travelers', 'payments'])
            ->where('booking_number', $bookingNumber)
            ->first();
    }

    public function createBooking(array $data): Booking
    {
        return DB::transaction(function () use ($data) {
            $travelPackage = TravelPackage::findOrFail($data['travel_package_id']);

            $bookingData = [
                'user_id' => $data['user_id'],
                'travel_package_id' => $data['travel_package_id'],
                'booking_number' => Booking::generateBookingNumber(),
                'status' => Booking::STATUS_PENDING,
                'booking_date' => now(),
                'travel_date' => $data['travel_date'],
                'return_date' => $data['return_date'],
                'number_of_travelers' => $data['number_of_travelers'],
                'subtotal' => $travelPackage->price * $data['number_of_travelers'],
                'tax_amount' => ($travelPackage->price * $data['number_of_travelers']) * 0.1,
                'discount_amount' => 0,
                'total_amount' => ($travelPackage->price * $data['number_of_travelers']) * 1.1,
                'payment_status' => Booking::PAYMENT_STATUS_PENDING,
                'special_requests' => $data['special_requests'] ?? null,
                'notes' => $data['notes'] ?? null,
            ];

            $booking = Booking::create($bookingData);

            if (!empty($data['travelers'])) {
                foreach ($data['travelers'] as $traveler) {
                    $booking->travelers()->create($traveler);
                }
            }

            Event::dispatch(new BookingCreated($booking));

            return $booking->load(['user', 'travelPackage', 'travelers']);
        });
    }

    public function confirmBooking(Booking $booking): Booking
    {
        $booking->update([
            'status' => Booking::STATUS_CONFIRMED,
        ]);

        Event::dispatch(new BookingCompleted($booking));

        return $booking->fresh();
    }

    public function cancelBooking(Booking $booking, string $reason = null): Booking
    {
        $booking->update([
            'status' => Booking::STATUS_CANCELLED,
            'notes' => $booking->notes . "\nCancellation reason: " . ($reason ?? 'No reason provided'),
        ]);

        Event::dispatch(new BookingCancelled($booking));

        return $booking->fresh();
    }

    public function completeBooking(Booking $booking): Booking
    {
        $booking->update([
            'status' => Booking::STATUS_COMPLETED,
        ]);

        Event::dispatch(new BookingCompleted($booking));

        return $booking->fresh();
    }

    public function updatePaymentStatus(Booking $booking, string $paymentStatus): Booking
    {
        $booking->update([
            'payment_status' => $paymentStatus,
        ]);

        return $booking->fresh();
    }

    public function getUserBookings(User $user, int $perPage = 10): LengthAwarePaginator
    {
        return $booking = Booking::with(['travelPackage', 'travelers'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function calculateBookingTotal(Booking $booking): array
    {
        $subtotal = $booking->subtotal;
        $taxAmount = $booking->tax_amount;
        $discountAmount = $booking->discount_amount;
        $totalAmount = $subtotal + $taxAmount - $discountAmount;

        return [
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'discount_amount' => $discountAmount,
            'total_amount' => $totalAmount,
        ];
    }
}
