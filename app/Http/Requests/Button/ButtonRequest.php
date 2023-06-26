<?php

namespace App\Http\Requests\Button;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class ButtonRequest extends FormRequest
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
    public function rules(Request $request)
    {
        return [
            'name' => 'sometimes|string|max:100|unique:buttons,name' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'name_e' => 'sometimes|string|max:100|unique:buttons,name_e' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            "media" => "nullable|array",
            "media.*" => ["nullable", "exists:media,id", new \App\Rules\MediaRule()],
            'old_media.*' => ['exists:media,id', new \App\Rules\MediaRule("App\Models\Button")],
        ];
    }
}
