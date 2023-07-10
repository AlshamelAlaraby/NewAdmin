<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentType extends Model
{
    use HasFactory, LogTrait;

    protected $guarded = ['id'];
    protected $casts = ["attributes" => "json"];

    /*** return relation with CompanyProjectProgramModules */
    public function companyProjectProgramModules()
    {
        return $this->belongsToMany(CompanyProjectProgramModule::class, 'document_company_project_program_modules', 'document_type_id', 'company_project_program_module_id');
    }

    /*** return relation with documentRelateds */
    public function documentRelateds()
    {
        return $this->belongsToMany(DocumentType::class, 'document_related', 'document_type_id', 'document_related_id', 'id', 'id');
    }

    /*** return relation with Screens */
    public function screens()
    {
        return $this->belongsToMany(Screen::class, 'screen_document_types', 'document_type_id', 'screen_id', 'id', 'id');
    }

    /*** return count relation  hasMany */
    public function hasChildren()
    {
        return $this->screens()->count() > 0 || $this->companyProjectProgramModules()->count() > 0 || $this->documentRelateds()->count() > 0 ;

    }
}
