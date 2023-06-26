<?php

namespace App\Repositories\Screen;

use App\Exceptions\NotFoundException;
use App\Http\Resources\Screen\ScreenResource;
use App\Models\Screen;
use App\Models\ScreenAttribute;
use App\Models\ScreenDocumentType;
use Illuminate\Support\Facades\DB;

class ScreenRepository implements ScreenRepositoryInterface
{

    public function __construct(private Screen $model)
    {
    }

    public function getAllScreens($request)
    {
        $models = $this->model->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');
        if ($request->module_id) {
            $models->whereIn('module_id', [1, $request->module_id]);
        }
        if ($request->sub_menu_id) {
            $models->where('sub_menu_id', $request->sub_menu_id);
        }
        if ($request->menu_tree_id) {
            $models->whereHas('menu_tree', function ($q) use ($request) {
                $q->where('menu_tree_id', $request->menu_tree_id);
            });
        }
        if ($request->company_id) {
            $models->whereHas('menu_tree', function ($q) use ($request) {
                $q->where('company_id', $request->company_id);
            });
        }

        if ($request->workflow_id) {
            $models->whereHas('menu_tree', function ($q) use ($request) {
                $q->where('workflow_id', $request->workflow_id);
            });
        }

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

    public function create($request)
    {


        return DB::transaction(function () use ($request) {
            $model = $this->model->create($request);
            //screens_attributes--
            // if ($request['module_id'] && $request['attributes']) {
            //     $model->modules()->attach($request['module_id'], ['attributes' => json_encode($request['attributes'])]);
            // }
            return $model;
        });
    }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($id, $request) {
            $model = $this->model->find($id);
            $model->update($request);
            if ($model->modules) {
                ScreenAttribute::where('screen_id', $id)->delete();
            }
            // if ($request['module_id'] && $request['attributes']) {
            //     $model->modules()->attach($request['module_id'], ['attributes' => json_encode($request['attributes'])]);
            // }
            return $model;
        });
    }
    public function delete($id)
    {
        $model = $this->find($id);
        // $this->forget($id);
        $model->delete();
    }

    public function addScreenToDocumentType($request)
    {
        $screen = $this->model->find($request->screen_id);
        if (!$screen) {
            throw new NotFoundException();
        }
        $screen->documentTypes()->attach($request->documentType_id);
    }
    public function removeScreenFromDocumentType($screen_id, $documentType_id)
    {
        $screen = $this->model->find($screen_id);
        if (!$screen) {
            throw new NotFoundException();
        }
        $screen->documentTypes()->detach($documentType_id);
    }
    public function getScreenButtons($screen_id)
    {
        $screen = $this->model->find($screen_id);
        return $screen->buttons;
    }
    public function screenDocumentExist($screen_id, $documentType_id)
    {
        return ScreenDocumentType::where("screen_id", $screen_id)->where("document_type_id", $documentType_id)
            ->count() > 0;
    }
    public function getScreenDocumentTypes($screen_id)
    {
        $screen = $this->model->find($screen_id);
        return $screen->documentTypes;
    }

    public function logs($id)
    {

        return $this->model->find($id)->activities()->orderBy('created_at', 'DESC')->get();
    }

    public function createSubMenuScreen($request)
    {
        foreach ($request['screens'] as $screen):
            $model_exists = $this->model->where('name',$screen['name'])->where('sub_menu_id',$request['sub_menu_id'])->where('company_id',null)->first();
            if (!$model_exists):
                $this->model->create(array_merge($screen,['sub_menu_id'=>$request['sub_menu_id']]));
            endif;
        endforeach;

    }

    public function createCompanyScreen($request)
    {
        foreach ($request['screens'] as $screen ):
            $model_create = $this->model->where('id',$screen)->first();

            $model_exist = $this->model->where('name',$model_create->name)
            ->where('sub_menu_id',$request['sub_menu_id'])
            ->where('company_id',$request['company_id'])->first();

            if (!$model_exist){
                $this->model->create([
                    "name"            => $model_create->name,
                    "name_e"          => $model_create->name_e,
                    "title"           => $model_create->title,
                    "title_e"         => $model_create->title_e,
                    "sort"            => $model_create->sort,
                    "is_implementor"  => $model_create->is_implementor,
                    "is_add_on"       => $model_create->is_add_on,
                    "url"             => $model_create->url,
                    "serial_id"       => $model_create->serial_id,
                    "company_id"      => $request['company_id'],
                    "sub_menu_id"     => $request['sub_menu_id'],
                ]);
            }

        endforeach;

    }

    public function getAllCompanyScreen($request)
    {
        $models = $this->model->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');

        if ($request->sub_menu_id) {
            $models->where('sub_menu_id', $request->sub_menu_id);
        }

        if ($request->company_id == 0) {
            $models->where('company_id', null);
        }


        if ($request->company_id) {
            $models->where('company_id', $request->company_id);
        }


        if ($request->per_page) {
            return ['data' => $models->paginate($request->per_page), 'paginate' => true];
        } else {
            return ['data' => $models->get(), 'paginate' => false];
        }
    }
}
