<?php

namespace App\DTOs;

use App\Models\Payment;
use Carbon\Carbon;

class PaymentDTO
{
    public function __construct(
        public readonly ?int $id,
        public readonly int $bookingId,
        public readonly float $amount,
        public readonly string $paymentMethod,
        public readonly string $paymentStatus,
        public readonly ?string $transactionId,
        public readonly ?Carbon $paymentDate,
        public readonly ?string $paymentProof,
        public readonly ?string $notes,
        public readonly ?array $metadata = null,
    ) {}

    public static function fromModel(Payment $payment): self
    {
        return new self(
            id: $payment->id,
            bookingId: $payment->booking_id,
            amount: (float) $payment->amount,
            paymentMethod: $payment->payment_method,
            paymentStatus: $payment->payment_status,
            transactionId: $payment->transaction_id,
            paymentDate: $payment->payment_date,
            paymentProof: $payment->payment_proof,
            notes: $payment->notes,
            metadata: $payment->metadata,
        );
    }

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            bookingId: $data['booking_id'],
            amount: (float) $data['amount'],
            paymentMethod: $data['payment_method'],
            paymentStatus: $data['payment_status'] ?? Payment::STATUS_PENDING,
            transactionId: $data['transaction_id'] ?? null,
            paymentDate: isset($data['payment_date']) 
                ? ($data['payment_date'] instanceof Carbon ? $data['payment_date'] : Carbon::parse($data['payment_date']))
                : null,
            paymentProof: $data['payment_proof'] ?? null,
            notes: $data['notes'] ?? null,
            metadata: $data['metadata'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'booking_id' => $this->bookingId,
            'amount' => $this->amount,
            'payment_method' => $this->paymentMethod,
            'payment_status' => $this->paymentStatus,
            'transaction_id' => $this->transactionId,
            'payment_date' => $this->paymentDate?->toDateTimeString(),
            'payment_proof' => $this->paymentProof,
            'notes' => $this->notes,
            'metadata' => $this->metadata,
        ];
    }
}
