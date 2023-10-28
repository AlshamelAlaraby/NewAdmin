<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('modules')->delete();

        $attributes = [
            [
                'id' => 1,
                'name' => 'General',
                'name_e' => 'General',
            ],
            [
                'id' => 2,
                'name' => 'Board Rent',
                'name_e' => 'Board Rent',
            ],
            [
                'id' => 3,
                'name' => 'Club Members',
                'name_e' => 'Club Members',
            ],
            [
                'id' => 4,
                'name' => 'Human Resources',
                'name_e' => 'Human Resources',
            ],
            [
                'id' => 5,
                'name' => 'Real Estate',
                'name_e' => 'Real Estate',
            ],
            [
                'id' => 6,
                'name' => 'Receivable Payable',
                'name_e' => 'Receivable Payable',
            ],
            [
                'id' => 7,
                'name' => 'Point Of Sale',
                'name_e' => 'Point Of Sale',
            ],
            [
                'id' => 8,
                'name' => 'Booking',
                'name_e' => 'Booking',
            ],

        ];

        foreach ($attributes as $attribute) {
            Module::create($attribute);
        }
    }

}
