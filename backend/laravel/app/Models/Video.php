<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Video extends Model
{
    use HasFactory;

    protected $fillable = ['youtube_url', 'title', 'channel', 'thumbnail', 'duration', 'transcription', 'category_id'];
}
