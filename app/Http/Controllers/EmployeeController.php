<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::with('transactions')
            ->latest()
            ->paginate(15);

        // Ensure quota is up to date for all employees
        $employees->getCollection()->each(function (Employee $employee) {
            $employee->checkAndResetQuota();
        });
        
        return Inertia::render('admin/employees/index', [
            'employees' => $employees
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/employees/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $employee = Employee::create(array_merge(
            $request->validated(),
            [
                'current_usage' => 0,
                'last_reset_date' => now()->toDateString(),
            ]
        ));

        return redirect()->route('admin.employees.show', $employee)
            ->with('success', 'Employee created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        $employee->checkAndResetQuota();
        $employee->load(['transactions' => function ($query) {
            $query->latest()->take(10);
        }]);

        return Inertia::render('admin/employees/show', [
            'employee' => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'position' => $employee->position,
                'monthly_quota' => $employee->monthly_quota,
                'current_usage' => $employee->current_usage,
                'remaining_quota' => $employee->remaining_quota,
                'status' => $employee->status,
                'created_at' => $employee->created_at?->format('Y-m-d H:i:s'),
                'updated_at' => $employee->updated_at?->format('Y-m-d H:i:s'),
                'transactions' => $employee->transactions->map(function ($transaction) {
                    return [
                        'id' => $transaction->id,
                        'quantity' => $transaction->quantity,
                        'transaction_date' => $transaction->transaction_date->format('Y-m-d'),
                        'transaction_type' => $transaction->transaction_type,
                        'notes' => $transaction->notes,
                        'created_at' => $transaction->created_at?->format('Y-m-d H:i:s'),
                    ];
                }),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('admin/employees/edit', [
            'employee' => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'position' => $employee->position,
                'monthly_quota' => $employee->monthly_quota,
                'status' => $employee->status,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $employee->update($request->validated());

        return redirect()->route('admin.employees.show', $employee)
            ->with('success', 'Employee updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employee deleted successfully.');
    }
}