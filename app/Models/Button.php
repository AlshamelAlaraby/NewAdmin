<?php

namespace App\Models;

use App\Traits\LogTrait;
use App\Traits\MediaTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;

class Button extends Model implements \Spatie\MediaLibrary\HasMedia

{
    use SoftDeletes, LogTrait, MediaTrait;

    protected $guarded = ['id'];
    protected $table = 'buttons';

    /*** return relation with Screens */
    public function screens()
    {
        return $this->belongsToMany(Screen::class, 'screens_buttons', 'button_id', 'screen_id');
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
            ->useLogName('Button')
            ->setDescriptionForEvent(fn(string $eventName) => "This model has been {$eventName} by ($user)");
    }
}
