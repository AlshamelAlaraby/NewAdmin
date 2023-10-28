<?php

namespace App\Http\Controllers;

use App\Http\Resources\ModuleResource;
use App\Repositories\Module\ModuleInterface;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function __construct(private ModuleInterface $model)
    {
        $this->model = $model;
    }

    public function find($id)
    {
        $model = $this->model->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        return responseJson(200, 'success', new ModuleResource($model));
    }

    public function all(Request $request)
    {
        $models = $this->model->all($request);
        return responseJson(200, 'success', ModuleResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }

}
