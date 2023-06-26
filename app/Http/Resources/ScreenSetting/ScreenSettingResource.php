<?php

namespace App\Http\Resources\ScreenSetting;

use App\Http\Resources\Screen\ScreenRelationResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ScreenSettingResource extends JsonResource
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
            "id"            => $this->id,
            "admin_id"      => $this->admin_id,
            "name_screen"   => $this->name_screen,
            "data_json"     => $this->data_json,
        ];
    }
}
