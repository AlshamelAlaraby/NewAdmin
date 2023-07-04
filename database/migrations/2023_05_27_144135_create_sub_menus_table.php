<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('sub_menus', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->comment("Name Arabic");
            $table->string('name_e')->nullable()->comment("Name English");
            $table->boolean('is_add_on')->default(false);
            $table->unsignedBigInteger('program_folder_menu_id')->nullable()->comment("References Table program_folder_menu");
            $table->bigInteger('sort')->default('0');
            $table->boolean('is_menu_collapsed')->default(0);
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
        Schema::dropIfExists('sub_menus');
    }
}
