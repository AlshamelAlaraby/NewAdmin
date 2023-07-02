<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuTreesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_trees', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('name_e')->unique();
            $table->unsignedBigInteger('parent_id')->default(0);
            $table->unsignedInteger('menu_id');
            $table->string('is_active')->default('active');
            // $table->foreign('menu_id')->on('menus')->references('id')->onDelete('Cascade');
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
        Schema::dropIfExists('menu_trees');
    }
}
