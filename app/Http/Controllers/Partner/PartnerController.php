<?php

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Partner\PartnerRequest;
use App\Http\Resources\Company\CompanyResource;
use App\Http\Resources\CompanyProjectProgramModule\ProgramsWithCompanyProjectProgramModuleResource;
use App\Http\Resources\Log\LogResource;
use App\Http\Resources\Partner\PartnerResource;
use App\Models\Company;
use App\Models\ProjectProgramModule;
use App\Repositories\Partner\PartnerRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PartnerController extends Controller
{

    protected $repository;

    public function __construct(PartnerRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function all(Request $request)
    {
        $models = $this->repository->getAllPartners($request);
        return responseJson(200, 'success', PartnerResource::collection($models['data']), $models['paginate'] ? getPaginates($models['data']) : null);
    }

    public function find($id)
    {
        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        return responseJson(200, __('Done'), new PartnerResource($model));
    }

    public function store(PartnerRequest $request)
    {
        $model = $this->repository->create($request->validated());
        $model->refresh();
        return responseJson(200, __('Done'), new PartnerResource($model));
    }

    public function update(PartnerRequest $request, $id)
    {
        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        $model = $this->repository->update($request->validated(), $id);
        $model->refresh();
        return responseJson(200, __('Done'), new PartnerResource($model));
    }

    public function delete($id)
    {

        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }
        if ($model->hasChildren()) {
            return responseJson(400, __('message.data has relation cant delete'));
        }
        $this->repository->delete($id);
        return responseJson(200, __('Done'));
    }

    public function bulkDelete(Request $request)
    {
        foreach ($request->ids as $id) {
            $model = $this->repository->find($id);
            $arr = [];
            if ($model->hasChildren()) {
                $arr[] = $id;
                continue;
            }
            $this->repository->delete($id);
        }
        if (count($arr) > 0) {
            return responseJson(400, __('some items has relation cant delete'));
        }
        return responseJson(200, __('Done'));
    }

    public function logs($id)
    {
        $model = $this->repository->find($id);
        if (!$model) {
            return responseJson(404, __('message.data not found'));
        }

        $logs = $this->repository->logs($id);
        return responseJson(200, 'success', LogResource::collection($logs));
    }

    public function login(LoginRequest $request)
    {

        if (!Auth::guard('partner')->attempt($request->only("email", "password"))) {
            return responseJson(422, 'Email Or Password is wrong!');
        }

        // $pieces = parse_url($request->url());
        // $url = $pieces['scheme'] . "://" . $pieces['host'];

        $user = Auth::guard('partner')->user();
        // if ($request->url != "0") {
        //     if ($user->company->url != $url) {
        //         return responseJson(422, 'Url Not Found');
        //     }
        // }

        if ($user->is_active === 'inactive') {
            return responseJson(422, __('message.you_cannot_log_in_Please_contact_the_administration_first'));
        }

        return responseJson(200, 'Login Successfully', [
            "partner" => new PartnerResource($user),
            "token" => $user->createToken('sanctumPartner')->plainTextToken,
        ]);

    }

    public function profile(Request $request)
    {
        $user = $request->user();
        return responseJson(200, '', [
            "partner" => new PartnerResource($user),
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();
        return responseJson(200, 'logged out');
    }

    public function getCompany($partner_id)
    {
        $company = Company::query()->where('partner_id', $partner_id)->get();
        if (!$company) {
            return responseJson(404, __('message.data not found'));
        }
        return responseJson(200, '', CompanyResource::collection($company));
    }

    public function getChildrenInsideModuleForPartnerSideBarMenu(ProjectProgramModule $projectProgramModule)
    {
        return responseJson(200, 'success', $this->repository->getChildrenInsideModule($projectProgramModule));
    }


    public function get_programs_and_modules_for_company(Company $company)
    {
        $data = $this->repository->get_programs_and_modules_for_company($company);

        return responseJson(200, 'success',ProgramsWithCompanyProjectProgramModuleResource::collection($data));
    }

}
