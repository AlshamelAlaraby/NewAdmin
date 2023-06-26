<?php

namespace App\Http\Resources\FolderMenu;

use Illuminate\Http\Resources\Json\JsonResource;

class FolderMenuResource extends JsonResource
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
            'sort' => $this->sort,
            'is_menu_collapsed' => $this->is_menu_collapsed,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
