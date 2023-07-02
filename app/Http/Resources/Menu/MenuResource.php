<?php

namespace App\Http\Resources\Menu;

use App\Http\Resources\MenuTree\MenuTreeResources;
use App\Http\Resources\Screen\ScreenResource;
use App\Models\Screen;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class MenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

       $menuTrees = $this->menu_trees;
        $menuTreeResources = [];

        foreach ($menuTrees as $menuTree) {
            $screens = DB::table('menu_work_flows')
                ->where('menu_tree_id', $menuTree->id)
                ->join('screens', 'menu_work_flows.screen_id', '=', 'screens.id')
                ->get(['screens.id', 'screens.name', 'screens.name_e']);

            $menuTreeResources[] = [
                'id' => $menuTree->id,
                'name' => $menuTree->name,
                'name_e' => $menuTree->name_e,
                'screens' => $screens,
            ];
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'name_e' => $this->name_e,
            'menu_trees' => $menuTreeResources,
            'sort' => $this->sort,
        ];
    }
}
