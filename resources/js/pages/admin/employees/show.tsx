import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Transaction {
    id: number;
    quantity: number;
    transaction_date: string;
    transaction_type: string;
    notes: string | null;
    created_at: string;
}

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
    transactions: Transaction[];
}

interface Props {
    employee: Employee;
    [key: string]: unknown;
}

export default function ShowEmployee({ employee }: Props) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${employee.name}? This action cannot be undone and will delete all transaction history.`)) {
            router.delete(route('admin.employees.destroy', employee.id));
        }
    };

    const getQuotaColor = (remaining: number, total: number) => {
        const percentage = remaining / total;
        if (percentage > 0.5) return 'text-green-600';
        if (percentage > 0.2) return 'text-orange-600';
        return 'text-red-600';
    };

    return (
        <AppShell>
            <Head title={`${employee.name} - Employee Details`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👤 {employee.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Employee ID: {employee.employee_id}
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link href={route('admin.employees.index')}>
                            <Button variant="outline">
                                ← Back to List
                            </Button>
                        </Link>
                        <Link href={route('admin.employees.edit', employee.id)}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                ✏️ Edit
                            </Button>
                        </Link>
                        <Button 
                            variant="outline"
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        >
                            🗑️ Delete
                        </Button>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                        ✅ {flash.success}
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Employee Information */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    📋 Basic Information
                                    <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                                        {employee.status}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</p>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {employee.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Employee ID</p>
                                    <p className="text-lg font-mono font-semibold text-gray-900 dark:text-white">
                                        {employee.employee_id}
                                    </p>
                                </div>

                                {employee.department && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Department</p>
                                        <p className="text-gray-900 dark:text-white">{employee.department}</p>
                                    </div>
                                )}

                                {employee.position && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Position</p>
                                        <p className="text-gray-900 dark:text-white">{employee.position}</p>
                                    </div>
                                )}

                                <div className="pt-4 border-t text-xs text-gray-500 space-y-1">
                                    <p>Created: {new Date(employee.created_at).toLocaleDateString()}</p>
                                    <p>Updated: {new Date(employee.updated_at).toLocaleDateString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quota Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>🥤 Monthly Quota</CardTitle>
                                <CardDescription>Current month allocation and usage</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
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
                                            <p className={`text-2xl font-bold ${getQuotaColor(employee.remaining_quota, employee.monthly_quota)}`}>
                                                {employee.remaining_quota}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Remaining</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                                style={{ 
                                                    width: `${Math.min((employee.current_usage / employee.monthly_quota) * 100, 100)}%` 
                                                }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2">
                                            {Math.round((employee.current_usage / employee.monthly_quota) * 100)}% of quota used
                                        </p>
                                    </div>

                                    {/* Status Alert */}
                                    {employee.remaining_quota === 0 && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm">
                                            ⚠️ Quota exhausted for this month
                                        </div>
                                    )}
                                    
                                    {employee.remaining_quota > 0 && employee.remaining_quota <= 2 && (
                                        <div className="bg-orange-50 border border-orange-200 text-orange-700 p-3 rounded text-sm">
                                            ⚠️ Low quota remaining ({employee.remaining_quota} gallons)
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Transaction History */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>📊 Recent Transactions</CardTitle>
                                <CardDescription>
                                    Latest gallon distribution activities (showing last 10 transactions)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {employee.transactions.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead className="text-center">Quantity</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Notes</TableHead>
                                                    <TableHead>Time</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {employee.transactions.map((transaction) => (
                                                    <TableRow key={transaction.id}>
                                                        <TableCell className="font-medium">
                                                            {new Date(transaction.transaction_date).toLocaleDateString('id-ID', {
                                                                weekday: 'short',
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                                                                {transaction.quantity} gallon{transaction.quantity > 1 ? 's' : ''}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant={transaction.transaction_type === 'take' ? 'default' : 'secondary'}>
                                                                {transaction.transaction_type === 'take' ? '📦 Take' : '⚙️ Adjustment'}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                                {transaction.notes || '-'}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-sm text-gray-500">
                                                            {new Date(transaction.created_at).toLocaleTimeString('id-ID', {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                        <div className="text-4xl mb-4">📊</div>
                                        <p className="text-lg font-medium">No transactions yet</p>
                                        <p className="text-sm">
                                            Transactions will appear here when the employee starts using gallons.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>🚀 Quick Actions</CardTitle>
                                <CardDescription>
                                    Common administrative tasks for this employee
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                        <div className="text-2xl">📱</div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">Test Scan</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Test barcode scanning for this employee
                                            </p>
                                        </div>
                                        <a href={`${route('barcode.index')}?employee_id=${employee.employee_id}`} target="_blank">
                                            <Button variant="outline" size="sm">
                                                🔍 Test
                                            </Button>
                                        </a>
                                    </div>

                                    <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                                        <div className="text-2xl">📋</div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">Print Barcode</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Generate printable barcode card
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm" disabled>
                                            🖨️ Print
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}