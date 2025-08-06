import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string | null;
    position: string | null;
    monthly_quota: number;
    status: string;
}

interface Props {
    employee: Employee;
    [key: string]: unknown;
}

export default function EditEmployee({ employee }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: employee.name,
        department: employee.department || '',
        position: employee.position || '',
        monthly_quota: employee.monthly_quota,
        status: employee.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.employees.update', employee.id));
    };

    return (
        <AppShell>
            <Head title={`Edit ${employee.name} - Admin`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            ✏️ Edit Employee
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Modify employee information and quota settings
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link href={route('admin.employees.show', employee.id)}>
                            <Button variant="outline">
                                ← Back to Details
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Employee Information</CardTitle>
                            <CardDescription>
                                Update employee details. Note: Employee ID cannot be changed after creation.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Employee ID (Read-only) */}
                                <div className="space-y-2">
                                    <Label htmlFor="employee_id_display">
                                        Employee ID
                                        <span className="text-xs text-gray-500 ml-1">(Cannot be changed)</span>
                                    </Label>
                                    <Input
                                        id="employee_id_display"
                                        type="text"
                                        value={employee.employee_id}
                                        className="font-mono bg-gray-50 dark:bg-gray-800"
                                        disabled
                                    />
                                    <p className="text-xs text-gray-500">
                                        Employee ID is permanent and used for barcode identification
                                    </p>
                                </div>

                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Ahmad Wijaya"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Department and Position */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Input
                                            id="department"
                                            type="text"
                                            placeholder="Production"
                                            value={data.department}
                                            onChange={(e) => setData('department', e.target.value)}
                                        />
                                        {errors.department && (
                                            <p className="text-sm text-red-600">{errors.department}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="position">Position</Label>
                                        <Input
                                            id="position"
                                            type="text"
                                            placeholder="Manager"
                                            value={data.position}
                                            onChange={(e) => setData('position', e.target.value)}
                                        />
                                        {errors.position && (
                                            <p className="text-sm text-red-600">{errors.position}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Monthly Quota */}
                                <div className="space-y-2">
                                    <Label htmlFor="monthly_quota">
                                        Monthly Gallon Quota *
                                        <span className="text-xs text-gray-500 ml-1">(Will affect next month's allocation)</span>
                                    </Label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id="monthly_quota"
                                            type="number"
                                            min="1"
                                            max="100"
                                            value={data.monthly_quota}
                                            onChange={(e) => setData('monthly_quota', parseInt(e.target.value) || 10)}
                                            className="w-32"
                                            required
                                        />
                                        <span className="text-sm text-gray-500">gallons per month</span>
                                    </div>
                                    {errors.monthly_quota && (
                                        <p className="text-sm text-red-600">{errors.monthly_quota}</p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        Quota changes will take effect from the next monthly reset
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-sm text-red-600">{errors.status}</p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        {data.status === 'active' 
                                            ? 'Employee can access the gallon distribution system'
                                            : 'Employee cannot access the gallon distribution system'
                                        }
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                                    <Link href={route('admin.employees.show', employee.id)}>
                                        <Button variant="outline" type="button">
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        {processing ? '⏳ Updating...' : '✅ Update Employee'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Warning Card */}
                    <Card className="mt-6 border-orange-200 bg-orange-50 dark:bg-orange-900/30">
                        <CardHeader>
                            <CardTitle className="text-orange-800 dark:text-orange-200">
                                ⚠️ Important Notes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-orange-700 dark:text-orange-300">
                            <div className="flex items-start space-x-2">
                                <span>🔒</span>
                                <span>Employee ID cannot be modified to maintain barcode consistency</span>
                            </div>
                            <div className="flex items-start space-x-2">
                                <span>📅</span>
                                <span>Quota changes will be applied starting from the next monthly reset</span>
                            </div>
                            <div className="flex items-start space-x-2">
                                <span>⏸️</span>
                                <span>Setting status to 'Inactive' will immediately block access to the system</span>
                            </div>
                            <div className="flex items-start space-x-2">
                                <span>📊</span>
                                <span>Current month's usage and remaining quota are not affected by these changes</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}