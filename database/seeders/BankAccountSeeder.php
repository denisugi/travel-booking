<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BankAccountSeeder extends Seeder
{
    public function run(): void
    {
        // Get or create admin user for bank accounts
        $admin = DB::table('users')->where('email', 'superadmin@travelbooking.com')->first();
        if (!$admin) {
            $admin = DB::table('users')->first();
        }
        $adminId = $admin ? $admin->id : 1;

        $bankAccounts = [
            [
                'user_id' => $adminId,
                'bank_name' => 'Bank Central Asia (BCA)',
                'account_holder_name' => 'PT Travel Booking Indonesia',
                'account_number' => '1234567890',
                'branch_name' => 'Cabang Jakarta Selatan',
                'branch_code' => 'BCA-001',
                'account_type' => 'checking',
                'status' => 'active',
                'is_primary' => true,
                'swift_code' => 'CENAIDJA',
                'iban' => 'ID1234567890',
                'notes' => 'Rekening utama untuk penerimaan pembayaran',
            ],
            [
                'user_id' => $adminId,
                'bank_name' => 'Bank MandirI',
                'account_holder_name' => 'PT Travel Booking Indonesia',
                'account_number' => '9876543210',
                'branch_name' => 'Cabang Bandung',
                'branch_code' => 'BM-002',
                'account_type' => 'savings',
                'status' => 'active',
                'is_primary' => false,
                'swift_code' => 'BMRIIDJA',
                'iban' => 'ID9876543210',
                'notes' => 'Rekening tabungan bisnis',
            ],
        ];

        foreach ($bankAccounts as $account) {
            DB::table('bank_accounts')->updateOrInsert(
                ['account_number' => $account['account_number']],
                $account
            );
        }
    }
}
