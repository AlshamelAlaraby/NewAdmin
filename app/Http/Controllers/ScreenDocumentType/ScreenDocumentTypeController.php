<?php

namespace App\Http\Controllers\ScreenDocumentType;

use App\Http\Controllers\Controller;
use App\Http\Requests\ScreenDocumentType\CreateScreenDocumentTypeRequest;
use App\Http\Requests\ScreenDocumentType\ScreenDocumentTypeRequest;
use App\Http\Resources\ScreenDocumentType\ScreenDocumentTypeResource;
use App\Repositories\ScreenDocumentType\ScreenDocumentTypeRepositoryInterface;
use Mockery\Exception;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Exceptions\NotFoundException;
use App\Http\Resources\Log\LogResource;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Controllers\ResponseController;
use App\Http\Resources\Partner\PartnerResource;
use App\Http\Requests\Partner\StorePartnerRequest;
use App\Http\Requests\Partner\UpdatePartnerRequest;
use App\Repositories\Partner\PartnerRepositoryInterface;
use App\Http\Resources\ScreenSetting\ScreenSettingResource;

class ScreenDocumentTypeController extends Controller
{

    protected $repository;
    protected $resource = ScreenDocumentTypeResource::class;


    public function __construct(ScreenDocumentTypeRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }


    public function index(Request $request)
    {
        // if (count($_GET) == 0) {
        //     $models = cacheGet('ScreenDocumentType');

        //     if (!$models) {
        //         $models = $this->repository->all($request);

        //         cachePut('ScreenDocumentType', $models);
        //     }
        // } else {

            $models = $this->repository->all($request);
        // }

        return  responseJson(200, 'success', ($this->resource)::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }


    public function show($id)
    {


        // $model = cacheGet('ScreenDocumentType_' . $id);

        // if (!$model) {
            $model = $this->repository->find($id);
            if (!$model) {
                return responseJson(404, __('message.data not found'));
            // } else {
            //     cachePut('ScreenDocumentType_' . $id, $model);
            // }
        }
        return responseJson(200, __('Done'), new ScreenDocumentTypeResource($model),);
    }


    public function store(ScreenDocumentTypeRequest $request)
    {

        $this->repository->create($request->validated());
        return responseJson(200, __('Done'));
    }


    public function update(ScreenDocumentTypeRequest $request, $id)
    {

        $model = $this->repository->find($id);
        if (!$model) {
            return  responseJson(404, __('message.data not found'));
        }
        $model = $this->repository->update($request->validated(), $id);

        return  responseJson(200, __('Done'));
    }


    public function destroy($id)
    {

        $model = $this->repository->find($id);
        if (!$model) {
            return  responseJson(404, __('message.data not found'));
        }
        $this->repository->delete($id);
        return  responseJson(200, __('Done'));
    }

    public function bulkDelete(Request $request)
    {
        foreach ($request->ids as $id) {
            $this->repository->delete($id);
        }
        return  responseJson(200, __('Done'));
    }



    public function logs($id)
    {
        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }

        $logs = $this->repository->logs($id);
        return responseJson(200, 'success', LogResource::collection($logs));
    }
}
