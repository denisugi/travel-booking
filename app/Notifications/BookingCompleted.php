<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingCompleted extends Notification implements ShouldQueue
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
        $package = $this->booking->travelPackage;
        
        return (new MailMessage)
            ->subject('Booking Completed - ' . $this->booking->booking_number)
            ->greeting("Hello {$user->name}!")
            ->line('Your travel booking has been completed successfully!')
            ->line("Booking Number: {$this->booking->booking_number}")
            ->line("Travel Package: {$package->name}")
            ->line("Destination: {$package->destination}")
            ->line("Travel Date: {$this->booking->travel_date->format('M d, Y')} - {$this->booking->return_date->format('M d, Y')}")
            ->line("Number of Travelers: {$this->booking->number_of_travelers}")
            ->action('View Booking Details', url('/bookings/' . $this->booking->id))
            ->line('We hope you had an amazing experience!')
            ->line('Please don\'t forget to share your feedback and photos from the trip.')
            ->action('Write a Review', url('/bookings/' . $this->booking->id . '/review'))
            ->line('Thank you for choosing our travel services. We look forward to serving you again!');
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        $package = $this->booking->travelPackage;
        
        return [
            'type' => 'booking_completed',
            'booking_id' => $this->booking->id,
            'booking_number' => $this->booking->booking_number,
            'travel_package' => $package->name,
            'destination' => $package->destination,
            'travel_date' => $this->booking->travel_date->format('Y-m-d'),
            'return_date' => $this->booking->return_date->format('Y-m-d'),
        ];
    }
}
