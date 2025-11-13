<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sentence extends Model
{
    use HasFactory;

    protected $fillable = ['sentence', 'translation', 'time_video_start', 'next_review_date', 'last_review_date', 'quality', 'ease_factor', 'interval', 'repetitions', 'enabled', 'video_id', 'user_id'];

    protected $casts = [
        'next_review_date' => 'datetime',
        'last_review_date' => 'datetime',
        'quality' => 'integer',
        'ease_factor' => 'decimal:2',
        'interval' => 'integer',
        'repetitions' => 'integer',
        'enabled' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
