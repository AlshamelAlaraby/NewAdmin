<?php

namespace App\Http\Resources;

use App\Http\Resources\Menu\MenuResource;
use App\Http\Resources\Screen\ScreenResource;
use App\Models\ProgramFolder;
use Illuminate\Http\Resources\Json\JsonResource;

class SubMenuResource extends JsonResource
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
            'id'                     => $this->id,
            'name'                   => $this->name,
            'name_e'                 => $this->name_e,
            'is_add_on'              => $this->is_add_on,
            'program_folder_menu_id' => $this->program_folder_menu_id,
            'sort'                   => $this->sort,
            'is_menu_collapsed'      => $this->is_menu_collapsed,
            'program_folder_menus'   => new ProgramFolderResource($this->programFolder),
        ];
    }
}
