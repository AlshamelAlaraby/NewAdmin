<?php

namespace App\Repositories\ProjectProgramModule;

use Illuminate\Support\Facades\DB;

class ProjectProgramModuleRepository implements ProjectProgramModuleInterface
{

    public function __construct(private \App\Models\ProjectProgramModule $model)
    {
        $this->model = $model;
    }

    public function all($request)
    {
        $modules = $this->model->whereHas('modules')->get()->pluck('id')->toArray();

        $models = $this->model->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');

        if ($request->program_modules) {
            $models->whereNotIn("id", $modules);
        }

        if ($request->child == "true") {
            $models->whereNotNull("parent_id");
        }

        if ($request->program_parent) {
            $models->whereNull("parent_id")->where('is_module', 0);
        }

        if ($request->module_child) {
            $models->whereNull("parent_id")->where('is_module', 1);
        }

        if ($request->per_page) {
            return ['data' => $models->paginate($request->per_page), 'paginate' => true];
        } else {
            return ['data' => $models->get(), 'paginate' => false];
        }
    }

    public function getRootNodes()
    {
        return $this->model->whereNull("parent_id")->where("is_module", 0)->get();
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
        foreach ($request['modules'] as $index => $module_id) {
            $model_create = $this->model->find($module_id);
            $model_exists = $this->model->where('name', $model_create['name'])->where('name_e', $model_create['name_e'])->where('parent_id', $request['program_id'])->first();
            if (!$model_exists) {
                $model = $this->model->create(collect($model_create)->except(['id', 'created_at', 'updated_at'])->all());
                $model->update(['parent_id' => $request['program_id'], 'is_module' => 0, 'module_id' => $model_create['id']]);
            }
            if ($index == count($request["modules"]) - 1) {
                return $model;
            }
        }
    }

    public function allProgramModuleId($request)
    {
        $project = $this->model->where('is_module', '1')->get()->pluck('id')->toArray();

        $modules = $this->model->whereIn('module_id', $project);

        if ($request->per_page) {
            return ['data' => $modules->paginate($request->per_page), 'paginate' => true];
        } else {
            return ['data' => $modules->get(), 'paginate' => false];
        }
    }

    public function companyProjectProgramModules($name_company)
    {
        $models = $this->model->whereRelation('companies', 'name_e', $name_company)->get();
        return $models;
    }

    public function programModulesCompanyId($company_id)
    {
        $models = $this->model->with(['companies' => function ($q) use ($company_id) {
            $q->where('company_id', $company_id);
        }])->whereRelation('companies', 'company_id', $company_id)->get();

        return $models;
    }

}
