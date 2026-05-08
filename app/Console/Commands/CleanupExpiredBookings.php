<?php

namespace App\Console\Commands;

use App\Models\Booking;
use App\Services\BookingService;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CleanupExpiredBookings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bookings:cleanup-expired
                            {--days=7 : Number of days after travel date to consider booking as expired}
                            {--dry-run : Show what would be deleted without actually deleting}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up expired/cancelled bookings and release reserved slots';

    /**
     * Execute the console command.
     */
    public function handle(BookingService $bookingService): int
    {
        $days = (int) $this->option('days');
        $dryRun = $this->option('dry-run');

        $this->info("Starting cleanup of expired bookings (older than {$days} days)...");

        if ($dryRun) {
            $this->warn('DRY RUN MODE - No changes will be made');
        }

        // Find bookings that are:
        // 1. Cancelled and older than specified days
        // 2. Pending payment and expired (payment window passed)
        // 3. Travel date has passed and status is still pending/confirmed

        $cutoffDate = Carbon::now()->subDays($days);

        // Query cancelled bookings older than cutoff
        $cancelledBookings = Booking::where('status', Booking::STATUS_CANCELLED)
            ->where('updated_at', '<', $cutoffDate)
            ->whereDoesntHave('payments', function ($query) {
                $query->where('status', 'completed');
            });

        $cancelledCount = $cancelledBookings->count();

        // Query expired pending bookings (pending for more than 48 hours without payment)
        $pendingExpiredBookings = Booking::where('status', Booking::STATUS_PENDING)
            ->where('payment_status', Booking::PAYMENT_STATUS_PENDING)
            ->where('created_at', '<', Carbon::now()->subHours(48));

        $pendingExpiredCount = $pendingExpiredBookings->count();

        // Query bookings with travel date in the past and marked as pending (no-show)
        $noShowBookings = Booking::whereIn('status', [Booking::STATUS_PENDING, Booking::STATUS_CONFIRMED])
            ->where('travel_date', '<', Carbon::today())
            ->whereDoesntHave('payments', function ($query) {
                $query->where('status', 'completed');
            });

        $noShowCount = $noShowBookings->count();

        $totalCount = $cancelledCount + $pendingExpiredCount + $noShowCount;

        $this->table(
            ['Category', 'Count'],
            [
                ['Cancelled Bookings', $cancelledCount],
                ['Expired Pending Bookings', $pendingExpiredCount],
                ['No-Show Bookings', $noShowCount],
                ['Total', $totalCount],
            ]
        );

        if ($totalCount === 0) {
            $this->info('No expired bookings found.');
            return Command::SUCCESS;
        }

        if ($dryRun) {
            $this->info('These bookings would be cleaned up. Run without --dry-run to proceed.');
            return Command::SUCCESS;
        }

        if (!$this->confirm("Do you want to proceed with cleaning up {$totalCount} bookings?", true)) {
            $this->info('Cleanup cancelled.');
            return Command::SUCCESS;
        }

        $deletedCount = 0;

        // Delete old cancelled bookings (archive instead of hard delete if needed)
        $deletedCount += $cancelledBookings->update([
            'status' => Booking::STATUS_CANCELLED,
            'notes' => \DB::raw("CONCAT(COALESCE(notes, ''), '\n[Auto-cleanup] Removed after {$days} days on " . now()->toDateTimeString() . "')"),
        ]);

        // Expire pending bookings that exceeded payment window
        $pendingExpiredBookings->each(function ($booking) use ($bookingService) {
            $bookingService->cancelBooking($booking, 'Payment window expired - automatically cancelled by system');
        });
        $deletedCount += $pendingExpiredCount;

        // Handle no-show bookings
        $noShowBookings->each(function ($booking) use ($bookingService) {
            $bookingService->cancelBooking($booking, 'Travel date passed with no payment - marked as no-show');
        });
        $deletedCount += $noShowCount;

        $this->info("Cleanup completed. {$deletedCount} bookings processed.");

        return Command::SUCCESS;
    }
}
