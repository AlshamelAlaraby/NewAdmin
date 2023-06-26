<?php

namespace App\Http\Resources\PartnerLogin;

use App\Http\Resources\Screen\ScreenResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SubMenuLoginResource extends JsonResource
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
            'is_add_on' => $this->is_add_on,
            'menu_id' => $this->menu_id,
            'company_id' => $this->company_id,
            'sort' => $this->sort,
            'is_menu_collapsed' => $this->is_menu_collapsed,
            'screens' =>  ScreenLoginResource::collection($this->screens)->where('company_id',$this->company_id)->values(),
        ];
    }
}
