<?php

namespace App\Http\Controllers\WorkflowTree;

use App\Http\Controllers\ResponseController;
use App\Http\Requests\WorkflowTree\WorkflowTreeRequest;
use App\Http\Requests\WorkflowTree\UpdateWorkflowTreeRequest;
use App\Http\Resources\Button\ButtonResource;
use App\Http\Resources\Hotfield\HotfieldResource;
use App\Http\Resources\Screen\ScreenRelationResource;
use App\Http\Resources\WorkflowTree\WorkflowTreeResource1;
use App\Http\Resources\WorkflowTree\WorkflowTreeResource;
use App\Models\Button;
use App\Models\Company;
use App\Models\CompanyModule;
use App\Models\HotField;
use App\Models\MenuWorkFlow;
use App\Models\Screen;
use App\Models\WorkflowTree;
use App\Repositories\WorkflowTree\WorkflowTreeRepositoryInterface;
use Illuminate\Http\Request;

class WorkflowTreeController extends ResponseController
{

    protected $repository;
    protected $resource = WorkflowTreeResource::class;

    public function __construct(WorkflowTreeRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function all(Request $request)
    {
        $models = $this->repository->all($request);
        return responseJson(200, 'success', ($this->resource)::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }

    public function getRootNodes()
    {
        return $this->repository->getRootNodes(request()->company_id);
    }

    public function getChildNodes($parentId)
    {
        return $this->repository->getChildNodes($parentId);
    }

    public function getWorkflowLookup()
    {
        return WorkflowTree::where("partner_id", 1)->where("company_id", 1)->get();
    }

    public function getCompanyWorkflows($company_id)
    {
        return $this->repository->getCompanyWorkflows($company_id);
    }

    public function find($id)
    {

        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        return responseJson(200, __('Done'), new WorkflowTreeResource($model),);
    }

    public function everything_about_the_company($id)
    {
        $company = Company::query()->find($id);
        if (!$company) {
            return responseJson(404, __('message.data not found'));
        }
//        $wf = WorkflowTree::query()
//            ->where('is_active', 'active')
//            ->with('child.child.child')
//            ->with("screen")
//            ->whereParentId(null)
//            ->where('company_id', $company->id)
//            ->get();

//        $company->work_flow_trees = $wf;

        $company->document_company_module = @$company->company_modules()->with('document_types.documentRelateds')->get();
//        $company->program = @$company->company_modules()->with(['module'=>function($q){
//            $q->with(['children','programFolders'=>function($q){
//                $q->with(['folder'=>function($q){
//                    $q->with(['subMenus'=>function($q){
//                        $q->with('screens');
//
//                    }]);
//                }]);
//            }]);
//        }])->get();
        // $company->screen_all = ScreenRelationResource::collection (Screen::query ()->get ());
        // $company->buttons = ButtonResource::collection (Button::query ()->get ());
        // $company->hot_fields = HotfieldResource::collection (HotField::query ()->get ());

        return responseJson(200, __(''), $company);
    }

    public function companyId($id)
    {
        $company = Company::query()->find($id);
        if (!$company) {
            return responseJson(404, __('message.data not found'));
        }
        $wf = WorkflowTree::query()
            ->where('is_active', 'active')
            ->with('child.child.child')
            ->with("screen")
            ->whereParentId(null)
            ->where('company_id', $company->id)
            ->get();

        $company->work_flow_trees = $wf;
        $company->document_company_module = @$company->company_modules()->with('document_types')->get();

        return responseJson(200, __(''), $company);
    }

    public function store(WorkflowTreeRequest $request)
    {
        $model = $this->repository->create($request);
        return responseJson(200, 'success', new WorkflowTreeResource($model));
    }

    public function update(WorkflowTreeRequest $request, $id)
    {


        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $this->repository->update($request, $id);

        $model->refresh();
        return responseJson(200, 'success', new WorkflowTreeResource($model));
    }

    public function delete($id)
    {

        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }

        if ($model->haveChildren) {
            return responseJson(400, __('message.parent have children'));
        }
        $this->repository->delete($id);
        return responseJson(200, __('Done'));
    }

    public function bulkDelete(Request $request)
    {
        foreach ($request->ids as $id) {
            $this->repository->delete($id);
        }
        return  responseJson(200, __('Done'));
    }

    public function logs($id)
    {
        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }

        $logs = $this->repository->logs($id);
        return responseJson(200, 'success', \App\Http\Resources\Log\LogResource::collection($logs));
    }

    public function getModuleScreens($module_id)
    {
        return $this->repository->getModuleScreens($module_id);
    }

    public function getMenuTreeScreens(Request $request)
    {
       $model = MenuWorkFlow::where([ ['menu_tree_id', $request->menu_tree_id],
       ['company_id', $request->company_id]])->get();

        return $model;
    }

}
