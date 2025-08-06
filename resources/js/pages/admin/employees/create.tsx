import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateEmployee() {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: '',
        name: '',
        department: '',
        position: '',
        monthly_quota: 10,
        status: 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.employees.store'));
    };

    return (
        <AppShell>
            <Head title="Add Employee - Admin" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            ➕ Add New Employee
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Create a new employee record for gallon distribution access
                        </p>
                    </div>
                    <Link href={route('admin.employees.index')}>
                        <Button variant="outline">
                            ← Back to List
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Employee Information</CardTitle>
                            <CardDescription>
                                Enter the employee details below. The employee ID will be used for barcode scanning.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Employee ID */}
                                <div className="space-y-2">
                                    <Label htmlFor="employee_id">
                                        Employee ID *
                                        <span className="text-xs text-gray-500 ml-1">(Used for barcode scanning)</span>
                                    </Label>
                                    <Input
                                        id="employee_id"
                                        type="text"
                                        placeholder="EMP001"
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value.toUpperCase())}
                                        className="font-mono"
                                        required
                                    />
                                    {errors.employee_id && (
                                        <p className="text-sm text-red-600">{errors.employee_id}</p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        This ID will be printed on the employee's barcode card
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
                                        <span className="text-xs text-gray-500 ml-1">(Resets monthly)</span>
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
                                        Standard quota is 10 gallons per month. Adjust as needed based on employee role.
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
                                        Only active employees can use the gallon distribution system
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                                    <Link href={route('admin.employees.index')}>
                                        <Button variant="outline" type="button">
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        {processing ? '⏳ Creating...' : '✅ Create Employee'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Help Card */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-lg">💡 Quick Tips</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-start space-x-2">
                                <span>📋</span>
                                <span>Employee ID should be unique and easy to scan (avoid special characters)</span>
                            </div>
                            <div className="flex items-start space-x-2">
                                <span>🥤</span>
                                <span>Default quota is 10 gallons/month - adjust based on department needs</span>
                            </div>
                            <div className="flex items-start space-x-2">
                                <span>🔄</span>
                                <span>Quotas automatically reset on the 1st of each month</span>
                            </div>
                            <div className="flex items-start space-x-2">
                                <span>⏸️</span>
                                <span>Inactive employees cannot access the distribution system</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}