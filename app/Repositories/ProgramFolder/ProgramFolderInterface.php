<?php

namespace App\Repositories\ProgramFolder;

interface ProgramFolderInterface
{

    public function getAll($request);

    public function find($id);

    public function create(array $data);

    public function update($request, $id);

    public function updateArray($request);

    public function logs($id);

    public function delete($id);


}
