<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFolderMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('folder_menus', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment("Name Arabic");
            $table->string('name_e')->comment("Name English");
            $table->bigInteger('sort')->default('0');
            $table->boolean('is_menu_collapsed')->default(0);
            $table->softDeletes();
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
        Schema::dropIfExists('folders_menu');
    }
}
