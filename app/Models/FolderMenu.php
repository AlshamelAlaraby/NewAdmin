<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;

class FolderMenu extends Model
{
    use HasFactory;
    use SoftDeletes, LogTrait;

    protected $guarded = ["id"];
    protected $table = "folder_menus";

    /*** return relation with Programs */
    public function programs()
    {
        return $this->belongsToMany(ProjectProgramModule::class, 'program_folder_menus', 'menu_folder_id', 'project_program_module_id');
    }

    /*** return relation with SubMenus */
    public function subMenus()
    {
        return $this->hasMany(SubMenu::class, 'program_folder_menu_id', 'id');
    }

  

    /*** return relation with SubMenus */
    public function hasChildren()
    {
        return $this->programs()->count();
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
