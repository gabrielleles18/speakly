<?php

use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\FavoritesController;
use App\Http\Controllers\Api\UserActivitiesController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VideosController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/videos', [VideosController::class, 'index']);
    Route::get('/videos/{id}', [VideosController::class, 'show']);
    Route::post('/videos', [VideosController::class, 'store']);
    Route::put('/videos/{id}', [VideosController::class, 'update']);
    Route::delete('/videos/{id}', [VideosController::class, 'destroy']);


    Route::get('/favorites/{userId}', [FavoritesController::class, 'index']);
    Route::post('/favorites', [FavoritesController::class, 'store']);
    Route::get('/favorites/{userId}/{videoId}', [FavoritesController::class, 'show']);

    Route::get('/categories', [CategoriesController::class, 'index']);

    Route::get('/userActivities/{userId}', [UserActivitiesController::class, 'show']);
});
