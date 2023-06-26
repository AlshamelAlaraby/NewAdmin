<?php

namespace App\Http\Resources\Screen;

use App\Http\Resources\Company\CompanyResource;
use App\Http\Resources\SubMenuResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ScreenResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'name_e' => $this->name_e,
            'title' => $this->title,
            'title_e' => $this->title_e,
            'url'     => $this->url,
            'serial_id ' => $this->serial_id == null ? 'no serial' : $this->serial_id, //optional( $this->serial)->name,
            'is_implementor' => $this->is_implementor,
            'sort'       => $this->sort,
            'company_id'  => $this->company_id,
            'deleted_at' => $this->deleted_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            "module_id" => $this->module_id,
            'company'  => new  CompanyResource($this->company),
       
            // "module" => $this->module,
           'sub_menu' => new SubMenuResource($this->subMenu),

        ];
    }
}
