<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentCompanyModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('document_company_modules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_module_id')->constrained('company_modules')->references("id");
            $table->foreignId('document_type_id')->constrained('document_types')->references("id");
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
        Schema::dropIfExists('document_company_modules');
    }
}
