<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\GallonTransaction;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some sample employees
        $employees = [
            [
                'employee_id' => 'EMP001',
                'name' => 'Ahmad Wijaya',
                'department' => 'Production',
                'position' => 'Manager',
                'monthly_quota' => 15,
                'current_usage' => 3,
                'status' => 'active',
            ],
            [
                'employee_id' => 'EMP002',
                'name' => 'Siti Nurhaliza',
                'department' => 'Quality Control',
                'position' => 'Supervisor',
                'monthly_quota' => 10,
                'current_usage' => 5,
                'status' => 'active',
            ],
            [
                'employee_id' => 'EMP003',
                'name' => 'Budi Santoso',
                'department' => 'Maintenance',
                'position' => 'Technician',
                'monthly_quota' => 10,
                'current_usage' => 2,
                'status' => 'active',
            ],
            [
                'employee_id' => 'EMP004',
                'name' => 'Maria Christina',
                'department' => 'Administration',
                'position' => 'Assistant',
                'monthly_quota' => 10,
                'current_usage' => 8,
                'status' => 'active',
            ],
            [
                'employee_id' => 'EMP005',
                'name' => 'Rahmat Hidayat',
                'department' => 'Distribution',
                'position' => 'Operator',
                'monthly_quota' => 12,
                'current_usage' => 0,
                'status' => 'inactive',
            ],
        ];

        foreach ($employees as $employeeData) {
            $employee = Employee::create(array_merge($employeeData, [
                'last_reset_date' => now()->toDateString(),
            ]));

            // Create some sample transactions for active employees
            if ($employee->status === 'active' && $employee->current_usage > 0) {
                for ($i = 0; $i < $employee->current_usage; $i++) {
                    GallonTransaction::create([
                        'employee_id' => $employee->id,
                        'quantity' => 1,
                        'transaction_date' => now()->subDays(random_int(1, 20))->toDateString(),
                        'transaction_type' => 'take',
                    ]);
                }
            }
        }

        // Create additional random employees
        Employee::factory(15)->active()->create()->each(function ($employee) {
            // Create some random transactions
            $transactionCount = random_int(0, 3);
            for ($i = 0; $i < $transactionCount; $i++) {
                GallonTransaction::create([
                    'employee_id' => $employee->id,
                    'quantity' => random_int(1, 3),
                    'transaction_date' => now()->subDays(random_int(1, 20))->toDateString(),
                    'transaction_type' => 'take',
                ]);
            }
        });
    }
}