<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ProjectProgramModule as Module;
class Screen extends Model
{
    use SoftDeletes, LogTrait;

    protected $table = 'screens';
    protected $fillable = [
        'name',
        'name_e',
        'title',
        'title_e',
        'serial_id',
        'sub_menu_id',
        'url',
        'is_add_on',
        'is_implementor',
        'sort',
        'company_id'
    ];

    public function helpfiles()
    {
        return $this->belongsToMany(Helpfile::class, 'screens_helpfiles', 'screen_id', 'helpfile_id');
    }

    public function buttons()
    {
        return $this->belongsToMany(Button::class, 'screens_buttons', 'screen_id', 'button_id');
    }

    public function serial()
    {
        return $this->belongsTo(Serial::class);
    }

    public function documentTypes()
    {
        return $this->belongsToMany(DocumentType::class, 'screen_document_types');
    }

    public function workFlows()
    {
        return $this->hasMany(WorkflowTree::class);
    }

    public function hasChildren()
    {
        $has_Children = $this->workFlows()->count() > 0 || $this->helpfiles()->count() > 0 || $this->buttons()->count() > 0 || $this->documentTypes()->count() > 0;
        return $has_Children;
    }

    public function company()
    {
        return $this->belongsTo(Company::class,'company_id');
    }

    public function subMenu()
    {
        return $this->belongsTo(SubMenu::class);
    }
    /**
     * return relation with menu_tree
     */
    public function menu_tree()
    {
        return $this->belongsToMany(MenuTree::class, 'menu_work_flows', 'screen_id', 'menu_tree_id');
    }


    public function modules()
    {
        return $this->belongsToMany(Module::class, 'screen_attributes', 'screen_id', 'module_id')
            ->withPivot('attributes');
    }
}
