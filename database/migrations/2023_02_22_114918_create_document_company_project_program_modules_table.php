<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentCompanyProjectProgramModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('document_company_project_program_modules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_project_program_module_id')->comment("References Table company_project_program_modules");
            $table->unsignedBigInteger('document_type_id')->comment("References Table document_types");
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
        Schema::dropIfExists('document_company_project_program_modules');
    }
}
