<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();

            $table->string("name", 100)->comment("Name Arabic");
            $table->string("name_e", 100)->comment("Name English");
            $table->string("url", 200)->nullable()->comment("مسار نظام الشركة");
            $table->string("address", 200); 
            $table->string("phone", 20);
            $table->string("cr")->comment("سجل تجاري"); //Commercial Record
            $table->string("tax_id")->comment("رقم ضريبي"); // tax number
            $table->string("vat_no")->comment("رقم تسجيل القيمة المضافة"); // Value Added Registration Number
            $table->string("email");
            $table->string('is_active')->default('active');
            $table->unsignedInteger('partner_id')->nullable()->comment("References Table Partners");
            $table->string('phone_code')->nullable()->default('');
            $table->string('country_code')->nullable()->default('+2');
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
        Schema::dropIfExists('companies');
    }
}
