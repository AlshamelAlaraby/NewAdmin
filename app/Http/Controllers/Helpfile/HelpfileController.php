<?php

namespace App\Http\Controllers\Helpfile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Helpfile\HelpfileRequest;
use App\Http\Requests\Helpfile\UpdateHelpfileRequest;
use App\Http\Resources\Helpfile\HelpfileResource;
use App\Repositories\Helpfile\HelpfileRepositoryInterface;
use Illuminate\Http\Request;
use Mockery\Exception;

class HelpfileController extends Controller
{

    protected $repository;
    protected $resource = HelpfileResource::class;

    public function __construct(HelpfileRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function all(Request $request)
    {


        $models = $this->repository->getAllHelpfiles($request);
        return responseJson(200, 'success', HelpfileResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }

    public function find($id)
    {
       $model = $this->repository->find($id);
        if (!$model) {
          return responseJson(404, __('message.data not found'));
        }
        return responseJson(200, __('Done'), new HelpfileResource($model));
    }

    public function store(HelpfileRequest $request)
    {
        return responseJson(200, __('Done'), $this->repository->create($request->validated()));
    }

    public function update(HelpfileRequest $request, $id)
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
            $model = $this->repository->find($id);
            $arr = [];
            if ($model->hasChildren()) {
                $arr[] = $id;
                continue;
            }
            $this->repository->delete($id);
        }
        if (count($arr) > 0) {
            return responseJson(200, __('some items has relation cant delete'));
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
        return responseJson(200, __('Done'), \App\Http\Resources\Log\LogResource::collection($logs));
    }
}
