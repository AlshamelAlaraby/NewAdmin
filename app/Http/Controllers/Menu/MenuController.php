<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use App\Http\Requests\Menu\StoreMenuRequest;
use App\Http\Requests\Menu\MenuRequest;
use App\Http\Resources\Menu\MenuResource;
use App\Models\Menu;
use App\Models\Screen;
use App\Repositories\Menu\MenuInterface;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function __construct(private MenuInterface $modelInterface)
    {
        $this->modelInterface = $modelInterface;
    } //end of construct

    public function all(Request $request)
    {

        // if (count($_GET) == 0) {
        //     $models = cacheGet('menus');
        //     if (!$models) {
        //         $models = $this->modelInterface->all($request);
        //         cachePut('menus', $models);
        //     }
        // } else {
        $models = $this->modelInterface->all($request);
        // }

        return responseJson(200, 'success', MenuResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    } //end of all function

    public function find($id)
    {
        // $model = cacheGet('menus_' . $id);
        // if (!$model) {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
            // } else {
            //     cachePut('menus_' . $id, $model);
            // }
        }
        return responseJson(200, 'success', new MenuResource($model));
    } //end of find function

    public function create(MenuRequest $request)
    {
        $model = $this->modelInterface->create($request);
        return responseJson(200, 'success', new MenuResource($model));
    } //end of create function

    public function update(MenuRequest $request, $id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $model = $this->modelInterface->update($request, $id);
        // $model->refresh();
        return responseJson(200, 'success');
    } //end of update function

    public function delete($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        if ($model->hasChildren()) {
            return responseJson(400, __('message.data has relation cant delete'));
        }
        $this->modelInterface->delete($id);



        return responseJson(200, 'success');
    } //end of delete function

    public function logs($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $logs = $this->modelInterface->logs($id);
        return responseJson(200, 'success', $logs);
    } //end of logs function


    public function bulkDelete(Request $request)
    {
        foreach ($request->ids as $id) {
            $model = $this->find($id);
            $arr = [];
            if ($model->hasChildren()) {
                $arr[] = $id;
                continue;
            }
            $this->modelInterface->delete($id);
        }
        if (count($arr) > 0) {
            return responseJson(200, __('some items has relation cant delete'));
        }
        return responseJson(200, __('Done'));
    }


    public function getModuleMenus($company_id, $module_id)
    {
        $model = $this->modelInterface->getModuleMenus($company_id, $module_id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        return responseJson(200, 'success', new MenuResource($model));
    }
}
