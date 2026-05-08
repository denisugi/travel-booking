<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Super Admin
        $superAdmin = User::updateOrCreate(
            ['email' => 'superadmin@travelbooking.com'],
            [
                'name' => 'Super Administrator',
                'password' => Hash::make('password'),
                'phone' => '+1234567890',
                'status' => 'active',
            ]
        );
        $superAdminId = $superAdmin->id;

        // Admin User
        $admin = User::updateOrCreate(
            ['email' => 'admin@travelbooking.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'phone' => '+1234567891',
                'status' => 'active',
            ]
        );
        $adminId = $admin->id;

        // Editor User
        $editor = User::updateOrCreate(
            ['email' => 'editor@travelbooking.com'],
            [
                'name' => 'Content Editor',
                'password' => Hash::make('password'),
                'phone' => '+1234567892',
                'status' => 'active',
            ]
        );
        $editorId = $editor->id;

        // Regular Customer
        $customer = User::updateOrCreate(
            ['email' => 'customer@travelbooking.com'],
            [
                'name' => 'John Customer',
                'password' => Hash::make('password'),
                'phone' => '+1234567893',
                'status' => 'active',
            ]
        );
        $customerId = $customer->id;

        // Assign roles via direct DB insert (HasRoles trait not loaded)
        $superAdminRole = DB::table('roles')->where('name', 'super_admin')->first();
        $adminRole = DB::table('roles')->where('name', 'admin')->first();
        $editorRole = DB::table('roles')->where('name', 'editor')->first();
        $customerRole = DB::table('roles')->where('name', 'customer')->first();

        DB::table('role_user')->updateOrInsert(
            ['user_id' => $superAdminId, 'role_id' => $superAdminRole->id],
            ['user_id' => $superAdminId, 'role_id' => $superAdminRole->id]
        );
        DB::table('role_user')->updateOrInsert(
            ['user_id' => $adminId, 'role_id' => $adminRole->id],
            ['user_id' => $adminId, 'role_id' => $adminRole->id]
        );
        DB::table('role_user')->updateOrInsert(
            ['user_id' => $editorId, 'role_id' => $editorRole->id],
            ['user_id' => $editorId, 'role_id' => $editorRole->id]
        );
        DB::table('role_user')->updateOrInsert(
            ['user_id' => $customerId, 'role_id' => $customerRole->id],
            ['user_id' => $customerId, 'role_id' => $customerRole->id]
        );
    }
}
