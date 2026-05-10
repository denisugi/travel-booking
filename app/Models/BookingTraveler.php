<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingTraveler extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'date_of_birth',
        'gender',
        'passport_number',
        'nationality',
        'is_primary',
        ];

    protected $casts = [
        'date_of_birth' => 'date',
        'passport_expiry' => 'date',
        'is_primary' => 'boolean',
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
