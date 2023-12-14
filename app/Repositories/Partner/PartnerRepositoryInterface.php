<?php

namespace App\Repositories\Partner;

interface PartnerRepositoryInterface
{

    public function getAllPartners($request);

    public function find($id);

    public function create($request);

    public function update($request, $id);

    public function logs($id);

    public function delete($id);

    //for sidebar menu
    public function getChildrenInsideModule($module);

    //for topbar programs and modules
    public function get_programs_and_modules_for_company($module);




}
