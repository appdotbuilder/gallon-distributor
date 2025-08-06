<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TakeGallonRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarcodeController extends Controller
{
    /**
     * Display the barcode scanner page.
     */
    public function index()
    {
        return Inertia::render('barcode-scanner', [
            'employee' => null,
            'error' => null,
        ]);
    }

    /**
     * Look up employee by ID.
     */
    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|string',
        ]);

        $employee = Employee::where('employee_id', $request->employee_id)
            ->where('status', 'active')
            ->first();

        if (!$employee) {
            return Inertia::render('barcode-scanner', [
                'employee' => null,
                'error' => 'Employee not found or inactive. Please check the ID and try again.',
            ]);
        }

        // Ensure quota is up to date
        $employee->checkAndResetQuota();
        $employee->refresh();

        return Inertia::render('barcode-scanner', [
            'employee' => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'position' => $employee->position,
                'monthly_quota' => $employee->monthly_quota,
                'current_usage' => $employee->current_usage,
                'remaining_quota' => $employee->remaining_quota,
            ],
            'error' => null,
        ]);
    }

    /**
     * Process gallon transaction.
     */
    public function update(TakeGallonRequest $request, Employee $employee)
    {
        $quantity = $request->validated()['quantity'];
        
        // Check if employee is active
        if ($employee->status !== 'active') {
            return back()->with('error', 'Employee is not active.');
        }

        // Ensure quota is up to date
        $employee->checkAndResetQuota();
        $employee->refresh();

        if ($employee->remaining_quota < $quantity) {
            return back()->with('error', "Insufficient quota. Only {$employee->remaining_quota} gallons remaining this month.");
        }

        // Process the transaction
        $success = $employee->takeGallons($quantity);

        if ($success) {
            return redirect()->route('barcode.index')
                ->with('success', "Successfully dispensed {$quantity} gallon(s) to {$employee->name}. Remaining quota: " . ($employee->remaining_quota - $quantity));
        }

        return back()->with('error', 'Transaction failed. Please try again.');
    }
}