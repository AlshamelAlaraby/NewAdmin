<?php

namespace App\Http\Resources\PartnerLogin;

use App\Http\Resources\ProjectProgramModuleDropDownResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ScreenLoginResource extends JsonResource
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
            'name_e' => $this->name_e,
            'title' => $this->title,
            'title_e' => $this->title_e,
            'url'     => $this->middleware_url,
            'sort'       => $this->sort,
            'sub_menu_id'      => $this->sub_menu_id,
            'menu_id'      => $this->menu_id,
            'company_id'       => $this->company_id,
            'module_id'       => $this->module_id,
            "module"          => new ProjectProgramModuleDropDownResource($this->ProjectProgramModule),

        ];
    }
}
