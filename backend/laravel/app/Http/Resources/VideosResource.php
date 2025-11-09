<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideosResource extends JsonResource
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
            'youtube_url' => $this->youtube_url,
            'title' => $this->title,
            'channel' => $this->channel,
            'thumbnail' => $this->thumbnail,
            'duration' => $this->duration,
            'transcription' => $this->parseSrtToArray($this->transcription),
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'color' => $this->category->color,
            ],
            'created_at' => $this->created_at->format('d-m-Y'),
        ];
    }

    /**
     * Converte uma string SRT para um array no formato esperado.
     *
     * @param string|null $srt
     * @return array
     */
    private function parseSrtToArray(?string $srt): array
    {
        if (empty($srt)) {
            return [];
        }

        $subtitles = [];
        $blocks = preg_split('/\n\s*\n/', trim($srt));

        foreach ($blocks as $block) {
            $lines = explode("\n", trim($block));

            if (count($lines) < 2) {
                continue;
            }

            // Primeira linha é o ID
            $id = (int) trim($lines[0]);

            // Segunda linha é o tempo "00:00:00,000 --> 00:00:07,000"
            if (!isset($lines[1])) {
                continue;
            }

            $timeLine = trim($lines[1]);
            if (!preg_match('/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/', $timeLine, $matches)) {
                continue;
            }

            $start = $matches[1];
            $end = $matches[2];

            // Resto das linhas são o texto
            $text = implode(' ', array_slice($lines, 2));
            $text = trim($text);

            $subtitles[] = [
                'id' => $id,
                'start' => $start,
                'end' => $end,
                'text' => $text,
            ];
        }

        return $subtitles;
    }
}
