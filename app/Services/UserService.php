<?php

namespace App\Services;

use App\Models\User;
use App\Models\Role;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserService
{
    public function getAllUsers(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = User::with(['roles']);

        if (!empty($filters['role'])) {
            $query->whereHas('roles', function ($q) use ($filters) {
                $q->where('slug', $filters['role']);
            });
        }

        if (!empty($filters['status'])) {
            $query->where('is_active', $filters['status'] === 'active');
        }

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', '%' . $filters['search'] . '%')
                    ->orWhere('email', 'like', '%' . $filters['search'] . '%');
            });
        }

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function getUserById(int $id): ?User
    {
        return User::with(['roles', 'permissions'])->find($id);
    }

    public function getUserByEmail(string $email): ?User
    {
        return User::with(['roles'])->where('email', $email)->first();
    }

    public function createUser(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $userData = [
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'phone' => $data['phone'] ?? null,
                'avatar' => $data['avatar'] ?? null,
                'is_active' => $data['is_active'] ?? true,
            ];

            $user = User::create($userData);

            if (!empty($data['roles'])) {
                $user->roles()->attach($data['roles']);
            }

            return $user->load('roles');
        });
    }

    public function updateUser(User $user, array $data): User
    {
        return DB::transaction(function () use ($user, $data) {
            $updateData = [
                'name' => $data['name'] ?? $user->name,
                'email' => $data['email'] ?? $user->email,
                'phone' => $data['phone'] ?? $user->phone,
                'avatar' => $data['avatar'] ?? $user->avatar,
                'is_active' => $data['is_active'] ?? $user->is_active,
            ];

            if (!empty($data['password'])) {
                $updateData['password'] = Hash::make($data['password']);
            }

            $user->update($updateData);

            if (isset($data['roles'])) {
                $user->roles()->sync($data['roles']);
            }

            return $user->fresh()->load('roles');
        });
    }

    public function deleteUser(User $user): bool
    {
        if ($user->avatar) {
            Storage::delete($user->avatar);
        }

        $user->roles()->detach();

        return $user->delete();
    }

    public function activateUser(User $user): User
    {
        $user->update(['is_active' => true]);
        return $user->fresh();
    }

    public function deactivateUser(User $user): User
    {
        $user->update(['is_active' => false]);
        return $user->fresh();
    }

    public function assignRole(User $user, string $roleSlug): User
    {
        $role = Role::where('slug', $roleSlug)->firstOrFail();
        $user->roles()->syncWithoutDetaching($role->id);
        return $user->fresh()->load('roles');
    }

    public function removeRole(User $user, string $roleSlug): User
    {
        $role = Role::where('slug', $roleSlug)->first();
        if ($role) {
            $user->roles()->detach($role->id);
        }
        return $user->fresh()->load('roles');
    }

    public function updateAvatar(User $user, $file): User
    {
        if ($user->avatar) {
            Storage::delete($user->avatar);
        }

        $path = $file->store('avatars', 'public');
        $user->update(['avatar' => $path]);

        return $user->fresh();
    }

    public function getUsersByRole(string $roleSlug): \Illuminate\Database\Eloquent\Collection
    {
        return User::whereHas('roles', function ($q) use ($roleSlug) {
            $q->where('slug', $roleSlug);
        })->get();
    }

    public function getActiveUsers(int $perPage = 15): LengthAwarePaginator
    {
        return User::where('is_active', true)
            ->with(['roles'])
            ->paginate($perPage);
    }
}
