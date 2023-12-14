<?php

namespace App\Http\Requests\CompanyProjectProgramModule;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AttachOrDetachCompaniesWithProgramsRequest extends FormRequest
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
            "action" => "required|in:attach,detach",
            "company_id" => "required|exists:companies,id",
            "program_id" => ["required","exists:project_program_modules,id" , $request->action == 'attach' ? Rule::unique('companies_programs')->where('company_id',$request->company_id)->whereNull('deleted_at') : ''],
        ];
    }


}
