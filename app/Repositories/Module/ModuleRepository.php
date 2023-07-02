<?php

namespace App\Repositories\Module;

use Illuminate\Support\Facades\DB;

class ModuleRepository implements ModuleInterface
{

    public function __construct(private \App\Models\ProjectProgramModule $model)
    {
        $this->model = $model;
    }

    public function all($request)
    {
        $models = $this->model->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');
        if ($request->child=="true") {
            $models->where("parent_id","<>",0);
        }

        if ($request->program_parent) {
            $models->where("parent_id",0)->where('is_module',0);
        }

        if ($request->module_child) {
            $models->where("parent_id",0)->where('is_module',1);
        }

        if ($request->per_page) {
            return ['data' => $models->paginate($request->per_page), 'paginate' => true];
        } else {
            return ['data' => $models->get(), 'paginate' => false];
        }
    }

    public function getRootNodes()
    {
        return $this->model->where("parent_id", 0)->where("is_module",0)->get();
    }
    public function getChildNodes($parentId)
    {
        return $this->model->where("parent_id", $parentId)->get();
    }
    public function find($id)
    {
        return $this->model->find($id);
    }

    public function create($request)
    {
        return DB::transaction(function () use ($request) {
           return $this->model->create($request->all());
            // cacheForget("modules");
        });
    }

    public function update($request, $id)
    {
        DB::transaction(function () use ($id, $request) {
            $this->model->where("id", $id)->update($request->all());
            // $this->forget($id);
        });
    }

    public function logs($id)
    {
        return $this->model->find($id)->activities()->orderBy('created_at', 'DESC')->get();
    }

    public function delete($id)
    {
        $model = $this->find($id);
        // $this->forget($id);
        $model->delete();
    }

    public function addModuleToCompany($request)
    {
        $this->model->find($request->module_id)->companies()->attach($request->company_id, [
            "start_date" => $request->start_date,
            "end_date" => $request->end_date,
            "allowed_users_no" => $request->allowed_users_no,
        ]);
    }

    public function removeModuleFromCompany($module_id, $company_id)
    {
        $this->model->find($module_id)->companies()->detach($company_id);
    }

    public function createProgramChildren($request)
    {
        foreach ($request['modules'] as $module_id){
            $model_create =  $this->model->find($module_id);
           $model_exists  =  $this->model->where('name',$model_create['name'])->where('name_e',$model_create['name_e'])->where('parent_id',$request['program_id'])->first();
           if(!$model_exists){
               $model =  $this->model->create( collect($model_create)->except(['id','created_at','updated_at'])->all());
               $model->update([ 'parent_id'=>$request['program_id'] ,'is_module' =>0 ,'module_id'=>$model_create['id']]);
           }


        }
    }

    public function allProgramModuleId($request)
    {
        $project = $this->model->where('is_module','1')->get()->pluck('id')->toArray();

        $modules = $this->model->whereIn('module_id',$project);

        if ($request->per_page) {
            return ['data' => $modules->paginate($request->per_page), 'paginate' => true];
        } else {
            return ['data' => $modules->get(), 'paginate' => false];
        }
    }

    // private function forget($id)
    // {
    //     $keys = [
    //         "modules",
    //         "modules_" . $id,
    //     ];
    //     foreach ($keys as $key) {
    //         cacheForget($key);
    //     }
    // }

    // public function getScreensFromModule($request){

    //     $model = $this->model->where(function ($q) use ($request) {
    //         $q->when($request->module_id, function ($q) use ($request) {
    //             $q->whereHas('module', function ($q) use ($request) {
    //                 $q->where([['model_id',1],['model_id',$request->model_id]]);
    //             });
    //         });
    //     })->first();


    // }
}
