<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompaniesProgram extends Model
{
    use HasFactory,SoftDeletes;

    protected $guarded = ['id'];

    protected $appends = ['modules'];

    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }
    public function program(){
        return $this->belongsTo(ProjectProgramModule::class,'program_id');
    }

    public function modules(){
        return $this->hasMany(CompanyProjectProgramModule::class,'company_program_id','id');
    }
}
