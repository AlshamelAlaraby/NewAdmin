<?php

namespace App\Http\Resources\PartnerLogin;

use App\Http\Resources\Module\ModuleChildrenResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramLoginResource extends JsonResource
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
            'parent_id' => $this->parent_id,
            'company_id' => $this->company_id,
            'sort' => $this->sort,
            'icon' => $this->icon,
            'is_menu_collapsed' => $this->is_menu_collapsed,
            "children" => ModuleChildrenResource::collection($this->children),
            "Parent" => new ParentProgramLoginResource($this->parent),
            "programFolders"=>  programFoldersLoginResource::collection($this->programFolders)



        ];
    }
}
