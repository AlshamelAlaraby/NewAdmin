<?php

namespace App\Http\Resources\PartnerLogin;

use App\Http\Resources\SubMenuResource;
use Illuminate\Http\Resources\Json\JsonResource;

class programFoldersLoginResource extends JsonResource
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
            "id"=>$this->id,
            'project_program_module_id' => $this->project_program_module_id,
            'menu_folder_id'            => $this->menu_folder_id,
            'company_id'                => $this->company_id,
            'menu_folder'               => new FolderMenuLoginResource($this->folder),
            "subMenus"                  => SubMenuLoginResource::collection($this->subMenus)

        ];
    }
}
