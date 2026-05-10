<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BankAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bank_name',
        'account_holder_name',
        'account_number',
        'status',
        'account_type',
        'branch_name',
        'branch_code',
        'swift_code',
        'iban',
        'is_primary',
        'notes',
        'is_verified',
        'verified_at',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
    ];

    public const TYPE_SAVINGS = 'savings';
    public const TYPE_CHECKING = 'checking';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getMaskedAccountNumberAttribute(): string
    {
        $length = strlen($this->account_number);
        if ($length <= 4) {
            return str_repeat('*', $length);
        }
        return str_repeat('*', $length - 4) . substr($this->account_number, -4);
    }
}
