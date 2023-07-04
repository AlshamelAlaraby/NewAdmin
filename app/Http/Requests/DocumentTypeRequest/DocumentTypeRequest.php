<?php

namespace App\Http\Requests\DocumentTypeRequest;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;


class DocumentTypeRequest extends FormRequest
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
            'name'                => 'sometimes|string|max:255|unique:document_types,name' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'name_e'              => 'sometimes|string|max:255|unique:document_types,name_e' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'is_default'          => ['nullable','int:0,1'],
            'attributes'          => "nullable|array",
            'document_relateds.*' => "nullable|exists:document_types,id",
        ];
    }

    public function messages()
    {
        return [
            'name.string'        => 'The name must be a string.',
            'name.max'           => 'The name may not be greater than :max characters.',
            'name.unique'        => 'The name has already been taken.',
            'name_e.string'      => 'The English name must be a string.',
            'name_e.max'         => 'The English name may not be greater than :max characters.',
            'name_e.unique'      => 'The English name has already been taken.',
            'is_default.required' => 'The is default field is required.',
            'is_default.integer' => 'The is default field must be an integer.',
            'attributes.array'   => 'The attributes field must be an array.',
            'branche_id.exists'  => 'The selected branch is invalid.',
            'serial_id.integer'  => 'The serial ID must be an integer.',
        ];
    }

    protected function failedValidation(Validator $validator, $code=400)
    {
        throw new HttpResponseException(
            response()->json(
                [
                    'status' => $code,
                    'success' => false,
                    'message' => $validator->errors(),
                    'data' => null
                ],
                $code
            )
        );
    }

    protected function failedAuthorization()
    {
        throw new HttpResponseException(
            response()->json(
                [
                    'status' => false,
                    'message' => "Error: you are not authorized or do not have the permission",
                    'data' => null
                ],
                401
            )
        );
    }
}
