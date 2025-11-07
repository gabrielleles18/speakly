<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sentence extends Model
{
    use HasFactory;

    protected $fillable = ['sentence', 'translation', 'time_video_start', 'video_id', 'user_id'];
}
