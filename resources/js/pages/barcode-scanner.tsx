import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Alert, AlertDescription } from '@/components/ui/alert';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string | null;
    position: string | null;
    monthly_quota: number;
    current_usage: number;
    remaining_quota: number;
}

interface Props {
    employee: Employee | null;
    error: string | null;
    [key: string]: unknown;
}

export default function BarcodeScanner({ employee, error }: Props) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const inputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: '',
    });

    const takeForm = useForm({
        quantity: 1,
    });

    const handleSubmit = useCallback(() => {
        if (!data.employee_id.trim()) return;
        
        post(route('barcode.store'), {
            preserveState: false,
            onSuccess: () => {
                // Keep the employee_id in the input for reference
            },
        });
    }, [data.employee_id, post]);

    // Focus on input when component mounts or after transaction
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [employee, flash]);

    // Auto-submit on barcode scan (when input gets a full ID)
    useEffect(() => {
        if (data.employee_id.length >= 6) { // Assuming employee IDs are at least 6 chars
            const timer = setTimeout(() => {
                handleSubmit();
            }, 500); // Small delay to allow for complete scan
            
            return () => clearTimeout(timer);
        }
    }, [data.employee_id, handleSubmit]);

    const handleTakeGallons = () => {
        if (!employee) return;
        
        takeForm.setData('quantity', selectedQuantity);
        takeForm.patch(route('barcode.take', employee.id), {
            onSuccess: () => {
                reset();
                takeForm.reset();
                setSelectedQuantity(1);
            },
        });
    };

    const handleReset = () => {
        reset();
        setSelectedQuantity(1);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <>
            <Head title="Barcode Scanner - PT Tirta Investama" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            📱 Gallon Distribution Scanner
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Scan employee ID card or enter manually to begin
                        </p>
                    </div>

                    {/* Flash Messages */}
                    {flash?.success && (
                        <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
                            <AlertDescription className="font-medium">
                                ✅ {flash.success}
                            </AlertDescription>
                        </Alert>
                    )}

                    {flash?.error && (
                        <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
                            <AlertDescription className="font-medium">
                                ❌ {flash.error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Scanner Input */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    🆔 Employee Identification
                                </CardTitle>
                                <CardDescription>
                                    Scan barcode or type employee ID manually
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="employee_id">Employee ID</Label>
                                    <Input
                                        ref={inputRef}
                                        id="employee_id"
                                        type="text"
                                        placeholder="EMP001 or scan barcode..."
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value.toUpperCase())}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleSubmit();
                                            }
                                        }}
                                        className="text-lg font-mono"
                                        autoComplete="off"
                                        autoFocus
                                    />
                                    {errors.employee_id && (
                                        <p className="text-sm text-red-600">{errors.employee_id}</p>
                                    )}
                                    {error && (
                                        <p className="text-sm text-red-600">{error}</p>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Button 
                                        onClick={handleSubmit}
                                        disabled={processing || !data.employee_id.trim()}
                                        className="flex-1"
                                    >
                                        {processing ? '🔍 Searching...' : '🔍 Look Up Employee'}
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        onClick={handleReset}
                                        disabled={processing}
                                    >
                                        🔄 Reset
                                    </Button>
                                </div>

                                <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                    <p className="font-semibold mb-1">📝 Instructions:</p>
                                    <ul className="space-y-1">
                                        <li>• Position barcode under scanner</li>
                                        <li>• Or manually type employee ID and click "Look Up"</li>
                                        <li>• Auto-submission after complete scan</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Employee Info & Gallon Selection */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    👤 Employee Information
                                </CardTitle>
                                <CardDescription>
                                    {employee ? 'Review details and select gallon quantity' : 'Enter employee ID to view details'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {employee ? (
                                    <div className="space-y-6">
                                        {/* Employee Details */}
                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="font-semibold text-gray-600 dark:text-gray-400">Name</p>
                                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {employee.name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-600 dark:text-gray-400">ID</p>
                                                    <p className="text-lg font-mono font-semibold text-gray-900 dark:text-white">
                                                        {employee.employee_id}
                                                    </p>
                                                </div>
                                                {employee.department && (
                                                    <div>
                                                        <p className="font-semibold text-gray-600 dark:text-gray-400">Department</p>
                                                        <p className="text-gray-900 dark:text-white">{employee.department}</p>
                                                    </div>
                                                )}
                                                {employee.position && (
                                                    <div>
                                                        <p className="font-semibold text-gray-600 dark:text-gray-400">Position</p>
                                                        <p className="text-gray-900 dark:text-white">{employee.position}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Quota Information */}
                                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                                            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                                                📊 Monthly Quota Status
                                            </h4>
                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div>
                                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                        {employee.monthly_quota}
                                                    </p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Quota</p>
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-orange-600">
                                                        {employee.current_usage}
                                                    </p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">Used</p>
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-green-600">
                                                        {employee.remaining_quota}
                                                    </p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">Remaining</p>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                        style={{ 
                                                            width: `${Math.min((employee.current_usage / employee.monthly_quota) * 100, 100)}%` 
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">
                                                    {Math.round((employee.current_usage / employee.monthly_quota) * 100)}% used this month
                                                </p>
                                            </div>
                                        </div>

                                        {/* Gallon Selection */}
                                        {employee.remaining_quota > 0 ? (
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="quantity">Select quantity to take:</Label>
                                                    <div className="grid grid-cols-5 gap-2 mt-2">
                                                        {[1, 2, 3, 4, 5].map((qty) => (
                                                            <Button
                                                                key={qty}
                                                                variant={selectedQuantity === qty ? "default" : "outline"}
                                                                size="sm"
                                                                onClick={() => setSelectedQuantity(qty)}
                                                                disabled={qty > employee.remaining_quota}
                                                                className="aspect-square"
                                                            >
                                                                {qty}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                    {employee.remaining_quota > 5 && (
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Input
                                                                type="number"
                                                                min="1"
                                                                max={Math.min(employee.remaining_quota, 10)}
                                                                value={selectedQuantity}
                                                                onChange={(e) => setSelectedQuantity(parseInt(e.target.value) || 1)}
                                                                className="w-20"
                                                            />
                                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                                (max: {Math.min(employee.remaining_quota, 10)})
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <Button 
                                                    onClick={handleTakeGallons}
                                                    disabled={takeForm.processing || selectedQuantity > employee.remaining_quota}
                                                    size="lg"
                                                    className="w-full bg-green-600 hover:bg-green-700"
                                                >
                                                    {takeForm.processing ? (
                                                        '⏳ Processing...'
                                                    ) : (
                                                        `✅ Confirm - Take ${selectedQuantity} Gallon${selectedQuantity > 1 ? 's' : ''}`
                                                    )}
                                                </Button>

                                                {takeForm.errors.quantity && (
                                                    <p className="text-sm text-red-600 text-center">
                                                        {takeForm.errors.quantity}
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-center p-6 bg-red-50 dark:bg-red-900/30 rounded-lg">
                                                <p className="text-red-600 dark:text-red-400 font-semibold">
                                                    ❌ No quota remaining this month
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    Quota will reset next month
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                        <div className="text-6xl mb-4">🔍</div>
                                        <p className="text-lg font-medium mb-2">Ready to Scan</p>
                                        <p className="text-sm">
                                            Position barcode under scanner or enter employee ID manually
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 text-center">
                        <Button variant="outline" asChild>
                            <a href={route('home')}>🏠 Back to Home</a>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}