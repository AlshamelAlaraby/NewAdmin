<?php

namespace App\Repositories\Module;

use App\Models\ProjectProgramModule;

class ModuleRepository implements ModuleInterface
{

    public function __construct(private \App\Models\Module $model,private ProjectProgramModule $module)
    {
        $this->model = $model;
    }

    public function all($request)
    {
        $models = $this->module->where('is_module',1)->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');

        if ($request->per_page) {
            return ['data' => $models->paginate($request->per_page), 'paginate' => true];
        } else {
            return ['data' => $models->get(), 'paginate' => false];
        }
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

}
