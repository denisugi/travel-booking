<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Booking;
use App\Http\Resources\PaymentResource;
use App\Actions\ApprovePayment;
use App\Actions\RejectPayment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    /**
     * Display a listing of payments.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Payment::with(['booking.user', 'booking.travelPackage']);

        if ($request->has('booking_id')) {
            $query->where('booking_id', $request->booking_id);
        }

        if ($request->has('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        if ($request->has('payment_method')) {
            $query->where('payment_method', $request->payment_method);
        }

        if ($request->has('user_id')) {
            $query->whereHas('booking', function ($q) use ($request) {
                $q->where('user_id', $request->user_id);
            });
        }

        $payments = $query->orderBy('created_at', 'desc')->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => PaymentResource::collection($payments),
            'meta' => [
                'current_page' => $payments->currentPage(),
                'last_page' => $payments->lastPage(),
                'per_page' => $payments->perPage(),
                'total' => $payments->total(),
            ],
        ]);
    }

    /**
     * Store a newly created payment (submit payment proof).
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|string',
            'payment_proof' => 'nullable|string',
            'transaction_id' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $booking = Booking::findOrFail($request->booking_id);

        $payment = Payment::create([
            'booking_id' => $booking->id,
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'payment_status' => Payment::STATUS_PENDING,
            'payment_date' => now(),
            'payment_proof' => $request->payment_proof,
            'transaction_id' => $request->transaction_id,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Payment submitted successfully',
            'data' => new PaymentResource($payment->load(['booking.user', 'booking.travelPackage'])),
        ], 201);
    }

    /**
     * Display the specified payment.
     */
    public function show(int $id): JsonResponse
    {
        $payment = Payment::with(['booking.user', 'booking.travelPackage', 'booking.travelers'])->find($id);

        if (!$payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new PaymentResource($payment),
        ]);
    }

    /**
     * Approve the specified payment.
     */
    public function approve(Request $request, int $id): JsonResponse
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found',
            ], 404);
        }

        if ($payment->payment_status !== Payment::STATUS_PENDING) {
            return response()->json([
                'success' => false,
                'message' => 'Only pending payments can be approved',
            ], 400);
        }

        try {
            $result = app(ApprovePayment::class)->execute($payment);

            return response()->json([
                'success' => true,
                'message' => 'Payment approved successfully',
                'data' => new PaymentResource($payment->fresh(['booking.user', 'booking.travelPackage'])),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment approval failed: ' . $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Reject the specified payment.
     */
    public function reject(Request $request, int $id): JsonResponse
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found',
            ], 404);
        }

        if ($payment->payment_status !== Payment::STATUS_PENDING) {
            return response()->json([
                'success' => false,
                'message' => 'Only pending payments can be rejected',
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'notes' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            app(RejectPayment::class)->execute($payment, $request->notes);

            return response()->json([
                'success' => true,
                'message' => 'Payment rejected successfully',
                'data' => new PaymentResource($payment->fresh(['booking.user', 'booking.travelPackage'])),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment rejection failed: ' . $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get payments for a specific booking.
     */
    public function byBooking(int $bookingId): JsonResponse
    {
        $booking = Booking::find($bookingId);

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'Booking not found',
            ], 404);
        }

        $payments = $booking->payments()->with(['booking.user', 'booking.travelPackage'])->get();

        return response()->json([
            'success' => true,
            'data' => PaymentResource::collection($payments),
        ]);
    }
}
