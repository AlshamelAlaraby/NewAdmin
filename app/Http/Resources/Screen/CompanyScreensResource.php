<?php

namespace App\Http\Resources\Screen;

use App\Http\Resources\Company\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyScreensResource extends JsonResource
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
            'company'  => new  CompanyResource($this->company),
        ];
    }
}
