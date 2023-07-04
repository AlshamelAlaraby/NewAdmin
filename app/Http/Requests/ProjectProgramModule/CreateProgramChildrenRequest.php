<?php

namespace App\Http\Requests\ProjectProgramModule;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateProgramChildrenRequest extends FormRequest
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

            'program_id' => 'required|exists:project_program_modules,id',
            'modules' => 'required|array',
            'modules.*' => 'required|exists:project_program_modules,id',

        ];
    }
}
