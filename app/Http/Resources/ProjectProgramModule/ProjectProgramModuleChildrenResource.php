<?php

namespace App\Http\Resources\ProjectProgramModule;

use App\Http\Resources\PartnerLogin\programFoldersLoginResource;
use App\Http\Resources\ProgramFolderResource;
use App\Models\FolderMenu;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectProgramModuleChildrenResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $FolderMenu = FolderMenu::whereHas('programs',function ($q){
            $q->where('project_program_module_id',$this->id);
        });
        return [
            'id'                => $this->id,
            'name'              => $this->name,
            'name_e'            => $this->name_e,
            'parent_id'         => $this->parent_id,
            'sort'              => $this->sort,
            'icon'              => $this->icon,
            'is_menu_collapsed' => $this->is_menu_collapsed,
            "programFolders"=>  programFoldersLoginResource::collection($this->programFolders)
        ];
    }
}
