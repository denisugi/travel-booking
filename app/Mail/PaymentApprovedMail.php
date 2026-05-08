<?php

namespace App\Mail;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentApprovedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Payment $payment
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Payment Approved - Booking #' . $this->payment->booking->booking_number
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.payment-approved',
            with: [
                'payment' => $this->payment,
                'booking' => $this->payment->booking,
                'user' => $this->payment->booking->user,
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
