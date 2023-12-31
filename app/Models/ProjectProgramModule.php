<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectProgramModule extends Model
{
    use HasFactory, LogTrait;

    protected $guarded = ['id'];
    protected $table = 'project_program_modules';
    protected $hidden = ['pivot'];
    protected $appends = ["haveChildren", 'company_id', 'is_web', 'status'];
    protected $casts = [
        'is_active' => 'App\Enums\IsActive',
    ];

    // public function getCompaniesAttribute()
    // {

    //     return $this->companies();
    // }

    /*** return relation  with  Parent */
    public function parent()
    {
        return $this->belongsTo(ProjectProgramModule::class, 'parent_id', 'id');
    }

    /*** return relation  with  Childrens */
    public function children()
    {
        return $this->hasMany(ProjectProgramModule::class, 'parent_id', 'id');
    }

    /*** return  ProjectProgramModule modules  =>  module_id */
    public function modules()
    {
        return $this->hasMany(ProjectProgramModule::class, 'module_id', 'id');
    }

    /*** return  relation  with   ProgramFolders */
    public function programFolders()
    {
        return $this->hasMany(ProgramFolder::class, 'project_program_module_id', 'id');
    }

    /*** return relation  with  Companies */
    public function companies()
    {
        return $this->belongsToMany(Company::class, 'company_project_program_modules', 'project_program_module_id', 'company_id')->withPivot('is_web', 'status');
    }

    /*** return  relation  with   ScreenAttributes */
    public function screenAttributes()
    {
        return $this->belongsToMany(Screen::class, 'screen_attributes', 'project_program_module_id', 'screen_id')->withPivot('attributes');
    }

    /*** return count relation  hasMany */
    public function hasChildren()
    {
        return $this->children()->count() > 0 || $this->companies()->count() > 0 || $this->programFolders()->count() > 0 || $this->modules()->count() > 0
        || $this->screenAttributes()->count() > 0;
    }

    /*** return  Count  Childrens */
    public function getHaveChildrenAttribute()
    {
        return static::where("parent_id", $this->id)->count() > 0;
    }

    /*** return  Company_id */
    public function getCompanyIdAttribute($key)
    {
        auth('partner')->id() ?? null;
        return $this->companies()->where('partner_id', auth('partner')->id())->first()->id ?? null;
    }
    public function getIsWebAttribute($key)
    {

        if ($this->company_id != null) {

            return $this->companies()->where('company_id', $this->company_id)->where('project_program_module_id', $this->id)->first()->pivot->is_web;
        }
        return null;
    }

    public function getStatusAttribute($key)
    {

        if ($this->company_id != null) {

            return $this->companies()->where('company_id', $this->company_id)->where('project_program_module_id', $this->id)->first()->pivot->status;
        }
        return null;
    }

    public function getCompany($id)
    {
        $this->companies()->where('company_id', $this->id)->where('project_program_module_id', $this->id)->first()->pivot->is_web;
    }

    public function scopeTest($query, $request)
    {
        $this->getCompany($request);
    }

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

}
