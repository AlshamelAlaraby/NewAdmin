<?php

namespace App\Http\Requests\Hotfield;

use Illuminate\Foundation\Http\FormRequest;

class StoreHotfieldRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'table_name'       => 'required|string|max:50|unique:hotfields,table_name' ,
            'field_name'       => 'required|string|max:50|unique:hotfields,field_name' ,
            'field_title'      => 'required|string|max:100|unique:hotfields,field_title',
            'field_title_en'   => 'required|string|max:100|unique:hotfields,field_title_en',
            'visibility'       => 'in:0,1',
        ];
    }

}
