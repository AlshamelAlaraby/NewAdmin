<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyProjectProgramModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_project_program_modules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id')->comment("References Table companies");
            $table->unsignedBigInteger('project_program_module_id')->nullable()->comment("References Table project_program_modules");
            $table->bigInteger('allowed_users_no');
            $table->date("start_date");
            $table->date("end_date")->nullable();
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
        Schema::dropIfExists('company_project_program_modules');
    }
}
