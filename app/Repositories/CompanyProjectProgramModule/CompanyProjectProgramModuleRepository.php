<?php

namespace App\Repositories\CompanyProjectProgramModule;

use App\Models\CompaniesProgram;
use App\Models\CompanyProjectProgramModule;
use App\Models\Menu;
use Illuminate\Support\Facades\DB;

class CompanyProjectProgramModuleRepository implements CompanyProjectProgramModuleInterface
{

    private $model;
    public function __construct(CompanyProjectProgramModule $model)
    {
        $this->model = $model;

    }

    public function getCompanyModules($request)
    {
        $models = $this->model->when($request->company_ids,function ($q) use($request){
            $q->whereIn('company_id',$request->company_ids);
        })
        ->where(function ($q) use ($request) {
            $this->model->scopeFilter($q, $request);
        })->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');

        return ['data' => $models->paginate($request->per_page), 'paginate' => true];

    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function create($request)
    {

        return DB::transaction(function () use ($request) {
            $model = $this->model->create($request);
            if( isset($request['document_types']) ){
                $model->documentTypes()->attach($request['document_types']);
            }
            return $model;
        });

    }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($id, $request) {
            $model = $this->model->find($id);
            $model->update(collect($request)->except('document_types')->toArray());
            if (isset($request['document_types'])) {
                $model->documentTypes()->sync($request['document_types']);
            }
            return $model;
        });
    }

    public function delete($id)
    {
        $model = $this->find($id);
        // $this->forget($id);
        $model->delete();
    }

    public function logs($id)
    {
        return $this->model->find($id)->activities()->orderBy('created_at', 'DESC')->get();
    }

    public function attach_or_detach_companies_with_programs($request)
    {
        if($request->action == 'attach'){
            CompaniesProgram::create(['program_id' => $request->program_id , 'company_id' => $request->company_id]);
        }else{
            $company_program = CompaniesProgram::where('program_id' , $request->program_id)->where('company_id' , $request->company_id)->first();
            $company_program->modules()->delete();
            $company_program->delete();
        }
    }

    public function get_programs_and_modules_for_company($company)
    {
        return $company->programs()->select('project_program_modules.id','project_program_modules.icon','project_program_modules.name','project_program_modules.name_e','companies_programs.id as company_program_id')->get();
    }





}
