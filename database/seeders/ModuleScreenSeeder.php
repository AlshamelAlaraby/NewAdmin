<?php

namespace Database\Seeders;

use App\Models\ModuleScreen;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModuleScreenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('module_screens')->delete();

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

            ]
            ,
            [
                'id' => 6,
                'name' => 'Receivable Payable',
                'name_e' => 'Receivable Payable',

            ]
            ,
            [
                'id' => 7,
                'name' => 'Point Of Sale',
                'name_e' => 'Point Of Sale',

            ],
            [
                'id' => 8,
                'name' => 'نظام ادارة المستشفيات',
                'name_e' => 'Hospitals Management System',
            ],

        ];

        foreach ($attributes as $attribute) {
            ModuleScreen::create($attribute);
        }
    }
}
