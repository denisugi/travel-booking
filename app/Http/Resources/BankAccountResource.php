<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BankAccountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'bank_name' => $this->bank_name,
            'account_holder_name' => $this->account_holder_name,
            'account_number' => $this->account_number,
            'account_number_masked' => $this->masked_account_number,
            'account_type' => $this->account_type,
            'branch_name' => $this->branch_name,
            'branch_code' => $this->branch_code,
            'swift_code' => $this->swift_code,
            'is_primary' => $this->is_primary,
            'is_verified' => $this->is_verified,
            'verified_at' => $this->verified_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
