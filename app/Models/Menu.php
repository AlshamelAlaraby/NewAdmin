<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;

use App\Models\ProjectProgramModule as Module;

class Menu extends Model
{
    use HasFactory;
    use LogTrait;

    protected $guarded = [];
    protected $table = 'menus';

    // attributes
    public function getActivitylogOptions(): LogOptions
    {
        $user = @auth()->user()->id ?: "system";

        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->useLogName('Menu')
            ->setDescriptionForEvent(fn(string $eventName) => "This model has been {$eventName} by ($user)");
    }


    public function menu_trees()
    {
        return $this->hasMany(MenuTree::class,'menu_id');
    }

    public function hasChildren()
    {
        $hasChildren = $this->company_modules()->count() > 0 || $this->menu_trees()->count() > 0 ;
        return $hasChildren;
    }

}
