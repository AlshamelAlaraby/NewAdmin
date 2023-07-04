<?php

namespace App\Models;

use App\Traits\LogTrait;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubMenu extends Model
{
    use HasFactory, LogTrait;

    protected $guarded = ['id'];
    protected $appends = ['company_id'];
    protected $table = 'sub_menus';

    /*** return  relation  ProgramFolder */
    public function programFolder()
    {
        return $this->belongsTo(ProgramFolder::class,'program_folder_menu_id','id');

    }

    /*** return  relation  Screens */
    public function screens()
    {
        return $this->hasMany(Screen::class,'sub_menu_id','id');

    }

    /*** return count relation  hasMany */
    public function hasChildren()
    {
        return $this->screens()->count() > 0 ;
    }

    /*** return CompanyId */
    public function getCompanyIdAttribute($key)
    {
        return  $this->programFolder()->first()->company_id ?? null;
    }

    public function getActivitylogOptions(): LogOptions
    {
        $user = @auth()->user()->id ?: "system";

        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->useLogName('sub menu')
            ->setDescriptionForEvent(fn (string $eventName) => "This model has been {$eventName} by ($user)");
    }


}
