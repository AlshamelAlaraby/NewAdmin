<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuWorkFlowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_work_flows', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('screen_id');
            $table->unsignedInteger('menu_tree_id');
            $table->unsignedInteger('workflow_id');
            $table->unsignedInteger('company_id');
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
        Schema::dropIfExists('menu_work_flows');
    }
}
