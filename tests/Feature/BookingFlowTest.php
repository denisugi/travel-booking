<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\TravelPackage;
use App\Models\User;
use App\Models\Payment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingFlowTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected TravelPackage $package;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->package = TravelPackage::factory()->create([
            'name' => 'Test Bali Package',
            'slug' => 'test-bali-package',
            'price' => 1500.00,
            'is_active' => true,
            'max_participants' => 10,
            'duration_days' => 7,
            'duration_nights' => 6,
            'destination' => 'Bali, Indonesia',
        ]);
    }

    /** @test */
    public function user_can_view_packages_list()
    {
        $response = $this->getJson('/api/packages');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'slug',
                        'price',
                        'destination',
                    ],
                ],
            ]);
    }

    /** @test */
    public function user_can_view_package_details()
    {
        $response = $this->getJson("/api/packages/{$this->package->slug}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'name' => 'Test Bali Package',
                'slug' => 'test-bali-package',
            ]);
    }

    /** @test */
    public function user_can_create_booking()
    {
        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/bookings', [
                'travel_package_id' => $this->package->id,
                'travel_date' => now()->addWeeks(2)->format('Y-m-d'),
                'return_date' => now()->addWeeks(3)->format('Y-m-d'),
                'number_of_travelers' => 2,
                'special_requests' => 'Late check-in please',
                'travelers' => [
                    ['name' => 'John Doe', 'email' => 'john@example.com', 'phone' => '1234567890'],
                    ['name' => 'Jane Doe', 'email' => 'jane@example.com', 'phone' => '0987654321'],
                ],
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'booking_number',
                    'status',
                    'total_amount',
                    'travelers',
                ],
            ]);

        $this->assertDatabaseHas('bookings', [
            'user_id' => $this->user->id,
            'travel_package_id' => $this->package->id,
            'number_of_travelers' => 2,
        ]);

        $this->assertDatabaseCount('booking_travelers', 2);
    }

    /** @test */
    public function user_can_view_their_bookings()
    {
        Booking::factory()->count(3)->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user, 'sanctum')
            ->getJson('/api/bookings');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    /** @test */
    public function user_can_view_booking_details()
    {
        $booking = Booking::factory()->create([
            'user_id' => $this->user->id,
            'travel_package_id' => $this->package->id,
        ]);

        $response = $this->actingAs($this->user, 'sanctum')
            ->getJson("/api/bookings/{$booking->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $booking->id,
            ]);
    }

    /** @test */
    public function user_cannot_view_other_users_bookings()
    {
        $otherUser = User::factory()->create();
        $booking = Booking::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->actingAs($this->user, 'sanctum')
            ->getJson("/api/bookings/{$booking->id}");

        $response->assertStatus(403);
    }

    /** @test */
    public function booking_calculates_correct_total()
    {
        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/bookings', [
                'travel_package_id' => $this->package->id,
                'travel_date' => now()->addWeeks(2)->format('Y-m-d'),
                'return_date' => now()->addWeeks(3)->format('Y-m-d'),
                'number_of_travelers' => 2,
                'travelers' => [
                    ['name' => 'John Doe', 'email' => 'john@example.com', 'phone' => '1234567890'],
                    ['name' => 'Jane Doe', 'email' => 'jane@example.com', 'phone' => '0987654321'],
                ],
            ]);

        $response->assertStatus(201);

        $data = $response->json('data');

        // Price: 1500 * 2 = 3000 (subtotal)
        // Tax: 3000 * 0.1 = 300
        // Total: 3300
        $this->assertEquals(3000.00, $data['subtotal']);
        $this->assertEquals(300.00, $data['tax_amount']);
        $this->assertEquals(3300.00, $data['total_amount']);
    }

    /** @test */
    public function booking_requires_travel_date_in_future()
    {
        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/bookings', [
                'travel_package_id' => $this->package->id,
                'travel_date' => now()->subDay()->format('Y-m-d'),
                'return_date' => now()->format('Y-m-d'),
                'number_of_travelers' => 1,
                'travelers' => [
                    ['name' => 'John Doe', 'email' => 'john@example.com', 'phone' => '1234567890'],
                ],
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['travel_date']);
    }

    /** @test */
    public function booking_requires_valid_travelers_count()
    {
        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/bookings', [
                'travel_package_id' => $this->package->id,
                'travel_date' => now()->addWeeks(2)->format('Y-m-d'),
                'return_date' => now()->addWeeks(3)->format('Y-m-d'),
                'number_of_travelers' => 15, // Exceeds max of 10
                'travelers' => [],
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['number_of_travelers']);
    }

    /** @test */
    public function unauthenticated_user_cannot_create_booking()
    {
        $response = $this->postJson('/api/bookings', [
            'travel_package_id' => $this->package->id,
            'travel_date' => now()->addWeeks(2)->format('Y-m-d'),
            'return_date' => now()->addWeeks(3)->format('Y-m-d'),
            'number_of_travelers' => 2,
            'travelers' => [],
        ]);

        $response->assertStatus(401);
    }

    /** @test */
    public function user_can_cancel_their_booking()
    {
        $booking = Booking::factory()->create([
            'user_id' => $this->user->id,
            'status' => Booking::STATUS_PENDING,
        ]);

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson("/api/bookings/{$booking->id}/cancel", [
                'reason' => 'Changed my mind',
            ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'status' => Booking::STATUS_CANCELLED,
            ]);
    }

    /** @test */
    public function user_cannot_cancel_completed_booking()
    {
        $booking = Booking::factory()->create([
            'user_id' => $this->user->id,
            'status' => Booking::STATUS_COMPLETED,
        ]);

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson("/api/bookings/{$booking->id}/cancel", [
                'reason' => 'Changed my mind',
            ]);

        $response->assertStatus(400);
    }

    /** @test */
    public function package_must_be_active_to_book()
    {
        $inactivePackage = TravelPackage::factory()->create([
            'is_active' => false,
        ]);

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/bookings', [
                'travel_package_id' => $inactivePackage->id,
                'travel_date' => now()->addWeeks(2)->format('Y-m-d'),
                'return_date' => now()->addWeeks(3)->format('Y-m-d'),
                'number_of_travelers' => 1,
                'travelers' => [
                    ['name' => 'John Doe', 'email' => 'john@example.com', 'phone' => '1234567890'],
                ],
            ]);

        $response->assertStatus(422);
    }

    /** @test */
    public function booking_flow_generates_booking_number()
    {
        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/bookings', [
                'travel_package_id' => $this->package->id,
                'travel_date' => now()->addWeeks(2)->format('Y-m-d'),
                'return_date' => now()->addWeeks(3)->format('Y-m-d'),
                'number_of_travelers' => 1,
                'travelers' => [
                    ['name' => 'John Doe', 'email' => 'john@example.com', 'phone' => '1234567890'],
                ],
            ]);

        $response->assertStatus(201);

        $bookingNumber = $response->json('data.booking_number');
        $this->assertNotNull($bookingNumber);
        $this->assertStringStartsWith('BK-', $bookingNumber);
    }
}
