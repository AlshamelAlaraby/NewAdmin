<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;

class DocumentCompanyModule extends Model
{
    use HasFactory, LogTrait;

    protected $guarded = ['id'];
    protected $table = ['document_company_project_program_modules'];

    public function getActivitylogOptions(): LogOptions
    {
        $user = auth()->user()->id ?? "system";

        return LogOptions::defaults()
            ->logAll()
            ->useLogName('Company Module')
            ->setDescriptionForEvent(fn (string $eventName) => "This model has been {$eventName} by ($user)");
    }

}
