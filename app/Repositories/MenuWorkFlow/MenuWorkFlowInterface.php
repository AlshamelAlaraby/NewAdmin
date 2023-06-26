<?php

namespace App\Repositories\MenuWorkFlow;

interface MenuWorkFlowInterface
{

    public function create($request);

    public function update($request, $workflow_id, $company_id);

    public function find($id);

    public function delete($id);

    public function logs($id);

}
  