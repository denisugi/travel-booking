<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('travel_packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->decimal('price', 12, 2);
            $table->decimal('discount_price', 12, 2)->nullable();
            $table->integer('duration_days');
            $table->integer('duration_nights');
            $table->string('destination');
            $table->text('itinerary')->nullable();
            $table->text('includes')->nullable();
            $table->text('excludes')->nullable();
            $table->string('featured_image')->nullable();
            $table->integer('max_participants')->default(20);
            $table->integer('min_participants')->default(1);
            $table->enum('difficulty', ['easy', 'moderate', 'challenging'])->default('moderate');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_flash_sale')->default(false);
            $table->dateTime('flash_sale_end')->nullable();
            $table->json('highlights')->nullable();
            $table->json('gallery_images')->nullable();
            $table->dateTime('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('travel_packages');
    }
};
