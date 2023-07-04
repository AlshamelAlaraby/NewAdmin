<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\LogTrait;
use Spatie\Activitylog\LogOptions;


class ScreenAttribute extends Model
{
    use HasFactory, LogTrait;

    protected $table = "screen_attributes";
    protected $guarded = ['id'];
    protected $casts = ["attributes" => "json"];

    public function getActivitylogOptions(): LogOptions
    {
        $user = auth()->user()->id ?? "system";

        return LogOptions::defaults()
            ->logAll()
            ->useLogName('ScreenAttribute')
            ->setDescriptionForEvent(fn (string $eventName) => "This model has been {$eventName} by ($user)");
    }
}
