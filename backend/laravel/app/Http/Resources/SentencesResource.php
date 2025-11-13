<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\VideosResource;
use App\Http\Resources\AuthResource;

class SentencesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sentence' => $this->sentence,
            'translation' => $this->translation,
            'time_video_start' => $this->time_video_start,
            'next_review_date' => $this->next_review_date?->format('Y-m-d H:i:s'),
            'last_review_date' => $this->last_review_date?->format('Y-m-d H:i:s'),
            'quality' => $this->quality,
            'ease_factor' => (float) $this->ease_factor,
            'interval' => $this->interval,
            'repetitions' => $this->repetitions,
            'enabled' => $this->enabled,
            'video' => new VideosResource($this->video),
            'user' => new AuthResource($this->user)
        ];
    }
}
