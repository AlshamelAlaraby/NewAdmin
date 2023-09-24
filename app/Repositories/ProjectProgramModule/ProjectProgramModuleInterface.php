<?php

namespace App\Repositories\ProjectProgramModule;

interface ProjectProgramModuleInterface
{

    public function all($request);

    public function find($id);

    public function create($request);

    public function update($request, $id);

    public function delete($id);

    public function logs($id);

    public function getRootNodes();

    public function getChildNodes($id);

    public function addModuleToCompany($request);

    public function removeModuleFromCompany($module_id, $company_id);

    public function createProgramChildren($request);

    public function allProgramModuleId($request);

    public function companyProjectProgramModules($name_company);

    // public function getScreensFromModule($module_id);
}
