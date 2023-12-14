<?php

namespace App\Http\Resources\ProjectProgramModule;

use App\Models\FolderMenu;
use App\Models\ProgramFolder;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\PartnerLogin\programFoldersLoginResource;

class ProjectProgramModuleResource extends JsonResource
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
            'is_active' => $this->is_active,
            'sort' => $this->sort,
            'icon' => $this->icon,
            // 'is_web' => $this->is_web,
            'is_menu_collapsed' => $this->is_menu_collapsed,
            'is_module' => $this->is_module,
            'module_dashboard_id' => $this->module_dashboard_id,
            'module_id' => $this->module_id,
            "parent" => $this->parent,
            "childrens" => $this->when($this->is_module == 0,$this->children()->orderBy('sort')->get()),
            "programFolders" => $this->programFolders,

            "programFolders" => programFoldersLoginResource::collection($this->programFolders),

            // 'folders' => FolderMenu::whereIn('id', $this->programFolders->pluck('menu_folder_id'))->get(),


        ];
    }


}
