<?php

namespace App\Http\Resources\PartnerLogin;

use Illuminate\Http\Resources\Json\JsonResource;

class ScreenLoginResource extends JsonResource
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
            'url'     => $this->url,
            'sort'       => $this->sort,
            'company_id'       => $this->company_id,

        ];
    }
}
