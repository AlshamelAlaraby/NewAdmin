<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCountryCodeToManyTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('partners', function (Blueprint $table) {
            $table->string('phone_code')->nullable()->default('');
            $table->string('country_code')->nullable()->default('+2');
        });
        Schema::table('companies', function (Blueprint $table) {
            $table->string('phone_code')->nullable()->default('');
            $table->string('country_code')->nullable()->default('+2');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('many_tables', function (Blueprint $table) {
            //
        });
    }
}
