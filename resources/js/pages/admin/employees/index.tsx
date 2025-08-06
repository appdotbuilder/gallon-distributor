import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string | null;
    position: string | null;
    monthly_quota: number;
    current_usage: number;
    remaining_quota: number;
    status: string;
    created_at: string;
    updated_at: string;
}

interface PaginatedEmployees {
    data: Employee[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    employees: PaginatedEmployees;
    [key: string]: unknown;
}

export default function EmployeesIndex({ employees }: Props) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;

    const handleDelete = (employee: Employee) => {
        if (confirm(`Are you sure you want to delete ${employee.name}? This action cannot be undone.`)) {
            router.delete(route('admin.employees.destroy', employee.id));
        }
    };

    return (
        <AppShell>
            <Head title="Employee Management - Admin" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👥 Employee Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Manage employee records and gallon quotas
                        </p>
                    </div>
                    <Link href={route('admin.employees.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ Add Employee
                        </Button>
                    </Link>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                        ✅ {flash.success}
                    </div>
                )}

                {flash?.error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        ❌ {flash.error}
                    </div>
                )}

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <span className="text-xl">👥</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Employees
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {employees.total}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                    <span className="text-xl">✅</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Active
                                    </p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {employees.data.filter(emp => emp.status === 'active').length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                                    <span className="text-xl">⏸️</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Inactive
                                    </p>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {employees.data.filter(emp => emp.status === 'inactive').length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                    <span className="text-xl">🥤</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Monthly Quota
                                    </p>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {employees.data.reduce((sum, emp) => sum + emp.monthly_quota, 0)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Employees Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Employee List</CardTitle>
                        <CardDescription>
                            View and manage all employee records
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead className="text-center">Quota</TableHead>
                                        <TableHead className="text-center">Used</TableHead>
                                        <TableHead className="text-center">Remaining</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {employees.data.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell className="font-mono font-medium">
                                                {employee.employee_id}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {employee.name}
                                            </TableCell>
                                            <TableCell>{employee.department || '-'}</TableCell>
                                            <TableCell>{employee.position || '-'}</TableCell>
                                            <TableCell className="text-center">
                                                {employee.monthly_quota}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className={employee.current_usage > 0 ? 'text-orange-600' : 'text-gray-500'}>
                                                    {employee.current_usage}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className={employee.remaining_quota > 0 ? 'text-green-600' : 'text-red-600'}>
                                                    {employee.remaining_quota}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                                                    {employee.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link href={route('admin.employees.show', employee.id)}>
                                                        <Button variant="ghost" size="sm">
                                                            👁️
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('admin.employees.edit', employee.id)}>
                                                        <Button variant="ghost" size="sm">
                                                            ✏️
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm"
                                                        onClick={() => handleDelete(employee)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        🗑️
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {employees.data.length === 0 && (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <div className="text-4xl mb-4">📝</div>
                                <p className="text-lg font-medium">No employees found</p>
                                <p className="text-sm">Get started by adding your first employee.</p>
                                <Link href={route('admin.employees.create')} className="mt-4 inline-block">
                                    <Button>Add First Employee</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}