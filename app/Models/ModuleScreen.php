<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModuleScreen extends Model
{
    use HasFactory, LogTrait;

    protected $table = 'module_screens';
    protected $guarded = ['id'];
}
