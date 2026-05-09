<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
echo json_encode(DB::select("SELECT column_name FROM information_schema.columns WHERE table_name = 'booking_travelers' ORDER BY ordinal_position"));
