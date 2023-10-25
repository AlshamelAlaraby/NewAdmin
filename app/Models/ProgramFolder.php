<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;

class ProgramFolder extends Model
{
    use HasFactory, LogTrait;
    
    protected $guarded = ["id"];
    protected $table = "program_folder_menus";
    protected $appends = ['company_id'];

    /*** return relation  with  Folder */
    public function folder()
    {
        return $this->belongsTo(FolderMenu::class, 'menu_folder_id');
    }

    /*** return relation  with  Program */
    public function program()
    {
        return $this->belongsTo(ProjectProgramModule::class, 'project_program_module_id');
    }

    /*** return relation  with  SubMenus */
    public function subMenus()
    {
        return $this->hasMany(SubMenu::class,'program_folder_menu_id','id');
    }

    /*** return CompanyId */
    public function getCompanyIdAttribute($key)
    {
        return  $this->program()->first()->company_id;
    }

    /*** return count relation  hasMany */
    public function hasChildren()
    {
        return $this->subMenus()->count() > 0  ;
    }

    public function getActivitylogOptions(): LogOptions
    {
        $user = @auth()->user()->id ?: "system";

        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->useLogName('Folder Menu')
            ->setDescriptionForEvent(fn(string $eventName) => "This model has been {$eventName} by ($user)");
    }

}
