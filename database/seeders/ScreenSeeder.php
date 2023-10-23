<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\Screen;
use App\Models\WorkflowTree;
use Illuminate\Database\Seeder;

class ScreenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Screen::create([
            // 'name' => 'screen properties',
            'name_e' => 'screen properties',
            "title" => "1",
            "title_e" => "1",
        ]);

        Screen::create([
            // 'name' => 'tree property',
            'name_e' => 'tree property',
            "title" => "2",
            "title_e" => "2",
        ]);

        Screen::create([
            // 'name' => 'sales men Type',
            'name_e' => 'sales men Type',
            "title" => "3",
            "title_e" => "3",
        ]);

        Screen::create([
            // 'name' => 'sales men',
            'name_e' => 'sales men',
            "title" => "4",
            "title_e" => "4",
        ]);

        Screen::create([
            // 'name' => 'external salesmen',
            'name_e' => 'external salesmen',
            "title" => "5",
            "title_e" => "5",
        ]);

        Screen::create([
            // 'name' => 'internal salesmen',
            'name_e' => 'internal salesmen',
            "title" => "6",
            "title_e" => "6",
        ]);

        Screen::create([
            // 'name' => 'payment types',
            'name_e' => 'payment types',
            "title" => "7",
            "title_e" => "7",
        ]);

        Screen::create([
            // 'name' => 'banks',
            'name_e' => 'banks',
            "title" => "8",
            "title_e" => "8",
        ]);


        Screen::create([
            // 'name' => 'bank accounts',
            'name_e' => 'bank accounts',
            "title" => "9",
            "title_e" => "9",
        ]);

        Screen::create([
            // 'name' => 'country',
            'name_e' => 'country',
            "title" => "10",
            "title_e" => "10",
        ]);

        Screen::create([
            // 'name' => 'governorate',
            'name_e' => 'governorate',
            "title" => "11",
            "title_e" => "11",
        ]);

        Screen::create([
            // 'name' => 'city',
            'name_e' => 'city',
            "title" => "12",
            "title_e" => "12",
        ]);

        Screen::create([
            // 'name' => 'avenue',
            'name_e' => 'avenue',
            "title" => "13",
            "title_e" => "13",
        ]);

        Screen::create([
            // 'name' => 'role Type',
            'name_e' => 'role Type',
            "title" => "14",
            "title_e" => "14",
        ]);

        Screen::create([
            // 'name' => 'roles',
            'name_e' => 'roles',
            "title" => "15",
            "title_e" => "15",
        ]);

        Screen::create([
            // 'name' => 'user role',
            'name_e' => 'user role',
            "title" => "16",
            "title_e" => "16",
        ]);

        Screen::create([
            // 'name' => 'role workflow',
            'name_e' => 'role workflow',
            "title" => "17",
            "title_e" => "17",
        ]);

    }
}
