<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectProgramModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_program_modules', function (Blueprint $table) {

            $table->id();
            $table->string('name')->comment("Name Arabic");
            $table->string('name_e')->comment("Name English");
            $table->string('is_active')->default('inactive');
            $table->boolean('is_add_on')->default(0);
            $table->boolean('is_menu_collapsed')->default(0);
            $table->string('icon')->nullable();
            $table->bigInteger('sort')->default(0);
            $table->boolean('is_module')->default(0);
            $table->unsignedBigInteger('parent_id')->nullable()->comment("References Table Partners");
            $table->unsignedBigInteger('module_id')->nullable()->comment("References Table project_program_modules = Id the row   is_module == 1 ");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_program_modules');
    }
}
