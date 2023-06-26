<?php

namespace App\Http\Resources\Module;

use App\Http\Resources\ProgramFolderResource;
use App\Http\Resources\Screen\ScreenResource;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\JsonResource;

class ModuleResource extends JsonResource
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
            'is_menu_collapsed' => $this->is_menu_collapsed,
            'is_module' => $this->is_module,
            'module_id' => $this->module_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            "parent" => $this->parent,
            "programFolders"=>  $this->programFolders,
//            "programFolders"=>  ProgramFolderResource::collection($this->programFolders)
            // "screens" => ScreenResource::collection($this->screens),


        ];
    }
}
