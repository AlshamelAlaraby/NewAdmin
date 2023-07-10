<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */

    public function run()
    {

         \App\Models\Admin::create([
             'name' => 'admin',
             "email" => "admin@admin.com",
             'password' => Hash::make("admin123456"),
         ]);
         $this->call(PartnerSeeder::class);
         $this->call(CompanySeeder::class);
         $this->call(ProjectProgramModuleSeeder::class);
         $this->call(ScreenSeeder::class);

        //  \App\Models\Partner::factory(100)->create();
        //  \App\Models\Company::factory(100)->create();
    }
}
