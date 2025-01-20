<?php

namespace App\Models\HpForm;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HpFormsLayout extends Model
{
    //
    protected $fillable = ["hp_forms_page_id", "column_amount"];

    public function parts(): HasMany
    {
        return $this->hasMany(HpFormsPart::class);
    }

    public function page(): BelongsTo
    {
        return $this->belongsTo(HpFormsPage::class);
    }
}
