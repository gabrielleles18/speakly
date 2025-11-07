<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SpacedRepetition extends Model
{
    use HasFactory;

    protected $fillable = ['sentence_id', 'user_id', 'next_review_date', 'quality', 'enabled'];
}
