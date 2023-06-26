<?php

namespace App\Models;

use App\Traits\LogTrait;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubMenu extends Model
{
    use HasFactory, LogTrait;

    protected $fillable = [
        'name',
        'name_e',
        'is_add_on',
        'menu_id',
        'sort',
        'is_menu_collapsed',
    ];
    protected $appends = ['company_id'];


    public function getActivitylogOptions(): LogOptions
    {
        $user = @auth()->user()->id ?: "system";

        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->useLogName('sub menu')
            ->setDescriptionForEvent(fn (string $eventName) => "This model has been {$eventName} by ($user)");
    }

    public function programFolder()
    {
        return $this->belongsTo(ProgramFolder::class,'menu_id','id');

    }



    public function screens()
    {
        return $this->hasMany(Screen::class,'sub_menu_id','id');

    }



//    public function menu()
//    {
//        return $this->belongsTo(Menu::class,'menu_id ','id');
//    }

    public function hasChildren()
    {
        return $this->screens()->count() > 0 ;
    }
    public function getCompanyIdAttribute($key)
    {
        return  $this->programFolder()->first()->company_id;
    }


}
