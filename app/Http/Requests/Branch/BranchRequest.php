<?php

namespace App\Http\Requests\Branch;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BranchRequest extends FormRequest
{

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
            'name' => 'sometimes|string|max:255',
            'name_e' => 'sometimes|string|max:255',
            'is_active' => 'sometimes|in:active,inactive',
            'company_id' => 'nullable|exists:companies,id',

        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */

    public function messages()
    {
        return [
            
            "is_active.required" => __("message.field is required"),
            "company_id.required" => __("message.field is required"),
            "company_id.exists" => __("message.field is required"),

        ];
    }
}
