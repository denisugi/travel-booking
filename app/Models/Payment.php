<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'amount',
        'payment_method',
        'payment_status',
        'transaction_id',
        'payment_date',
        'payment_proof',
        'notes',
        'metadata',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'payment_date' => 'datetime',
        'metadata' => 'array',
    ];

    public const STATUS_PENDING = 'pending';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_FAILED = 'failed';
    public const STATUS_REFUNDED = 'refunded';

    public const METHOD_BANK_TRANSFER = 'bank_transfer';
    public const METHOD_CREDIT_CARD = 'credit_card';
    public const METHOD_PAYPAL = 'paypal';
    public const METHOD_OTHER = 'other';

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function isCompleted(): bool
    {
        return $this->payment_status === self::STATUS_COMPLETED;
    }
}
