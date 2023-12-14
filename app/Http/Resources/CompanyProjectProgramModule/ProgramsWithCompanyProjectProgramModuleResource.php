<?php

namespace App\Http\Resources\CompanyProjectProgramModule;

use App\Http\Resources\Company\CompanyResource;
use App\Http\Resources\DocumentType\DocumentTypeResource;
use App\Http\Resources\Menu\MenuResource;
use App\Http\Resources\Module\ModuleResource;
use App\Models\CompanyProjectProgramModule;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramsWithCompanyProjectProgramModuleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // 'project_program_modules.id','project_program_modules.name','project_program_modules.name_e','companies_programs.id as company_program_id'

        return [
            "id"                     => $this->id,
            "name"                     => $this->name,
            "name_e"                     => $this->name_e,
            "company_program_id"                     => $this->company_program_id,
            "icon"                     => $this->icon,
            "modules"                     => CompanyProjectProgramModuleResource::collection(CompanyProjectProgramModule::whereCompanyProgramId($this->pivot->id)->get()),
        ];
    }
}
