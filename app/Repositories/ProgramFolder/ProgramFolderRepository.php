<?php

namespace App\Repositories\ProgramFolder;

use App\Models\ProgramFolder;
use Illuminate\Support\Facades\DB;

class ProgramFolderRepository implements ProgramFolderInterface
{

    private $model;
    public function __construct(ProgramFolder $model)
    {
        $this->model = $model;
    }

    public function getAll($request)
    {
        $models = $this->model->filter($request)->orderBy($request->order ? $request->order : 'updated_at', $request->sort ? $request->sort : 'DESC');
        if ($request->project_program_module_id) {
            $models->where("project_program_module_id", $request->project_program_module_id);
        }
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

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {

            foreach ($data['menu_folder'] as $folderId) {
                $this->model->create([
                    'project_program_module_id' => $data['project_program_module_id'],
                    'menu_folder_id' => $folderId,
                ]);
            }
        });
    }

    public function update($request, $id)
    {
        return DB::transaction(function () use ($id, $request) {
            $this->model->where("id", $id)->update($request);
        });
        $model = $this->model->find($id);
        return $model;
    }
    public function updateArray($request)
    {
        return DB::transaction(function () use ( $request) {
            $this->model->where("project_program_module_id", $request['project_program_module_id'])->delete();
            foreach ($request['menu_folder'] as $folderId) {
                $this->model->create([
                    'project_program_module_id' => $request['project_program_module_id'],
                    'menu_folder_id' => $folderId,
                ]);
            }
        });


    }

    public function logs($id)
    {
        return $this->model->find($id)->activities()->orderBy('created_at', 'DESC')->get();
    }

    public function delete($id)
    {
        $model = $this->find($id);
        $model->delete();
    }
}
