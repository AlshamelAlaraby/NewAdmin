<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNameToScreensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('screens', function (Blueprint $table) {
            $table->string('name')->nullable()->after('id');
            $table->string('middleware')->nullable()->after('name_e');
            $table->boolean('is_short_cut')->default(0);
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
            $table->dropColumn('name');
            $table->dropColumn('middleware');
            $table->dropColumn('is_short_cut');

        });
    }
}
