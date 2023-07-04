<?php

namespace App\Http\Controllers;

use App\Http\Requests\AllRequest;
use App\Http\Requests\CreateSubMenuAndMenuRequest;
use App\Http\Requests\SubMenuRequest;
use App\Http\Resources\SubMenuResource;
use App\Models\Screen;
use App\Models\SubMenu;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Routing\Controller;

class SubMenuController extends Controller
{

    public function __construct(private SubMenu $model)
    {
        $this->model = $model;
    }

    public function find($id)
    {
        $model = $this->model->find($id);
        if (!$model) {
            return responseJson(404, 'not found');
        }

        return responseJson(200, 'success', new SubMenuResource($model));
    }

    public function all(AllRequest $request)
    {
        $models = $this->model->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');
        if ($request->program_folder_menu_id == "0"){
            $models->where("program_folder_menu_id",null);

        }
        if($request->program_folder_menu_id){
            $models->where("program_folder_menu_id",$request->program_folder_menu_id);
        }
        if ($request->per_page) {
            $models = ['data' => $models->paginate($request->per_page), 'paginate' => true];
        } else {
            $models = ['data' => $models->get(), 'paginate' => false];
        }

        return responseJson(200, 'success', SubMenuResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }

    public function create(SubMenuRequest $request)
    {
        $model = $this->model->create($request->validated());
        $model->refresh();

        return responseJson(200, 'created', new SubMenuResource($model));
    }

    public function update($id, SubMenuRequest $request)
    {
        $model = $this->model->find($id);
        if (!$model) {
            return responseJson(404, 'not found');
        }

        $model->update($request->validated());
        $model->refresh();

        return responseJson(200, 'updated', new SubMenuResource($model));
    }

    public function logs($id)
    {
        $model = $this->model->find($id);
        if (!$model) {
            return responseJson(404, 'not found');
        }

        $logs = $model->activities()->orderBy('created_at', 'DESC')->get();
        return responseJson(200, 'success', \App\Http\Resources\Log\LogResource::collection($logs));
    }

    public function delete($id)
    {
        $model = $this->model->find($id);
        if (!$model) {
            return responseJson(404, 'not found');
        }
        if ($model->hasChildren()) {
            return responseJson(400, __('message.parent have children'));
        }
        $model->delete();

        return responseJson(200, 'deleted');
    }

    public function bulkDelete()
    {

        $ids = request()->ids;
        foreach ($ids as $id) {
            $model = $this->model->find($id);
            if (!$model->hasChildren()) {
                    $model->delete();
            }
        }

        return responseJson(200, 'deleted');
    }

    public function createSubMenuAndMenu(CreateSubMenuAndMenuRequest $request)
    {
        $model_create = $this->model->where('id',$request['sub_menu_id'])->first();
        $collect =  collect($model_create)->except(['created_at','updated_at','id']);

        $model_exists = $this->model->where('name',$model_create->name)->where('program_folder_menu_id',$request['menu_id'])->first();
        if (!$model_exists){
            $model = $this->model->create($collect->all());
            $model->update(['program_folder_menu_id'=> $request['menu_id']]);

            $model_screens = Screen::where('sub_menu_id',$request['sub_menu_id'])->where('company_id',null)->get();
            foreach ($model_screens as $screen){
                $collect =  collect($screen)->except(['created_at','deleted_at','updated_at','id','sub_menu_id']);
                $collect_screen = Screen::create($collect->all());
                $collect_screen->update(["sub_menu_id"     => $model->id]);
            }
            return responseJson(200, 'success',  new SubMenuResource($model));
        }

        return responseJson(200, 'success',  new SubMenuResource($model_exists));


    }

    public function allSubMenu(AllRequest $request)
    {
        $models = $this->model->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');

        if ($request->program_folder_menu_id == "0"){
            $models->where("program_folder_menu_id",null);
        }
        if($request->program_folder_menu_id){
            $models->where("program_folder_menu_id",$request->program_folder_menu_id);
        }
        if ($request->per_page) {
            $models = ['data' => $models->paginate($request->per_page), 'paginate' => true];
        } else {
            $models = ['data' => $models->get(), 'paginate' => false];
        }

        return responseJson(200, 'success', SubMenuResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }


}
