<?php

namespace App\Http\Requests\ProgramFolder;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProgramFileRequest extends FormRequest
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

            'project_program_module_id' => 'required|exists:projects_programs_modules,id',
            'menu_folder_id' => 'required|exists:folders_menu,id',
            'sort'      => 'nullable|integer|min:0|unique:program_folder_menu,sort' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
        ];

    }
}
