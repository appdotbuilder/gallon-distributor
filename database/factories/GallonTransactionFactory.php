<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\GallonTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GallonTransaction>
 */
class GallonTransactionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\GallonTransaction>
     */
    protected $model = GallonTransaction::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => Employee::factory(),
            'quantity' => $this->faker->numberBetween(1, 5),
            'transaction_date' => $this->faker->dateTimeThisMonth(),
            'transaction_type' => 'take',
            'notes' => $this->faker->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the transaction is an admin adjustment.
     */
    public function adminAdjustment(): static
    {
        return $this->state(fn (array $attributes) => [
            'transaction_type' => 'admin_adjustment',
            'notes' => 'Admin adjustment: ' . $this->faker->sentence(),
        ]);
    }
}