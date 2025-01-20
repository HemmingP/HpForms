<?php

namespace App\Models\HpForm;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HpFormsPartsValue extends Model
{
    //

    protected $fillable = ["key", "value"];

    public function part(): BelongsTo
    {
        return $this->belongsTo(HpFormsPart::class);
    }
}
