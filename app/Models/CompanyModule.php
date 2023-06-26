<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;

class CompanyModule extends Model
{
    use LogTrait;

    protected $fillable = [
        'company_id',
        'module_id',
        'start_date',
        'end_date',
        'allowed_users_no',
    ];
    public function getActivitylogOptions(): LogOptions
    {
        $user = auth()->user()->id ?? "system";

        return LogOptions::defaults()
            ->logAll()
            ->useLogName('Company Module')
            ->setDescriptionForEvent(fn(string $eventName) => "This model has been {$eventName} by ($user)");
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    public function module()
    {
        return $this->belongsTo(ProjectProgramModule::class, 'module_id');
    }



    public function document_types()
    {
        return $this->belongsToMany(DocumentType::class, 'document_company_modules', 'company_module_id', 'document_type_id');
    }



    public function hasChildren()
    {
        $hasChildren = $this->document_types()->count() > 0;
        return $hasChildren;
    }
}
