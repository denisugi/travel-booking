<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            // Users
            ['name' => 'users.view', 'slug' => 'users-view', 'group' => 'Users', 'description' => 'View users'],
            ['name' => 'users.create', 'slug' => 'users-create', 'group' => 'Users', 'description' => 'Create users'],
            ['name' => 'users.update', 'slug' => 'users-update', 'group' => 'Users', 'description' => 'Update users'],
            ['name' => 'users.delete', 'slug' => 'users-delete', 'group' => 'Users', 'description' => 'Delete users'],

            // Roles
            ['name' => 'roles.view', 'slug' => 'roles-view', 'group' => 'Roles', 'description' => 'View roles'],
            ['name' => 'roles.create', 'slug' => 'roles-create', 'group' => 'Roles', 'description' => 'Create roles'],
            ['name' => 'roles.update', 'slug' => 'roles-update', 'group' => 'Roles', 'description' => 'Update roles'],
            ['name' => 'roles.delete', 'slug' => 'roles-delete', 'group' => 'Roles', 'description' => 'Delete roles'],

            // Travel Packages
            ['name' => 'travel_packages.view', 'slug' => 'travel-packages-view', 'group' => 'Travel Packages', 'description' => 'View travel packages'],
            ['name' => 'travel_packages.create', 'slug' => 'travel-packages-create', 'group' => 'Travel Packages', 'description' => 'Create travel packages'],
            ['name' => 'travel_packages.update', 'slug' => 'travel-packages-update', 'group' => 'Travel Packages', 'description' => 'Update travel packages'],
            ['name' => 'travel_packages.delete', 'slug' => 'travel-packages-delete', 'group' => 'Travel Packages', 'description' => 'Delete travel packages'],

            // Bookings
            ['name' => 'bookings.view', 'slug' => 'bookings-view', 'group' => 'Bookings', 'description' => 'View bookings'],
            ['name' => 'bookings.create', 'slug' => 'bookings-create', 'group' => 'Bookings', 'description' => 'Create bookings'],
            ['name' => 'bookings.update', 'slug' => 'bookings-update', 'group' => 'Bookings', 'description' => 'Update bookings'],
            ['name' => 'bookings.delete', 'slug' => 'bookings-delete', 'group' => 'Bookings', 'description' => 'Delete bookings'],

            // Blog
            ['name' => 'blog.view', 'slug' => 'blog-view', 'group' => 'Blog', 'description' => 'View blog posts'],
            ['name' => 'blog.create', 'slug' => 'blog-create', 'group' => 'Blog', 'description' => 'Create blog posts'],
            ['name' => 'blog.update', 'slug' => 'blog-update', 'group' => 'Blog', 'description' => 'Update blog posts'],
            ['name' => 'blog.delete', 'slug' => 'blog-delete', 'group' => 'Blog', 'description' => 'Delete blog posts'],

            // Settings
            ['name' => 'settings.view', 'slug' => 'settings-view', 'group' => 'Settings', 'description' => 'View settings'],
            ['name' => 'settings.update', 'slug' => 'settings-update', 'group' => 'Settings', 'description' => 'Update settings'],

            // Bank Accounts
            ['name' => 'bank_accounts.view', 'slug' => 'bank-accounts-view', 'group' => 'Bank Accounts', 'description' => 'View bank accounts'],
            ['name' => 'bank_accounts.create', 'slug' => 'bank-accounts-create', 'group' => 'Bank Accounts', 'description' => 'Create bank accounts'],
            ['name' => 'bank_accounts.update', 'slug' => 'bank-accounts-update', 'group' => 'Bank Accounts', 'description' => 'Update bank accounts'],
            ['name' => 'bank_accounts.delete', 'slug' => 'bank-accounts-delete', 'group' => 'Bank Accounts', 'description' => 'Delete bank accounts'],
        ];

        foreach ($permissions as $permission) {
            DB::table('permissions')->updateOrInsert(
                ['name' => $permission['name']],
                $permission
            );
        }
    }
}
