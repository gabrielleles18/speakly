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

    public function watchedVideos($userId): int
    {
        $watchedVideos = UserActivity::where('user_id', $userId)->where('activity', 'watched_video')->get();

        return intval($watchedVideos->count());
    }

    public function daysPracticed($userId): int
    {
        // Busca todas as datas distintas com prática do usuário
        $daysWithPractice = UserActivity::where('user_id', $userId)
            ->where('activity', 'practiced_sentence')
            ->selectRaw('DATE(created_at) as practice_date')
            ->distinct()
            ->pluck('practice_date')
            ->map(function ($date) {
                return Carbon::parse($date)->format('Y-m-d');
            })
            ->toArray();

        if (empty($daysWithPractice)) {
            return 0;
        }

        // Ordena as datas em ordem decrescente (mais recente primeiro)
        rsort($daysWithPractice);

        // Conta dias consecutivos começando do dia mais recente
        $consecutiveDays = 0;
        $today = Carbon::now()->startOfDay();
        $yesterday = $today->copy()->subDay();
        $currentDate = Carbon::parse($daysWithPractice[0])->startOfDay();

        // Se o último dia com prática foi há 2 ou mais dias, não há sequência atual
        if ($currentDate->lt($yesterday)) {
            return 0;
        }

        // Conta os dias consecutivos retrocedendo no tempo
        while (true) {
            $dateString = $currentDate->format('Y-m-d');

            // Verifica se há prática neste dia
            if (in_array($dateString, $daysWithPractice)) {
                $consecutiveDays++;
                $currentDate->subDay();
            } else {
                // Se encontrar um dia sem prática, para a contagem
                break;
            }
        }

        return $consecutiveDays;
    }

    public function totalDaysPracticed($userId): int
    {
        $totalDaysPracticed = UserActivity::where('user_id', $userId)->selectRaw('DATE(created_at) as practice_date')
            ->distinct()->pluck('practice_date')->count();

        return intval($totalDaysPracticed);
    }

    public function totalSentencesPracticed($userId): int
    {
        $totalSentencesPracticed = UserActivity::where('user_id', $userId)->where('activity', 'practiced_sentence')->count();

        return intval($totalSentencesPracticed);
    }
}
