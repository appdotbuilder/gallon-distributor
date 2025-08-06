import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="PT Tirta Investama - Gallon Distribution System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-6 py-8">
                    {/* Header */}
                    <header className="flex items-center justify-between mb-12">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xl font-bold">💧</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PT Tirta Investama</h1>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Gallon Distribution System</p>
                            </div>
                        </div>
                        <nav className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    <Button variant="outline" className="bg-white">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <div className="flex space-x-3">
                                    <Link href={route('login')}>
                                        <Button variant="outline" className="bg-white">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                            Register
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </header>

                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            🥤 Smart Gallon Distribution
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Streamline your employee gallon quota management with our intelligent barcode scanning system. 
                            Track monthly allowances, manage distributions, and maintain accurate records effortlessly.
                        </p>
                        <Link href={route('barcode.index')}>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                                📱 Start Scanning Now
                            </Button>
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Barcode Scanner Feature */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📱</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                Barcode Scanner
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Instantly identify employees with Arduino barcode scanning or manual ID entry. 
                                Real-time quota verification and transaction processing.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Public Access</span>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Real-time</span>
                            </div>
                        </div>

                        {/* Quota Management Feature */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                Smart Quota Management
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Automatic monthly quota resets (10 gallons default). Track usage, remaining allowances, 
                                and prevent over-distribution with intelligent controls.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Auto-Reset</span>
                                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Customizable</span>
                            </div>
                        </div>

                        {/* Admin Panel Feature */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">⚙️</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                Admin Management
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Comprehensive employee database management. Add, edit, or remove employee records, 
                                adjust quotas, and monitor all distribution activities.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Admin Only</span>
                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Full Control</span>
                            </div>
                        </div>
                    </div>

                    {/* How It Works */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-16">
                        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                            🔄 How It Works
                        </h3>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">1️⃣</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Scan ID Card</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Use Arduino scanner or manual input to identify employee
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">2️⃣</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">View Profile</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    See employee details and available quota instantly
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">3️⃣</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Select Quantity</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Choose number of gallons to dispense (max 10)
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">4️⃣</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Confirm & Track</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Complete transaction and update quota automatically
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            🚀 Quick Actions
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={route('barcode.index')}>
                                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white min-w-[200px]">
                                    📱 Scan Barcode
                                </Button>
                            </Link>
                            {auth.user ? (
                                <Link href={route('admin.employees.index')}>
                                    <Button size="lg" variant="outline" className="min-w-[200px]">
                                        👥 Manage Employees
                                    </Button>
                                </Link>
                            ) : (
                                <Link href={route('login')}>
                                    <Button size="lg" variant="outline" className="min-w-[200px]">
                                        🔐 Admin Login
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="mt-16 text-center text-gray-600 dark:text-gray-400">
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                            <p className="text-sm">
                                © 2024 PT Tirta Investama. Built with ❤️ for efficient gallon distribution management.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}