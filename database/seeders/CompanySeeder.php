<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Company::create([
            "name" => "شركة الشامل",
            "name_e" => "Alshamel Company",
            "url" => "https://alshamelalaraby.com",
            "address" => "https://alshamelalaraby.com",
            "phone" => "234535345",
            "cr" => "345345",
            "tax_id" => "23425",
            "vat_no" => "345345",
            "email" => "test@test.com",
            "is_active" => "active",
            "partner_id" => 1,
        ]);
    }
}
