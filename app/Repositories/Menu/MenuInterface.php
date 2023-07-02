<?php

namespace App\Repositories\Menu;

interface MenuInterface
{

    public function all($request);

    public function find($id);

    public function create($request);

    public function update($request, $id);

    public function delete($id);

    public function logs($id);
    
    public function getModuleMenus($company_id, $module_id);


}
