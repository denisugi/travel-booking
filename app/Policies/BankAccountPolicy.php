<?php

namespace App\Policies;

use App\Models\BankAccount;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BankAccountPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, BankAccount $bankAccount): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $bankAccount->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('bank-account.create') || $user->hasRole('admin');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, BankAccount $bankAccount): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $bankAccount->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, BankAccount $bankAccount): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $bankAccount->user_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, BankAccount $bankAccount): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, BankAccount $bankAccount): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can set bank account as primary.
     */
    public function setPrimary(User $user, BankAccount $bankAccount): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $bankAccount->user_id === $user->id;
    }

    /**
     * Determine whether the user can verify a bank account.
     */
    public function verify(User $user, BankAccount $bankAccount): bool
    {
        return $user->hasRole('admin') && !$bankAccount->is_verified;
    }

    /**
     * Determine whether the user can view other users' bank accounts.
     */
    public function viewAnyOther(User $user): bool
    {
        return $user->hasRole('admin');
    }
}
