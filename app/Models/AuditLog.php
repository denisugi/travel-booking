<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'action',
        'entity_type',
        'entity_id',
        'old_values',
        'new_values',
        'ip_address',
        'user_agent',
        'metadata',
    ];

    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
        'metadata' => 'array',
    ];

    public const ACTION_CREATE = 'create';
    public const ACTION_UPDATE = 'update';
    public const ACTION_DELETE = 'delete';
    public const ACTION_RESTORE = 'restore';
    public const ACTION_LOGIN = 'login';
    public const ACTION_LOGOUT = 'logout';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeForEntity($query, string $entityType, $entityId = null)
    {
        $query->where('entity_type', $entityType);
        if ($entityId !== null) {
            $query->where('entity_id', $entityId);
        }
        return $query;
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByAction($query, string $action)
    {
        return $query->where('action', $action);
    }

    public function scopeRecent($query, int $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    public static function logAction(
        string $action,
        string $entityType,
        $entityId = null,
        ?array $oldValues = null,
        ?array $newValues = null,
        ?array $metadata = null
    ): self {
        return static::create([
            'user_id' => auth()->id(),
            'action' => $action,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'metadata' => $metadata,
        ]);
    }
}
