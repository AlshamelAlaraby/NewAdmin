<?php

namespace App\Http\Controllers\ProgramFolder;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProgramFolder\ProgramFolderRequest;
use App\Http\Requests\ProgramFolder\UpdateProgramFileRequest;
use App\Http\Resources\ProgramFolderResource;
use App\Models\FolderMenu;
use App\Models\ProgramFolder;
use App\Models\SubMenu;
use App\Repositories\ProgramFolder\ProgramFolderInterface;
use Illuminate\Http\Request;
use Mockery\Exception;

class ProgramFolderController extends Controller
{

    protected $repository;
    protected $resource = ProgramFolderResource::class;

    public function __construct(ProgramFolderInterface $repository, private ProgramFolder $model, private FolderMenu $folderMenuModel)
    {
        $this->repository = $repository;
        $this->model = $model;
        $this->folderMenuModel = $folderMenuModel;
    }

    public function all(Request $request)
    {

        $models = $this->repository->getAll($request);

        return responseJson(200, 'success', ProgramFolderResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }

    public function find($id)
    {
        try {

            $model = $this->repository->find($id);
            if (!$model) {
                return responseJson(404, __('message.data not found'));
            }
            return responseJson(200, __('Done'), new ProgramFolderResource($model));
        } catch (Exception $exception) {
            return responseJson($exception->getCode(), $exception->getMessage());
        }
    }

    public function create(ProgramFolderRequest $request)
    {

        $model = $this->repository->create($request->validated());

        return responseJson(200, __('Done'));
    }

    public function update(UpdateProgramFileRequest $request, $id)
    {
        try {
            $model = $this->repository->find($id);
            if (!$model) {
                return responseJson(404, __('message.data not found'));
            }
            $model = $this->repository->update($request->validated(), $id);

            return responseJson(200, __('Done'));
        } catch (Exception $exception) {
            return responseJson($exception->getCode(), $exception->getMessage());
        }
    }

    public function updateArray(ProgramFolderRequest $request)
    {
        $model = $this->repository->updateArray($request->validated());
        return responseJson(200, __('Done'));

    }

    public function delete($id)
    {
        try {
            $model = $this->repository->find($id);
            if (!$model) {
                return responseJson(404, __('message.data not found'));
            }
            $this->repository->delete($id);
            return responseJson(200, __('Done'));
        } catch (Exception $exception) {
            return responseJson($exception->getCode(), $exception->getMessage());
        }
    }

    public function bulkDelete(Request $request)
    {
        foreach ($request->ids as $id) {
            $this->repository->delete($id);
        }
        return responseJson(200, __('Done'));
    }

    public function logs($id)
    {
        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }

        return $logs = $this->repository->logs($id);
        return responseJson(200, 'success', \App\Http\Resources\Log\LogResource::collection($logs));
    }

    public function menuFolder($id)
    {
        $data = [];

        $data['program_folder_menus'] = $this->model->where('project_program_module_id', $id)->get();
        $menu_folder_ids = $this->model->where('project_program_module_id', $id)->pluck('menu_folder_id')->toArray();
        $data['menu_folders'] = $this->folderMenuModel->whereIn('id', $menu_folder_ids)->select('id', 'name', 'name_e')->get();

        $modifiedMenuFolders = [];

        foreach ($data['menu_folders'] as $index => $menuFolder) {
            $menuFolder['program_folder_menu_id'] = $data['program_folder_menus'][$index]['id'];
            $modifiedMenuFolders[] = $menuFolder;
        }

        $response = [
            'message' => 'success',
            'data' => [
                'menu_folders' => $modifiedMenuFolders,
            ],
        ];

        return response()->json($response);
    }

    public function subMenus($id)
    {

        $models = SubMenu::where('id', $id)->with('screens')->first();

        return responseJson(200, 'success', $models);
    }

}
