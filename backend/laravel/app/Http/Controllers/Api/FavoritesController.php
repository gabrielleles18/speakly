<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Http\Resources\FavoritesResource;
use Illuminate\Http\Request;

class FavoritesController extends Controller
{
    public function index($userId)
    {
        $favorites = Favorite::where('user_id', $userId)->get();

        if ($favorites->isEmpty()) {
            return response(["message" => "No favorites found"], 404);
        }

        return FavoritesResource::collection($favorites);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'video_id' => 'required',
            'user_id' => 'required',
        ]);

        if (!$validated) {
            return response(["message" => "Invalid request"], 400);
        }

        $has_favorite = Favorite::where('user_id', $request->user_id)
            ->where('video_id', $request->video_id)
            ->get();

        if ($has_favorite->isEmpty()) {
            $favorite = Favorite::create($validated);

            if (!$favorite) {
                return response(["message" => "Something went wrong in creating"], 500);
            } else {
                return response(["data" => "isFavorited", "message" => "Favorite added successfully"], 200);
            }
        } else {
            $favorite_delete = Favorite::find($has_favorite[0]->id)->delete();

            if (!$favorite_delete) {
                return response(["message" => "Something went wrong in deleting"], 500);
            } else {
                return response(["data" => "isDelected","message" => "Favorite deleted successfully"], 200);
            }
        }
    }

    public function show(Favorite $favorite, $userId, $videoId)
    {
        $favorite = Favorite::where('user_id', $userId)
            ->where('video_id', $videoId)
            ->get();

        if ($favorite->isEmpty()) {
            return response([
                "data" => 0,
                "message" => "No favorites found"
            ], 200);
        }

        return response([
            "data" => 1,
            "message" => "Favorites is found"
        ], 200);
    }
}
