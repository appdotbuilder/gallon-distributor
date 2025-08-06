<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Employee
 *
 * @property int $id
 * @property string $employee_id
 * @property string $name
 * @property string|null $department
 * @property string|null $position
 * @property int $monthly_quota
 * @property int $current_usage
 * @property \Illuminate\Support\Carbon|null $last_reset_date
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GallonTransaction> $transactions
 * @property-read int|null $transactions_count
 * @property-read int $remaining_quota
 * @property-read bool $needs_quota_reset
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Employee newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee query()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereCurrentUsage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereDepartment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereLastResetDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereMonthlyQuota($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee active()
 * @method static \Database\Factories\EmployeeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Employee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'employee_id',
        'name',
        'department',
        'position',
        'monthly_quota',
        'current_usage',
        'last_reset_date',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'last_reset_date' => 'date',
        'monthly_quota' => 'integer',
        'current_usage' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the gallon transactions for the employee.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(GallonTransaction::class);
    }

    /**
     * Scope a query to only include active employees.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get the remaining quota for the employee.
     *
     * @return int
     */
    public function getRemainingQuotaAttribute(): int
    {
        $this->checkAndResetQuota();
        return max(0, $this->monthly_quota - $this->current_usage);
    }

    /**
     * Check if the employee needs quota reset.
     *
     * @return bool
     */
    public function getNeedsQuotaResetAttribute(): bool
    {
        if (!$this->last_reset_date) {
            return true;
        }
        
        return $this->last_reset_date->format('Y-m') !== now()->format('Y-m');
    }

    /**
     * Check and reset quota if needed.
     *
     * @return void
     */
    public function checkAndResetQuota(): void
    {
        if ($this->needs_quota_reset) {
            $this->update([
                'current_usage' => 0,
                'last_reset_date' => now()->toDateString(),
            ]);
        }
    }

    /**
     * Take gallons from the employee's quota.
     *
     * @param int $quantity
     * @return bool
     */
    public function takeGallons(int $quantity): bool
    {
        $this->checkAndResetQuota();
        
        if ($this->remaining_quota >= $quantity) {
            $this->increment('current_usage', $quantity);
            
            // Record the transaction
            $this->transactions()->create([
                'quantity' => $quantity,
                'transaction_date' => now()->toDateString(),
                'transaction_type' => 'take',
            ]);
            
            return true;
        }
        
        return false;
    }
}