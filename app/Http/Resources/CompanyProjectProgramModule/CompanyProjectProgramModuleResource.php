<?php

namespace App\Http\Resources\CompanyProjectProgramModule;

use App\Http\Resources\Company\CompanyResource;
use App\Http\Resources\DocumentType\DocumentTypeResource;
use App\Http\Resources\Menu\MenuResource;
use App\Http\Resources\Module\ModuleResource;
use App\Http\Resources\ProjectProgramModule\ProjectProgramModuleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyProjectProgramModuleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id"                     => $this->id,
            "company"                => new CompanyResource($this->company),
            "project_program_module" => new ProjectProgramModuleResource($this->projectProgramModule),
            "start_date"             => $this->start_date,
            "end_date"               => $this->end_date,
            "allowed_users_no"       => $this->allowed_users_no,
            "allowed_employee"       => $this->allowed_employee,
            "out_site"               => $this->out_site,
            "document_types"         => DocumentTypeResource::collection($this->documentTypes),
            "is_web"               => $this->is_web,
            "status"               => $this->status,
            "company_program_id"               => $this->company_program_id,

        ];
    }
}
