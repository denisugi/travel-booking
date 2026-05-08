<?php

namespace App\DTOs;

use App\Models\BookingTraveler;
use Carbon\Carbon;

class TravelerDTO
{
    public function __construct(
        public readonly ?int $id,
        public readonly int $bookingId,
        public readonly string $firstName,
        public readonly string $lastName,
        public readonly string $email,
        public readonly ?string $phone,
        public readonly ?Carbon $dateOfBirth,
        public readonly ?string $gender,
        public readonly ?string $passportNumber,
        public readonly ?Carbon $passportExpiry,
        public readonly ?string $nationality,
        public readonly bool $isPrimary,
        public readonly ?string $specialRequirements,
    ) {}

    public static function fromModel(BookingTraveler $traveler): self
    {
        return new self(
            id: $traveler->id,
            bookingId: $traveler->booking_id,
            firstName: $traveler->first_name,
            lastName: $traveler->last_name,
            email: $traveler->email,
            phone: $traveler->phone,
            dateOfBirth: $traveler->date_of_birth,
            gender: $traveler->gender,
            passportNumber: $traveler->passport_number,
            passportExpiry: $traveler->passport_expiry,
            nationality: $traveler->nationality,
            isPrimary: $traveler->is_primary,
            specialRequirements: $traveler->special_requirements,
        );
    }

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            bookingId: $data['booking_id'],
            firstName: $data['first_name'],
            lastName: $data['last_name'],
            email: $data['email'],
            phone: $data['phone'] ?? null,
            dateOfBirth: isset($data['date_of_birth']) 
                ? ($data['date_of_birth'] instanceof Carbon ? $data['date_of_birth'] : Carbon::parse($data['date_of_birth']))
                : null,
            gender: $data['gender'] ?? null,
            passportNumber: $data['passport_number'] ?? null,
            passportExpiry: isset($data['passport_expiry']) 
                ? ($data['passport_expiry'] instanceof Carbon ? $data['passport_expiry'] : Carbon::parse($data['passport_expiry']))
                : null,
            nationality: $data['nationality'] ?? null,
            isPrimary: $data['is_primary'] ?? false,
            specialRequirements: $data['special_requirements'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'booking_id' => $this->bookingId,
            'first_name' => $this->firstName,
            'last_name' => $this->lastName,
            'email' => $this->email,
            'phone' => $this->phone,
            'date_of_birth' => $this->dateOfBirth?->toDateString(),
            'gender' => $this->gender,
            'passport_number' => $this->passportNumber,
            'passport_expiry' => $this->passportExpiry?->toDateString(),
            'nationality' => $this->nationality,
            'is_primary' => $this->isPrimary,
            'special_requirements' => $this->specialRequirements,
        ];
    }

    public function getFullName(): string
    {
        return "{$this->firstName} {$this->lastName}";
    }
}
