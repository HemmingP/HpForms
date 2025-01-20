<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hp_forms', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->timestamps();
        });

        Schema::create('hp_forms_pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId("hp_form_id")->constrained()->onDelete("cascade");
            $table->string("name");
            $table->string("icon");
            $table->timestamps();
        });

        Schema::create('hp_forms_layouts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hp_forms_page_id')->constrained()->onDelete("cascade");
            $table->integer("column_amount")->default(1);
            $table->timestamps();
        });

        Schema::create('hp_forms_parts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hp_forms_layout_id')->constrained()->onDelete("cascade");
            $table->string("variant");
            $table->integer("skip")->default(0);
            $table->integer("span")->default(1);
            $table->timestamps();
        });

        Schema::create('hp_forms_parts_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hp_forms_part_id')->constrained()->onDelete("cascade");
            $table->string("key");
            $table->text("value");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hp_forms_parts_values');
        Schema::dropIfExists('hp_forms_parts');
        Schema::dropIfExists('hp_forms_layouts');
        Schema::dropIfExists('hp_forms_pages');
        Schema::dropIfExists('hp_forms');
    }
};
