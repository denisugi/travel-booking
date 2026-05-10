<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ============================================
        // BOOKINGS — remove wrong columns, add missing
        // ============================================
        Schema::table('bookings', function (Blueprint $table) {
            // Remove model-only columns that don't exist in DB
            if (Schema::hasColumn('bookings', 'booking_date')) {
                $table->dropColumn('booking_date');
            }
        });

        // ============================================
        // BOOKING_TRAVELERS — remove wrong columns
        // ============================================
        Schema::table('booking_travelers', function (Blueprint $table) {
            if (Schema::hasColumn('booking_travelers', 'passport_expiry')) {
                $table->dropColumn('passport_expiry');
            }
            if (Schema::hasColumn('booking_travelers', 'special_requirements')) {
                $table->dropColumn('special_requirements');
            }
        });

        // ============================================
        // PAYMENTS — rename columns to match models
        // ============================================
        Schema::table('payments', function (Blueprint $table) {
            // Rename model columns to actual DB columns
            // payment_method -> method (already correct in DB)
            // payment_status -> status (already correct in DB)
            // payment_date -> paid_at (already correct in DB)
            // Add missing columns
            if (!Schema::hasColumn('payments', 'metadata')) {
                $table->json('metadata')->nullable()->after('gateway_response');
            }
        });

        // ============================================
        // USERS — add missing columns
        // ============================================
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('avatar');
            }
            if (!Schema::hasColumn('users', 'status')) {
                $table->enum('status', ['active', 'inactive', 'suspended'])->default('active')->after('is_active');
            }
        });
    }

    public function down(): void
    {
        // Restore booking_date if rolled back
        if (!Schema::hasColumn('bookings', 'booking_date')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->date('booking_date')->nullable()->after('status');
            });
        }

        Schema::table('booking_travelers', function (Blueprint $table) {
            if (!Schema::hasColumn('booking_travelers', 'passport_expiry')) {
                $table->date('passport_expiry')->nullable();
            }
            if (!Schema::hasColumn('booking_travelers', 'special_requirements')) {
                $table->text('special_requirements')->nullable();
            }
        });

        Schema::table('payments', function (Blueprint $table) {
            if (Schema::hasColumn('payments', 'metadata')) {
                $table->dropColumn('metadata');
            }
        });

        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'is_active')) {
                $table->dropColumn('is_active');
            }
            if (Schema::hasColumn('users', 'status')) {
                $table->dropColumn('status');
            }
        });
    }
};
