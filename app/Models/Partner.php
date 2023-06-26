<?php

namespace App\Models;

use App\Http\Resources\WorkflowTree\WorkflowTreeResource1;
use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\LogOptions;

class Partner extends Authenticatable
{
    use HasFactory;
    use SoftDeletes;
    use LogTrait, HasApiTokens;

    public const ACTIVE = 'active';
    public const INACTIVE = 'inactive';

    protected $fillable = [
        'name',
        'name_e',
        'is_active',
        'email',
        'password',
        'mobile_no',
        'phone_code',
        'country_code',
    ];

    // public function setPhoneNumberAttribute($value)
    // {
    //     $this->attributes['mobile_no'] = str_replace(' ', '', $value);
    // }


    public function getActivitylogOptions(): LogOptions
    {
        $user = auth()->user()->id ?? "system";

        return LogOptions::defaults()
            ->logAll()
            ->useLogName('Partner')
            ->setDescriptionForEvent(fn(string $eventName) => "This model has been {$eventName} by ($user)");
    }

    public function companies(): HasMany
    {
        return $this->hasMany(Company::class);
    }

    public function company()
    {
        return $this->hasOne(Company::class);
    }

    public function workFlows()
    {
        return $this->hasMany(WorkflowTree::class);
    }

    public function hasChildren()
    {
        return $this->companies()->count() > 0 || $this->workFlows()->count() > 0;

    }

    public function everything_about_the_company()
    {
        $company = $this->company;
        if ($company) {
            $wf = WorkflowTree::query()->where('is_active', 1)->where('company_id', $company->id)->get();
            $company->work_flow_trees = WorkflowTreeResource1::collection($wf);
            return $company;
        }
        return [];
    }
}
