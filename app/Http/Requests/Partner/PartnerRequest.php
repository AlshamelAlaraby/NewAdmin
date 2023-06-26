<?php

namespace App\Http\Requests\Partner;

use App\Rules\CountryCodeRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PartnerRequest extends FormRequest
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

            'name' => 'sometimes|string|max:255|unique:partners,name' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'name_e' => 'sometimes|string|max:255|unique:partners,name_e' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            "is_active" => "nullable|in:active,inactive",
            'email' => 'sometimes|email|max:191|unique:partners,email' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            "password" => "sometimes|string",
            'mobile_no' => 'sometimes|string|max:20|unique:partners,mobile_no' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            "phone_code" => "sometimes|numeric|digits_between:0,10",
            "country_code" => "sometimes|string",
        ];

    }



    public function messages()
{
    return [
        'name.string' => 'The name must be a string.',
        'name.max' => 'The name may not be greater than :max characters.',
        'name.unique' => 'The name has already been taken.',
        'name_e.string' => 'The name_e must be a string.',
        'name_e.max' => 'The name_e may not be greater than :max characters.',
        'name_e.unique' => 'The name_e has already been taken.',
        'is_active.in' => 'The is_active field must be either "active" or "inactive".',
        'email.email' => 'The email must be a valid email address.',
        'email.max' => 'The email may not be greater than :max characters.',
        'email.unique' => 'The email has already been taken.',
        'password.required' => 'The password field is required.',
        'mobile_no.numeric' => 'The mobile_no must be a number.',
        'mobile_no.unique' => 'The mobile_no has already been taken.',
        'phone_code.numeric' => 'The phone_code must be a number.',
        'phone_code.digits_between' => 'The phone_code may not be greater than :max digits.',
        'country_code.string' => 'The country_code must be a string.',
        'country_code.country_code' => 'The country_code is not a valid country code.',
    ];
}
}
