<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('email_logs', function (Blueprint $table) {
            $table->id();
            $table->string('message_id')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('to_email');
            $table->string('from_email');
            $table->string('from_name')->nullable();
            $table->string('subject');
            $table->longText('body');
            $table->longText('headers')->nullable();
            $table->enum('status', ['pending', 'sent', 'delivered', 'failed', 'bounced'])->default('pending');
            $table->text('error_message')->nullable();
            $table->integer('retry_count')->default(0);
            $table->text('attachments')->nullable();
            $table->json('metadata')->nullable();
            $table->dateTime('sent_at')->nullable();
            $table->dateTime('delivered_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('email_logs');
    }
};
