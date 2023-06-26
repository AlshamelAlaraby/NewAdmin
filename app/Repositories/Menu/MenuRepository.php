<?php

namespace App\Repositories\Menu;

use Illuminate\Support\Facades\DB;

class MenuRepository implements MenuInterface
{

    public function __construct(private \App\Models\Menu $model)
    {
        $this->model = $model;
    }//end of contructor

    public function all($request)
    {
        $models = $this->model->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');

        if ($request->per_page) {
            return ['data' => $models->paginate($request->per_page), 'paginate' => true];
        } else {
            return ['data' => $models->get(), 'paginate' => false];
        }
    }//end of all function

 
    public function find($id)
    {
        return $this->model->find($id);
    }//end of find function

    public function create($request)
    {
        return DB::transaction(function () use ($request) {
           return  $this->model->create($request->all());
        });
    }//end of create function

    public function update($request, $id)
    {
         DB::transaction(function () use ($id, $request) {
            $model =  $this->model->where("id", $id)->update($request->all());
            // $this->forget($id);
        });
    }//end of update function


    public function logs($id)
    {
        return $this->model->find($id)->activities()->orderBy('created_at', 'DESC')->get();
    }//end of logs function


    public function delete($id)
    {
        $model = $this->find($id);
        // $this->forget($id);
        $model->delete();
    }//end of delete function

    // private function forget($id)
    // {
    //     $keys = [
    //         "menus",
    //         "menus_" . $id,
    //     ];
    //     foreach ($keys as $key) {
    //         cacheForget($key);
    //     }
    // }//function to inject in delete function in the above

    public function getModuleMenus($company_id, $module_id){

        $model = $this->model->whereHas('company_modules',function ($query) use ($company_id, $module_id) {
            $query->where([['company_id',$company_id],['module_id',$module_id]]);
        })->first();

        return $model;
        
    }
}
