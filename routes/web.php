<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\TravelPackage;
use App\Models\BlogPost;
use App\Models\SiteSetting;

Route::get('/', function () {
    $featuredPackages = TravelPackage::with(['galleries'])
        ->featured()
        ->take(4)
        ->get()
        ->map(function ($pkg) {
            return [
                'id' => $pkg->id,
                'name' => $pkg->name,
                'slug' => $pkg->slug,
                'destination' => $pkg->destination,
                'duration' => $pkg->duration,
                'duration_days' => $pkg->duration_days,
                'duration_nights' => $pkg->duration_nights,
                'price' => (float) $pkg->price,
                'discount_price' => $pkg->discount_price ? (float) $pkg->discount_price : null,
                'is_on_sale' => $pkg->is_on_sale,
                'savings_amount' => (float) $pkg->savings_amount,
                'featured_image' => $pkg->featured_image ?: ($pkg->gallery_images[0] ?? 'https://images.unsplash.com/photo-1506929562872-bb421503ef21'),
                'is_featured' => $pkg->is_featured,
            ];
        });

    $blogPosts = BlogPost::with(['category', 'user'])
        ->where('status', 'published')
        ->orderBy('published_at', 'desc')
        ->take(3)
        ->get()
        ->map(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'featured_image' => $post->featured_image ?: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
                'published_at' => $post->published_at?->format('M d, Y'),
                'category' => $post->category?->name,
                'view_count' => $post->view_count,
            ];
        });

    return Inertia::render('Public/Home', [
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
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

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
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Packages
    Route::get('/packages', function () {
        return Inertia::render('Admin/Packages/Index');
    })->name('packages.index');
    Route::get('/packages/create', function () {
        return Inertia::render('Admin/Packages/Create');
    })->name('packages.create');
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

    // Reports
    Route::get('/reports', function () {
        return Inertia::render('Admin/Reports/Index');
    })->name('reports.index');
});

// Health check
Route::get('/up', function () {
    return response()->json(['status' => 'ok']);
});
