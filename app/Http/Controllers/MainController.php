<?php

namespace App\Http\Controllers;

use App\Http\Resources\Company\CompanyResource;
use App\Models\Company;
use App\Models\File;
use App\Models\Module;
use App\Models\Partner;
use Illuminate\Http\Request;
use App\Models\UserSettingScreen;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\FileResource;

class MainController extends Controller
{
    private $setting;
    public function __construct(UserSettingScreen $setting)
    {
        $this->setting = $setting;
    }

    public function media(\App\Http\Requests\UploadMediaRequest $request)
    {

        if (is_array($request->media)) {
            $media = File::create();
            foreach ($request->media as $file) {
                $ext = $file->getClientOriginalExtension();
                $media->addMedia($file)->usingFileName(md5(uniqid()) . ".$ext")->toMediaCollection('media');
            }

            return responseJson(200, 'success', FileResource::collection($media->files));
        } else {
            if ($request->media) {
                $media = File::create();
                $file = $request->media;
                $ext = $file->getClientOriginalExtension();
                $media->addMedia($file)->usingFileName(md5(uniqid()) . ".$ext")->toMediaCollection('media');
                return responseJson(200, 'success', new FileResource($media->files[0]));
            }
        }

        if ($request->link && !$request->media) {
            $media = File::create();
            $media->addMediaFromUrl($request->link)->toMediaCollection('media');
            return responseJson(200, 'success', new FileResource($media->files[0]));
        }
        return responseJson(400, 'unsuccessful');
    }

    public function setting(Request $request)
    {

        DB::transaction(function () use ($request) {
            $data = $request->all();
            $screenSetting = $this->setting->where('user_id', $data['user_id'])->where('screen_id', $data['screen_id'])->first();
            $data['data_json'] = json_encode($data['data_json']);
            if (!$screenSetting) {
                $this->setting->create($data);
            } else {
                $screenSetting->update($data);
            }
        });

        return responseJson(200, 'success');
    }

    public function getSetting($user_id, $screen_id)
    {
        $model = $this->setting->where('user_id', $user_id)->where('screen_id', $screen_id)->first();
        if (!$model) {
            return responseJson(404, 'not found');
        }
        return responseJson(200, 'success', new \App\Http\Resources\ScreenSetting\ScreenSettingResource($model));
    }

    public function statics(){
        $company_num = Company::query ()->count ();
        $partner_num = Partner::query ()->count ();
        $module_num = Module::query ()->count ();
        $latest_companies = Company::query ()->orderByDesc ('id')->limit(6)->get ();

        return responseJson (200,'success',[
            'companies'=>$company_num,
            'partners'=>$partner_num,
            'modules'=>$module_num,
            'latest_companies'=>CompanyResource::collection ($latest_companies)
        ]);
    }
}
