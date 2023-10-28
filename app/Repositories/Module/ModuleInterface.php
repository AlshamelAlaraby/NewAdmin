<?php

namespace App\Repositories\Module;

interface ModuleInterface
{

    public function all($request);

    public function find($id);


}
