<?php

namespace App\Http\Resources\MenuTree;

use App\Http\Resources\Menu\MenuResource;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuTreeResources extends JsonResource
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
            'children' => $this->children,
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at,
            'is_active'=>$this->is_active,
            'parent_id'=>$this->parent_id,
            "screen_tree" => $this->screen_tree,
            'parent'=>$this->parent,
            "screen_tree" => $this->screen_tree,
            "Menu"=>$this->menu
        ];
    }
}
