<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\TravelPackageController;
use App\Http\Controllers\Api\V1\BookingController;
use App\Http\Controllers\Api\V1\PaymentController;
use App\Http\Controllers\Api\V1\BlogController;

/*
|--------------------------------------------------------------------------
| API V1 Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API V1 routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "api" middleware group.
|
*/

// Public routes
Route::prefix('v1')->group(function () {
    // Auth routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Travel Packages (public read access)
    Route::get('/travel-packages', [TravelPackageController::class, 'index']);
    Route::get('/travel-packages/featured', [TravelPackageController::class, 'featured']);
    Route::get('/travel-packages/{id}', [TravelPackageController::class, 'show']);

    // Blog Posts (public read access)
    Route::get('/blog-posts', [BlogController::class, 'index']);
    Route::get('/blog-posts/featured', [BlogController::class, 'featured']);
    Route::get('/blog-posts/slug/{slug}', [BlogController::class, 'bySlug']);
    Route::get('/blog-posts/{id}', [BlogController::class, 'show']);

    // Protected routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
        // Auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/user', [AuthController::class, 'user']);
        Route::put('/auth/profile', [AuthController::class, 'updateProfile']);

        // User bookings
        Route::get('/my-bookings', [BookingController::class, 'myBookings']);
        Route::post('/my-bookings', [BookingController::class, 'store']);
        Route::get('/my-bookings/{id}', [BookingController::class, 'show']);
        Route::post('/my-bookings/{id}/cancel', [BookingController::class, 'cancel']);

        // Payments
        Route::post('/payments', [PaymentController::class, 'store']);
        Route::get('/payments/by-booking/{bookingId}', [PaymentController::class, 'byBooking']);
    });
});

// Admin routes
Route::prefix('v1/admin')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Users management
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // Travel Packages management
    Route::post('/travel-packages', [TravelPackageController::class, 'store']);
    Route::put('/travel-packages/{id}', [TravelPackageController::class, 'update']);
    Route::delete('/travel-packages/{id}', [TravelPackageController::class, 'destroy']);

    // Bookings management
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::post('/bookings/{id}/cancel', [BookingController::class, 'cancel']);

    // Payments management
    Route::get('/payments', [PaymentController::class, 'index']);
    Route::get('/payments/{id}', [PaymentController::class, 'show']);
    Route::post('/payments/{id}/approve', [PaymentController::class, 'approve']);
    Route::post('/payments/{id}/reject', [PaymentController::class, 'reject']);

    // Blog Posts management
    Route::get('/blog-posts', [BlogController::class, 'index']);
    Route::post('/blog-posts', [BlogController::class, 'store']);
    Route::get('/blog-posts/{id}', [BlogController::class, 'show']);
    Route::put('/blog-posts/{id}', [BlogController::class, 'update']);
    Route::delete('/blog-posts/{id}', [BlogController::class, 'destroy']);
});
