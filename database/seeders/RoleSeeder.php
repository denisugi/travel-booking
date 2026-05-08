<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'super_admin',
                'display_name' => 'Super Admin',
                'description' => 'Full system access with all permissions',
                'is_active' => true,
            ],
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Administrative access with most permissions',
                'is_active' => true,
            ],
            [
                'name' => 'editor',
                'display_name' => 'Editor',
                'description' => 'Can manage content, bookings and packages',
                'is_active' => true,
            ],
            [
                'name' => 'customer',
                'display_name' => 'Customer',
                'description' => 'Regular user with booking capabilities',
                'is_active' => true,
            ],
        ];

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(
                ['name' => $role['name']],
                $role
            );
        }

        // Assign all permissions to super_admin
        $superAdmin = DB::table('roles')->where('name', 'super_admin')->first();
        $permissions = DB::table('permissions')->pluck('id');

        foreach ($permissions as $permissionId) {
            DB::table('permission_role')->updateOrInsert(
                ['role_id' => $superAdmin->id, 'permission_id' => $permissionId],
                ['role_id' => $superAdmin->id, 'permission_id' => $permissionId]
            );
        }
    }
}
