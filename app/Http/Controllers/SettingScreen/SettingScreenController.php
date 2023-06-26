<?php

namespace App\Http\Controllers\SettingScreen;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingScreen\SettingScreenRequest;
use App\Http\Resources\ScreenSetting\ScreenSettingResource;
use App\Repositories\SettingScreen\SettingScreenInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingScreenController extends Controller
{
    private $modelInterface;
    public function __construct(SettingScreenInterface$modelInterface)
    {
        $this->modelInterface = $modelInterface;
    }

    public function find($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        return responseJson(200, 'success', new ScreenSettingResource($model));
    }

    public function all(Request $request)
    {
       $models = $this->modelInterface->all($request);
       return responseJson(200, 'success', ScreenSettingResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }


    public function create(SettingScreenRequest $request)
    {
        $model = $this->modelInterface->create($request->validated());
        $model->refresh();
        return responseJson(200, 'success', new ScreenSettingResource($model));
    }


    public function update(SettingScreenRequest $request, $id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $this->modelInterface->update($request, $id);
        $model->refresh();
        return responseJson(200, 'success', new ScreenSettingResource($model));
    }

    public function logs($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }

        $logs = $this->modelInterface->logs($id);
        return responseJson(200, 'success', \App\Http\Resources\Log\LogResource::collection($logs));
    }

    public function delete($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }

        $this->modelInterface->delete($id);
        return responseJson(200, 'success');
    }

    public function bulkDelete(Request $request)
    {
        foreach ($request->ids as $id) {
            $this->modelInterface->delete($id);
        }
        return responseJson(200, __('Done'));
    }


}
