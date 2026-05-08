<?php

use Illuminate\Support\Facades\Schedule;

// Schedule: Auto-cancel unpaid bookings after 24 hours
Schedule::command('bookings:cleanup-expired')->hourly();

// Schedule: Generate sitemap daily
Schedule::command('sitemap:generate')->daily();

// Schedule: Send travel reminders daily
Schedule::command('bookings:send-reminders')->daily();
