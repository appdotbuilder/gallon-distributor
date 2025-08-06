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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->unique()->comment('Employee ID from barcode/card');
            $table->string('name')->comment('Employee full name');
            $table->string('department')->nullable()->comment('Department/division');
            $table->string('position')->nullable()->comment('Job position');
            $table->integer('monthly_quota')->default(10)->comment('Monthly gallon quota');
            $table->integer('current_usage')->default(0)->comment('Current month usage');
            $table->date('last_reset_date')->nullable()->comment('Last quota reset date');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Employee status');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('employee_id');
            $table->index('name');
            $table->index('status');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};