<?php

namespace App\Http\Requests\MenuTree;

use Illuminate\Foundation\Http\FormRequest;

class MenuTreeRequest extends FormRequest
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
            'name' => 'sometimes|string|max:255|unique:menu_trees,name' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'name_e' => 'sometimes|string|max:255|unique:menu_trees,name_e' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'menu_id' => 'nullable|exists:menus,id',
            'parent_id'=>'nullable'

        ];
    }
}
