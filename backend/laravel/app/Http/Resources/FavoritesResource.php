<?php

namespace app\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FavoritesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'video' => [
                'id'=> $this->video->id,
                'title'=> $this->video->title,
                'channel'=> $this->video->channel,
                'youtube_url'=> $this->video->youtube_url,
                'duration'=> $this->video->duration,
            ],
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ],
        ];
    }
}
