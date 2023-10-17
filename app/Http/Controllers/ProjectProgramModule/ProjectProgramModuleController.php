<?php

namespace App\Http\Controllers\ProjectProgramModule;

use App\Http\Requests\ProjectProgramModule\CreateProgramChildrenRequest;
use App\Models\ProjectProgramModule;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Repositories\ProjectProgramModule\ProjectProgramModuleInterface;
use App\Http\Resources\ProjectProgramModule\ProjectProgramModuleResource;
use App\Http\Requests\ProjectProgramModule\AllProjectProgramModuleRequest;
use App\Http\Requests\ProjectProgramModule\ProjectProgramModuleRequest;
use App\Http\Requests\ProjectProgramModule\AddCompanyToModuleRequest;
use App\Http\Resources\PartnerLogin\CompanyLoginResource;
use App\Models\Company;

class ProjectProgramModuleController extends Controller
{
    public function __construct(private ProjectProgramModuleInterface $modelInterface)
    {
        $this->modelInterface = $modelInterface;
    }

    public function find($id)
    {

        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        return responseJson(200, 'success', new ProjectProgramModuleResource($model));
    }

    public function all(AllProjectProgramModuleRequest $request)
    {

        $models = $this->modelInterface->all($request);
        return responseJson(200, 'success', ProjectProgramModuleResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }
    public function getRootNodes()
    {
        return $this->modelInterface->getRootNodes();
    }
    public function getChildNodes($parentId)
    {
        return $this->modelInterface->getChildNodes($parentId);
    }

    public function create(ProjectProgramModuleRequest $request)
    {
        $model = $this->modelInterface->create($request);
        return $model;
    }

    public function update(ProjectProgramModuleRequest $request, $id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $model = $this->modelInterface->update($request, $id);

        return responseJson(200, 'success');
    }

    public function delete($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        if ($model->hasChildren()) {
            return responseJson(400, __('message.parent have children'));
        }
        $this->modelInterface->delete($id);

        return responseJson(200, 'success');
    }

    public function logs($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $logs = $this->modelInterface->logs($id);
        return responseJson(200, 'success', $logs);
    }
    public function bulkDelete(Request $request)
    {
        foreach ($request->ids as $id) {
            $model = $this->modelInterface->find($id);
            if (!$model->hasChildren()) {
                $this->modelInterface->delete($id);
            }
        }
        return responseJson(200, __('Done'));
    }

    public function addModuleToCompany(AddCompanyToModuleRequest $request)
    {
        $this->modelInterface->addModuleToCompany($request);
        return responseJson(200, 'success');
    }

    public function removeModuleFromCompany($module_id, $company_id)
    {

        $this->modelInterface->removeModuleFromCompany($module_id, $company_id);
        return responseJson(200, 'success');
    }

    public function createProgramChildren(CreateProgramChildrenRequest $request)
    {
        return $this->modelInterface->createProgramChildren($request);
    }

    public function getCompanyProjectProgramModules($name_company)
    {
        return $this->modelInterface->companyProjectProgramModules($name_company);
    }
    // public function findProgramModulesCompanyId($company_id)
    // {
    //     return $this->modelInterface->programModulesCompanyId($company_id);
    // }


    public function findProgramModulesCompanyId($company_id)
    {
        $models = Company::find($company_id);


        return responseJson(200, 'success', new CompanyLoginResource($models));

    }

    public function allProgramModuleId(Request $request)
    {
        $models = $this->modelInterface->allProgramModuleId($request);
        return responseJson(200, 'success', ProjectProgramModuleResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);

    }

}
