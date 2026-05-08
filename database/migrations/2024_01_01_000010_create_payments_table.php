<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id')->unique();
            $table->foreignId('booking_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 12, 2);
            $table->decimal('fee', 12, 2)->default(0);
            $table->decimal('net_amount', 12, 2);
            $table->enum('method', [
                'credit_card',
                'debit_card',
                'bank_transfer',
                'e_wallet',
                'paypal',
                'stripe',
                'cash'
            ]);
            $table->enum('status', [
                'pending',
                'processing',
                'completed',
                'failed',
                'cancelled',
                'refunded'
            ])->default('pending');
            $table->string('payment_proof')->nullable();
            $table->text('notes')->nullable();
            $table->string('card_last_four', 4)->nullable();
            $table->string('card_brand')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('account_number')->nullable();
            $table->json('gateway_response')->nullable();
            $table->dateTime('paid_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
