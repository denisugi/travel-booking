<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_number')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('travel_package_id')->constrained()->onDelete('cascade');
            $table->date('travel_date');
            $table->integer('number_of_travelers');
            $table->decimal('subtotal', 12, 2);
            $table->decimal('tax_amount', 12, 2)->default(0);
            $table->decimal('discount_amount', 12, 2)->default(0);
            $table->decimal('total_amount', 12, 2);
            $table->enum('status', [
                'pending',
                'confirmed',
                'cancelled',
                'completed',
                'refunded'
            ])->default('pending');
            $table->enum('payment_status', [
                'unpaid',
                'partial',
                'paid',
                'refunded'
            ])->default('unpaid');
            $table->text('special_requests')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->dateTime('confirmed_at')->nullable();
            $table->dateTime('cancelled_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
