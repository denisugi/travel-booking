<?php

namespace App\Repositories\Contracts;

use App\Models\Payment;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface PaymentRepositoryInterface
{
    public function findById(int $id): ?Payment;
    
    public function findByTransactionId(string $transactionId): ?Payment;
    
    public function getAll(array $filters = [], int $perPage = 15): LengthAwarePaginator;
    
    public function getByBooking(int $bookingId): Collection;
    
    public function getByStatus(string $status, int $perPage = 15): LengthAwarePaginator;
    
    public function getByMethod(string $method, int $perPage = 15): LengthAwarePaginator;
    
    public function create(array $data): Payment;
    
    public function update(int $id, array $data): ?Payment;
    
    public function delete(int $id): bool;
    
    public function getPaymentsByDateRange(\Carbon\Carbon $startDate, \Carbon\Carbon $endDate): Collection;
    
    public function getTotalPaymentsByStatus(string $status, ?\Carbon\Carbon $startDate = null, ?\Carbon\Carbon $endDate = null): float;
}
