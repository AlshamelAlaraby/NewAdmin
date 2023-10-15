<?php

namespace App\Http\Controllers;

use App\Http\Resources\ModuleScreenResource;
use App\Models\ModuleScreen;
use Illuminate\Http\Request;

class ModuleScreenController extends Controller
{
    public function __construct(private ModuleScreen $model)
    {
        $this->model = $model;
    }

    public function all(Request $request)
    {
        $models = $this->model->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');

        if ($request->per_page) {
            $models = ['data' => $models->paginate($request->per_page), 'paginate' => true];
        } else {
            $models = ['data' => $models->get(), 'paginate' => false];
        }

        return responseJson(200, 'success', ModuleScreenResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }
}
