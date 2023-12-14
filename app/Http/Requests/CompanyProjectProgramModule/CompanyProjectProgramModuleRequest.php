<?php

namespace App\Http\Requests\CompanyProjectProgramModule;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompanyProjectProgramModuleRequest extends FormRequest
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
        $request = request();
        return [
            "company_id" => "required|exists:companies,id",
            "company_program_id" => "required|exists:companies_programs,id",
            "project_program_module_id" => ["required","exists:project_program_modules,id",
            request()->method() == 'PUT'?
            Rule::unique('company_project_program_modules')->where('company_program_id',$request->company_program_id)->ignore($request->id)->whereNull('deleted_at')
            :Rule::unique('company_project_program_modules')->where('company_program_id',$request->company_program_id)->whereNull('deleted_at')
            ],
            "allowed_users_no" => "required|min:0|integer",
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            "document_types" => 'nullable',
            'document_types.*' => 'nullable|exists:document_types,id',
            "allowed_employee" => "nullable|min:0|integer",
            "out_site" => "nullable|min:0|integer",
            "is_web" => "nullable|in:0,1",
            "status" => "in:0,1",
        ];
    }

    public function messages()
    {
        return [
            "company_id.exists" => "The selected company is invalid.",
            "module_id.exists" => "The selected module is invalid.",
            "menu_id.exists" => "The selected menu is invalid.",
            "document_types.*.exists" => "The selected document type is invalid.",
        ];
    }
}
