<?php

namespace Tests\Unit;

use App\Models\Booking;
use App\Models\TravelPackage;
use App\Models\User;
use App\Services\BookingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Mockery;

class BookingServiceTest extends TestCase
{
    use RefreshDatabase;

    protected BookingService $bookingService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->bookingService = new BookingService();
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    /** @test */
    public function it_can_get_all_bookings_with_filters()
    {
        $user = User::factory()->create();
        $package = TravelPackage::factory()->create();

        // Create some bookings
        Booking::factory()->count(3)->create([
            'user_id' => $user->id,
            'travel_package_id' => $package->id,
            'status' => Booking::STATUS_PENDING,
        ]);

        Booking::factory()->count(2)->create([
            'user_id' => $user->id,
            'travel_package_id' => $package->id,
            'status' => Booking::STATUS_CONFIRMED,
        ]);

        // Test without filters
        $result = $this->bookingService->getAllBookings();
        $this->assertEquals(5, $result->total());

        // Test with status filter
        $result = $this->bookingService->getAllBookings(['status' => Booking::STATUS_PENDING]);
        $this->assertEquals(3, $result->total());

        // Test with user_id filter
        $result = $this->bookingService->getAllBookings(['user_id' => $user->id]);
        $this->assertEquals(5, $result->total());
    }

    /** @test */
    public function it_can_get_booking_by_id()
    {
        $booking = Booking::factory()->create();

        $result = $this->bookingService->getBookingById($booking->id);

        $this->assertNotNull($result);
        $this->assertEquals($booking->id, $result->id);
    }

    /** @test */
    public function it_can_get_booking_by_number()
    {
        $booking = Booking::factory()->create([
            'booking_number' => 'BK-TEST-12345',
        ]);

        $result = $this->bookingService->getBookingByNumber('BK-TEST-12345');

        $this->assertNotNull($result);
        $this->assertEquals($booking->id, $result->id);
    }

    /** @test */
    public function it_can_create_booking()
    {
        $user = User::factory()->create();
        $package = TravelPackage::factory()->create([
            'price' => 500.00,
            'is_active' => true,
        ]);

        $data = [
            'user_id' => $user->id,
            'travel_package_id' => $package->id,
            'travel_date' => now()->addWeek(),
            'return_date' => now()->addWeeks(2),
            'number_of_travelers' => 2,
            'special_requests' => 'Need a window seat',
            'travelers' => [
                ['name' => 'John Doe', 'email' => 'john@example.com', 'phone' => '1234567890'],
                ['name' => 'Jane Doe', 'email' => 'jane@example.com', 'phone' => '0987654321'],
            ],
        ];

        $booking = $this->bookingService->createBooking($data);

        $this->assertNotNull($booking);
        $this->assertEquals($user->id, $booking->user_id);
        $this->assertEquals($package->id, $booking->travel_package_id);
        $this->assertEquals(Booking::STATUS_PENDING, $booking->status);
        $this->assertEquals(Booking::PAYMENT_STATUS_PENDING, $booking->payment_status);
        $this->assertEquals(2, $booking->number_of_travelers);

        // Check subtotal (price * travelers)
        $this->assertEquals(1000.00, $booking->subtotal);

        // Check tax (10% of subtotal)
        $this->assertEquals(100.00, $booking->tax_amount);

        // Check total (subtotal + tax)
        $this->assertEquals(1100.00, $booking->total_amount);

        // Check travelers were created
        $this->assertCount(2, $booking->travelers);
    }

    /** @test */
    public function it_can_confirm_booking()
    {
        $booking = Booking::factory()->create([
            'status' => Booking::STATUS_PENDING,
        ]);

        $confirmedBooking = $this->bookingService->confirmBooking($booking);

        $this->assertEquals(Booking::STATUS_CONFIRMED, $confirmedBooking->status);
    }

    /** @test */
    public function it_can_cancel_booking()
    {
        $booking = Booking::factory()->create([
            'status' => Booking::STATUS_PENDING,
        ]);

        $cancelledBooking = $this->bookingService->cancelBooking($booking, 'Test cancellation reason');

        $this->assertEquals(Booking::STATUS_CANCELLED, $cancelledBooking->status);
        $this->assertStringContainsString('Test cancellation reason', $cancelledBooking->notes);
    }

    /** @test */
    public function it_can_complete_booking()
    {
        $booking = Booking::factory()->create([
            'status' => Booking::STATUS_CONFIRMED,
        ]);

        $completedBooking = $this->bookingService->completeBooking($booking);

        $this->assertEquals(Booking::STATUS_COMPLETED, $completedBooking->status);
    }

    /** @test */
    public function it_can_update_payment_status()
    {
        $booking = Booking::factory()->create([
            'payment_status' => Booking::PAYMENT_STATUS_PENDING,
        ]);

        $updatedBooking = $this->bookingService->updatePaymentStatus($booking, Booking::PAYMENT_STATUS_PAID);

        $this->assertEquals(Booking::PAYMENT_STATUS_PAID, $updatedBooking->payment_status);
    }

    /** @test */
    public function it_can_get_user_bookings()
    {
        $user = User::factory()->create();
        Booking::factory()->count(3)->create(['user_id' => $user->id]);

        $otherUser = User::factory()->create();
        Booking::factory()->count(2)->create(['user_id' => $otherUser->id]);

        $userBookings = $this->bookingService->getUserBookings($user);

        $this->assertEquals(3, $userBookings->total());
    }

    /** @test */
    public function it_can_calculate_booking_total()
    {
        $booking = Booking::factory()->create([
            'subtotal' => 1000.00,
            'tax_amount' => 100.00,
            'discount_amount' => 50.00,
        ]);

        $totals = $this->bookingService->calculateBookingTotal($booking);

        $this->assertEquals(1000.00, $totals['subtotal']);
        $this->assertEquals(100.00, $totals['tax_amount']);
        $this->assertEquals(50.00, $totals['discount_amount']);
        $this->assertEquals(1050.00, $totals['total_amount']); // 1000 + 100 - 50
    }

    /** @test */
    public function it_returns_null_for_non_existent_booking_id()
    {
        $result = $this->bookingService->getBookingById(99999);

        $this->assertNull($result);
    }

    /** @test */
    public function it_returns_null_for_non_existent_booking_number()
    {
        $result = $this->bookingService->getBookingByNumber('NON-EXISTENT-123');

        $this->assertNull($result);
    }
}
