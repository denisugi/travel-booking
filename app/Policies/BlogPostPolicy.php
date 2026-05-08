<?php

namespace App\Policies;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BlogPostPolicy
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
    public function view(User $user, BlogPost $blogPost): bool
    {
        if ($blogPost->is_published && $blogPost->published_at !== null) {
            return true;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission('blog.view') && $blogPost->author_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasPermission('blog.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, BlogPost $blogPost): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission('blog.update') && $blogPost->author_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, BlogPost $blogPost): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission('blog.delete') && $blogPost->author_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, BlogPost $blogPost): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, BlogPost $blogPost): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can publish/unpublish posts.
     */
    public function publish(User $user, BlogPost $blogPost): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission('blog.publish') && $blogPost->author_id === $user->id;
    }

    /**
     * Determine whether the user can toggle featured status.
     */
    public function toggleFeatured(User $user, BlogPost $blogPost): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can manage categories.
     */
    public function manageCategories(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasPermission('blog.manage-categories');
    }

    /**
     * Determine whether the user can manage tags.
     */
    public function manageTags(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasPermission('blog.manage-tags');
    }

    /**
     * Determine whether the user can view statistics.
     */
    public function viewStats(User $user, BlogPost $blogPost): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasPermission('blog.view-stats') && $blogPost->author_id === $user->id;
    }
}
