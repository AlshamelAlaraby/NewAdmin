<?php

namespace App\Repositories\CompanyProjectProgramModule;

interface CompanyProjectProgramModuleInterface
{

    public function getCompanyModules($request);

    public function find($id);

    public function create($request);

    public function update($request, $id);

    public function logs($id);

    public function delete($id);

    public function attach_or_detach_companies_with_programs($request);

    public function get_programs_and_modules_for_company($company);



}
