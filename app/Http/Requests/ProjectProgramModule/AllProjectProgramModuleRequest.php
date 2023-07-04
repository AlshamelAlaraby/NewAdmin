<?php

namespace App\Http\Requests\ProjectProgramModule;

use Illuminate\Foundation\Http\FormRequest;

class AllProjectProgramModuleRequest extends FormRequest
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
            "parent_id"  => "nullable",
            "is_active"  => "nullable|in:active,inactive",
            "page"       => "nullable|integer",
            "per_page"   => "nullable|integer",
        ];
    }
}
