<?php

namespace App\Http\Requests\Menu;

use Illuminate\Foundation\Http\FormRequest;

class MenuRequest extends FormRequest
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
        $id = $this->id;
        return [
            'name'      => 'sometimes|string|max:255|unique:menus,name' . ($this->method() == 'PUT' ? ',' . $this->id : ''),

            'name_e'    => 'sometimes|string|max:255|unique:menus,name_e' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'sort'      => 'sometimes|integer|min:0|unique:menus,sort' . ($this->method() == 'PUT' ? ',' . $this->id : ''),


        ];
    }

    public function messages()
    {
        return [
            'name.unique' => __('message.name already exists'),
            'name_e.unique' => __('message.name already exists'),
        ];
    }
}
