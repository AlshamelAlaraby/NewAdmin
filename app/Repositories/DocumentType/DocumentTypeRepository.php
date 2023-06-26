<?php

namespace App\Repositories\DocumentType;

use App\Models\DocumentType;
use Illuminate\Support\Facades\DB;

class DocumentTypeRepository implements DocumentTypeInterface
{

    public function __construct(private DocumentType $model){}

    public function all($request)
    {
        $models = $this->model->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');
        if ($request->per_page) {
            return ['data' => $models->paginate($request->per_page), 'paginate' => true];
        } else {
            return ['data' => $models->get(), 'paginate' => false];
        }
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function create($request)
    {
//       return $request ;
        return DB::transaction(function () use ($request) {
            // cacheForget("documentTypes");
            $model = $this->model->create($request->all());
            $model->documentRelateds()->attach($request->document_relateds);
            return $model;
        });
    }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($id, $request) {
            $model = $this->model->find($id);
            $model->update($request->all());
            if ($request->is_default == 1) {
                $this->model->where('id', '!=', $id)->update(['is_default' => 0]);
            }
            $model->documentRelateds()->sync($request->document_relateds);
            return $model;
        });
    }

    public function delete($id)
    {
        $model = $this->find($id);
        // $this->forget($id);
        $model->delete();
    }


    public function logs($id)
    {
         return $this->model->find($id)->activities()->orderBy('created_at', 'DESC')->get();
    }


    // private function forget($id)
    // {
    //     $keys = [
    //         "documentTypes",
    //         "documentTypes_" . $id,
    //     ];
    //     foreach ($keys as $key) {
    //         cacheForget($key);
    //     }
    // }






}
