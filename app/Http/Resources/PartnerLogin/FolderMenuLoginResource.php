<?php

namespace App\Http\Resources\PartnerLogin;

use App\Http\Resources\SubMenuResource;
use Illuminate\Http\Resources\Json\JsonResource;

class FolderMenuLoginResource extends JsonResource
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
        ];
    }
}
