<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('package_galleries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('travel_package_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->string('caption')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_primary')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('package_galleries');
    }
};
