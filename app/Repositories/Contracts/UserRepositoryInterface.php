<?php

namespace App\Repositories;

use App\DTOs\TravelerDTO;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface UserRepositoryInterface
{
    public function findById(int $id): ?User;
    
    public function findByEmail(string $email): ?User;
    
    public function getAll(array $filters = [], int $perPage = 15): LengthAwarePaginator;
    
    public function create(array $data): User;
    
    public function update(int $id, array $data): ?User;
    
    public function delete(int $id): bool;
    
    public function getUserBookings(int $userId, array $filters = [], int $perPage = 10): LengthAwarePaginator;
    
    public function getUserWithRelations(int $id): ?User;
}
