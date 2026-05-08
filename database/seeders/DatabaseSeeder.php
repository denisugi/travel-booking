<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            AdminUserSeeder::class,
            SiteSettingSeeder::class,
            BankAccountSeeder::class,
            BlogCategorySeeder::class,
            TravelPackageSeeder::class,
            BlogPostSeeder::class,
        ]);
    }
}
