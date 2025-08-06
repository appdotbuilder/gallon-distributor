<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Employee>
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => 'EMP' . $this->faker->unique()->numberBetween(1000, 9999),
            'name' => $this->faker->name,
            'department' => $this->faker->randomElement([
                'Production',
                'Quality Control',
                'Maintenance',
                'Administration',
                'Sales',
                'Distribution',
                'Finance'
            ]),
            'position' => $this->faker->randomElement([
                'Manager',
                'Supervisor',
                'Operator',
                'Technician',
                'Assistant',
                'Coordinator',
                'Analyst'
            ]),
            'monthly_quota' => 10,
            'current_usage' => $this->faker->numberBetween(0, 10),
            'last_reset_date' => now()->toDateString(),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the employee is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the employee is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}