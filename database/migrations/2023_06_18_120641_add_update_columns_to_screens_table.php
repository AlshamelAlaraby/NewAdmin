<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUpdateColumnsToScreensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('screens', function (Blueprint $table) {
            $table->renameColumn('name', 'name_old');
            $table->renameColumn('name_e', 'name_e_old');
            $table->renameColumn('title', 'title_old');
            $table->renameColumn('title_e', 'title_e_old');
        });

        // Create new columns without the unique constraint
        Schema::table('screens', function (Blueprint $table) {
            $table->string("name", 100)->comment("Name Arabic");
            $table->string("name_e", 100)->comment("Name English");
            $table->string("title", 100)->comment("Title Arabic");
            $table->string("title_e", 100)->comment("Title English");
        });

        DB::table('screens')->update([
            'name' => DB::raw('name_old'),
            'name_e' => DB::raw('name_e_old'),
            'title' => DB::raw('title_old'),
            'title_e' => DB::raw('title_e_old'),
        ]);

        Schema::table('screens', function (Blueprint $table) {
            $table->dropColumn(['name_old', 'name_e_old', 'title_old', 'title_e_old']);
        });

        Schema::table('screens', function (Blueprint $table) {
            $table->unsignedBigInteger('company_id')->nullable();
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

        });
    }
}
