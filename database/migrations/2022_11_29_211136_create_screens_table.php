<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('screens', function (Blueprint $table) {
            $table->id();
            $table->string("name", 100)->comment("Name Arabic");
            $table->string("name_e", 100)->comment("Name English");
            $table->string("title", 100)->comment("title Arabic");
            $table->string("title_e", 100)->comment("title English");
            $table->boolean('is_add_on')->default(0);
            $table->text("url")->nullable();
            $table->boolean('is_implementor')->default(0);
            $table->bigInteger('sort')->default('0');
            $table->unsignedBigInteger('sub_menu_id')->nullable()->comment("References Table sub_menus");
            $table->unsignedBigInteger('company_id')->nullable()->comment("References Table companies");
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
        Schema::dropIfExists('sys_screens');
    }
};
