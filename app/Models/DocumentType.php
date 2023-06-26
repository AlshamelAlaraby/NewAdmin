<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentType extends Model
{
    use HasFactory, LogTrait;

    protected $fillable = [
        'name',
        'name_e',
        'is_default',
        "attributes"
    ];
    protected $casts = ["attributes" => "json"];

    public function company_modules()
    {
        return $this->belongsToMany(CompanyModule::class, 'document_company_modules', 'document_type_id', 'company_module_id');
    }


    public function documentRelateds()
    {
        return $this->belongsToMany(DocumentType::class, 'document_related', 'document_type_id', 'document_related_id','id','id');
    }


    public function screens()
    {
        return $this->belongsToMany(Screen::class, 'screen_document_types', 'documentType_id', 'screen_id', 'id', 'id');
    }
}
