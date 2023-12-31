<?php

namespace App\Http\Requests\Company;

use App\Rules\CountryCodeRule;
use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [

            'name'         => 'sometimes|string|max:255|unique:companies,name' . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            'name_e'       => 'sometimes|string|max:255|unique:companies,name_e,' . ($this->method() == 'PUT' ?  $this->id : ''),
            "url"          => "sometimes|url|unique:companies,url" . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            "address"      => "nullable|string|max:200",
            'phone'        => 'sometimes|string|max:20|unique:companies,phone,' . ($this->method() == 'PUT' ?   $this->id : ''),
            "cr"           => "nullable|string|unique:companies,cr" . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            "tax_id"       => "nullable|numeric|digits_between:1,10",
            "vat_no"       => "nullable|numeric|digits_between:1,10",

            "email"        => "sometimes|email|unique:companies,email" . ($this->method() == 'PUT' ? ',' . $this->id : ''),
            "is_active"    => "nullable|in:active,inactive",
            "partner_id"   => "nullable|exists:partners,id",
            "phone_code"   => "sometimes",
            "country_code" => "nullable|string",
            "media"        => "nullable|array",
            "media.*"      => ["nullable", "exists:media,id", new \App\Rules\MediaRule()],
            'old_media.*'  => ['exists:media,id', new \App\Rules\MediaRule("App\Models\Company")],
            "contact_person" => "nullable|string",

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
            'phone.numeric' => 'The phone must be a number.',
            'phone.digits_between' => 'The phone must be between :min and :max digits.',
            'phone.unique' => 'The phone has already been taken.',
            'partner_id.exists' => 'The selected partner_id is invalid.',
            'url.url' => 'The url must be a valid URL.',
            'url.max' => 'The url may not be greater than :max characters.',
            'url.unique' => 'The url has already been taken.',
            'address.string' => 'The address must be a string.',
            'address.max' => 'The address may not be greater than :max characters.',
            'cr.string' => 'The cr must be a string.',
            'cr.unique' => 'The cr has already been taken.',
            'tax_id.numeric' => 'The tax_id must be a number.',
            'tax_id.digits_between' => 'The tax_id must be between :min and :max digits.',
            'vat_no.numeric' => 'The vat_no must be a number.',
            'vat_no.digits_between' => 'The vat_no must be between :min and :max digits.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email has already been taken.',
            'website.string' => 'The website must be a string.',
            'website.max' => 'The website may not be greater than :max characters.',
            'is_active.in' => 'The is_active field must be either "active" or "inactive".',
            'phone_code.numeric' => 'The phone_code must be a number.',
            'phone_code.digits_between' => 'The phone_code must be between :min and :max digits.',
            'country_code.string' => 'The country_code must be a string.',
            'country_code.country_code' => 'The country_code is not a valid country code.',
            'media.*.exists' => 'The selected media is invalid.',
            'old_media.*.exists' => 'The selected old media is invalid.',
        ];
    }
}
