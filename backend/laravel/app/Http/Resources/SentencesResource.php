<?php

namespace app\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'video' => new VideosResource($this->video),
            'user' => new AuthResource($this->user)
        ];
    }
}
