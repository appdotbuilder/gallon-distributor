import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
    return (
        <AppShell>
            <Head title="Dashboard - PT Tirta Investama" />
            
            <div className="container mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        🏢 Admin Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        PT Tirta Investama - Gallon Distribution Management System
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                                <span className="text-2xl">📱</span>
                                Barcode Scanner
                            </CardTitle>
                            <CardDescription className="text-blue-600 dark:text-blue-300">
                                Access the main gallon distribution scanner
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={route('barcode.index')}>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    🔍 Open Scanner
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-green-50 dark:bg-green-900/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                                <span className="text-2xl">👥</span>
                                Employee Management
                            </CardTitle>
                            <CardDescription className="text-green-600 dark:text-green-300">
                                Manage employee records and quotas
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={route('admin.employees.index')}>
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                    📋 Manage Employees
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                                <span className="text-2xl">➕</span>
                                Quick Add
                            </CardTitle>
                            <CardDescription className="text-purple-600 dark:text-purple-300">
                                Add new employee to the system
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={route('admin.employees.create')}>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                    👤 Add Employee
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* System Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">📊 System Overview</CardTitle>
                        <CardDescription>
                            Key information about your gallon distribution system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Features */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    ✨ Available Features
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-xl">📱</span>
                                        <div>
                                            <p className="font-medium">Barcode Scanner</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Arduino integration for automatic ID detection
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-xl">🔄</span>
                                        <div>
                                            <p className="font-medium">Auto Quota Reset</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Monthly quota automatically resets (10 gallons default)
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-xl">📊</span>
                                        <div>
                                            <p className="font-medium">Transaction Tracking</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Complete history of all gallon distributions
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    📝 How to Use
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Set up Employees</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Add employee records with unique IDs for barcode cards
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">2</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Print Barcode Cards</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Generate and print ID cards with barcodes for employees
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">3</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Start Distribution</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Employees scan cards and select gallon quantities
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="text-center">
                    <Link href={route('home')}>
                        <Button variant="outline" className="bg-white">
                            🏠 Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}