<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Partner::create([
            'name' => 'الشامل',
            'name_e' => 'Alshamel',
            'is_active' => 'active',
            'email' => 'alshame@alshame.com',
            'password' => bcrypt('12345678'),
            'mobile_no' => '123456789',
        ]);
    }
}
