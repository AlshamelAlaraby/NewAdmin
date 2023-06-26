<?php

namespace App\Repositories\WorkflowTree;

interface WorkflowTreeRepositoryInterface
{

    public function all($request);

    public function logs($id);

    public function find($id);

    public function create($request);

    public function update($request, $id);

    public function delete($id);

    public function getModuleScreens($module_id);



}
