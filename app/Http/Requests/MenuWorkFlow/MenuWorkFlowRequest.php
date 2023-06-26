<?php

namespace App\Http\Requests\MenuWorkFlow;

use Illuminate\Foundation\Http\FormRequest;

class MenuWorkFlowRequest extends FormRequest
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
        return [
            'menu_workflow' =>'required|array',
            'menu_workflow.*.screen_id' =>'required|exists:screens,id',
            'menu_workflow.*.menu_tree_id' =>'required|exists:menu_trees,id',
            'menu_workflow.*.workflow_id' =>'required|exists:workflow_trees,id',
            'menu_workflow.*.company_id' =>'required|exists:companies,id',
          ];
    }
}
