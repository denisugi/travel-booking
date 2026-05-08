<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Booking $booking
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Booking Confirmation - ' . $this->booking->booking_number
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-confirmation',
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
