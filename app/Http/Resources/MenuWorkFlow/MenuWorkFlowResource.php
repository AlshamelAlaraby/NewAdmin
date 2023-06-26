<?php

namespace App\Http\Resources\MenuWorkFlow;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuWorkFlowResource extends JsonResource
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
            'workflow_id'=>$this->workflow_id,
            'company_id'=>$this->company_id,
            'menu_tree_id'=>$this->menu_tree_id,
            'screen_id'=>$this->screen_id,
        ];
    }
}
