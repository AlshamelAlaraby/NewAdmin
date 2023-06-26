<?php

namespace App\Repositories\MenuTree;

use App\Models\CompanyModule;
use Illuminate\Support\Facades\DB;

class MenuTreeRepository implements MenuTreeInterface
{

    public function __construct(private \App\Models\MenuTree $model)
    {
        $this->model = $model;
    } //end of contructor

    public function all($request)
    {
        $models = $this->model->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');

        if ($request->per_page) {
            return ['data' => $models->paginate($request->per_page), 'paginate' => true];
        } else {
            return ['data' => $models->get(), 'paginate' => false];
        }
    } //end of all function


    public function find($id)
    {
        return $this->model->find($id);
    } //end of find function

    public function create($request)
    {

        return DB::transaction(function () use ($request) {
            $model = $this->model->create($request);
            // cacheForget("menu_trees");
            return $model;
        });
    } //end of create function

    public function update($request, $id)
    {
        DB::transaction(function () use ($id, $request) {
            $this->model->where("id", $id)->update($request->all());
            // $this->forget($id);
        });
    } //end of update function

    public function logs($id)
    {
        return $this->model->find($id)->activities()->orderBy('created_at', 'DESC')->get();
    } //end of logs function

    public function delete($id)
    {
        $model = $this->find($id);
        // $this->forget($id);
        $model->delete();
    } //end of delete function

    public function getMenuRootNodes($menuId)
    {
        return $this->model->where("menu_id", $menuId)->where("parent_id", 0)->get();
    }

    public function getModuleRootNodes($companyId, $moduleId)
    {
        $companyModule = CompanyModule::where("module_id", $moduleId)
            ->where("company_id", $companyId)->first();
        if ($companyModule) {
            return $this->model->where("menu_id", $companyModule->menu_id)
                ->where("parent_id", 0)->get();
        }
        return [];
    }

    public function getChildNodes($parentId)
    {
        return $this->model->where("parent_id", $parentId)->get();
    }

    // private function forget($id)
    // {
    //     $keys = [
    //         "menu_trees",
    //         "menu_trees_" . $id,
    //     ];
    //     foreach ($keys as $key) {
    //         cacheForget($key);
    //     }
    // }//function to inject in delete function in the above
}
