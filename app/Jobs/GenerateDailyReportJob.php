<?php

namespace App\Jobs;

use App\Models\Booking;
use App\Services\ReportService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class GenerateDailyReportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public string $date
    ) {
    }

    public function handle(ReportService $reportService): void
    {
        $date = $this->date;

        $report = [
            'date' => $date,
            'bookings' => [
                'count' => $reportService->getDailyBookings($date),
                'revenue' => $reportService->getDailyRevenue($date),
            ],
            'generated_at' => now()->toIso8601String(),
        ];

        Log::info('Daily report generated', $report);
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('Failed to generate daily report', [
            'date' => $this->date,
            'exception' => $exception->getMessage(),
        ]);
    }
}
