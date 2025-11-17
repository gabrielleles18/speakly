<?php

use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\FavoritesController;
use App\Http\Controllers\Api\SentencesController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VideosController;
use App\Http\Controllers\Api\UserActivitiesController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);

    Route::get('/videos', [VideosController::class, 'index']);
    Route::get('/videos/{id}', [VideosController::class, 'show']);
    Route::post('/videos', [VideosController::class, 'store']);
    Route::put('/videos/{id}', [VideosController::class, 'update']);
    Route::delete('/videos/{id}', [VideosController::class, 'destroy']);


    Route::get('/favorites/{userId}', [FavoritesController::class, 'index']);
    Route::post('/favorites', [FavoritesController::class, 'store']);
    Route::get('/favorites/{userId}/{videoId}', [FavoritesController::class, 'show']);

    Route::get('/categories', [CategoriesController::class, 'index']);

    Route::get('/sentences/{userId}', [SentencesController::class, 'show']);
    Route::post('/sentences', [SentencesController::class, 'store']);
    Route::put('/sentences/{id}', [SentencesController::class, 'update']);
    Route::delete('/sentences/{id}', [SentencesController::class, 'destroy']);

    Route::get('/user-activities/watched-videos/{userId}', [UserActivitiesController::class, 'watchedVideos']);
    Route::get('/user-activities/days-practiced/{userId}', [UserActivitiesController::class, 'daysPracticed']);
    Route::get('/user-activities/total-days-practiced/{userId}', [UserActivitiesController::class, 'totalDaysPracticed']);
    Route::get('/user-activities/total-sentences-practiced/{userId}', [UserActivitiesController::class, 'totalSentencesPracticed']);

    # Sentenças em revisão
    //GET /api/sentences/{userId}?filter=review

    # Sentenças dominadas
    //GET /api/sentences/{userId}?filter=dominated
});
