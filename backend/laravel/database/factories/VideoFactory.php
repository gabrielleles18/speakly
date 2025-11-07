<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'youtube_url' => 'https://www.youtube.com/watch?v=' . fake()->uuid(),
            'title' => fake()->sentence(),
            'channel' => fake()->company(),
            'thumbnail' => fake()->imageUrl(),
            'duration' => fake()->time(),
            'transcription' => fake()->text(),
            'category_id' => Category::factory(),
        ];
    }
}
