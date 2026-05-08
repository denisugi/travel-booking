<?php

namespace App\Repositories\Contracts;

use App\Models\Booking;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface BookingRepositoryInterface
{
    public function findById(int $id): ?Booking;
    
    public function findByBookingNumber(string $bookingNumber): ?Booking;
    
    public function getAll(array $filters = [], int $perPage = 15): LengthAwarePaginator;
    
    public function getByUser(int $userId, array $filters = [], int $perPage = 10): LengthAwarePaginator;
    
    public function getByStatus(string $status, int $perPage = 15): LengthAwarePaginator;
    
    public function getByPaymentStatus(string $paymentStatus, int $perPage = 15): LengthAwarePaginator;
    
    public function create(array $data): Booking;
    
    public function update(int $id, array $data): ?Booking;
    
    public function delete(int $id): bool;
    
    public function generateBookingNumber(): string;
    
    public function addTraveler(int $bookingId, array $travelerData): \App\Models\BookingTraveler;
    
    public function getBookingWithRelations(int $id): ?Booking;
    
    public function getUpcomingBookings(int $userId, int $perPage = 5): LengthAwarePaginator;
    
    public function getPastBookings(int $userId, int $perPage = 5): LengthAwarePaginator;
}
