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
            'name'        => 'sometimes|string|max:100|unique:helpfiles,name' . ($this->method() == 'POST' ? ',' . $this->id : ''),
            'name_e'      => 'sometimes|string|max:100|unique:helpfiles,name_e' . ($this->method() == 'POST' ? ',' . $this->id : ''),
            'url'         => 'sometimes|url|unique:helpfiles,url' . ($this->method() == 'POST' ? ',' . $this->id : ''),

        ];
    }

}
