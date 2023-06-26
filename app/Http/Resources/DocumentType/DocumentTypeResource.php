<?php

namespace App\Http\Resources\DocumentType;

use Illuminate\Http\Resources\Json\JsonResource;


class DocumentTypeResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'name' => $this->name,
            'name_e' => $this->name_e,
            'branch_id' => $this->branch_id,
            'serial_id' => $this->serial_id,
            'is_default' => $this->is_default,
            'branche_id' => $this->branche_id,
            'serial_id' => $this->serial_id,
            'attributes' => $this->attributes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'document_relateds' => $this->documentRelateds,
        ];
    }
}
