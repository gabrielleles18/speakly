<?php

namespace Database\Factories;

use App\Models\Sentence;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SpacedRepetition>
 */
class SpacedRepetitionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sentence_id' => Sentence::factory(),
            'user_id' => User::factory(),
            'next_review_date' => fake()->dateTime(),
            'quality' => fake()->numberBetween(0, 10),
            'enabled' => fake()->boolean(),
        ];
    }
}
