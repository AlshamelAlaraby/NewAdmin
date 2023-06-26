<?php

namespace App\Http\Resources\Screen;

use Illuminate\Http\Resources\Json\JsonResource;

class ModuleScreenRelationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = [$this->name => ScreenResource::collection($this->screens)];

        $data = collect($data);

        return $this->merge($data);

    }
}
