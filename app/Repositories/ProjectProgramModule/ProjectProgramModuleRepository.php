<?php

namespace App\Repositories\ProjectProgramModule;

use App\Models\ModuleDashboard;
use App\Models\ModuleMenu;
use Illuminate\Support\Facades\DB;

class ProjectProgramModuleRepository implements ProjectProgramModuleInterface
{

    public function __construct(private \App\Models\ProjectProgramModule $model, private ModuleMenu $module_menu)
    {
        $this->model = $model;
        $this->module_menu = $module_menu;
    }

    public function all($request)
    {

        $models = $this->model->where('is_module',$request->program_parent ? 0 :1)->filter($request)->latest();

        //This for filter programs by modules in Programs pages
        if ($request->program_parent && $request->search) {
            $models->orWhereRelation('children',function($q) use($request){
                $q->where('name', 'like', '%' . $request->search . '%');
                $q->orWhere('name_e', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->module_child) {
            $models->whereNull("parent_id");
        }

        if ($request->per_page) {
            $data = $models->paginate($request->per_page);


            //this for get program modules and set them first in the modules dropdown in the partner page
            if ($request->program_modules && $request->inside_id) {
                $program_models = $this->model->where('parent_id',$request->inside_id)->get()->merge($data->items())->unique('id');
                $data->setCollection($program_models);
            }

            //return the selected module from dropdown when append module to tree menu
            if($request->selected_id){
                $selected_module_in_dropdown = $this->model->where('id',$request->selected_id)->get()->merge($data->items())->unique('id');
                $data->setCollection($selected_module_in_dropdown);
            }
            return ['data' => $data, 'paginate' => true];
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

    public function delete($request)
    {
        if($request->node_type == 'module'){
            $node = $this->model->where('is_module',1)->find($request->node_id);

            if($request->action == 'un_assign_module_to_program'){
                $node->update(['parent_id' => null]);
                return 1;
            }

        }

        else if($request->node_type == 'program'){
            $node =$this->model->where('is_module',0)->find($request->node_id);
            $this->model->where('parent_id',$node->id)->update(['parent_id' => null]);
            return 1;
        }
        else
            $node = $this->module_menu->find($request->node_id);

        if(isset($node)){

            $node->delete();
            return 1 ;
        }
        return 0;
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
        $modules = $this->model->where('is_module', '1');

        // $modules = $this->model->whereIn('module_id', $project);

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

    public function DropDown($request)
    {
        $models = $this->model->select('id','name','name_e')->distinct();

        if ($request->is_module) {
            $models->where('is_module', 1);
        }

        if ($request->per_page) {
            return ['data' => $models->paginate($request->per_page), 'paginate' => true];
        } else {
            return ['data' => $models->get(), 'paginate' => false];
        }
    }



    // create new menu item inside module or folder
    public function createNewMenuItem($request)
    {
        if($request->inside_type == 'program'){
            $module = $this->model->find($request->module_id);
            $module->update(['parent_id' => $request->inside_id,'sort' => $request->sort]);
            return $module;
        }
        if($request->type == 'page')
            $data = $request->only(['page_id','sort','type','module_id']);
        else
            $data = $request->only(['name','name_e','sort','type','module_id']);

        $data['folder_id'] = $request->inside_type =='folder' ? $request->inside_id : null;
        return $this->module_menu->create($data);

    }


    // edit menu item
    public function editTreeItem($request)
    {
        $data = [];
        $node = $request->node;
        if($request->node_type == 'page')
            $node->update(['sort' => $request->sort]);
        elseif($request->node_type == 'folder')
            $data = $request->only(['name','name_e','sort']);
        elseif($request->node_type == 'module' || $request->node_type == 'program')
            $data = $request->only(['name','name_e','icon',isset($request->action) && $request->node_type == 'module' ? 'sort' : '','module_dashboard_id']);


        if($data)
            $node->update($data);

        return $node;

    }

    public function module_dashboards($request){
        $data = ModuleDashboard::select('id','name','name_e')->when($request->search ,function($q) use($request) {
            $q->where('name','like',"%$request->search%")->orWhere('name_e','like',"%$request->search%");
        })->paginate(20);

        if($request->selected_module_dashboard_id){
            $selected_dashboard_in_dropdown = ModuleDashboard::select('id','name','name_e')->where('id',$request->selected_module_dashboard_id)->get()->merge($data->items());
            $data->setCollection($selected_dashboard_in_dropdown);
        }

        return $data;
    }

    public function getChildrenInsideModule($module){
        $menu = $this->module_menu->with(['page','childrens' => function ($q) {$q->orderBy('sort');}])->where('module_id',$module->id)->whereNull('folder_id')->orderBy('sort')->get();
        $childrens = $this->arrangeMenu($menu);
        return $childrens ;

    }



    protected function arrangeMenu($menu)
    {
        $arrangedMenu = [];

        foreach ($menu as $item) {
            $children = $item->childrens->load(['page','childrens'=> function ($q) {$q->orderBy('sort');}])->sortBy('sort');

            if ($children->isNotEmpty()) {
                $item->childrens = $this->arrangeMenu($children);
            }

            $arrangedMenu[] = $item;
        }

        return $arrangedMenu;
    }


}
