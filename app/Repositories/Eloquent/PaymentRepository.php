<?php

namespace App\Repositories\Eloquent;

use App\Models\Payment;
use App\Repositories\Contracts\PaymentRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class PaymentRepository implements PaymentRepositoryInterface
{
    public function findById(int $id): ?Payment
    {
        return Payment::with(['booking'])->find($id);
    }

    public function findByTransactionId(string $transactionId): ?Payment
    {
        return Payment::with(['booking'])
            ->where('transaction_id', $transactionId)
            ->first();
    }

    public function getAll(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Payment::with(['booking']);

        return $this->applyFilters($query, $filters)->paginate($perPage);
    }

    public function getByBooking(int $bookingId): Collection
    {
        return Payment::where('booking_id', $bookingId)
            ->orderBy('payment_date', 'desc')
            ->get();
    }

    public function getByStatus(string $status, int $perPage = 15): LengthAwarePaginator
    {
        return Payment::with(['booking'])
            ->where('payment_status', $status)
            ->orderBy('payment_date', 'desc')
            ->paginate($perPage);
    }

    public function getByMethod(string $method, int $perPage = 15): LengthAwarePaginator
    {
        return Payment::with(['booking'])
            ->where('payment_method', $method)
            ->orderBy('payment_date', 'desc')
            ->paginate($perPage);
    }

    protected function applyFilters($query, array $filters)
    {
        if (isset($filters['payment_status']) && $filters['payment_status']) {
            $query->where('payment_status', $filters['payment_status']);
        }

        if (isset($filters['payment_method']) && $filters['payment_method']) {
            $query->where('payment_method', $filters['payment_method']);
        }

        if (isset($filters['payment_date_from'])) {
            $query->where('payment_date', '>=', Carbon::parse($filters['payment_date_from']));
        }

        if (isset($filters['payment_date_to'])) {
            $query->where('payment_date', '<=', Carbon::parse($filters['payment_date_to']));
        }

        if (isset($filters['booking_id'])) {
            $query->where('booking_id', $filters['booking_id']);
        }

        if (isset($filters['min_amount'])) {
            $query->where('amount', '>=', $filters['min_amount']);
        }

        if (isset($filters['max_amount'])) {
            $query->where('amount', '<=', $filters['max_amount']);
        }

        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('transaction_id', 'like', "%{$search}%")
                  ->orWhereHas('booking', function ($bq) use ($search) {
                      $bq->where('booking_number', 'like', "%{$search}%");
                  });
            });
        }

        $sortBy = $filters['sort_by'] ?? 'payment_date';
        $sortDir = $filters['sort_dir'] ?? 'desc';
        $query->orderBy($sortBy, $sortDir);

        return $query;
    }

    public function create(array $data): Payment
    {
        if (!isset($data['transaction_id'])) {
            $data['transaction_id'] = 'TXN-' . strtoupper(uniqid()) . '-' . time();
        }

        return Payment::create($data);
    }

    public function update(int $id, array $data): ?Payment
    {
        $payment = $this->findById($id);
        if (!$payment) {
            return null;
        }

        $payment->update($data);
        return $payment->fresh();
    }

    public function delete(int $id): bool
    {
        $payment = $this->findById($id);
        if (!$payment) {
            return false;
        }
        return $payment->delete();
    }

    public function getPaymentsByDateRange(Carbon $startDate, Carbon $endDate): Collection
    {
        return Payment::with(['booking'])
            ->whereBetween('payment_date', [$startDate, $endDate])
            ->orderBy('payment_date', 'desc')
            ->get();
    }

    public function getTotalPaymentsByStatus(string $status, ?Carbon $startDate = null, ?Carbon $endDate = null): float
    {
        $query = Payment::where('payment_status', $status);

        if ($startDate) {
            $query->where('payment_date', '>=', $startDate);
        }

        if ($endDate) {
            $query->where('payment_date', '<=', $endDate);
        }

        return (float) $query->sum('amount');
    }
}
