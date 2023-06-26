<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class RemoveSpaces implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $phone_number = str_replace(' ', '', $value); // Removes any spaces in the phone number
        request()->merge([$attribute => $phone_number]); // Update the request with the modified value

        return is_numeric($phone_number);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be a number.';
    }
}
