<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\TravelPackage;
use App\Models\BlogPost;
use App\Models\SiteSetting;
use App\Http\Controllers\Auth\LoginController;

Route::get('/', function () {
    $featuredPackages = TravelPackage::with(['galleries'])
        ->featured()
        ->take(4)
        ->get()
        ->toArray();

    $blogPosts = BlogPost::with(['category', 'user'])
        ->where('status', 'published')
        ->orderBy('published_at', 'desc')
        ->take(3)
        ->get()
        ->toArray();

    return \Inertia\Inertia::render('Public/Home', [
        'featuredPackages' => $featuredPackages,
        'blogPosts' => $blogPosts,
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('Public/About');
})->name('about');

Route::get('/packages', function () {
    return Inertia::render('Public/Packages');
})->name('packages');

Route::get('/packages/index', function () {
    return Inertia::render('Public/Packages');
})->name('packages.index');

Route::get('/blog', function () {
    return Inertia::render('Public/Blog');
})->name('blog.index');

Route::get('/packages/{slug}', function ($slug) {
    return Inertia::render('Public/PackageDetail', ['slug' => $slug]);
})->name('packages.show');

Route::get('/blog/{slug}', function ($slug) {
    return Inertia::render('Public/BlogDetail', ['slug' => $slug]);
})->name('blog.show');

Route::get('/contact', function () {
    return Inertia::render('Public/Contact');
})->name('contact');

Route::get('/faq', function () {
    return Inertia::render('Public/FAQ');
})->name('faq');

// Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout')->middleware('auth');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    Route::get('/forgot-password', function () {
        return Inertia::render('Auth/ForgotPassword');
    })->name('forgot-password');
});

// Authenticated User Routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('User/Dashboard');
    })->name('user.dashboard');

    Route::get('/bookings', function () {
        return Inertia::render('User/Bookings');
    })->name('user.bookings');

    Route::get('/bookings/{id}', function ($id) {
        return Inertia::render('User/BookingDetail', ['id' => $id]);
    })->name('user.bookings.show');

    Route::get('/payment-upload/{bookingId}', function ($bookingId) {
        return Inertia::render('User/PaymentUpload', ['bookingId' => $bookingId]);
    })->name('user.payment.upload');

    Route::get('/profile', function () {
        return Inertia::render('User/Profile');
    })->name('user.profile');
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        $stats = [
            'total_packages' => \App\Models\TravelPackage::count(),
            'total_users' => \App\Models\User::count(),
            'total_bookings' => \App\Models\Booking::count(),
            'total_blogs' => \App\Models\BlogPost::count(),
            'pending_bookings' => \App\Models\Booking::where('status', 'pending')->count(),
            'confirmed_bookings' => \App\Models\Booking::where('status', 'confirmed')->count(),
            'cancelled_bookings' => \App\Models\Booking::where('status', 'cancelled')->count(),
            'paid_bookings' => \App\Models\Booking::where('payment_status', 'paid')->count(),
            'pending_payments' => \App\Models\Booking::whereIn('payment_status', ['unpaid', 'partial'])->count(),
        ];

        $recentBookings = \App\Models\Booking::with(['user', 'travelPackage'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(fn($b) => [
                'id' => $b->id,
                'booking_number' => $b->booking_number,
                'customer_name' => $b->user?->name ?? 'N/A',
                'package_name' => $b->travelPackage?->name ?? 'N/A',
                'total_amount' => $b->total_amount,
                'status' => $b->status,
                'payment_status' => $b->payment_status,
                'created_at' => $b->created_at->format('Y-m-d H:i'),
            ]);

        $recentPayments = \App\Models\Booking::with(['user'])
            ->whereIn('payment_status', ['paid', 'partial'])
            ->whereNotNull('confirmed_at')
            ->orderBy('confirmed_at', 'desc')
            ->take(5)
            ->get()
            ->map(fn($b) => [
                'id' => $b->id,
                'booking_number' => $b->booking_number,
                'customer_name' => $b->user?->name ?? 'N/A',
                'amount' => $b->total_amount,
                'payment_status' => $b->payment_status,
                'created_at' => \Carbon\Carbon::parse($b->confirmed_at)->format('Y-m-d H:i'),
            ]);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentBookings' => $recentBookings,
            'recentPayments' => $recentPayments,
        ]);
    })->name('dashboard');

    // Packages
    Route::get('/packages', function () {
        return Inertia::render('Admin/Packages/Index');
    })->name('packages.index');
    Route::get('/packages/create', function () {
        return Inertia::render('Admin/Packages/Create');
    })->name('packages.create');
    Route::post('/packages', function (\Illuminate\Http\Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:travel_packages',
            'short_description' => 'nullable|string|max:500',
            'description' => 'required|string',
            'destination' => 'required|string|max:255',
            'duration_days' => 'required|integer|min:1',
            'duration_nights' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'max_participants' => 'required|integer|min:1',
            'departure_date' => 'required|date',
            'return_date' => 'required|date|after:departure_date',
            'featured' => 'boolean',
            'is_active' => 'boolean',
            'includes' => 'nullable|string',
            'excludes' => 'nullable|string',
            'itinerary' => 'nullable|string',
            'highlights' => 'nullable|string',
            'terms_conditions' => 'nullable|string',
        ]);
        $data['user_id'] = $request->user()->id;
        $package = \App\Models\TravelPackage::create($data);
        return redirect()->route('admin.packages.index')->with('success', 'Package created successfully');
    })->name('packages.store');
    Route::get('/packages/{id}/edit', function ($id) {
        return Inertia::render('Admin/Packages/Edit', ['id' => $id]);
    })->name('packages.edit');

    // Bookings
    Route::get('/bookings', function () {
        return Inertia::render('Admin/Bookings/Index');
    })->name('bookings.index');
    Route::get('/bookings/{id}', function ($id) {
        return Inertia::render('Admin/Bookings/Detail', ['id' => $id]);
    })->name('bookings.show');

    // Payments
    Route::get('/payments', function () {
        return Inertia::render('Admin/Payments/Index');
    })->name('payments.index');

    // Bank Accounts
    Route::get('/bank-accounts', function () {
        return Inertia::render('Admin/BankAccounts/Index');
    })->name('bank-accounts.index');

    // Users
    Route::get('/users', function () {
        return Inertia::render('Admin/Users/Index');
    })->name('users.index');

    // Blog
    Route::get('/blog', function () {
        return Inertia::render('Admin/Blog/Index');
    })->name('blog.index');
    Route::get('/blog/editor', function () {
        return Inertia::render('Admin/Blog/Editor');
    })->name('blog.editor');
    Route::get('/blog/editor/{id}', function ($id) {
        return Inertia::render('Admin/Blog/Editor', ['id' => $id]);
    })->name('blog.editor.edit');

    // Settings
    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings/Index');
    })->name('settings.index');
    Route::put('/settings', [\App\Http\Controllers\Admin\SettingsController::class, 'update'])->name('settings.update');

    // Reports
    Route::get('/reports', function () {
        return Inertia::render('Admin/Reports/Index');
    })->name('reports.index');
});

// Health check
Route::get('/up', function () {
    return response()->json(['status' => 'ok']);
});

// Test route
Route::get('/test-simple', fn() => 'hello');

// Test with data
Route::get('/test-data', function () {
    return \Inertia\Inertia::render('Public/Home', [
        'featuredPackages' => [
            ['id' => 1, 'name' => 'Bali Paradise', 'destination' => 'Bali, Indonesia', 'price' => 1299.99, 'featured_image' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4']
        ],
        'blogPosts' => []
    ]);
});

