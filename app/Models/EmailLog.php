<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'to_email',
        'from_email',
        'subject',
        'body',
        'template',
        'status',
        'sent_at',
        'opened_at',
        'clicked_at',
        'bounced_at',
        'failed_at',
        'error_message',
        'metadata',
    ];

    protected $casts = [
        'sent_at' => 'datetime',
        'opened_at' => 'datetime',
        'clicked_at' => 'datetime',
        'bounced_at' => 'datetime',
        'failed_at' => 'datetime',
        'metadata' => 'array',
    ];

    public const STATUS_SENT = 'sent';
    public const STATUS_DELIVERED = 'delivered';
    public const STATUS_OPENED = 'opened';
    public const STATUS_CLICKED = 'clicked';
    public const STATUS_BOUNCED = 'bounced';
    public const STATUS_FAILED = 'failed';

    public function markAsOpened(): void
    {
        $this->update([
            'status' => self::STATUS_OPENED,
            'opened_at' => now(),
        ]);
    }

    public function markAsClicked(): void
    {
        $this->update([
            'status' => self::STATUS_CLICKED,
            'clicked_at' => now(),
        ]);
    }

    public function markAsBounced(string $reason = null): void
    {
        $this->update([
            'status' => self::STATUS_BOUNCED,
            'bounced_at' => now(),
            'error_message' => $reason,
        ]);
    }

    public function markAsFailed(string $errorMessage): void
    {
        $this->update([
            'status' => self::STATUS_FAILED,
            'failed_at' => now(),
            'error_message' => $errorMessage,
        ]);
    }
}
