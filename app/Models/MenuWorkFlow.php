<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\LogTrait;

class MenuWorkFlow extends Model
{
    use HasFactory, LogTrait;
    protected $guarded = ['id'];
    protected $table = "menu_work_flows";

    /**
    * return relation with company
    */
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    /**
    * return relation with workflows
    */
    public function workflows()
    {
        return $this->belongsTo(WorkflowTree::class, 'workflow_id', 'id');
    }
    
    public function getActivitylogOptions(): \Spatie\Activitylog\LogOptions
    {
        $user = @auth()->user()->id ?: "system";

        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->useLogName('MenuWorkFlow')
            ->setDescriptionForEvent(fn (string $eventName) => "This model has been {$eventName} by ($user)");
    }

}
