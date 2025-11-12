<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UserActivitiesResource;
use Carbon\Carbon;
use App\Models\UserActivity;

class UserActivitiesController extends Controller
{
    public function show(Request $request, $userId)
    {
        $current_date = Carbon::now()->format('Y-m');
        $sentences = UserActivity::where('user_id', $userId)->where('created_at', 'like', $current_date . '%')->get();

        if ($sentences->isEmpty()) {
            return response()->json([
                'message' => 'No sentences found for the current month',
                'data' => []
            ], 404);
        }

        return UserActivitiesResource::collection($sentences);
    }
}
