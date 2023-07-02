<?php

namespace App\Http\Controllers\MenuTree;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuTree\StoreMenuTreeRequest;
use App\Http\Requests\MenuTree\MenuTreeRequest;
use App\Http\Resources\MenuTree\MenuTreeResources;
use Illuminate\Http\Request;

class MenuTreeController extends Controller
{
    public function __construct(private \App\Repositories\MenuTree\MenuTreeInterface $modelInterface)
    {
        $this->modelInterface = $modelInterface;
    }

    
    public function all(Request $request)
    {
        // if (count($_GET) == 0) {
        //     $models = cacheGet('menu_trees');
        //     if (!$models) {
        //         $models = $this->modelInterface->all($request);
        //         cachePut('menu_trees', $models);
        //     }
        // } else {
            $models = $this->modelInterface->all($request);
        // }

        return responseJson(200, 'success', MenuTreeResources::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }


    public function find($id)
    {
        // $model = cacheGet('menu_trees_' . $id);
        // if (!$model) {
            $model = $this->modelInterface->find($id);
            if (!$model) {
                return responseJson(404, __('message.data not found'));
            // } else {
            //     cachePut('menu_trees_' . $id, $model);
            // }
        }
        return responseJson(200, 'success', new MenuTreeResources($model));
    }


    public function create(MenuTreeRequest $request)
    {
        $model = $this->modelInterface->create($request->validated());
        $model->refresh();
        return responseJson(200, 'success' ,new MenuTreeResources($model));

    }

    public function update(MenuTreeRequest $request, $id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $this->modelInterface->update($request, $id);
        $model->refresh();
        return responseJson(200, 'success',new MenuTreeResources($model));
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


    public function delete($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $this->modelInterface->delete($id);

        return responseJson(200, 'success');
    }//end of delete function

    public function bulkDelete(Request $request)
    {
        foreach ($request->ids as $id) {
            $this->modelInterface->delete($id);
        }
        return responseJson(200, __('Done'));
    }

    public function getMenuRootNodes($menuId)
    {
        return $this->modelInterface->getMenuRootNodes($menuId);
    }

    public function getChildNodes($parentId)
    {
        return $this->modelInterface->getChildNodes($parentId);
    }

    public function getModuleRootNodes($companyId,$moduleId){
        return $this->modelInterface->getModuleRootNodes($companyId,$moduleId);
    }    
}
