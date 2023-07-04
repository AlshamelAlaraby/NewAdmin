<?php

namespace App\Http\Controllers\DocumentType;

use App\Http\Requests\DocumentTypeRequest\DocumentTypeRequest;
use App\Http\Requests\DocumentTypeRequest\UpdateDocumentTypeRequest;
use App\Http\Resources\DocumentType\DocumentTypeResource;
use App\Repositories\DocumentType\DocumentTypeInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class DocumentTypeController extends Controller
{
    public function __construct(private DocumentTypeInterface $modelInterface)
    {
    }

    public function find($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, 'data not found');
        }
        return responseJson(200, 'success', new DocumentTypeResource($model));
    }

    public function all(Request $request)
    {
        $models = $this->modelInterface->all($request);
        return responseJson(200, 'success', DocumentTypeResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }

    public function create(DocumentTypeRequest $request)
    {
        $model = $this->modelInterface->create($request);
        return responseJson(200, 'success', new DocumentTypeResource($model));
    }

    public function update(DocumentTypeRequest $request, $id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, 'data not found');
        }
        $this->modelInterface->update($request, $id);
        return responseJson(200, 'success');
    }

    public function delete($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, 'data not found');
        }
        if ($model->hasChildren()) {
            return responseJson(400, __('message.parent have children'));
        }
        $this->modelInterface->delete($id);

        return responseJson(200, 'success');
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

    public function logs($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $logs = $this->modelInterface->logs($id);
        return responseJson(200, 'success', \App\Http\Resources\Log\LogResource::collection($logs));
    }
}
