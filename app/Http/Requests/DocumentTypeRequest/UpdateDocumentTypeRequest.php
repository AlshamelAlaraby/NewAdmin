<?php

namespace App\Http\Requests\DocumentTypeRequest;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDocumentTypeRequest extends FormRequest
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
            'name'   => 'nullable|string|max:255|unique:document_types,name,'.$this->id,
            'name_e' => 'nullable|string|max:255|unique:document_types,name_e,'.$this->id,
            'is_default' => ['nullable','integer'],
        ];
    }


    public function messages()
    {
        return [
            'required'    => 'field is required',
        ];
    }
}
