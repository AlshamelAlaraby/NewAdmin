<?php

namespace App\Http\Resources\PartnerLogin;

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
            'screens' => count(ScreenLoginResource::collection($this->screens)->where('company_id', $this->company_id)->values()) > 0 ? ScreenLoginResource::collection($this->screens)->where('company_id', $this->company_id)->values() : ScreenLoginResource::collection($this->screens)->where('menu_id', $this->id)->where('company_id', null)->values(),
        ];
    }
}
