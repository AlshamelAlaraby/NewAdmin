<?php

namespace App\Repositories\CompanyProjectProgramModule;

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
        DB::transaction(function () use ($request) {
            $model = $this->model->create($request);
            if( isset($request['document_types']) ){
                $model->documentTypes()->attach($request['document_types']);
            }
        });

    }

    public function update($request, $id)
    {
        DB::transaction(function () use ($id, $request) {
            $model = $this->model->find($id);
            $model->update(collect($request)->except('document_types')->toArray());
            if (isset($request['document_types'])) {
                $model->documentTypes()->sync($request['document_types']);
            }
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



}
