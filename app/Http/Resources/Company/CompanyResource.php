<?php

namespace App\Http\Resources\Company;

use App\Http\Resources\FileResource;
use App\Http\Resources\Partner\PartnerRelationResource;
use App\Http\Resources\ProjectProgramModule\ProjectProgramModuleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
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
            "id" => $this->id,
            "name" => $this->name,
            "name_e" => $this->name_e,
            "url" => $this->url,
            "address" => $this->address,
            "phone" => $this->phone,
            "cr" => $this->cr,
            "tax_id" => $this->tax_id,
            "vat_no" => $this->vat_no,
            "email" => $this->email,
            "is_active" => $this->is_active,
            "partner_id" => $this->partner_id,
            "phone_code" => $this->phone_code,
            "country_code" => $this->country_code,
            "media" => isset($this->files) ? FileResource::collection($this->files) : null,
            "partner" => new PartnerRelationResource($this->partner),
            "project_program_module" => ProjectProgramModuleResource::collection($this->get_modules()),
            'modules_count' => count($this->get_modules()),
            "contact_person" => $this->contact_person,
        ];
    }
}
