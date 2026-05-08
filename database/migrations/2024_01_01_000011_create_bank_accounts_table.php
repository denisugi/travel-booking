<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('bank_name');
            $table->string('account_holder_name');
            $table->string('account_number');
            $table->string('branch_name')->nullable();
            $table->string('branch_code')->nullable();
            $table->enum('account_type', ['checking', 'savings'])->default('checking');
            $table->enum('status', ['active', 'inactive', 'verified'])->default('active');
            $table->boolean('is_primary')->default(false);
            $table->string('swift_code')->nullable();
            $table->string('iban')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bank_accounts');
    }
};
