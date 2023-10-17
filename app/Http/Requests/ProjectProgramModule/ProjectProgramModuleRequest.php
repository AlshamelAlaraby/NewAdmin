<?php

namespace App\Http\Requests\ProjectProgramModule;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectProgramModuleRequest extends FormRequest
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
                Rule::unique('project_program_modules')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('is_module', $request->is_module);
                })->where('parent_id', $request->parent_id),
            ],
            'name_e' => [
                'sometimes',
                Rule::unique('project_program_modules')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('is_module', $request->is_module);
                })->where('parent_id', $request->parent_id),
            ],
            'sort' => [
                'sometimes',
                'integer',
                'min:0',
                Rule::unique('project_program_modules')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('is_module', $request->is_module);
                })->where('parent_id', $request->parent_id),
            ],
            "is_active"          => "nullable|in:active,inactive",
            "is_web"          => "nullable|in:0,1",
            "is_add_on"          => "nullable||in:0,1",
            'is_menu_collapsed'  => 'nullable|in:0,1',
            "icon"               => "nullable|string",
            "is_module"          => "nullable|in:0,1",
            'parent_id'          => 'nullable|exists:partners,id',
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
