<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUpdateColunmsToSysCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->string("cr")->nullable()->comment("سجل تجاري")->change();
            $table->string("tax_id")->nullable()->comment("رقم ضريبي")->change();
            $table->string("vat_no")->nullable()->comment("رقم تسجيل القيمة المضافة")->change();
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
            $table->string("cr")->comment("سجل تجاري");
            $table->string("tax_id")->comment("رقم ضريبي");
            $table->string("vat_no")->comment("رقم تسجيل القيمة المضافة");
        });
    }
}
