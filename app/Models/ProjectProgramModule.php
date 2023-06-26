<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectProgramModule extends Model
{
    use HasFactory, LogTrait;

    protected $fillable = [
        'name',
        'name_e',
        'parent_id',
        'is_active',
        'is_add_on',
        'sort',
        'is_menu_collapsed',
        'icon',
        'is_module',
        'module_id',
    ];
    protected $table = 'projects_programs_modules';
    protected $hidden = ['pivot'];

    protected $casts = [
        'is_active' => 'App\Enums\IsActive',
    ];





    protected $appends = ["haveChildren",'company_id'];
    /**
     * this method used to make filter of query
     * @param Query  $query
     * @param $request
     * @return $query
     */
    public function scopeFilter($query, $request)
    {
        return $query->where(function ($q) use ($request) {
            if ($request->search) {
                $q->where('name', 'like', '%' . $request->search . '%');
                $q->orWhere('name_e', 'like', '%' . $request->search . '%');
            }

            if ($request->name) {
                $q->orWhere('name', 'like', '%' . $request->name . '%');
            }

            if ($request->name_e) {
                $q->orWhere('name_e', 'like', '%' . $request->name_e . '%');
            }

            if ($request->parent_id) {
                $q->orWhere('parent_id', $request->parent_id);
            }
        });
    }
    public function children()
    {
        return $this->hasMany(ProjectProgramModule::class, 'parent_id', 'id');
    }

    public function parent()
    {
        return $this->belongsTo(ProjectProgramModule::class, 'parent_id', 'id');
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'company_modules', 'module_id', 'company_id');
    }

    public function getHaveChildrenAttribute()
    {
        return static::where("parent_id", $this->id)->count() > 0;
    }


    public function programFolders()
    {
        return $this->hasMany(ProgramFolder::class,'project_program_module_id','id');
    }


    public function screen_attributes()
    {
        return $this->belongsToMany(Screen::class, 'screen_attributes', 'screen_id', 'module_id')->withPivot('attributes');;
    }

    public function modules()
    {
        return $this->hasMany(ProjectProgramModule::class,'is_module','id');

    }

    public function hasChildren()
    {
        return $this->children()->count() > 0 || $this->companies()->count() > 0  || $this->programFolders()->count() > 0 ;
    }


    public function getCompanyIdAttribute($key)
    {
       return  $this->companies()->first()->id ?? null;
    }

}
