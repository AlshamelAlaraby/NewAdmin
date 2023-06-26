<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddChangeToProjectsProgramsModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects_programs_modules', function (Blueprint $table) {
            $table->renameColumn('name', 'name_old');
            $table->renameColumn('name_e', 'name_e_old');


        });

        // Create new columns without the unique constraint
        Schema::table('projects_programs_modules', function (Blueprint $table) {
            $table->string("name")->comment("Name Arabic");
            $table->string("name_e")->comment("Name English");


        });

        DB::table('projects_programs_modules')->update([
            'name' => DB::raw('name_old'),
            'name_e' => DB::raw('name_e_old'),

        ]);

        Schema::table('projects_programs_modules', function (Blueprint $table) {
            $table->dropColumn(['name_old', 'name_e_old']);
        });

        Schema::table('projects_programs_modules', function (Blueprint $table) {
            $table->boolean('is_module')->default(0);
            $table->unsignedBigInteger('module_id')->nullable();
        });



    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects_programs_modules', function (Blueprint $table) {

        });
    }
}
