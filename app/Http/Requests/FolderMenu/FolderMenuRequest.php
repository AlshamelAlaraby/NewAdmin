<?php

namespace App\Http\Requests\FolderMenu;

use Illuminate\Foundation\Http\FormRequest;

class FolderMenuRequest extends FormRequest
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
            'name'      => 'required|string|max:255|unique:folders_menu,name' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'name_e'    => 'required|string|max:255|unique:folders_menu,name_e' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'sort'      => 'nullable|integer|min:0|unique:folders_menu,sort' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'is_menu_collapsed' => 'nullable|in:0,1',

        ];
    }
}
