<?php

namespace App\Mail;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Payment $payment,
        public string $notificationType
    ) {
    }

    public function envelope(): Envelope
    {
        $subject = match ($this->notificationType) {
            'approved' => 'Payment Approved - Booking #' . $this->payment->booking->booking_number,
            'rejected' => 'Payment Rejected - Booking #' . $this->payment->booking->booking_number,
            'refunded' => 'Payment Refunded - Booking #' . $this->payment->booking->booking_number,
            default => 'Payment Update - Booking #' . $this->payment->booking->booking_number,
        };

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        $view = match ($this->notificationType) {
            'approved' => 'emails.payment-approved',
            'rejected' => 'emails.payment-rejected',
            'refunded' => 'emails.payment-refunded',
            default => 'emails.payment-notification',
        };

        return new Content(
            view: $view,
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
