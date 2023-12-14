<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCompanyProgramIdToCompanyProjectProgramModules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('company_project_program_modules', function (Blueprint $table) {
            $table->foreignId('company_program_id')->nullable()->constrained('companies_programs')->references("id")->cascadeOnDelete();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('company_project_program_modules', function (Blueprint $table) {
            $table->dropColumn('company_program_id');
            $table->dropColumn('deleted_at');
        });
    }
}
