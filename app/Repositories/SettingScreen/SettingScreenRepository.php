<?php


namespace App\Repositories\SettingScreen;


use App\Models\UserSettingScreen;
use Illuminate\Support\Facades\DB;

class SettingScreenRepository implements SettingScreenInterface
{
    private $model;
    public function __construct(UserSettingScreen $model)
    {
        $this->model = $model;
    }

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


    public function create($request){
        return DB::transaction(function () use ($request) {
            $model = $this->model->create($request);
            return $model;
        });
    }

    public function update($request,$id){
        return DB::transaction(function () use ($id,$request) {
            $model = $this->model->find($id);
            $model->update($request->all());
            return $model;
        });
    }

    public function logs($id)
    {
        return $this->model->find($id)->activities()->orderBy('created_at', 'DESC')->get();
    }

    public function delete($id)
    {
        $model = $this->model->find($id);
        $model->delete();
    }

}
