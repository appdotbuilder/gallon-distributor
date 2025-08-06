<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@tirtainvestama.com',
        ]);

        // Create additional test users
        User::factory(3)->create();

        // Seed employees
        $this->call(EmployeeSeeder::class);
    }
}
