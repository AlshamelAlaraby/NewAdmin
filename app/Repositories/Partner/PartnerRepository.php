<?php

namespace App\Repositories\Partner;

use App\Models\ModuleMenu;
use App\Models\Partner;
use App\Models\UserSettingScreen;
use App\Traits\ApiResponser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PartnerRepository implements PartnerRepositoryInterface
{

    use ApiResponser;
    private $model;
    public function __construct(Partner $model,private ModuleMenu $module_menu)
    {
        $this->model = $model;
        $this->module_menu = $module_menu;

    }

    public function getAllPartners($request)
    {
        $models = $this->model->where(function ($q) use ($request) {
            $this->model->scopeFilter($q , $request);
        })->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');;

        return ['data' => $models->paginate($request->per_page), 'paginate' => true];

    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function create($request)
    {
        return DB::transaction(function () use ($request) {
            $data = $request;
            $data['password'] = Hash::make($data['password']);
            return $this->model->create($data);
        });
    }

    public function update($request, $id)
    {
       return DB::transaction(function () use ($id, $request) {
            $data = $request;
            if (isset($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            }
            $this->model->where("id", $id)->update($data);
            return $this->model->where("id", $id)->first();
        });
    }

    public function delete($id)
    {
        $model = $this->find($id);
        $model->delete();
    }

    public function logs($id)
    {
        return $this->model->find($id)->activities()->orderBy('created_at', 'DESC')->get();
    }


    public function getChildrenInsideModule($module){
        $menu = $this->module_menu->with(['page','page.ModuleScreen','childrens' => function ($q) {$q->orderBy('sort');}])->where('module_id',$module->id)->whereNull('folder_id')->orderBy('sort')->get();
        $childrens = $this->arrangeMenu($menu);
        return $childrens ;

    }


    protected function arrangeMenu($menu)
    {
        $arrangedMenu = [];

        foreach ($menu as $item) {
            $children = $item->childrens->load(['page','page.ModuleScreen','childrens'=> function ($q) {$q->orderBy('sort');}])->sortBy('sort');

            if ($children->isNotEmpty()) {
                $item->childrens = $this->arrangeMenu($children);
            }

            $arrangedMenu[] = $item;
        }

        return $arrangedMenu;
    }


    public function get_programs_and_modules_for_company($company)
    {
        return $company->programs()->select('project_program_modules.id','project_program_modules.icon','project_program_modules.name','project_program_modules.name_e','companies_programs.id as company_program_id')->get();
    }

}
