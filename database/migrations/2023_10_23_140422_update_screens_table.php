<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateScreensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('screens', function (Blueprint $table) {
            $table->dropColumn(['name', 'sort']);
            $table->renameColumn('url', 'middleware_url');
            $table->boolean('is_add_on')->default(1)->change();
            $table->boolean('is_implementor')->default(1)->change();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('screens', function (Blueprint $table) {
            $table->string("name", 100)->comment("Name Arabic");
            $table->bigInteger('sort')->default(0);
            $table->renameColumn('middleware_url', 'url');
            $table->boolean('is_add_on')->default(0)->change();
            $table->boolean('is_implementor')->default(0)->change();
        });
    }
}
