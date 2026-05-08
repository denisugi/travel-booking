<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasPermission('user.view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($user->id === $model->id) {
            return true;
        }

        return $user->hasPermission('user.view');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasPermission('user.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($user->id === $model->id) {
            return $user->hasPermission('user.update-own');
        }

        return $user->hasPermission('user.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        if ($user->hasRole('admin') && $model->id !== $user->id) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): bool
    {
        return $user->hasRole('admin') && $model->id !== $user->id;
    }

    /**
     * Determine whether the user can toggle active status.
     */
    public function toggleActive(User $user, User $model): bool
    {
        return $user->hasRole('admin') && $model->id !== $user->id;
    }

    /**
     * Determine whether the user can assign roles.
     */
    public function assignRole(User $user, User $model): bool
    {
        return $user->hasRole('admin') && $model->id !== $user->id;
    }

    /**
     * Determine whether the user can manage roles.
     */
    public function manageRoles(User $user): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can view permissions.
     */
    public function viewPermissions(User $user, User $model): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($user->id === $model->id) {
            return $user->hasPermission('user.view-own-permissions');
        }

        return false;
    }

    /**
     * Determine whether the user can impersonate another user.
     */
    public function impersonate(User $user, User $model): bool
    {
        return $user->hasRole('admin') && $model->id !== $user->id && !$model->hasRole('admin');
    }
}
