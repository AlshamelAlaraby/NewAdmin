<?php

namespace App\Http\Requests\WorkflowTree;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateWorkflowTreeRequest extends FormRequest
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
                'required',
                Rule::unique('workflow_trees')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('company_id', $request->company_id);
                })->whereNull("deleted_at"),
            ],
            'name_e' => [
                'required',
                Rule::unique('workflow_trees')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('company_id', $request->company_id);
                })->whereNull("deleted_at"),
            ],

            'is_active'  => 'nullable|in:active,inactive',
            'parent_id'  => 'nullable',
            'partner_id' => 'nullable',
            'company_id' => 'nullable',
            'module_id'  => 'nullable',
            'screen_id'  => 'nullable',
            'id_sort'    => 'nullable',
            "media"      => "nullable|array",
            "media.*" => ["nullable", "exists:media,id", new \App\Rules\MediaRule()],
            'old_media.*' => ['exists:media,id', new \App\Rules\MediaRule("App\Models\WorkflowTree")],
        ];
    }

    public function messages()
    {
        return [
            'required' => __('message.field is required'),
            'unique' => __('message.field already exists'),
            'is_active.in' => __('message.status must be active or inactive'),

        ];
    }
}
