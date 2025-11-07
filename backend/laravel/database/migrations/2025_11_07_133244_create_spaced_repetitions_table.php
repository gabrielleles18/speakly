<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('spaced_repetitions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sentence_id')->constrained('sentences');
            $table->foreignId('user_id')->constrained('users');
            $table->dateTime('next_review_date');
            $table->integer('quality')->default(0)->min(0)->max(10);
            $table->boolean('enabled')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spaced_repetitions');
    }
};
