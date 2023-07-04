<?php

namespace App\Http\Requests\ProgramFolder;

use Illuminate\Foundation\Http\FormRequest;

class ProgramFolderRequest extends FormRequest
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
            'project_program_module_id'  => 'required|exists:project_program_modules,id',
            'menu_folder'                => 'required|array',
            'menu_folder.*'              => 'exists:folder_menus,id',

        ];

    }
}
