<?php

namespace App\Repositories\WorkflowTree;

use App\Models\Screen;
use App\Models\WorkflowTree;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class WorkflowTreeRepository implements WorkflowTreeRepositoryInterface
{

    public function __construct(private WorkflowTree $model, private Media $media, private \App\Models\MenuWorkFlow $ModelMenuWorkFlow, private Screen $ModelScreen)
    {
        $this->model = $model;
        $this->media = $media;
        $this->ModelMenuWorkFlow = $ModelMenuWorkFlow;
        $this->ModelScreen = $ModelScreen;
    }

    public function getModuleScreens($module_id)
    {
        return $this->ModelScreen->whereIn('module_id', [1, $module_id])->get();
    }

    public function all($request)
    {
        $models = $this->model->filter($request)->latest();

        return ['data' => $models->with(["partner", "company", "module", "screen"])->paginate($request->per_page), 'paginate' => true];
    }

    public function getRootNodes($company_id)
    {
        return $this->model->whereNull("parent_id")->where("company_id", $company_id)->get();
    }

    public function getChildNodes($parentId)
    {
        return $this->model->where("parent_id", $parentId)->get();
    }

    public function getCompanyWorkflows($company_id)
    {
        return $this->model->where("company_id", $company_id)->get();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function create($request)
    {
        return DB::transaction(function () use ($request) {
            foreach ($request['module_ids'] as $id){
                $model = $this->model->create([
                    'module_id'=>$id,
                    'partner_id'=>$request['partner_id'],
                    'company_id'=>$request['company_id'],
                ]);

            }
            if ($request->media) {
                foreach ($request->media as $media) {
                    $this->media::where('id', $media)->update([
                        'model_id' => $model->id,
                        'model_type' => get_class($this->model),
                    ]);
                }
            }
            // foreach ($request['menu_workflow'] as $menu_workflow) {
            //     $this->ModelMenuWorkFlow->create(array_merge($menu_workflow, ['workflow_id' => $model->id]));
            // }

            // cacheForget("work_flow_trees");
            return $model;
        });
    }

    public function update($request, $id)
    {
        DB::transaction(function () use ($id, $request) {
            $model = $this->model->where("id", $id)->first();
            if ($request->media && !$request->old_media) { // if there is new media and no old media
                $model->clearMediaCollection('media');
                foreach ($request->media as $media) {
                    uploadImage($media, [
                        'model_id' => $model->id,
                        'model_type' => get_class($this->model),
                    ]);
                }
            }

            if ($request->old_media && !$request->media) { // if there is old media and no new media
                $model->media->whereNotIn('id', $request->old_media)->each(function (Media $media) {
                    $media->delete();
                });
            }

            if ($request->old_media && $request->media) { // if there is old media and new media
                $model->media->whereNotIn('id', $request->old_media)->each(function (Media $media) {
                    $media->delete();
                });
                foreach ($request->media as $image) {
                    uploadImage($image, [
                        'model_id' => $model->id,
                        'model_type' => get_class($this->model),
                    ]);
                }
            }

            if (!$request->old_media && !$request->media) { // if this is no old media and new media
                $model->clearMediaCollection('media');
            }

            $model->update($request->all());

            // $this->ModelMenuWorkFlow->where([
            //     ['workflow_id', $id],
            //     ['company_id', $request->menu_workflow[0]['company_id']],
            //     ['menu_tree_id', $request->menu_workflow[0]['menu_tree_id']]
            // ])->delete();
            // $this->ModelMenuWorkFlow->insert($request->menu_workflow);
            // $this->forget($id);
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
    //         "work_flow_trees",
    //         "work_flow_trees_" . $id,
    //     ];
    //     foreach ($keys as $key) {
    //         cacheForget($key);
    //     }
    // }
}
