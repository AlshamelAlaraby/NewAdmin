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
           'parent_id' => 0,
           'is_active' => 'active',
       ]);
       ProjectProgramModule::create([
           'name' => 'company',
           'name_e' => 'company',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'branch',
           'name_e' => 'branch',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'sub contact group',
           'name_e' => 'sub contact group',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'payment plan installment',
           'name_e' => 'payment plan installment',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'store',
           'name_e' => 'store',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'serial',
           'name_e' => 'serial',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'properties',
           'name_e' => 'properties',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'sales men',
           'name_e' => 'sales men',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'bank',
           'name_e' => 'bank',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'area',
           'name_e' => 'area',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'role',
           'name_e' => 'role',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'real estate',
           'name_e' => 'real estate',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'archiving',
           'name_e' => 'archiving',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'Workflow hot fields',
           'name_e' => 'Workflow hot fields',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'users',
           'name_e' => 'users',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'currencies',
           'name_e' => 'currencies',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'employees',
           'name_e' => 'employees',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'financial Year',
           'name_e' => 'financial Year',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'units',
           'name_e' => 'units',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'color',
           'name_e' => 'color',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'dictionary',
           'name_e' => 'dictionary',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'receivable payable',
           'name_e' => 'receivable payable',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'custom table',
           'name_e' => 'custom table',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
           'name' => 'general customer',
           'name_e' => 'general customer',
           'parent_id' => 0,
           'is_active' => 'active',
       ]);

       ProjectProgramModule::create([
            'name' => 'document',
            'name_e' => 'المستند',
            'parent_id' => 0,
            'is_active' => 'active',
        ]);

        ProjectProgramModule::create([
            'name' => 'street',
            'name_e' => 'شارع',
            'parent_id' => 0,
            'is_active' => 'active',
        ]);
    }
}
