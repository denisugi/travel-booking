<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Payment;
use App\Models\TravelPackage;
use App\Models\User;
use App\Models\BlogPost;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReportService
{
    public function getBookingReport(array $filters = []): array
    {
        $query = Booking::query();

        if (!empty($filters['date_from'])) {
            $query->where('booking_date', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->where('booking_date', '<=', $filters['date_to']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        $totalBookings = $query->count();
        $totalRevenue = $query->sum('total_amount');
        $pendingBookings = (clone $query)->where('status', Booking::STATUS_PENDING)->count();
        $confirmedBookings = (clone $query)->where('status', Booking::STATUS_CONFIRMED)->count();
        $completedBookings = (clone $query)->where('status', Booking::STATUS_COMPLETED)->count();
        $cancelledBookings = (clone $query)->where('status', Booking::STATUS_CANCELLED)->count();

        return [
            'total_bookings' => $totalBookings,
            'total_revenue' => $totalRevenue,
            'pending_bookings' => $pendingBookings,
            'confirmed_bookings' => $confirmedBookings,
            'completed_bookings' => $completedBookings,
            'cancelled_bookings' => $cancelledBookings,
        ];
    }

    public function getPaymentReport(array $filters = []): array
    {
        $query = Payment::query();

        if (!empty($filters['date_from'])) {
            $query->where('payment_date', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->where('payment_date', '<=', $filters['date_to']);
        }

        if (!empty($filters['payment_status'])) {
            $query->where('payment_status', $filters['payment_status']);
        }

        $totalPayments = $query->count();
        $totalAmount = $query->sum('amount');
        $completedPayments = (clone $query)->where('payment_status', Payment::STATUS_COMPLETED)->sum('amount');
        $pendingPayments = (clone $query)->where('payment_status', Payment::STATUS_PENDING)->count();
        $failedPayments = (clone $query)->where('payment_status', Payment::STATUS_FAILED)->count();
        $refundedPayments = (clone $query)->where('payment_status', Payment::STATUS_REFUNDED)->count();

        return [
            'total_payments' => $totalPayments,
            'total_amount' => $totalAmount,
            'completed_amount' => $completedPayments,
            'pending_payments' => $pendingPayments,
            'failed_payments' => $failedPayments,
            'refunded_payments' => $refundedPayments,
        ];
    }

    public function getRevenueReport(string $period = 'monthly', int $year = null): array
    {
        $year = $year ?? date('Y');

        $query = Booking::where('status', '!=', Booking::STATUS_CANCELLED)
            ->whereYear('booking_date', $year);

        switch ($period) {
            case 'monthly':
                $results = $query->select(
                    DB::raw('MONTH(booking_date) as month'),
                    DB::raw('COUNT(*) as total_bookings'),
                    DB::raw('SUM(total_amount) as total_revenue')
                )
                    ->groupBy(DB::raw('MONTH(booking_date)'))
                    ->get();
                break;

            case 'weekly':
                $results = $query->select(
                    DB::raw('WEEK(booking_date) as week'),
                    DB::raw('COUNT(*) as total_bookings'),
                    DB::raw('SUM(total_amount) as total_revenue')
                )
                    ->groupBy(DB::raw('WEEK(booking_date)'))
                    ->get();
                break;

            case 'daily':
                $results = $query->select(
                    DB::raw('DATE(booking_date) as date'),
                    DB::raw('COUNT(*) as total_bookings'),
                    DB::raw('SUM(total_amount) as total_revenue')
                )
                    ->groupBy(DB::raw('DATE(booking_date)'))
                    ->get();
                break;

            default:
                $results = [];
        }

        return $results->toArray();
    }

    public function getTopSellingPackages(int $limit = 10): array
    {
        return TravelPackage::select('travel_packages.*')
            ->join('bookings', 'travel_packages.id', '=', 'bookings.travel_package_id')
            ->where('bookings.status', '!=', Booking::STATUS_CANCELLED)
            ->selectRaw('COUNT(bookings.id) as booking_count, SUM(bookings.total_amount) as total_revenue')
            ->groupBy('travel_packages.id')
            ->orderByDesc('booking_count')
            ->limit($limit)
            ->get()
            ->toArray();
    }

    public function getDestinationReport(): array
    {
        return Booking::select('travel_packages.destination')
            ->join('travel_packages', 'bookings.travel_package_id', '=', 'travel_packages.id')
            ->where('bookings.status', '!=', Booking::STATUS_CANCELLED)
            ->selectRaw('COUNT(*) as booking_count, SUM(bookings.total_amount) as total_revenue')
            ->groupBy('travel_packages.destination')
            ->orderByDesc('booking_count')
            ->get()
            ->toArray();
    }

    public function getCustomerReport(int $limit = 20): array
    {
        return User::select('users.*')
            ->join('bookings', 'users.id', '=', 'bookings.user_id')
            ->where('bookings.status', '!=', Booking::STATUS_CANCELLED)
            ->selectRaw('COUNT(bookings.id) as booking_count, SUM(bookings.total_amount) as total_spent')
            ->groupBy('users.id')
            ->orderByDesc('total_spent')
            ->limit($limit)
            ->get()
            ->toArray();
    }

    public function getBlogStats(): array
    {
        $totalPosts = BlogPost::count();
        $publishedPosts = BlogPost::published()->count();
        $totalViews = BlogPost::sum('view_count');
        $avgViews = $totalPosts > 0 ? $totalViews / $totalPosts : 0;

        return [
            'total_posts' => $totalPosts,
            'published_posts' => $publishedPosts,
            'total_views' => $totalViews,
            'average_views' => round($avgViews, 2),
        ];
    }

    public function getDailyBookings(string $date): int
    {
        return Booking::whereDate('booking_date', $date)->count();
    }

    public function getDailyRevenue(string $date): float
    {
        return Booking::whereDate('booking_date', $date)
            ->where('status', '!=', Booking::STATUS_CANCELLED)
            ->sum('total_amount');
    }

    public function getBookingTrends(int $days = 30): array
    {
        $startDate = Carbon::now()->subDays($days);

        return Booking::select(
            DB::raw('DATE(booking_date) as date'),
            DB::raw('COUNT(*) as bookings'),
            DB::raw('SUM(total_amount) as revenue')
        )
            ->where('booking_date', '>=', $startDate)
            ->groupBy(DB::raw('DATE(booking_date)'))
            ->orderBy('date', 'asc')
            ->get()
            ->toArray();
    }
}
