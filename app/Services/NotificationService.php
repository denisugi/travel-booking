<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Notification;

class NotificationService
{
    public function sendToUser(User $user, string $type, array $data): void
    {
        $notification = [
            'type' => $type,
            'data' => $data,
            'notifiable_type' => User::class,
            'notifiable_id' => $user->id,
        ];

        DatabaseNotification::create($notification);
    }

    public function sendToUsers(array $users, string $type, array $data): void
    {
        foreach ($users as $user) {
            $this->sendToUser($user, $type, $data);
        }
    }

    public function sendBulkNotification(array $users, string $type, array $data): void
    {
        $notifications = [];

        foreach ($users as $user) {
            $notifications[] = [
                'type' => $type,
                'data' => $data,
                'notifiable_type' => User::class,
                'notifiable_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DatabaseNotification::insert($notifications);
    }

    public function getUserNotifications(User $user, int $perPage = 20): LengthAwarePaginator
    {
        return $user->notifications()
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getUnreadNotifications(User $user): \Illuminate\Database\Eloquent\Collection
    {
        return $user->unreadNotifications()->get();
    }

    public function getUnreadCount(User $user): int
    {
        return $user->unreadNotifications()->count();
    }

    public function markAsRead(User $user, string $notificationId): void
    {
        $user->notifications()
            ->where('id', $notificationId)
            ->update(['read_at' => now()]);
    }

    public function markAllAsRead(User $user): void
    {
        $user->unreadNotifications->markAsRead();
    }

    public function deleteNotification(User $user, string $notificationId): bool
    {
        return $user->notifications()
            ->where('id', $notificationId)
            ->delete() > 0;
    }

    public function clearAllNotifications(User $user): int
    {
        return $user->notifications()->delete();
    }

    public function sendBookingConfirmation(User $user, array $bookingData): void
    {
        $this->sendToUser($user, 'booking_confirmation', [
            'title' => 'Booking Confirmed',
            'message' => 'Your booking #' . $bookingData['booking_number'] . ' has been confirmed.',
            'booking_id' => $bookingData['id'],
            'booking_number' => $bookingData['booking_number'],
        ]);
    }

    public function sendPaymentConfirmation(User $user, array $paymentData): void
    {
        $this->sendToUser($user, 'payment_confirmation', [
            'title' => 'Payment Confirmed',
            'message' => 'Your payment of ' . number_format($paymentData['amount'], 2) . ' has been received.',
            'payment_id' => $paymentData['id'],
            'booking_id' => $paymentData['booking_id'],
            'amount' => $paymentData['amount'],
        ]);
    }

    public function sendBookingCancellation(User $user, array $bookingData): void
    {
        $this->sendToUser($user, 'booking_cancellation', [
            'title' => 'Booking Cancelled',
            'message' => 'Your booking #' . $bookingData['booking_number'] . ' has been cancelled.',
            'booking_id' => $bookingData['id'],
            'booking_number' => $bookingData['booking_number'],
            'reason' => $bookingData['reason'] ?? null,
        ]);
    }

    public function sendTravelReminder(User $user, array $bookingData): void
    {
        $this->sendToUser($user, 'travel_reminder', [
            'title' => 'Travel Reminder',
            'message' => 'Your trip is coming up! Don\'t forget to check your itinerary for booking #' . $bookingData['booking_number'],
            'booking_id' => $bookingData['id'],
            'booking_number' => $bookingData['booking_number'],
            'travel_date' => $bookingData['travel_date'],
        ]);
    }
}
