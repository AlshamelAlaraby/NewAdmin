<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;

class CompanyProjectProgramModule extends Model
{
    use LogTrait;

    protected $guarded = ['id'];
    protected $table = "company_project_program_modules";

    /*** return relation  with  Company */
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    /*** return relation  with  ProjectProgramModule */
    public function projectProgramModule()
    {
        return $this->belongsTo(ProjectProgramModule::class, 'project_program_module_id');
    }

    /*** return relation  with  DocumentTypes */
    public function documentTypes()
    {
        return $this->belongsToMany(DocumentType::class, 'document_company_project_program_modules', 'company_project_program_module_id', 'document_type_id')->withPivot('id');
    }

    /*** return relation  with  partner */
    public function hasChildren()
    {
        $hasChildren = $this->documentTypes()->count() > 0;
        return $hasChildren;
    }

    public function getActivitylogOptions(): LogOptions
    {
        $user = auth()->user()->id ?? "system";

        return LogOptions::defaults()
            ->logAll()
            ->useLogName('Company Project Program Module')
            ->setDescriptionForEvent(fn(string $eventName) => "This model has been {$eventName} by ($user)");
    }

}
