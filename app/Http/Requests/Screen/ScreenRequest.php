<?php

namespace App\Http\Requests\Screen;

use App\Http\Resources\Company\CompanyResource;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Validation\Rule;

class ScreenRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $request =  request();
        //        dd($request->company_id);

        return [
            'name' => 'required',
            'name_e' => 'required',
            'title' => 'required',
            'title_e' => 'required',
            'sort' => 'required',
            'url' => 'nullable',
            "is_add_on"       => "nullable||in:1,0",
            'is_implementor'  => 'nullable|in:1,0',
            'sub_menu_id'     => 'nullable|exists:sub_menus,id',
            'company_id'      => 'nullable|exists:companies,id',
            'parent_id'       => 'nullable|exists:screens,id',
            'module_screen_id'       => 'nullable|exists:module_screens,id',


        ];
    }

    public function messages()
    {
        return [
            'required'      => __('message.field is required'),
            'title.unique'        => __('message.field already exists'),
            'title_e.unique'        => __('message.field already exists'),
            'name.unique'        => __('message.field already exists'),
            'name_e.unique'        => __('message.field already exists'),
            'title.required'        => __('message.field already exists'),
            'title_e.required'        => __('message.field already exists'),
            'name.required'        => __('message.field already exists'),
            'name_e.required'        => __('message.field already exists'),
        ];
    }
}
