# Wanderlust Travel - Production Travel Booking Platform

> Enterprise-grade Laravel 12 travel booking application with modular monolith architecture, Inertia.js + React frontend, and complete booking/payment workflows.

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Laravel 12, PHP 8.4+, PostgreSQL, Redis |
| Frontend | React 18, TypeScript, Inertia.js, TailwindCSS |
| Auth | Laravel Sanctum (API), Session (Web) |
| Queue | Laravel Horizon + Redis |
| Search | Laravel Scout (Telescope-ready) |
| Storage | Laravel Storage (Local/S3-ready) |
| Email | Laravel Mail + Queued Notifications |
| Infrastructure | Docker, Docker Compose, Nginx, Supervisor |

## 📁 Architecture

```
travel-booking/
├── app/
│   ├── Actions/          # Laravel Actions (CQRS-lite)
│   ├── Console/         # Artisan commands & kernel
│   ├── DTOs/            # Data Transfer Objects
│   ├── Domains/         # Bounded contexts (Auth, User, Admin, Travel, Booking, Payment, CMS...)
│   ├── Events/          # Domain events
│   ├── Exceptions/      # Custom exception handlers
│   ├── Http/
│   │   ├── Controllers/Api/V1/   # RESTful API controllers
│   │   ├── Middleware/            # Custom middleware
│   │   └── Resources/             # API Resources
│   ├── Jobs/            # Queue jobs
│   ├── Listeners/      # Event listeners
│   ├── Mail/           # Markdown mailables
│   ├── Models/         # Eloquent models
│   ├── Notifications/  # System notifications
│   ├── Policies/       # Authorization policies
│   ├── Repositories/   # Repository pattern
│   └── Services/       # Business logic services
├── config/              # Laravel + domain configs
├── database/
│   ├── factories/      # Model factories
│   ├── migrations/     # Database migrations (UUID primary keys)
│   └── seeders/        # Database seeders
├── deploy/              # Deployment scripts
├── docker/             # Docker & Nginx configs
├── resources/
│   ├── css/            # TailwindCSS entry
│   ├── js/             # Inertia.js React app
│   │   ├── Components/  # UI + feature components
│   │   ├── Layouts/       # App & Public layouts
│   │   ├── Pages/         # Inertia pages (Admin/User/Public)
│   │   └── types/         # TypeScript definitions
│   └── views/          # Blade views (SSR for SEO)
├── routes/             # API & web routes
└── tests/              # PestPHP/PHPUnit tests
```

## 📦 Modules Built

| Module | Features |
|--------|----------|
| **Auth** | Register, login, logout, password reset, Sanctum API tokens |
| **User** | Profile management, avatar upload, password change |
| **Admin** | Dashboard analytics, user management, role-based access |
| **Travel Package** | CRUD, gallery, pricing, discount, quota, SEO metadata, search/filter |
| **Booking** | Multi-step flow, traveler data, booking code generation, status workflow |
| **Payment** | Bank transfer proof upload, admin verification, approve/reject |
| **CMS Blog** | Rich text (TipTap-ready), categories, tags, scheduling, SEO |
| **SEO** | Meta tags, OpenGraph, JSON-LD structured data, sitemap, robots.txt |
| **Media** | File upload with validation, secure naming, storage abstraction |
| **Notification** | Queued emails + database notifications for all booking events |
| **Reporting** | Booking/revenue/payment reports with CSV/PDF export |
| **Settings** | Site-wide configuration via database |

## 🔄 Booking Workflow

```
┌──────────────────────────────────────────────────────────────┐
│ 1. User browses packages → selects one                       │
│ 2. User fills traveler data (multiple travelers supported)   │
│ 3. System creates booking → status: PENDING_PAYMENT          │
│ 4. User sees bank accounts for transfer                      │
│ 5. User does manual bank transfer                           │
│ 6. User uploads payment proof → status: WAITING_VERIFICATION│
│ 7. Admin reviews and approves/rejects                       │
│ 8. User receives email notification                         │
│ 9. Booking confirmed → status: PAID → COMPLETED             │
└──────────────────────────────────────────────────────────────┘
```

**Booking Statuses:** `pending_payment` → `waiting_verification` → `paid` → `completed`
**Also:** `rejected`, `cancelled`

## 🎨 Public Website Pages

- **/** - Homepage with hero, featured packages, testimonials
- **/about** - About page
- **/packages** - Travel package listing with filters
- **/packages/{slug}** - Package detail with gallery, itinerary, booking form
- **/blog** - Blog listing
- **/blog/{slug}** - Blog post with rich content
- **/contact** - Contact form
- **/faq** - FAQ accordion

## 🔐 Security Implemented

- CSRF protection on all forms
- XSS sanitization via Laravel
- SQL injection prevention via Eloquent ORM
- Laravel Policies + Gates for RBAC
- Rate limiting by role (guest: 30/min, user: 60/min, admin: 300/min)
- Secure file upload validation (MIME, size, naming)
- Password hashing with bcrypt/Argon2
- Signed URLs for sensitive operations
- Audit logging on all admin actions

