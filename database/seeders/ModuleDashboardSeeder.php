<?php

namespace Database\Seeders;

use App\Models\ModuleDashboard;
use Illuminate\Database\Seeder;

class ModuleDashboardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dashboards = [
            [
                'id' => 1,
                'name' => 'الافتراضية',
                'name_e' => 'Default',
            ],
            [
                'id' => 2,
                'name' => 'داشبورد الحجوزات',
                'name_e' => 'Booking Dashboard',
            ],
            [
                'id' => 3,
                'name' => 'داشبورد النوادي',
                'name_e' => 'Club Members Dashboard',
            ],
            [
                'id' => 4,
                'name' => 'داشبورد نظام ادارة مستشفى',
                'name_e' => 'H.M.S Dashboard',
            ],
        ];
        foreach ($dashboards as $dashboard)
            ModuleDashboard::create($dashboard);
    }
}
