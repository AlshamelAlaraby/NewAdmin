<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Screen extends Model
{
    use SoftDeletes, LogTrait;

    protected $table = 'screens';
    protected $guarded = ['id'];

    /*** return relation with Company */
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    /*** return relation with SubMenu */
    public function subMenu()
    {
        return $this->belongsTo(SubMenu::class);
    }
    public function menu()
    {
        return $this->belongsTo(ProgramFolder::class, 'menu_id');
    }

    //relation with Project Program Module

    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id');
    }


    public function ModuleScreen()
    {
        return $this->belongsTo(ProjectProgramModule::class);
    }

    /*** return relation with Helpfiles */
    public function helpfiles()
    {
        return $this->belongsToMany(Helpfile::class, 'screens_helpfiles', 'screen_id', 'helpfile_id');

    }

    /*** return relation with Buttons */
    public function buttons()
    {
        return $this->belongsToMany(Button::class, 'screens_buttons', 'screen_id', 'button_id');
    }

    /*** return relation with DocumentTypes */
    public function documentTypes()
    {
        return $this->belongsToMany(DocumentType::class, 'screen_document_types', 'screen_id', 'document_type_id');
    }

    /*** return  relation  with   ProjectProgramModules */
    public function projectProgramModules()
    {
        return $this->belongsToMany(ProjectProgramModule::class, 'screen_attributes', 'screen_id', 'project_program_module_id')->withPivot('attributes');
    }

    /*** return count relation  hasMany */
    public function hasChildren()
    {
        $has_Children = $this->projectProgramModules()->count() > 0 || $this->helpfiles()->count() > 0 || $this->buttons()->count() > 0 || $this->documentTypes()->count() > 0;
        return $has_Children;
    }
}
