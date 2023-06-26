<?php

namespace App\Http\Controllers\FolderMenu;

use App\Http\Controllers\Controller;
use App\Http\Requests\FolderMenu\FolderMenuRequest;
use App\Http\Resources\FolderMenu\FolderMenuResource;
use App\Repositories\FolderMenu\FolderMenuInterface;
use Illuminate\Http\Request;

class FolderMenuController extends Controller
{
    public function __construct(private FolderMenuInterface $modelInterface)
    {
        $this->modelInterface = $modelInterface;
    }

    public function find($id)
    {

        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));

        }
        return responseJson(200, 'success', new FolderMenuResource($model));
    }

    public function all(Request $request)
    {

        $models = $this->modelInterface->all($request);

        return responseJson(200, 'success', FolderMenuResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }


    public function create(FolderMenuRequest $request)
    {
        $model = $this->modelInterface->create($request);
        return responseJson(200, 'success', new FolderMenuResource($model));
    }


    public function update(FolderMenuRequest $request, $id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $model = $this->modelInterface->update($request, $id);

        return responseJson(200, 'success', new FolderMenuResource($model));
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


}
