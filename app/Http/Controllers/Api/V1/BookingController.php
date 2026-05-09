<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Http\Resources\BookingResource;
use App\Http\Resources\BookingCollection;
use App\Actions\CreateBooking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Display a listing of bookings.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Booking::with(['user', 'travelPackage', 'travelers', 'payments']);

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        if ($request->has('booking_number')) {
            $query->where('booking_number', 'like', '%' . $request->booking_number . '%');
        }

        if ($request->has('travel_date_from')) {
            $query->whereDate('travel_date', '>=', $request->travel_date_from);
        }

        if ($request->has('travel_date_to')) {
            $query->whereDate('travel_date', '<=', $request->travel_date_to);
        }

        $bookings = $query->orderBy('created_at', 'desc')->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => new BookingCollection($bookings),
        ]);
    }

    /**
     * Store a newly created booking.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'travel_package_id' => 'required|exists:travel_packages,id',
            'travel_date' => 'required|date|after:today',
            'return_date' => 'required|date|after:travel_date',
            'number_of_travelers' => 'required|integer|min:1',
            'special_requests' => 'nullable|string',
            'payment_method' => 'nullable|string',
            'travelers' => 'required|array|min:1',
            'travelers.*.first_name' => 'required|string|max:255',
            'travelers.*.last_name' => 'required|string|max:255',
            'travelers.*.email' => 'required|email',
            'travelers.*.phone' => 'required|string',
            'travelers.*.date_of_birth' => 'required|date',
            'travelers.*.nationality' => 'required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $booking = app(CreateBooking::class)->execute([
                'user_id' => $request->user()->id,
                'travel_package_id' => $request->travel_package_id,
                'travel_date' => $request->travel_date,
                'return_date' => $request->return_date,
                'number_of_travelers' => $request->number_of_travelers,
                'special_requests' => $request->special_requests,
                'payment_method' => $request->payment_method,
                'travelers' => $request->travelers,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Booking created successfully',
                'data' => new BookingResource($booking->load(['user', 'travelPackage', 'travelers', 'payments'])),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Booking creation failed: ' . $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display the specified booking.
     */
    public function show(int $id): JsonResponse
    {
        $booking = Booking::with(['user', 'travelPackage.galleries', 'travelers', 'payments'])->find($id);

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'Booking not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new BookingResource($booking),
        ]);
    }

    /**
     * Display the authenticated user's bookings.
     */
    public function myBookings(Request $request): JsonResponse
    {
        $bookings = Booking::with(['travelPackage.galleries', 'travelers', 'payments'])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => new BookingCollection($bookings),
        ]);
    }

    /**
     * Cancel the specified booking.
     */
    public function cancel(Request $request, int $id): JsonResponse
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'Booking not found',
            ], 404);
        }

        if ($booking->user_id !== $request->user()->id && !$request->user()->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        if ($booking->status === Booking::STATUS_CANCELLED) {
            return response()->json([
                'success' => false,
                'message' => 'Booking is already cancelled',
            ], 400);
        }

        try {
            app(\App\Actions\CancelBooking::class)->execute($booking);

            return response()->json([
                'success' => true,
                'message' => 'Booking cancelled successfully',
                'data' => new BookingResource($booking->fresh(['user', 'travelPackage', 'travelers', 'payments'])),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Cancellation failed: ' . $e->getMessage(),
            ], 400);
        }
    }
}
