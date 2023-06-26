<?php

namespace App\Http\Requests\Menu;

use Illuminate\Foundation\Http\FormRequest;

class StoreMenuRequest extends FormRequest
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
            'name'     => 'required|string|max:255|unique:menus,name',
            'name_e'    => 'required|string|max:255|unique:menus,name_e',  
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('message.name is required'),
            'name_e.required' => __('message.name is required'),
            'name.unique' => __('message.name already exists'),
            'name_e.unique' => __('message.name already exists'),
           
        ];
    }
}
