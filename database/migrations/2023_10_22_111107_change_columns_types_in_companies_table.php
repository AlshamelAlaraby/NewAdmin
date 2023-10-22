<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeColumnsTypesInCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->string("address", 200)->nullable()->change();
            $table->string("cr")->comment("سجل تجاري")->nullable()->change(); //Commercial Record
            $table->string("tax_id")->comment("رقم ضريبي")->nullable()->change(); // tax number
            $table->string("vat_no")->comment("رقم تسجيل القيمة المضافة")->nullable()->change(); // Value Added Registration Number

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('companies', function (Blueprint $table) {
            //
        });
    }
}
