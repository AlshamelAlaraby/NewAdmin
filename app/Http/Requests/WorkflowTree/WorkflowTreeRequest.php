<?php

namespace App\Http\Requests\WorkflowTree;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class WorkflowTreeRequest extends FormRequest
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
            'name' => ['nullable'
                // 'required',
                // Rule::unique('workflow_trees')->where(function ($query) use($request) {
                //     return $query->where('company_id', $request->company_id);
                // })->whereNull("deleted_at"),
            ],
            'name_e' => [
                'nullable'
                // 'required',
                // Rule::unique('workflow_trees')->where(function ($query) use($request) {
                //     return $query->where('company_id', $request->company_id);
                // })->whereNull("deleted_at"),
            ],
            'is_active'  => 'nullable|in:active,inactive',
            'parent_id'  => 'nullable|exists:workflow_trees,id',
            'partner_id' => 'nullable|exists:partners,id',
            'company_id' => 'nullable|exists:companies,id',
            'module_ids'  => 'nullable|array',
            'module_ids.*'  => 'nullable|exists:projects_programs_modules,id',
            'module_ids'  => 'nullable|exists:projects_programs_modules,id',
            'screen_id'  => 'nullable|exists:screens,id',
            'id_sort'    => 'nullable',
            // "media" => ["required", "exists:media,id", new \App\Rules\MediaRule()],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The name field is required.',
            'name.unique' => 'The name has already been taken for this company.',
            'name_e.required' => 'The English name field is required.',
            'name_e.unique' => 'The English name has already been taken for this company.',
            'is_active.required' => 'The status field is required.',
            'is_active.in' => 'The selected status is invalid.',
            'parent_id.exists' => 'The selected parent tree is invalid.',
            'partner_id.exists' => 'The selected partner is invalid.',
            'company_id.exists' => 'The selected company is invalid.',
            'module_id.exists' => 'The selected module is invalid.',
            'screen_id.exists' => 'The selected screen is invalid.',
        ];
    }
}
