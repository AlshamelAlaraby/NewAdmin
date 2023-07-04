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

    protected $guarded = ['id'];

    /*** return relation  with  companies */
    public function companies(): HasMany
    {
        return $this->hasMany(Company::class);
    }

    /*** return count relation  hasMany */
    public function hasChildren()
    {
        return $this->companies()->count() > 0  ;
    }

    public function getActivitylogOptions(): LogOptions
    {
        $user = auth()->user()->id ?? "system";

        return LogOptions::defaults()
            ->logAll()
            ->useLogName('Partner')
            ->setDescriptionForEvent(fn(string $eventName) => "This model has been {$eventName} by ($user)");
    }
}
