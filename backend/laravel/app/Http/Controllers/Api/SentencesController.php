<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sentence;
use App\Models\UserActivity;
use App\Http\Resources\SentencesResource;
use Carbon\Carbon;

class SentencesController extends Controller
{
    public function show(Request $request, $userId)
    {
        $filter = $request->query('filter', 'all'); // 'all', 'review', 'dominated'

        $query = Sentence::where('user_id', $userId)
            ->where('enabled', true);

        $total_all = $query->get();

        // Aplicar filtros
        switch ($filter) {
            case 'toReview':
                // Sentenças que precisam de revisão (next_review_date <= hoje)
                $query->where('next_review_date', '<=', Carbon::now())
                    ->orderBy('next_review_date', 'asc');
                break;

            case 'dominated':
                // Sentenças dominadas (repetitions >= 5 e interval >= 30 dias)
                $query->where('repetitions', '>=', 5)
                    ->where('interval', '>=', 30)
                    ->orderBy('repetitions', 'desc')
                    ->orderBy('interval', 'desc');
                break;

            case 'all':
            default:
                // Todas as sentenças, ordenadas pelas mais recentes
                $query->orderBy('created_at', 'desc');
                break;
        }

        $sentences = $query->limit(20)->get();

        return [
            'sentences' => SentencesResource::collection($sentences),
            'total_all' => $total_all->count(),
            'total_review' => $total_all->where('next_review_date', '<=', Carbon::now())->count(),
            'total_dominated' => $total_all->where('repetitions', '>=', 5)->where('interval', '>=', 30)->count(),
        ];
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sentence' => 'required|string',
            'translation' => 'required|string',
            'time_video_start' => 'required|date_format:H:i:s',
            'video_id' => 'required|exists:videos,id',
            'next_review_date' => 'nullable|date',
        ]);

        // Valores padrão para repetição espaçada (algoritmo SM-2)
        $sentence = Sentence::create([
            'sentence' => $validated['sentence'],
            'translation' => $validated['translation'],
            'time_video_start' => $validated['time_video_start'],
            'video_id' => $validated['video_id'],
            'user_id' => $request->user()->id,
            'next_review_date' => $validated['next_review_date'] ?? Carbon::now(),
            'last_review_date' => null,
            'quality' => 0,
            'ease_factor' => 2.50, // Valor inicial padrão do SM-2
            'interval' => 0,
            'repetitions' => 0,
            'enabled' => true,
        ]);

        return new SentencesResource($sentence);
    }

    public function update(Request $request, $id)
    {
        $sentence = Sentence::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $validated = $request->validate([
            'sentence' => 'sometimes|string',
            'translation' => 'sometimes|string',
            'time_video_start' => 'sometimes|date_format:H:i:s',
            'video_id' => 'sometimes|exists:videos,id',
            'next_review_date' => 'sometimes|date',
            'last_review_date' => 'sometimes|nullable|date',
            'quality' => 'sometimes|integer|min:0|max:10',
            'ease_factor' => 'sometimes|numeric|min:1.3',
            'interval' => 'sometimes|integer|min:0',
            'repetitions' => 'sometimes|integer|min:0',
            'enabled' => 'sometimes|boolean',
        ]);

        $sentence->update($validated);

        return new SentencesResource($sentence->fresh());
    }

    public function destroy(Request $request, $id)
    {
        $sentence = Sentence::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        // Deleta os registros relacionados em user_activities antes de deletar a sentença
        UserActivity::where('sentence_id', $sentence->id)->delete();

        $sentence->delete();

        return response()->json(['message' => 'Sentence deleted successfully'], 200);
    }
}
