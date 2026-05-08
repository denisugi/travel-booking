<?php

namespace App\Http\Middleware;

use App\Models\Booking;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureBookingOwnership
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $ownershipType = 'owner'): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated. Please login to access this resource.',
            ], 401);
        }

        // Admins bypass ownership check
        if ($user->hasRole('admin')) {
            return $next($request);
        }

        $booking = $this->resolveBooking($request);

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'Booking not found.',
            ], 404);
        }

        switch ($ownershipType) {
            case 'owner':
                if ($booking->user_id !== $user->id) {
                    return $this->denyAccess('You do not have permission to access this booking.');
                }
                break;

            case 'participant':
                $isParticipant = $booking->travelers()
                    ->where('email', $user->email)
                    ->exists();
                
                if (!$isParticipant && $booking->user_id !== $user->id) {
                    return $this->denyAccess('You are not a participant in this booking.');
                }
                break;

            case 'viewer':
                // Viewers can see bookings they're associated with (owner or participant)
                $isParticipant = $booking->travelers()
                    ->where('email', $user->email)
                    ->exists();
                
                if (!$isParticipant && $booking->user_id !== $user->id) {
                    return $this->denyAccess('You do not have permission to view this booking.');
                }
                break;

            default:
                return $this->denyAccess('Invalid ownership type specified.');
        }

        // Store the booking in the request for later use
        $request->merge(['resolved_booking' => $booking]);

        return $next($request);
    }

    /**
     * Resolve the booking from the request.
     */
    protected function resolveBooking(Request $request): ?Booking
    {
        // Try to get from route parameter
        if ($request->route('booking')) {
            return $request->route('booking') instanceof Booking 
                ? $request->route('booking') 
                : Booking::find($request->route('booking'));
        }

        // Try to get from route parameter (alternative naming)
        if ($request->route('bookingId')) {
            return Booking::find($request->route('bookingId'));
        }

        // Try to get from resolved booking in request (set by other middleware or controller)
        if ($request->has('resolved_booking')) {
            return $request->get('resolved_booking');
        }

        return null;
    }

    /**
     * Deny access with a JSON response.
     */
    protected function denyAccess(string $message): Response
    {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], 403);
    }
}
