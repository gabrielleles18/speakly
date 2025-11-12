<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sentence extends Model
{
    use HasFactory;

    protected $fillable = ['sentence', 'translation', 'time_video_start', 'video_id', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
