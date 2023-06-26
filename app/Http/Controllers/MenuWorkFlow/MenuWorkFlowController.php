<?php

namespace App\Http\Controllers\MenuWorkFlow;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuWorkFlow\MenuWorkFlowRequest;
use App\Http\Resources\MenuWorkFlow\MenuWorkFlowResource;
use App\Repositories\MenuWorkFlow\MenuWorkFlowInterface;
use Illuminate\Http\Request;

class MenuWorkFlowController extends Controller
{

    protected $repository;

    public function __construct(MenuWorkFlowInterface $repository)
    {
        $this->repository = $repository;
    }


    public function create(MenuWorkFlowRequest $request)
    {

        $model = $this->repository->create($request->validated());

        return responseJson(200, __('Done'));
    }

    public function update(MenuWorkFlowRequest $request, $workflow_id, $company_id)
    {  
        $model = $this->repository->update($request->validated(),$workflow_id, $company_id);

        return responseJson(200, __('Done'));
    }

    public function find($id)
    {
        // $model = cacheGet('menu_trees_' . $id);
        // if (!$model) {
            $model = $this->repository->find($id);
            if (!$model) {
                return responseJson(404, __('message.data not found'));
            // } else {
            //     cachePut('menu_trees_' . $id, $model);
            // }
        }
        return responseJson(200, 'success', new MenuWorkFlowResource($model));
    }

 public function logs($id)
    {

        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $logs = $this->repository->logs($id);
        return responseJson(200, 'success', $logs);
    }


    public function delete($id)
    {
        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $this->repository->delete($id);

        return responseJson(200, 'success');
    }//end of delete function

    public function bulkDelete(Request $request)
    {
        foreach ($request->ids as $id) {
            $this->repository->delete($id);
        }
        return responseJson(200, __('Done'));
    }

}
