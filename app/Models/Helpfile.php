<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;

class Helpfile extends Model
{
    use SoftDeletes, LogTrait;

    protected $guarded = ["id"];

    /*** return relation with Screens */
    public function screens()
    {
        return $this->belongsToMany(Screen::class, 'screens_helpfiles', 'helpfile_id', 'screen_id');
    }

    /*** return count relation  hasMany */
    public function hasChildren()
    {
        return $this->screens()->count() > 0;
    }

    public function getActivitylogOptions(): LogOptions
    {
        $user = @auth()->user()->id ?: "system";

        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->useLogName('Helpfile')
            ->setDescriptionForEvent(fn (string $eventName) => "This model has been {$eventName} by ($user)");
    }

}
