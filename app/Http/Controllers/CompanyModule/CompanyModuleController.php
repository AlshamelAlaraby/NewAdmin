<?php

namespace App\Http\Controllers\CompanyModule;

use App\Http\Controllers\ResponseController;
use App\Http\Requests\CompanyModule\CompanyModuleRequest;
use App\Http\Resources\CompanyModule\CompanyModuleResource;
use App\Repositories\CompanyModule\CompanyModuleRepositoryInterface;
use Illuminate\Http\Request;

class CompanyModuleController extends ResponseController
{

    protected $repository;
    protected $resource = CompanyModuleResource::class;

    public function __construct(CompanyModuleRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function all(Request $request)
    {


        $models = $this->repository->getCompanyModules($request);

        return responseJson(200, 'success', ($this->resource)::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }

    public function find($id)
    {

        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));

        }
        return responseJson(200, __('Done'), new CompanyModuleResource($model), );
    }

    public function store(CompanyModuleRequest $request)
    {

        return responseJson(200, __('Done'), $this->repository->create($request->validated()));
    }

    public function update(CompanyModuleRequest $request, $id)
    {

        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $model = $this->repository->update($request->validated(), $id);

        return responseJson(200, __('Done'));
    }

    public function delete($id)
    {

        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        if ($model->hasChildren()) {
            return responseJson(400, __('message.data has relation cant delete'));
        }
        $this->repository->delete($id);
        return responseJson(200, __('Done'));
    }

    public function bulkDelete(Request $request)
    {
        foreach ($request->ids as $id) {
            $this->repository->delete($id);
        }
        return responseJson(200, __('Done'));
    }

    public function logs($id)
    {
        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $logs = $this->repository->logs($id);
        return responseJson(200, 'success', \App\Http\Resources\Log\LogResource::collection($logs));
    }

}
