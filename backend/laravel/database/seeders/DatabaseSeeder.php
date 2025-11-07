<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Category;
use App\Models\Video;
use App\Models\Sentence;
use App\Models\SpacedRepetition;
use App\Models\UserActivity;
use App\Models\Favorite;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;


    public function run(): void
    {
        // Users
        User::factory()->create([
            'name' => 'Teste Silva',
            'email' => 'teste@gmail.com',
            'password' => Hash::make('password'),
        ]);


        // Categories
        Category::factory()->create([
            'name' => 'Business',
            'color' => '#FFFF00',
        ]);

        Category::factory()->create([
            'name' => 'Trip',
            'color' => '#00FFFF',
        ]);

        Category::factory()->create([
            'name' => 'Education',
            'color' => '#EE0000',
        ]);

        // Videos
        Video::factory(5)->create([
            'youtube_url' => 'https://www.youtube.com/watch?v=' . fake()->uuid(),
            'title' => fake()->sentence(),
            'channel' => fake()->company(),
            'thumbnail' => fake()->imageUrl(),
            'duration' => fake()->time(),
            'transcription' => fake()->text(),
            'category_id' => Category::inRandomOrder()->first()->id,
        ]);


        // Sentences
        Sentence::factory(5)->create([
            'sentence' => fake()->sentence(),
            'translation' => fake()->sentence(),
            'time_video_start' => fake()->time(),
            'video_id' => Video::inRandomOrder()->first()->id,
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory()->create()->id,
        ]);

        // Spaced Repetitions
        SpacedRepetition::factory(5)->create([
            'sentence_id' => Sentence::inRandomOrder()->first()->id,
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory()->create()->id,
            'next_review_date' => fake()->dateTime(),
            'quality' => fake()->numberBetween(0, 10),
            'enabled' => fake()->boolean(),
        ]);

        // User Activities
        UserActivity::factory(5)->create([
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory()->create()->id,
            'video_id' => Video::inRandomOrder()->first()->id,
            'activity' => fake()->randomElement(['watched_video', 'practiced_sentence']),
            'sentence_id' => Sentence::inRandomOrder()->first()->id,
        ]);

        // Favorites
        $user = User::first();
        $videos = Video::all();

        // Garantir que não criamos mais favoritos do que vídeos disponíveis
        $favoritesCount = min(5, $videos->count());

        for ($i = 0; $i < $favoritesCount; $i++) {
            Favorite::factory()->create([
                'user_id' => $user->id,
                'video_id' => $videos[$i]->id,
            ]);
        }
    }
}
