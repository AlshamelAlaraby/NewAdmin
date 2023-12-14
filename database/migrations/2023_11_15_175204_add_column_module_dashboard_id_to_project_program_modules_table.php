<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnModuleDashboardIdToProjectProgramModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_program_modules', function (Blueprint $table) {
            $table->foreignId('module_dashboard_id')->nullable()->constrained('module_dashboards');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_program_modules', function (Blueprint $table) {
            $table->dropColumn("module_dashboard_id");
        });
    }
}
