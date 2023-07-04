<?php

namespace App\Http\Controllers\Company;

use App\Http\Requests\Company\StoreCompanyRequest;
use App\Http\Requests\Company\CompanyRequest;
use App\Http\Resources\Company\CompanyResource;
use App\Http\Resources\CompanyModule\CompanyModuleResource;
use App\Http\Resources\Module\ModuleResource;
use App\Models\Company;
use App\Models\ProjectProgramModule;
use App\Repositories\Company\CompanyInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class CompanyController extends Controller
{
    public function __construct(private CompanyInterface $modelInterface)
    {
        $this->modelInterface = $modelInterface;
    }

    public function find($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        return responseJson(200, 'success', new CompanyResource($model));
    }

    public function all(Request $request)
    {
        $models = $this->modelInterface->all($request);
        return responseJson(200, 'success', CompanyResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }

    public function create(CompanyRequest $request)
    {
        $model = $this->modelInterface->create($request);
        $model->refresh();
        return responseJson(200, 'success', new CompanyResource($model));
    }

    public function update(CompanyRequest $request, $id)
    {

        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $model->refresh();
        $this->modelInterface->update($request, $id);
        return responseJson(200, 'success', new CompanyResource($model));
    }

    public function bulkDelete(Request $request)
    {
        foreach ($request->ids as $id) {
            $model = $this->modelInterface->find($id);
            $arr = [];
            if ($model->hasChildren()) {
                $arr[] = $id;
                continue;
            }
            $this->modelInterface->delete($id);
        }
        if (count($arr) > 0) {
            return responseJson(400, __('some items has relation cant delete'));
        }
        return responseJson(200, __('Done'));
    }

    public function logs($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }

        $logs = $this->modelInterface->logs($id);
        return responseJson(200, 'success', \App\Http\Resources\Log\LogResource::collection($logs));
    }

    public function destroy($id)
    {
        $model = $this->modelInterface->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }

        if ($model->hasChildren()) {
            return responseJson(400, __('message.can not delete this data'));
        }

        $this->modelInterface->delete($id);
        return responseJson(200, 'success');
    }

    public function getModules($company_id){
        $Programs_id = ProjectProgramModule::whereHas('companies',function ($q)use ($company_id){
            $q->where('company_id',$company_id);
        })->get()->pluck('id')->toArray();
        $Programs = ProjectProgramModule::whereIn('module_id',$Programs_id)->get();
        $company = Company::query ()->find ($company_id);
        if (!$company){
            return responseJson(404, __('message.data not found'));
        }
        return responseJson (200,'',ModuleResource::collection($Programs));
    }

    public function everything_about_the_company($id)
    {
        $company = Company::query()->find($id);
        if (!$company) {
            return responseJson(404, __('message.data not found'));
        }
        $company->document_company_module = @$company->company_modules()->with('documentTypes.documentRelateds')->get();
        return responseJson(200, __(''), $company);
    }


}
