<?php

namespace App\Repositories\Eloquent;

use App\Models\Booking;
use App\Models\BookingTraveler;
use App\Repositories\Contracts\BookingRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class BookingRepository implements BookingRepositoryInterface
{
    public function findById(int $id): ?Booking
    {
        return Booking::with(['user', 'travelPackage', 'travelers', 'payments'])->find($id);
    }

    public function findByBookingNumber(string $bookingNumber): ?Booking
    {
        return Booking::with(['user', 'travelPackage', 'travelers', 'payments'])
            ->where('booking_number', $bookingNumber)
            ->first();
    }

    public function getAll(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Booking::with(['user', 'travelPackage']);

        return $this->applyFilters($query, $filters)->paginate($perPage);
    }

    public function getByUser(int $userId, array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = Booking::with(['travelPackage', 'travelers'])
            ->where('user_id', $userId);

        return $this->applyFilters($query, $filters)->paginate($perPage);
    }

    public function getByStatus(string $status, int $perPage = 15): LengthAwarePaginator
    {
        return Booking::with(['user', 'travelPackage'])
            ->where('status', $status)
            ->orderBy('booking_date', 'desc')
            ->paginate($perPage);
    }

    public function getByPaymentStatus(string $paymentStatus, int $perPage = 15): LengthAwarePaginator
    {
        return Booking::with(['user', 'travelPackage'])
            ->where('payment_status', $paymentStatus)
            ->orderBy('booking_date', 'desc')
            ->paginate($perPage);
    }

    protected function applyFilters($query, array $filters)
    {
        if (isset($filters['status']) && $filters['status']) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['payment_status']) && $filters['payment_status']) {
            $query->where('payment_status', $filters['payment_status']);
        }

        if (isset($filters['booking_date_from'])) {
            $query->where('booking_date', '>=', $filters['booking_date_from']);
        }

        if (isset($filters['booking_date_to'])) {
            $query->where('booking_date', '<=', $filters['booking_date_to']);
        }

        if (isset($filters['travel_date_from'])) {
            $query->where('travel_date', '>=', $filters['travel_date_from']);
        }

        if (isset($filters['travel_date_to'])) {
            $query->where('travel_date', '<=', $filters['travel_date_to']);
        }

        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('booking_number', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%")
                         ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortDir = $filters['sort_dir'] ?? 'desc';
        $query->orderBy($sortBy, $sortDir);

        return $query;
    }

    public function create(array $data): Booking
    {
        if (!isset($data['booking_number'])) {
            $data['booking_number'] = $this->generateBookingNumber();
        }

        if (!isset($data['booking_date'])) {
            $data['booking_date'] = Carbon::now();
        }

        return Booking::create($data);
    }

    public function update(int $id, array $data): ?Booking
    {
        $booking = $this->findById($id);
        if (!$booking) {
            return null;
        }

        $booking->update($data);
        return $booking->fresh();
    }

    public function delete(int $id): bool
    {
        $booking = $this->findById($id);
        if (!$booking) {
            return false;
        }
        return $booking->delete();
    }

    public function generateBookingNumber(): string
    {
        $prefix = 'BK';
        $date = date('Ymd');
        $uniquePart = strtoupper(substr(uniqid(), -6));
        $randomNum = mt_rand(100, 999);
        
        $bookingNumber = "{$prefix}-{$date}-{$uniquePart}-{$randomNum}";
        
        while (Booking::where('booking_number', $bookingNumber)->exists()) {
            $uniquePart = strtoupper(substr(uniqid(), -6));
            $randomNum = mt_rand(100, 999);
            $bookingNumber = "{$prefix}-{$date}-{$uniquePart}-{$randomNum}";
        }
        
        return $bookingNumber;
    }

    public function addTraveler(int $bookingId, array $travelerData): BookingTraveler
    {
        $travelerData['booking_id'] = $bookingId;
        return BookingTraveler::create($travelerData);
    }

    public function getBookingWithRelations(int $id): ?Booking
    {
        return Booking::with([
            'user',
            'travelPackage.galleries',
            'travelers',
            'payments',
        ])->find($id);
    }

    public function getUpcomingBookings(int $userId, int $perPage = 5): LengthAwarePaginator
    {
        return Booking::with(['travelPackage'])
            ->where('user_id', $userId)
            ->where('travel_date', '>=', Carbon::now())
            ->whereNotIn('status', [Booking::STATUS_CANCELLED])
            ->orderBy('travel_date', 'asc')
            ->paginate($perPage);
    }

    public function getPastBookings(int $userId, int $perPage = 5): LengthAwarePaginator
    {
        return Booking::with(['travelPackage'])
            ->where('user_id', $userId)
            ->where(function ($query) {
                $query->where('travel_date', '<', Carbon::now())
                      ->orWhere('status', Booking::STATUS_COMPLETED);
            })
            ->orderBy('travel_date', 'desc')
            ->paginate($perPage);
    }
}
