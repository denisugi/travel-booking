<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function users_can_register()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'user' => ['id', 'name', 'email'],
                    'token',
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
        ]);
    }

    /** @test */
    public function users_can_login()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'user' => ['id', 'name', 'email'],
                    'token',
                ],
            ]);
    }

    /** @test */
    public function users_cannot_login_with_invalid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'success' => false,
                'message' => 'Invalid credentials',
            ]);
    }

    /** @test */
    public function users_can_logout()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/logout');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Logged out successfully',
            ]);
    }

    /** @test */
    public function registration_requires_valid_data()
    {
        $response = $this->postJson('/api/register', [
            'name' => '',
            'email' => 'invalid-email',
            'password' => 'short',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    /** @test */
    public function email_must_be_unique()
    {
        User::factory()->create(['email' => 'test@example.com']);

        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function authenticated_users_can_view_profile()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/profile');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'email' => $user->email,
            ]);
    }

    /** @test */
    public function unauthenticated_users_cannot_access_protected_routes()
    {
        $response = $this->getJson('/api/profile');

        $response->assertStatus(401);
    }

    /** @test */
    public function users_can_update_their_profile()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->putJson('/api/profile', [
                'name' => 'Updated Name',
                'phone' => '1234567890',
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
            'phone' => '1234567890',
        ]);
    }

    /** @test */
    public function password_must_be_at_least_8_characters()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'short',
            'password_confirmation' => 'short',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }
}
