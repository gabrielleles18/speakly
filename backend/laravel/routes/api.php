<?php

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
});
