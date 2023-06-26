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
    protected $table = "program_folder_menu";
    protected $appends = ['company_id'];


    public function folder()
    {
        return $this->belongsTo(FolderMenu::class, 'menu_folder_id');
    }
    public function program()
    {
        return $this->belongsTo(ProjectProgramModule::class, 'project_program_module_id');
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
    public function getCompanyIdAttribute($key)
    {
        return  $this->program()->first()->company_id;
    }
}
