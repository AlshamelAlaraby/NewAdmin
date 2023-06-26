<?php

namespace App\Http\Requests\Hotfield;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class HotfieldRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules(Request $request)
    {
        return [
            'table_name'       => 'sometimes|string|max:50|unique:hotfields,table_name' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'field_name'       => 'sometimes|string|max:50|unique:hotfields,field_name' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'field_title'      => 'sometimes|string|max:100|unique:hotfields,field_title' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'field_title_en'   => 'sometimes|string|max:100|unique:hotfields,field_title_en' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'visibility'       => 'in:0,1',
        ];
    }

}
