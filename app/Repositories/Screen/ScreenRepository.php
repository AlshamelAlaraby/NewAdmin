<?php

namespace App\Repositories\Screen;

use App\Exceptions\NotFoundException;
use App\Models\Screen;
use App\Models\ScreenDocumentType;
use Illuminate\Support\Facades\DB;

class ScreenRepository implements ScreenRepositoryInterface
{

    public function __construct(private Screen $model)
    {
        $this->model = $model;
    }

    public function getAllScreens($request)
    {
        $models = $this->model->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');

        if ($request->sub_menu_id) {
            $models->where('sub_menu_id', $request->sub_menu_id);
        }

        if ($request->menu_id) {
            $models->where('menu_id', $request->menu_id);
        }

        if ($request->company_id) {
            $models->whereHas('menu_tree', function ($q) use ($request) {
                $q->where('company_id', $request->company_id);
            });
        }
        if ($request->screens_null) {
            $models->whereNull('sub_menu_id')->whereNull('company_id')->whereNull('parent_id');
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
            return $model;
        });
    }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($id, $request) {
            $model = $this->model->find($id);
            $model->update($request);
            if ($model->parent_id == null) {
                $model_id = $model->id;
            }
            if ($model->parent_id != null) {
                $model_id = $model->id;
            }
            $allModel = $this->model->where('parent_id', $model_id)->get();
            foreach ($allModel as $item):
                $item->update(collect($request)->except(['company_id', 'sub_menu_id', 'is_implementor', 'is_add_on'])->all());
            endforeach;
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
        foreach ($request['screens'] as $screen_id):
            $screen = $this->model->find($screen_id);
            $screen_create = collect($screen)->except(['deleted_at', 'created_at', 'updated_at', 'id', 'sub_menu_id']);
            $model_exists = $this->model->where('sub_menu_id', $request['sub_menu_id'])->where('parent_id', $screen->id)->where('company_id', null)->first();
            if (!$model_exists) {
                $this->model->create(array_merge($screen_create->all(), ['sub_menu_id' => $request['sub_menu_id'], 'parent_id' => $screen->id]));
            }
        endforeach;
    }

    public function createCompanyScreen($request)
    {
        foreach ($request['screens'] as $screen):

            $model_create = $this->model->where('id', $screen)->first();

            $collect = collect($model_create)->except(['created_at', 'deleted_at', 'updated_at', 'id', 'sub_menu_id', 'company_id']);
            $model_exist = $this->model->where('name_e', $model_create->name_e)
                ->where('sub_menu_id', $request['sub_menu_id'])
                ->where('company_id', $request['company_id'])->first();

            if (!$model_exist) {
                $model = $this->model->create(array_merge($collect->all(), ['sub_menu_id' => $request['sub_menu_id'], "company_id" => $request['company_id']]));
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

    public function createCompanyScreenMenu($request)
    {
        foreach ($request['screens'] as $screen):

            $model_create = $this->model->where('id', $screen)->first();

            $collect = collect($model_create)->except(['created_at', 'deleted_at', 'updated_at', 'id', 'menu_id', 'sub_menu_id', 'company_id']);
            $model_exist = $this->model->where('name_e', $model_create->name_e)
                ->where('menu_id', $request['menu_id'])
                ->first();

            if (!$model_exist) {
                $model = $this->model->create(array_merge($collect->all(), ['sub_menu_id' => null, "company_id" => null, 'parent_id' => $model_create->id, 'menu_id' => $request['menu_id'], 'type_screen' => 'screen']));
            }

        endforeach;
    }
}
