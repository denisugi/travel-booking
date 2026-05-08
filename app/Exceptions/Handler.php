<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;
use Inertia\Inertia;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types and their corresponding custom handlers.
     *
     * @var array<class-string<\Throwable>, \Closure|string>
     */
    protected $handlers = [
        //
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (Throwable $e, $request) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return $this->handleApiException($e);
            }

            if ($this->isHttpException($e)) {
                return $this->handleHttpException($e);
            }

            // For other exceptions, log and show generic error page
            if (config('app.debug')) {
                return null; // Let Laravel's default exception handler show detailed errors
            }

            return $this->showCustomErrorPage($e);
        });
    }

    /**
     * Handle API exceptions and return JSON response.
     */
    protected function handleApiException(Throwable $e)
    {
        if ($e instanceof ValidationException) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        if ($e instanceof AuthenticationException) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        if ($e instanceof ModelNotFoundException || $e instanceof NotFoundHttpException) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found',
            ], 404);
        }

        if ($e instanceof MethodNotAllowedHttpException) {
            return response()->json([
                'success' => false,
                'message' => 'Method not allowed',
            ], 405);
        }

        $statusCode = $e instanceof HttpException ? $e->getStatusCode() : 500;

        return response()->json([
            'success' => false,
            'message' => $e instanceof HttpException ? $e->getMessage() : 'Server Error',
        ], $statusCode);
    }

    /**
     * Handle HTTP exceptions with custom error pages.
     */
    protected function handleHttpException(HttpException $e)
    {
        $statusCode = $e->getStatusCode();

        return response()->view('errors.default', [
            'exception' => $e,
            'statusCode' => $statusCode,
            'message' => $e->getMessage() ?: $this->getHttpStatusMessage($statusCode),
        ], $statusCode);
    }

    /**
     * Get HTTP status code message.
     */
    protected function getHttpStatusMessage(int $statusCode): string
    {
        return match ($statusCode) {
            400 => 'Bad Request',
            401 => 'Unauthorized',
            403 => 'Forbidden',
            404 => 'Page Not Found',
            405 => 'Method Not Allowed',
            419 => 'Page Expired',
            429 => 'Too Many Requests',
            500 => 'Server Error',
            503 => 'Service Unavailable',
            default => 'Error',
        };
    }

    /**
     * Show custom error page for non-HTTP exceptions.
     */
    protected function showCustomErrorPage(Throwable $e)
    {
        $statusCode = $e instanceof HttpException ? $e->getStatusCode() : 500;

        return response()->view('errors.default', [
            'exception' => $e,
            'statusCode' => $statusCode,
            'message' => config('app.debug') ? $e->getMessage() : 'Something went wrong. Please try again later.',
        ], $statusCode);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        return redirect()->guest(route('login'));
    }

    /**
     * Convert a validation exception into a JSON response.
     */
    protected function invalidJson($request, ValidationException $exception)
    {
        return response()->json([
            'success' => false,
            'message' => 'The given data was invalid.',
            'errors' => $exception->errors(),
        ], $exception->status);
    }
}
