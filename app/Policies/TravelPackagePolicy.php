<?php

namespace App\Policies;

use App\Models\TravelPackage;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TravelPackagePolicy
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
    public function view(User $user, TravelPackage $travelPackage): bool
    {
        if ($travelPackage->is_active) {
            return true;
        }

        return $user->hasRole('admin') || $user->hasPermission('package.view');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasPermission('package.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TravelPackage $travelPackage): bool
    {
        return $user->hasRole('admin') || $user->hasPermission('package.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TravelPackage $travelPackage): bool
    {
        return $user->hasRole('admin') || $user->hasPermission('package.delete');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, TravelPackage $travelPackage): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, TravelPackage $travelPackage): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can toggle featured status.
     */
    public function toggleFeatured(User $user, TravelPackage $travelPackage): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can toggle active status.
     */
    public function toggleActive(User $user, TravelPackage $travelPackage): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can manage gallery images.
     */
    public function manageGallery(User $user, TravelPackage $travelPackage): bool
    {
        return $user->hasRole('admin') || $user->hasPermission('package.update');
    }

    /**
     * Determine whether the user can view unpublished packages.
     */
    public function viewUnpublished(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasPermission('package.view');
    }
}
