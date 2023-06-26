<?php

namespace App\Http\Requests\Module;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ModuleRequest extends FormRequest
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

        return [


            'name' => [
                'sometimes',
                Rule::unique('projects_programs_modules')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('is_module', $request->is_module);
                }),
            ],
            'name_e' => [
                'sometimes',
                Rule::unique('projects_programs_modules')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('is_module', $request->is_module);
                }),
            ],
            'sort' => [
                'sometimes',
                'integer',
                'min:0',
                Rule::unique('projects_programs_modules')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('is_module', $request->is_module);
                }),
            ],


            'parent_id' => "nullable", //////// review
            "is_active" => "nullable|in:active,inactive",
            "is_module" => "nullable|in:0,1",
            "icon"      => "nullable|string",
            'is_menu_collapsed' => 'nullable|in:0,1',
            "is_add_on" => "nullable|boolean"
        ];
    }

    public function messages()
    {
        return [
            'name.unique' => __('message.name already exists'),
            'name_e.unique' => __('message.name already exists'),
            'parent_id.exists' => __('message.parent not found'),
            'is_active.in' => __('message.status must be active or inactive'),
        ];
    }
}
