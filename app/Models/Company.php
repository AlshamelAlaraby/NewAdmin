<?php

namespace App\Models;

use App\Traits\LogTrait;
use App\Traits\MediaTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use App\Models\ProjectProgramModule as Module;

class Company extends Model implements \Spatie\MediaLibrary\HasMedia

{
    use HasFactory, SoftDeletes, LogTrait, MediaTrait;

    protected $guarded = ['id'];

    // protected $casts = [
    //     'is_active' => 'App\Enums\IsActive',
    // ];

    /*** return relation  with  partner */
    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    /*** return relation  with  ProjectProgramModules */
    public function projectProgramModules()
    {
        return $this->belongsToMany(ProjectProgramModule::class, 'company_project_program_modules', 'company_id', 'project_program_module_id')->whereNull('company_project_program_modules.deleted_at');
    }

    /*** return relation  with  programs */
    public function programs()
    {
        return $this->belongsToMany(ProjectProgramModule::class, 'companies_programs', 'company_id', 'program_id')->withPivot(['id'])->whereNull('companies_programs.deleted_at');
    }

    /*** return relation  with  Screens */
    public function screens()
    {
        return $this->hasMany(Screen::class);
    }

    /*** return relation  with  ProjectProgramModules */
    public function company_modules()
    {
        return $this->hasMany(CompanyProjectProgramModule::class, 'company_id', 'id');
    }

    /*** return count relation  hasMany */
    public function hasChildren()
    {
        $hasChildren = $this->projectProgramModules()->count() > 0 ||
         $this->screens()->count() > 0 ;
        return $hasChildren;
    }


    // this method instead of get_modules after the structure has been changed
    // public function get_programs_and_modules(){
    //     $this->programs()->select('project_program_modules.id','project_program_modules.name','project_program_modules.name_e','companies_programs.id as company_program_id')->get();

    // }

    /*** return relation  with  CompanyProjectProgramModule */
    public function get_modules(){
        $modules = $this->projectProgramModules;
        $arr = [];
        foreach ($modules as $module){
            $piv = CompanyProjectProgramModule::query ()->where ('company_id',$this->id)->where ('project_program_module_id',$module->id)->first ();
            $module->expire_state = 'not_expired';
            $module->allowed_users_no = $piv->allowed_users_no;
            if (Carbon::now () > $piv->end_date){
                $module->expire_state = 'expired';
            }
            $arr[]=$module;
        }
        return $arr;

    }


    public function getActivitylogOptions(): LogOptions
    {
        $user = auth()->user()->id ?? "system";

        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->useLogName('Company')
            ->setDescriptionForEvent(fn (string $eventName) => "This model has been {$eventName} by ($user)");
    }
}
