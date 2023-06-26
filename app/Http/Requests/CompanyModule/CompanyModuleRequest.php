<?php

namespace App\Http\Requests\CompanyModule;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompanyModuleRequest extends FormRequest
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
            "company_id" => "required|exists:companies,id",
            "module_id" => "required|exists:projects_programs_modules,id",
            "allowed_users_no" => "required",
            "start_date" => "required",
            "end_date" => "required",
            "document_types" => 'nullable',
            'document_types.*' => 'nullable|exists:document_types,id',
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
