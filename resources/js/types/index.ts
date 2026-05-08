// User types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'partner';
  avatar?: string;
  created_at: string;
  updated_at: string;
}

// Package types
export interface Package {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  discount_price?: number;
  duration: string;
  location: string;
  category: string;
  images: string[];
  rating: number;
  review_count: number;
  featured: boolean;
  available: boolean;
  partner_id: number;
  partner?: User;
  includes: string[];
  excludes: string[];
  itinerary: ItineraryDay[];
  created_at: string;
  updated_at: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities?: string[];
}

// Blog types
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_id: number;
  author?: User;
  category: string;
  tags: string[];
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

// Booking types
export interface Booking {
  id: number;
  booking_number: string;
  user_id: number;
  user?: User;
  package_id: number;
  package?: Package;
  travel_date: string;
  travelers: number;
  total_amount: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  payment_method?: string;
  special_requests?: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

// Review types
export interface Review {
  id: number;
  user_id: number;
  user?: User;
  package_id: number;
  package?: Package;
  booking_id: number;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface BookingForm {
  package_id: number;
  travel_date: string;
  travelers: number;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  special_requests?: string;
}

export interface ReviewForm {
  package_id: number;
  booking_id: number;
  rating: number;
  title: string;
  comment: string;
}

// Filter types
export interface PackageFilters {
  search?: string;
  category?: string;
  location?: string;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  featured?: boolean;
  available?: boolean;
  sort_by?: 'price' | 'rating' | 'created_at' | 'name';
  sort_order?: 'asc' | 'desc';
}

// Dashboard types
export interface DashboardStats {
  total_bookings: number;
  total_revenue: number;
  pending_bookings: number;
  completed_bookings: number;
  total_packages: number;
  total_reviews: number;
  average_rating: number;
  recent_bookings: Booking[];
  top_packages: Package[];
}

// Toast notification types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}
