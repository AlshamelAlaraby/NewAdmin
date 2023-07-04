<?php

namespace Database\Seeders;

use App\Models\ProjectProgramModule;
use Illuminate\Database\Seeder;

class ProjectProgramModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProjectProgramModule::create([
           'name' => 'general',
           'name_e' => 'general',
           'is_active' => 'active',
       ]);
       ProjectProgramModule::create([
           'name' => 'company',
           'name_e' => 'company',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'branch',
           'name_e' => 'branch',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'sub contact group',
           'name_e' => 'sub contact group',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'payment plan installment',
           'name_e' => 'payment plan installment',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'store',
           'name_e' => 'store',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'serial',
           'name_e' => 'serial',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'properties',
           'name_e' => 'properties',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'sales men',
           'name_e' => 'sales men',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'bank',
           'name_e' => 'bank',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'area',
           'name_e' => 'area',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'role',
           'name_e' => 'role',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'real estate',
           'name_e' => 'real estate',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'archiving',
           'name_e' => 'archiving',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'Workflow hot fields',
           'name_e' => 'Workflow hot fields',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'users',
           'name_e' => 'users',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'currencies',
           'name_e' => 'currencies',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'employees',
           'name_e' => 'employees',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'financial Year',
           'name_e' => 'financial Year',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'units',
           'name_e' => 'units',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'color',
           'name_e' => 'color',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'dictionary',
           'name_e' => 'dictionary',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'receivable payable',
           'name_e' => 'receivable payable',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'custom table',
           'name_e' => 'custom table',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'general customer',
           'name_e' => 'general customer',
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
            'name' => 'document',
            'name_e' => 'المستند',
            'is_active' => 'active',
        ]);

        ProjectProgramModule::create([
            'name' => 'street',
            'name_e' => 'شارع',
            'is_active' => 'active',
        ]);
    }
}
