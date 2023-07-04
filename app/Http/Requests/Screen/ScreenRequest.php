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
            'name' => [
                'required',
                Rule::unique('screens')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('company_id', $request->company_id);
                })->whereNull("deleted_at"),
            ],
            'name_e' => [
                'required',
                Rule::unique('screens')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('company_id', $request->company_id);
                })->whereNull("deleted_at"),
            ],
            'title' => [
                'required',
                Rule::unique('screens')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('company_id', $request->company_id);
                })->whereNull("deleted_at"),
            ],
            'title_e' => [
                'required',
                Rule::unique('screens')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('company_id', $request->company_id);
                })->whereNull("deleted_at"),
            ],
            'sort' => [
                'required',
                'integer',
                'min:0',
                Rule::unique('screens')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('company_id', $request->company_id);
                })->whereNull("deleted_at"),
            ],
            'url' => [
                'nullable',
                Rule::unique('screens')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('company_id', $request->company_id);
                })->whereNull("deleted_at"),
            ],
            "is_add_on"       => "nullable||in:1,0",
            'is_implementor'  => 'nullable|in:1,0',
            'sub_menu_id'     => 'nullable|exists:sub_menus,id',
            'company_id'      => 'nullable|exists:companies,id',
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
