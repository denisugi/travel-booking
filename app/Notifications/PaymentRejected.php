<?php

namespace App\Notifications;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentRejected extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Payment $payment,
        public ?string $reason = null
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
        
        $message = (new MailMessage)
            ->subject('Payment Rejected - Booking ' . $booking->booking_number)
            ->greeting("Hello {$user->name}!")
            ->line('We regret to inform you that your payment has been rejected.')
            ->line("Booking Number: {$booking->booking_number}")
            ->line("Payment Amount: $" . number_format($this->payment->amount, 2)")
            ->line("Payment Method: " . ucfirst(str_replace('_', ' ', $this->payment->payment_method)));
        
        if ($this->reason) {
            $message->line("Reason: {$this->reason}");
        }
        
        $message->line('Please submit a new payment to confirm your booking.')
            ->action('Retry Payment', url('/bookings/' . $booking->id . '/payment'))
            ->line('If you have any questions, please contact our support team.');
            
        return $message;
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        $booking = $this->payment->booking;
        
        return [
            'type' => 'payment_rejected',
            'payment_id' => $this->payment->id,
            'booking_id' => $booking->id,
            'booking_number' => $booking->booking_number,
            'amount' => $this->payment->amount,
            'reason' => $this->reason,
        ];
    }
}
