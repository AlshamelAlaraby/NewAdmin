<?php

namespace App\Http\Resources\DocumentType;

use Illuminate\Http\Resources\Json\JsonResource;


class DocumentTypeResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id'                => $this->id,
            'name'              => $this->name,
            'name_e'            => $this->name_e,
            'is_default'        => $this->is_default,
            'attributes'        => $this->attributes,
            'document_relateds' => $this->documentRelateds,
        ];
    }
}
