<?php

namespace App\Notifications;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentApproved extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Payment $payment
    ) {
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $user = $this->payment->booking->user;
        $booking = $this->payment->booking;
        
        return (new MailMessage)
            ->subject('Payment Approved - Booking ' . $booking->booking_number)
            ->greeting("Hello {$user->name}!")
            ->line('Great news! Your payment has been approved.')
            ->line("Booking Number: {$booking->booking_number}")
            ->line("Payment Amount: $" . number_format($this->payment->amount, 2))
            ->line("Payment Method: " . ucfirst(str_replace('_', ' ', $this->payment->payment_method)))
            ->line("Transaction ID: {$this->payment->transaction_id ?? 'N/A'}")
            ->line("Payment Date: {$this->payment->payment_date?->format('M d, Y H:i') ?? 'N/A'}")
            ->action('View Booking Details', url('/bookings/' . $booking->id))
            ->line('Your booking is now being processed. We look forward to serving you!');
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        $booking = $this->payment->booking;
        
        return [
            'type' => 'payment_approved',
            'payment_id' => $this->payment->id,
            'booking_id' => $booking->id,
            'booking_number' => $booking->booking_number,
            'amount' => $this->payment->amount,
            'payment_method' => $this->payment->payment_method,
            'transaction_id' => $this->payment->transaction_id,
        ];
    }
}
