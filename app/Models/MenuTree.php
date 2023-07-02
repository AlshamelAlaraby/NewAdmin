<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;


class MenuTree extends Model
{
    use HasFactory;
    use LogTrait;

    protected $guarded = [];
    protected $table = 'menu_trees';
    protected $casts = [
        'is_active' => 'App\Enums\IsActive',
    ];

    protected $appends = ["haveChildren", "screen_tree"];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    } //relation with menu table

    public function children()
    {
        return $this->hasMany(MenuTree::class, 'parent_id', 'id');
    }

    public function parent()
    {
        return $this->belongsTo(MenuTree::class, 'parent_id', 'id');
    }

    public function getHaveChildrenAttribute()
    {
        return static::where("parent_id", $this->id)->count() > 0;
    }

    public function getScreenTreeAttribute()
    {
        return $this->screen()->count() > 0;
    }

    // attributes
    public function getActivitylogOptions(): LogOptions
    {
        $user = @auth()->user()->id ?: "system";

        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->useLogName('Menu_Tree')
            ->setDescriptionForEvent(fn (string $eventName) => "This model has been {$eventName} by ($user)");
    }

    /**
     * return relation with screen
     */
    public function screen()
    {
        return $this->belongsToMany(Screen::class, 'menu_work_flows','menu_tree_id','screen_id');
    }
}
