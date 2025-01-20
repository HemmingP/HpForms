<?php

namespace App\Models\HpForm;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class HpFormsPage extends Model
{
    //
    protected $fillable = ["name", "icon", "hp_form_id"];

    public function layouts(): HasMany
    {
        return $this->hasMany(HpFormsLayout::class);
    }

    public function form(): BelongsTo
    {
        return $this->belongsTo(HpForm::class);
    }
}
