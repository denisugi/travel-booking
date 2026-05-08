<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Booking $booking
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Travel Reminder - ' . $this->booking->booking_number
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-reminder',
            with: [
                'booking' => $this->booking,
                'travelPackage' => $this->booking->travelPackage,
                'user' => $this->booking->user,
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
