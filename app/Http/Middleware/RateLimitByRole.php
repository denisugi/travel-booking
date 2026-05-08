<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Cache\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\ThrottleRequests;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;

class RateLimitByRole
{
    /**
     * The rate limiter instance.
     */
    protected RateLimiter $limiter;

    /**
     * Default rates per role (requests per minute).
     */
    protected array $defaultRates = [
        'guest' => 30,
        'user' => 60,
        'admin' => 300,
    ];

    /**
     * Create a new middleware instance.
     */
    public function __construct(RateLimiter $limiter)
    {
        $this->limiter = $limiter;
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ?string $role = null): Response
    {
        $user = $request->user();
        $limiterKey = $this->resolveLimiterKey($request, $user, $role);
        $maxAttempts = $this->resolveMaxAttempts($user, $role);

        if ($this->limiter->tooManyAttempts($limiterKey, $maxAttempts)) {
            $retryAfter = $this->limiter->availableIn($limiterKey);
            
            return response()->json([
                'success' => false,
                'message' => 'Too many requests. Please try again later.',
                'retry_after' => $retryAfter,
            ], 429);
        }

        $this->limiter->hit($limiterKey, 60);

        $response = $next($request);

        // Add rate limit headers to response
        $response->headers->add([
            'X-RateLimit-Limit' => $maxAttempts,
            'X-RateLimit-Remaining' => max(0, $this->limiter->remaining($limiterKey, $maxAttempts)),
        ]);

        return $response;
    }

    /**
     * Resolve the limiter key for the request.
     */
    protected function resolveLimiterKey(Request $request, ?object $user, ?string $role): string
    {
        if ($role === 'admin' || ($user && $user->hasRole('admin'))) {
            return 'admin:' . ($user?->id ?? $request->ip());
        }

        if ($user) {
            return 'user:' . $user->id;
        }

        return 'guest:' . $request->ip();
    }

    /**
     * Resolve the maximum attempts based on user role.
     */
    protected function resolveMaxAttempts(?object $user, ?string $role): int
    {
        // If explicit role is passed, use that
        if ($role !== null) {
            return $this->getRateForRole($role);
        }

        // Otherwise, determine by user status
        if ($user) {
            if ($user->hasRole('admin')) {
                return $this->getRateForRole('admin');
            }
            return $this->getRateForRole('user');
        }

        return $this->getRateForRole('guest');
    }

    /**
     * Get the rate limit for a specific role.
     */
    protected function getRateForRole(string $role): int
    {
        return $this->defaultRates[$role] ?? $this->defaultRates['user'];
    }

    /**
     * Set custom rate limits.
     */
    public static function setRates(array $rates): void
    {
        // This allows runtime configuration of rate limits
        app()->instance(self::class, new self(
            app(RateLimiter::class),
            $rates
        ));
    }
}
