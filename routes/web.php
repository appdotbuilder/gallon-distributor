<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Barcode scanner routes (public access)
Route::controller(\App\Http\Controllers\BarcodeController::class)->group(function () {
    Route::get('/scan', 'index')->name('barcode.index');
    Route::post('/scan', 'store')->name('barcode.store');
    Route::patch('/scan/{employee}', 'update')->name('barcode.take');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin routes for employee management
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('employees', \App\Http\Controllers\EmployeeController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
