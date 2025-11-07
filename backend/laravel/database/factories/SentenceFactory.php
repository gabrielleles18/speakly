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
            'video_id' => Video::factory(),
            'user_id' => User::factory(),
        ];
    }
}
