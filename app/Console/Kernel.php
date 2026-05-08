<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Clean up expired bookings daily at midnight
        $schedule->command('bookings:cleanup-expired')
            ->dailyAt('00:00')
            ->withoutOverlapping()
            ->appendOutputTo(storage_path('logs/bookings-cleanup.log'));

        // Generate sitemap weekly on Sunday at 1 AM
        $schedule->command('sitemap:generate')
            ->weeklyOn(0, '01:00')
            ->withoutOverlapping()
            ->appendOutputTo(storage_path('logs/sitemap-generate.log'));

        // Process pending bookings check every hour
        $schedule->command('bookings:check-pending')
            ->hourly()
            ->withoutOverlapping();

        // Send travel reminders daily at 8 AM
        $schedule->command('travel:send-reminders')
            ->dailyAt('08:00')
            ->withoutOverlapping();

        // Generate daily report at midnight
        $schedule->command('reports:generate-daily')
            ->dailyAt('00:30')
            ->withoutOverlapping();

        // Clean up old log files weekly
        $schedule->command('logs:clean')
            ->weekly()
            ->withoutOverlapping();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }

    /**
     * Get the timezone that should be used by default for scheduled events.
     */
    protected function scheduleTimezone(): string
    {
        return config('app.timezone', 'UTC');
    }
}
