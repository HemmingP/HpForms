<?php

namespace App\Models\HpForm;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HpForm extends Model
{
    //

    protected $fillable = ["name"];

    public function pages(): HasMany
    {
        return $this->hasMany(HpFormsPage::class);
    }
}
