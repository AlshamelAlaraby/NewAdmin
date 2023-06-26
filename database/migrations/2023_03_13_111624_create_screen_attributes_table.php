<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScreenAttributesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('screen_attributes', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('screen_id')->constrained('screens')->references("id");
            $table->unsignedInteger('module_id')->constrained('modules')->references("id");
            $table->json('attributes')->nullable();
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
        Schema::dropIfExists('screen_attributes');
    }
}
