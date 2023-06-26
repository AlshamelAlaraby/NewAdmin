<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubMenuRequest extends FormRequest
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
        $request =  request();

        return [
            'name' => 'required|string|max:255',
            'name_e' => 'required|string|max:255',
            'is_add_on' => 'nullable|boolean',
            'is_menu_collapsed' => 'nullable|in:0,1',
            'menu_id' => 'nullable|exists:program_folder_menu,id',

            'sort' => [
                'nullable',
                Rule::unique('sub_menus')->ignore($this->id)->where(function ($query) use($request) {
                    return $query->where('menu_id', $request->menu_id);
                }),
            ],

        ];
    }
}
