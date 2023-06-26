<?php

namespace App\Models;

use App\Traits\LogTrait;
use App\Traits\MediaTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ProjectProgramModule as Module;
class WorkflowTree extends Model implements \Spatie\MediaLibrary\HasMedia

{
    use SoftDeletes, LogTrait, MediaTrait;
    protected $appends = ["haveChildren", "is_module_expired", "module_allowed_users_no", "is_module"];
    protected $table = 'workflow_trees';
    protected $fillable = [
        'name',
        'name_e',
        'is_active',
        'parent_id',
        'partner_id',
        'company_id',
        'module_id',
        'screen_id',
        'id_sort',
    ];
    /**
     * return child of this parent
     */
    public function child()
    {
        return $this->hasMany(WorkflowTree::class, 'parent_id', 'id');
    }

    public function parent()
    {
        return $this->belongsTo(WorkflowTree::class, 'parent_id', 'id');
    }

    public function getHaveChildrenAttribute()
    {
        return static::where("parent_id", $this->id)->count() > 0;
    }

    public function getIsModuleExpiredAttribute()
    {
        $m = CompanyModule::query()->where('company_id', $this->company_id)->where('module_id', $this->module_id)->first();
        if ($m) {
            if (Carbon::now() > $m->end_date) {
                return true;
            }
        }
        return false;
    }

    public function getModuleAllowedUsersNoAttribute()
    {
        $m = CompanyModule::query()->where('company_id', $this->company_id)->where('module_id', $this->module_id)->first();
        if ($m) {
            return $m->allowed_users_no;
        }
        return 0;
    }

    public function getIsModuleAttribute()
    {
        if ($this->module_id) {
            return true;
        }
        return false;
    }
    /**
     * return relation  with  partner
     */
    public function partner()
    {
        return $this->belongsTo(Partner::class, 'partner_id', 'id');
    }

    /**
     * return relation with  company
     */
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    /**
     * return relation with  module
     */
    public function moduleName()
    {
        return $this->belongsTo(Module::class);
    }

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    /**
     * return relation with  screen
     */
    public function screen()
    {
        return $this->belongsTo(Screen::class);
    }

    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'menu_work_flows', 'workflow_id', 'menu_tree_id');
    }

    public function getActivitylogOptions(): \Spatie\Activitylog\LogOptions
    {
        $user = @auth()->user()->id ?: "system";

        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->useLogName('Workflow Tree')
            ->setDescriptionForEvent(fn (string $eventName) => "This model has been {$eventName} by ($user)");
    }

    public function scopeFilter($query, $request)
    {
        return $query->where(function ($q) use ($request) {
            if ($request->search) {
                $q->where('name', 'like', '%' . $request->search . '%');
                $q->orWhere('name_e', 'like', '%' . $request->search . '%');
            }

            if ($request->search && $request->columns) {
                foreach ($request->columns as $column) {
                    if (strpos($column, ".") > 0) {
                        $column = explode(".", $column);
                        $q->orWhereRelation($column[0], $column[1], 'like', '%' . $request->search . '%');
                    } else {
                        $q->orWhere($column, 'like', '%' . $request->search . '%');
                    }
                }
            }

            if ($request->name) {
                $q->orWhere('name', 'like', '%' . $request->name . '%');
            }

            if($request->partner_id)
            {
                $q->orWhere('partner_id', $request->partner_id);
            }

            if($request->module_id)
            {
                $q->orWhere('module_id', $request->module_id);
            }
            if($request->company_id)
            {
                $q->orWhere('company_id', $request->company_id);
            }

            if($request->screen_id)
            {
                $q->orWhere('screen_id', $request->screen_id);
            }

            if ($request->name_e) {
                $q->orWhere('name_e', 'like', '%' . $request->name_e . '%');
            }
        });
    }
}
