<?php

namespace App\Models;

use App\Traits\LogTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentRelated extends Model
{
    use HasFactory, LogTrait;

    protected $guarded = ['id'];
    protected $table = "document_related";

    public function getActivitylogOptions(): \Spatie\Activitylog\LogOptions
    {
        $user = @auth()->user()->id ?: "system";

        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->useLogName('DocumentRelated')
            ->setDescriptionForEvent(fn (string $eventName) => "This model has been {$eventName} by ($user)");
    }
}
