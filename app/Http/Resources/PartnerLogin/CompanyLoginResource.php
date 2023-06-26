<?php

namespace App\Http\Resources\PartnerLogin;

use App\Models\FolderMenu;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyLoginResource extends JsonResource
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
            "id" => $this->id,
            "name" => $this->name,
            "name_e" => $this->name_e,

            "Program" => ProgramLoginResource::collection($this->get_modules())
        ];
    }
}
