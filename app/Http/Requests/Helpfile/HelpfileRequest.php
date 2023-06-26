<?php

namespace App\Http\Requests\Helpfile;

use Illuminate\Foundation\Http\FormRequest;

class HelpfileRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'       =>  ($this->method == 'PUT' ? 'nullable|' : 'required|') .'string|max:100',
            'name_e'     =>  ($this->method == 'PUT' ? 'required|' : 'required|') .'string|max:100',
            'url'        =>  ($this->method == 'PUT' ? 'required|' : 'required|') .'string|max:200'
        ];
    }

}
