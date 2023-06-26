<?php

namespace App\Http\Requests\SettingScreen;

use Illuminate\Foundation\Http\FormRequest;

class SettingScreenRequest extends FormRequest
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
            'name_screen'           => 'required|string|max:255',
            'admin_id'               => 'required|required|exists:admins,id',
            'data_json'             => 'required|array',
            'columns.*.column_name' => 'required|string|max:255',
            'columns.*.is_visible'  => 'required|in:0,1|integer',
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
            "name_screen.required" => __("message.field is required"),
            "admin_id.required"    => __("message.field is required"),
            "admin_id.exists"      => __("message.field is required"),

        ];
    }
}
