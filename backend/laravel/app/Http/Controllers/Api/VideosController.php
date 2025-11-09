<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Video;
use App\Http\Resources\VideosResource;

class VideosController extends Controller
{
    public function index()
    {
        $videos = Video::all();
        return VideosResource::collection($videos);
    }

    public function show($id)
    {
        $video = Video::find($id);
        return new VideosResource($video);
    }

    public function store(Request $request) {}

    public function update(Request $request, $id) {}

    public function destroy($id)
    {
        $video = Video::find($id);
        $video->delete();
        return response()->json(null, 204);
    }
}
