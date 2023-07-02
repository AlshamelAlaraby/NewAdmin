<?php

namespace App\Http\Controllers\Module;

use App\Http\Requests\Module\CreateProgramChildrenRequest;
use App\Models\ProjectProgramModule;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Repositories\Module\ModuleInterface;
use App\Http\Resources\Module\ModuleResource;
use App\Http\Requests\Module\AllModuleRequest;
use App\Http\Requests\Module\StoreModuleRequest;
use App\Http\Requests\Module\ModuleRequest;
use App\Http\Requests\Module\AddCompanyToModuleRequest;

class ModuleController extends Controller
{
    public function __construct(private ModuleInterface $modelInterface)
    {
        $this->modelInterface = $modelInterface;
    }

    public function find($id)
    {
        // $model = cacheGet('modules_' . $id);
        // if (!$model) {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
            // } else {
            //     cachePut('modules_' . $id, $model);
            // }
        }
        return responseJson(200, 'success', new ModuleResource($model));
    }

    public function all(AllModuleRequest $request)
    {
        // if (count($_GET) == 0) {
        //     $models = cacheGet('modules');
        //     if (!$models) {
        //         $models = $this->modelInterface->all($request);
        //         cachePut('modules', $models);
        //     }
        // } else {
        $models = $this->modelInterface->all($request);
        // }

        return responseJson(200, 'success', ModuleResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }
    public function getRootNodes()
    {
        return $this->modelInterface->getRootNodes();
    }
    public function getChildNodes($parentId)
    {
        return $this->modelInterface->getChildNodes($parentId);
    }

    public function create(ModuleRequest $request)
    {
        $model = $this->modelInterface->create($request);
        return $model;
    }

    public function update(ModuleRequest $request, $id)
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

    public function allProgramModuleId(Request $request)
    {
        $models = $this->modelInterface->allProgramModuleId($request);
        return responseJson(200, 'success', ModuleResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);

    }

}
