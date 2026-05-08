<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'travel_package_id',
        'booking_number',
        'status',
        'booking_date',
        'travel_date',
        'return_date',
        'number_of_travelers',
        'subtotal',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'special_requests',
        'payment_status',
        'payment_method',
        'notes',
    ];

    protected $casts = [
        'booking_date' => 'date',
        'travel_date' => 'date',
        'return_date' => 'date',
        'subtotal' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];

    public const STATUS_PENDING = 'pending';
    public const STATUS_CONFIRMED = 'confirmed';
    public const STATUS_CANCELLED = 'cancelled';
    public const STATUS_COMPLETED = 'completed';

    public const PAYMENT_STATUS_PENDING = 'pending';
    public const PAYMENT_STATUS_PAID = 'paid';
    public const PAYMENT_STATUS_REFUNDED = 'refunded';
    public const PAYMENT_STATUS_FAILED = 'failed';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function travelPackage(): BelongsTo
    {
        return $this->belongsTo(TravelPackage::class);
    }

    public function travelers(): HasMany
    {
        return $this->hasMany(BookingTraveler::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function isPaid(): bool
    {
        return $this->payment_status === self::PAYMENT_STATUS_PAID;
    }

    public function isConfirmed(): bool
    {
        return $this->status === self::STATUS_CONFIRMED;
    }

    public static function generateBookingNumber(): string
    {
        return 'BK-' . strtoupper(uniqid()) . '-' . date('Ymd');
    }
}
