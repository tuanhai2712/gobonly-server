<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => new Datetime(),
            'created_at' => new Datetime(),
          ];
          DB::table('users')->insert($data);
    }
}
