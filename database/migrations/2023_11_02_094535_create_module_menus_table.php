<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModuleMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('module_menus', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('name_e')->nullable();
            $table->enum('type',['page','folder'])->default('folder');
            $table->bigInteger('sort')->default(0);
            $table->unsignedBigInteger('folder_id')->nullable();
            $table->foreignId('page_id')->nullable()->constrained('screens')->references("id")->cascadeOnDelete();
            $table->foreignId('module_id')->nullable()->constrained('project_program_modules')->references("id")->cascadeOnDelete();
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
        Schema::dropIfExists('module_menus');
    }
}
