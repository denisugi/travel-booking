<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingCreated extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Booking $booking
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
        $user = $this->booking->user;
        
        return (new MailMessage)
            ->subject('Booking Confirmation - ' . $this->booking->booking_number)
            ->greeting("Hello {$user->name}!")
            ->line('Your booking has been successfully created.')
            ->line("Booking Number: {$this->booking->booking_number}")
            ->line("Travel Package: {$this->booking->travelPackage->name}")
            ->line("Travel Date: {$this->booking->travel_date->format('M d, Y')}")
            ->line("Number of Travelers: {$this->booking->number_of_travelers}")
            ->line("Total Amount: $" . number_format($this->booking->total_amount, 2))
            ->line("Payment Status: " . ucfirst($this->booking->payment_status))
            ->action('View Booking Details', url('/bookings/' . $this->booking->id))
            ->line('Thank you for choosing our travel services!');
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'booking_created',
            'booking_id' => $this->booking->id,
            'booking_number' => $this->booking->booking_number,
            'travel_package' => $this->booking->travelPackage->name,
            'travel_date' => $this->booking->travel_date->format('Y-m-d'),
            'total_amount' => $this->booking->total_amount,
            'payment_status' => $this->booking->payment_status,
        ];
    }
}
