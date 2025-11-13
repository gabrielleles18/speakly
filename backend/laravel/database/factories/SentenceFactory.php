<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sentence>
 */
class SentenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sentence' => fake()->sentence(),
            'translation' => fake()->sentence(),
            'time_video_start' => fake()->time(),
            'next_review_date' => fake()->dateTime(),
            'last_review_date' => fake()->dateTime(),
            'quality' => fake()->numberBetween(0, 10),
            'ease_factor' => fake()->randomFloat(2, 1.30, 2.50),
            'interval' => fake()->numberBetween(0, 365),
            'repetitions' => fake()->numberBetween(0, 100),
            'enabled' => fake()->boolean(),
            'video_id' => Video::factory(),
            'user_id' => User::factory(),
        ];
    }
}
