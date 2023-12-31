<?php

namespace App\Http\Resources;

use App\Http\Resources\FolderMenu\FolderMenuResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\PartnerLogin\ScreenLoginResource;
use App\Http\Resources\PartnerLogin\SubMenuLoginResource;

class ProgramFolderResource extends JsonResource
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
            'sort' => $this->sort,
            'project_program_module_id' => $this->project_program_module_id,
            'menu_folder_id' => $this->menu_folder_id,
            'project_program_module' => $this->program,
            'menu_folder' => new FolderMenuResource($this->folder),
            'screens' => ScreenLoginResource::collection($this->screens),
            "subMenus" => SubMenuLoginResource::collection($this->subMenus),
        ];
    }
}
