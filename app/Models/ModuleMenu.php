<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ModuleMenu extends Model
{
    use HasFactory,SoftDeletes;

    protected $guarded = ['id'];

    public function page(){
        return $this->belongsTo(Screen::class, 'page_id');
    }


    public function module(){
        return $this->belongsTo(ProjectProgramModule::class,'module_id');
    }

    public function parent_folder(){
        return $this->belongsTo(ModuleMenu::class,'folder_id');
    }

    public function childrens(){
        return $this->hasMany(ModuleMenu::class,'folder_id');
    }
}
