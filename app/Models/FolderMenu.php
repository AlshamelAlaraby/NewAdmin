<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;

class FolderMenu extends Model
{
    use HasFactory;
    use SoftDeletes, LogTrait;

    protected $guarded = ["id"];
    protected $table   = "folders_menu";

    public function programs()
    {
        return $this->belongsToMany(ProjectProgramModule::class, 'program_folder_menu', 'menu_folder_id', 'project_program_module_id');
    }
    public function subMenus()
    {
        return $this->hasMany(SubMenu::class,'menu_id','id');

    }
    public function getActivitylogOptions(): LogOptions
    {
        $user = @auth()->user()->id ?: "system";

        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->useLogName('Folder Menu')
            ->setDescriptionForEvent(fn(string $eventName) => "This model has been {$eventName} by ($user)");
    }

    public function hasChildren()
    {
        return $this->programs()->count() ;
    }
}
