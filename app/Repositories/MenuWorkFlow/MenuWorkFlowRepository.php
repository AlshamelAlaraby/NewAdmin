<?php

namespace App\Repositories\MenuWorkFlow;

use Illuminate\Support\Facades\DB;

class MenuWorkFlowRepository implements MenuWorkFlowInterface
{

    public function __construct(private \App\Models\MenuWorkFlow $model)
    {
        $this->model = $model;
    }//end of contructor

    public function find($id)
    {
        return $this->model->find($id);
    }//end of find function

    public function create($request)
    {
        return DB::transaction(function () use ($request) {
            foreach ( $request['menu_workflow'] as $menu_workflow ){
                $this->model->create($menu_workflow );
            }
        });
     
    }//end of create function

    public function update($request, $workflow_id, $company_id)
    {
        $model = $this->model->where([['workflow_id',$workflow_id],['company_id',$company_id]])->delete();

        DB::transaction(function () use ( $request) {
            foreach ( $request['menu_workflow'] as $menu_workflow ){
                $this->model->create($menu_workflow );
            };
        });
    }//end of update function


  
    public function logs($id)
    {
        return $this->model->find($id)->activities()->orderBy('created_at', 'DESC')->get();
    }//end of logs function


    public function delete($id)
    {
        $model = $this->find($id);
        // $this->forget($id);
        $model->delete();
    }//end of delete function


  
    // public function create($request)
    // {
    //     return DB::transaction(function () use ($request) {
    //         foreach ( $request['menu_workflow'] as $menu_workflow ){
                
    //             $this->model->updateOrCreate([
    //                 'workflow_id'=>$menu_workflow['workflow_id'] ,
    //                 'company_id'=> $menu_workflow['company_id']  
    //             ],[
    //                 'menu_tree_id'=> $menu_workflow['menu_tree_id'] ,
    //                 'workflow_id'=> $menu_workflow['workflow_id'] ,
    //                 'screen_id'=>$menu_workflow['screen_id'] ,
    //                 'company_id'=> $menu_workflow['company_id']  
    //             ]);
    //         }
    //     });
     
    // }//end of create function
}