## 📧 Email Notifications

| Event | Email |
|-------|-------|
| User registers | Welcome email |
| Booking created | Booking confirmation with details |
| Payment uploaded | Payment submitted notification |
| Payment approved | Approval with booking summary |
| Payment rejected | Rejection with reason |
| Booking completed | Completion confirmation |

All emails use **queued jobs** with retry mechanism and markdown templates.

## 🗄️ Database Schema (18 migrations)

- `users` - UUID, soft deletes, roles relationship
- `roles` / `permissions` - Spatie RBAC
- `role_user` / `permission_role` - Pivot tables
- `travel_packages` - Full package data, JSON metadata, slug
- `package_galleries` - Multiple images per package
- `bookings` - Booking codes, status workflow
- `booking_travelers` - Multiple travelers per booking
- `payments` - Payment proof, verification workflow
- `bank_accounts` - Admin-managed transfer accounts
- `blog_posts` - Full CMS with SEO, scheduling
- `blog_categories` / `blog_tags` - Taxonomy
- `blog_post_tag` - Pivot
- `site_settings` - Key-value config
- `email_logs` - Email tracking
- `audit_logs` - Activity logging

## 🚀 Quick Start

```bash
# 1. Clone and install
cd travel-booking
composer install
npm install

# 2. Environment
cp .env.example .env
php artisan key:generate

# 3. Docker (recommended)
docker-compose up -d
docker-compose exec app php artisan migrate --seed

# 4. Or local development
php artisan migrate --seed
php artisan horizon
npm run dev
```

## 🐳 Docker Services

```yaml
services:
  app       # Laravel Octane + PHP 8.4-FPM
  nginx     # Web server
  postgres  # Database
  redis     # Cache + Queue
  horizon   # Queue worker dashboard
```

## 📋 Admin Dashboard Features

- **Dashboard** - Stats widgets, charts, recent activity
- **Packages** - Full CRUD with gallery upload, SEO fields
- **Bookings** - List, detail, approve/reject payments
- **Payments** - Payment proof review, verification workflow
- **Bank Accounts** - Manage transfer account details
- **Users** - User list, role assignment
- **Blog** - Rich editor, categories, tags, scheduling
- **Settings** - Site configuration
- **Reports** - Revenue, bookings, payments with export

## 🔌 API Endpoints (v1)

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/me

GET    /api/v1/packages
GET    /api/v1/packages/{slug}
GET    /api/v1/packages/featured

POST   /api/v1/bookings          # Create booking
GET    /api/v1/bookings          # My bookings
GET    /api/v1/bookings/{id}
POST   /api/v1/bookings/{id}/cancel

POST   /api/v1/payments          # Upload proof
GET    /api/v1/payments/{booking_id}

GET    /api/v1/blog
GET    /api/v1/blog/{slug}
GET    /api/v1/blog/categories
GET    /api/v1/blog/tags

# Admin (auth required + admin role)
GET    /api/v1/admin/bookings
PUT    /api/v1/admin/bookings/{id}/approve
PUT    /api/v1/admin/bookings/{id}/reject
GET    /api/v1/admin/users
# ... full CRUD for all entities
```

## 🧪 Testing

```bash
php artisan test          # Run all tests
php artisan test --suite=Unit
php artisan test --suite=Feature
```

## 📅 Scheduled Tasks

```php
* * * * *  php artisan schedule:run
# Runs every hour: CleanupExpiredBookings (auto-cancel unpaid after 24h)
# Runs daily: GenerateSitemap
# Runs daily: SendTravelReminders
```

## 🔧 Environment Variables

```env
APP_NAME="Wanderlust Travel"
APP_ENV=local
APP_KEY=
APP_URL=https://travel.example.com

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=travel_booking
DB_USERNAME=
DB_PASSWORD=

REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null

SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `app/Services/BookingService.php` | Complete booking workflow logic |
| `app/Services/PaymentService.php` | Payment verification logic |
| `app/Actions/CreateBooking.php` | Booking creation action |
| `app/Actions/UploadPayment.php` | Payment proof upload |
| `app/Repositories/Eloquent/TravelPackageRepository.php` | Package search/filter |
| `app/Policies/BookingPolicy.php` | Authorization rules |
| `routes/api_v1.php` | All API routes |
| `docker-compose.yml` | Full stack deployment |

## 🌟 Production Features

- Modular Monolith architecture for future microservices
- Repository pattern for testability
- DTO pattern for type safety
- Event-driven internal communication
- Queued jobs with Horizon
- Scheduled tasks with audit trail
- Comprehensive logging
- SEO-optimized SSR pages + SPA
- Responsive mobile-first UI
- Dark mode support
- Export reports (CSV, PDF)

## 📄 License

MIT
