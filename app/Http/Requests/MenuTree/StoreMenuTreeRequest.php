<?php

namespace App\Http\Requests\MenuTree;

use Illuminate\Foundation\Http\FormRequest;

class StoreMenuTreeRequest extends FormRequest
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
            'name' => 'required|string|max:255|unique:menu_trees,name',
            'name_e' => 'required|string|max:255|unique:menu_trees,name_e',
            'menu_id' => 'required|exists:menus,id',
            'parent_id'=>'nullable'

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
            "name.required" => __("message.field is required"),
            "name_e.required" => __("message.field is required"),
            "menu_id.required" => __("message.field is required"),
            "menu_id.exists" => __("message.field is required"),

        ];
    }
}
