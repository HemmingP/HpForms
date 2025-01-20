<?php

namespace App\Models\HpForm;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HpFormsPart extends Model
{
    //
    protected $fillable = ["hp_forms_layout_id", "variant", "skip", "span"];

    public function values(): HasMany
    {
        return $this->hasMany(HpFormsPartsValue::class);
    }

    public function layout(): BelongsTo
    {
        return $this->belongsTo(HpFormsLayout::class);
    }
}
