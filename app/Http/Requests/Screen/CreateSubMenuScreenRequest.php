<?php

namespace App\Http\Requests\Screen;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateSubMenuScreenRequest extends FormRequest
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
            'sub_menu_id'          => 'required|exists:sub_menus,id',
            'screens'              => 'required|array',
            'screens.*'            => 'required|exists:screens,id',
//            'screens.*.name_e'     => 'required|string',
//            'screens.*.sort'       => 'required',
//            'screens.*.title'      => 'required|string',
//            'screens.*.title_e'    => 'required|string',
//            'screens.*.url'        => 'required|string',
//            'screens.*.module_id'  => 'nullable|exists:modules,id',
//            'screens.*.attributes' => 'nullable|array',
//            "screens.*.is_add_on"  => "nullable|boolean",
//            'screens.*.serial_id'  => 'nullable',
//            'screens.*.iscreens.*.s_implementor'  => 'nullable|in:1,0',

        ];
    }
}
