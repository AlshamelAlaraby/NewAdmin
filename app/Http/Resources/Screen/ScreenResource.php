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
            'id'             => $this->id,
            'name'           => $this->name,
            'name_e'         => $this->name_e,
            'title'          => $this->title,
            'title_e'        => $this->title_e,
            'is_add_on'      => $this->is_add_on,
            'url'            => $this->url,
            'is_implementor' => $this->is_implementor,
            'sort'           => $this->sort,
            'module'           => $this->module,
            "sub_menu_id"    => $this->sub_menu_id,
            'company_id'     => $this->company_id,
            'parent_id'      => $this->parent_id,
            'company'        => new  CompanyResource($this->company),
            'sub_menu'       => new SubMenuResource($this->subMenu),

        ];
    }
}
