<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo json_encode([
    'users' => DB::select("SELECT COUNT(*) as c FROM users")[0]->c,
    'packages' => DB::select("SELECT COUNT(*) as c FROM travel_packages")[0]->c,
    'bookings' => DB::select("SELECT COUNT(*) as c FROM bookings")[0]->c,
    'blogs' => DB::select("SELECT COUNT(*) as c FROM blog_posts")[0]->c,
    'pending_bookings' => DB::select("SELECT COUNT(*) as c FROM bookings WHERE status = 'pending'")[0]->c,
    'confirmed_bookings' => DB::select("SELECT COUNT(*) as c FROM bookings WHERE status = 'confirmed'")[0]->c,
    'cancelled_bookings' => DB::select("SELECT COUNT(*) as c FROM bookings WHERE status = 'cancelled'")[0]->c,
    'paid_bookings' => DB::select("SELECT COUNT(*) as c FROM bookings WHERE payment_status = 'paid'")[0]->c,
    'pending_payments' => DB::select("SELECT COUNT(*) as c FROM bookings WHERE payment_status IN ('unpaid','partial')")[0]->c,
    'recent_bookings' => DB::select("SELECT b.id, b.booking_number, b.status, b.total_amount, b.payment_status, b.created_at, u.name as customer_name, tp.name as package_name FROM bookings b LEFT JOIN users u ON b.user_id = u.id LEFT JOIN travel_packages tp ON b.travel_package_id = tp.id ORDER BY b.created_at DESC LIMIT 5"),
    'monthly_revenue' => DB::select("SELECT COALESCE(SUM(total_amount), 0) as total FROM bookings WHERE payment_status = 'paid'")[0]->total,
    'monthly_bookings' => DB::select("SELECT COUNT(*) as c FROM bookings WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)")[0]->c,
], JSON_PRETTY_PRINT);
