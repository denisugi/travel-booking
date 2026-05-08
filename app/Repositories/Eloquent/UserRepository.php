<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function findById(int $id): ?User
    {
        return User::find($id);
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function getAll(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = User::query();

        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        if (isset($filters['role'])) {
            $query->whereHas('roles', function ($q) use ($filters) {
                $q->where('slug', $filters['role']);
            });
        }

        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortDir = $filters['sort_dir'] ?? 'desc';
        $query->orderBy($sortBy, $sortDir);

        return $query->paginate($perPage);
    }

    public function create(array $data): User
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        return User::create($data);
    }

    public function update(int $id, array $data): ?User
    {
        $user = $this->findById($id);
        if (!$user) {
            return null;
        }

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);
        return $user->fresh();
    }

    public function delete(int $id): bool
    {
        $user = $this->findById($id);
        if (!$user) {
            return false;
        }
        return $user->delete();
    }

    public function getUserBookings(int $userId, array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $user = $this->findById($userId);
        if (!$user) {
            return new \Illuminate\Pagination\LengthAwarePaginator([], 0, $perPage);
        }

        return $user->bookings()
            ->with(['travelPackage', 'travelers'])
            ->when(isset($filters['status']), function ($query) use ($filters) {
                $query->where('status', $filters['status']);
            })
            ->when(isset($filters['payment_status']), function ($query) use ($filters) {
                $query->where('payment_status', $filters['payment_status']);
            })
            ->orderBy('booking_date', 'desc')
            ->paginate($perPage);
    }

    public function getUserWithRelations(int $id): ?User
    {
        return User::with(['roles.permissions', 'bookings' => function ($query) {
            $query->latest()->limit(5);
        }])->find($id);
    }
}
