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
        $is_active = $this->is_active->value != "active"  ? 0 : 1;

        return [
            "id"    => $this->id,
            "name"  => $this->name,
            "name_e" => $this->name_e,
            "is_active" => $is_active,

            "Program" => ProgramLoginResource::collection($this->get_modules())
        ];
    }
}
