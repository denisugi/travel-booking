<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BookingPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('booking.view') || $user->hasRole('admin');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Booking $booking): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission('booking.view') && $booking->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('booking.create') || $user->hasRole('admin');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Booking $booking): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission('booking.update') && $booking->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Booking $booking): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission('booking.delete') && $booking->user_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Booking $booking): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Booking $booking): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can cancel the booking.
     */
    public function cancel(User $user, Booking $booking): bool
    {
        if ($booking->status === Booking::STATUS_CANCELLED) {
            return false;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        return $booking->user_id === $user->id && 
               in_array($booking->status, [Booking::STATUS_PENDING, Booking::STATUS_CONFIRMED]);
    }

    /**
     * Determine whether the user can confirm the booking.
     */
    public function confirm(User $user, Booking $booking): bool
    {
        return $user->hasRole('admin') && $booking->status === Booking::STATUS_PENDING;
    }

    /**
     * Determine whether the user can complete the booking.
     */
    public function complete(User $user, Booking $booking): bool
    {
        return $user->hasRole('admin') && 
               $booking->status === Booking::STATUS_CONFIRMED && 
               $booking->isPaid();
    }

    /**
     * Determine whether the user can process payment for the booking.
     */
    public function processPayment(User $user, Booking $booking): bool
    {
        if ($booking->isPaid()) {
            return false;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        return $booking->user_id === $user->id;
    }
}
