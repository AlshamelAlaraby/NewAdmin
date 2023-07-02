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

    protected $casts = [
        'is_active' => 'App\Enums\IsActive',
    ];

    // relations
    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    public function modules()
    {
        return $this->belongsToMany(ProjectProgramModule::class, 'company_modules', 'company_id', 'module_id');
    }

    public function get_modules(){
        $modules = $this->modules;
        $arr = [];
        foreach ($modules as $module){
            $piv = CompanyModule::query ()->where ('company_id',$this->id)->where ('module_id',$module->id)->first ();
            $module->expire_state = 'not_expired';
            $module->allowed_users_no = $piv->allowed_users_no;
            if (Carbon::now () > $piv->end_date){
                $module->expire_state = 'expired';
            }
            $arr[]=$module;
        }
        return $arr;

    }



    public function stores()
    {
        return $this->hasMany(Store::class);
    }

    public function workFlows()
    {
        return $this->hasMany(WorkflowTree::class);
    }


    public function hasChildren()
    {
        $hasChildren = $this->branches()->count() > 0 || $this->workFlows()->count() > 0 || $this->stores()->count() > 0;
        return $hasChildren;
    }

    public function company_modules()
    {
        return $this->hasMany(CompanyModule::class, 'company_id', 'id');
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
