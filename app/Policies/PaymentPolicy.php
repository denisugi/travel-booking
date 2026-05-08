<?php

namespace App\Policies;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PaymentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('payment.view') || $user->hasRole('admin');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Payment $payment): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission('payment.view') && $payment->booking->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('payment.create') || $user->hasRole('admin');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Payment $payment): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission('payment.update') && $payment->booking->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Payment $payment): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Payment $payment): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Payment $payment): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can approve a payment.
     */
    public function approve(User $user, Payment $payment): bool
    {
        return $user->hasRole('admin') && $payment->payment_status === Payment::STATUS_PENDING;
    }

    /**
     * Determine whether the user can reject a payment.
     */
    public function reject(User $user, Payment $payment): bool
    {
        return $user->hasRole('admin') && $payment->payment_status === Payment::STATUS_PENDING;
    }

    /**
     * Determine whether the user can refund a payment.
     */
    public function refund(User $user, Payment $payment): bool
    {
        return $user->hasRole('admin') && $payment->payment_status === Payment::STATUS_COMPLETED;
    }

    /**
     * Determine whether the user can upload payment proof.
     */
    public function uploadProof(User $user, Payment $payment): bool
    {
        if ($payment->payment_status !== Payment::STATUS_PENDING) {
            return false;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        return $payment->booking->user_id === $user->id;
    }

    /**
     * Determine whether the user can verify payment.
     */
    public function verify(User $user, Payment $payment): bool
    {
        return $user->hasRole('admin') && $payment->payment_status === Payment::STATUS_PENDING;
    }
}
