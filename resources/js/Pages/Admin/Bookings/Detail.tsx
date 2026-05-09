import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  CreditCard,
  Clock,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  FileText,
  RefreshCw,
  User,
  Shield
} from 'lucide-react';

interface Traveler {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  passport_number: string;
  is_primary: boolean;
  type: string;
}

interface Payment {
  id: number;
  amount: string;
  fee: string;
  net_amount: string;
  method: string;
  status: string;
  transaction_id: string;
  payment_proof: string | null;
  paid_at: string;
  created_at: string;
}

interface BookingDetail {
  id: number;
  booking_number: string;
  status: string;
  booking_date: string | null;
  travel_date: string;
  return_date: string | null;
  number_of_travelers: number;
  subtotal: string;
  tax_amount: string;
  discount_amount: string;
  total_amount: string;
  payment_status: string;
  payment_method: string | null;
  special_requests: string | null;
  notes: string | null;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  travel_package: {
    id: number;
    name: string;
    slug: string;
    destination: string;
    duration_days: number;
    duration_nights: number;
    price: number;
    featured_image: string;
  };
  travelers: Traveler[];
  payments: Payment[];
}

export default function BookingDetailAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Get ID from URL path — Inertia doesn't use React Router params
  const bookingId = typeof window !== 'undefined'
    ? parseInt(window.location.pathname.split('/').pop() || '0')
    : 0;

  const fetchBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/v1/admin/bookings/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success) {
        setBooking(data.data);
      } else {
        setError(data.message || 'Failed to load booking');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const handleConfirmBooking = async () => {
    if (!confirm('Confirm this booking?')) return;
    setActionLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/v1/admin/bookings/${bookingId}/confirm`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success) {
        fetchBooking();
      } else {
        alert(data.message || 'Failed to confirm booking');
      }
    } catch {
      alert('Network error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!confirm('Cancel this booking? This action cannot be undone.')) return;
    setActionLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/v1/admin/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success) {
        fetchBooking();
      } else {
        alert(data.message || 'Failed to cancel booking');
      }
    } catch {
      alert('Network error');
    } finally {
      setActionLoading(false);
    }
  };

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
      refunded: 'bg-purple-100 text-purple-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentBadge = (status: string) => {
    const styles: Record<string, string> = {
      paid: 'bg-green-100 text-green-800',
      partial: 'bg-orange-100 text-orange-800',
      unpaid: 'bg-red-100 text-red-800',
      refunded: 'bg-purple-100 text-purple-800',
      failed: 'bg-red-100 text-red-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
          <p className="text-gray-500">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/admin/bookings" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Bookings
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">{error || 'Booking not found'}</p>
            <button onClick={fetchBooking} className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link to="/admin/bookings" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Bookings
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
              <p className="text-gray-600 mt-1">Booking Number: {booking.booking_number}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusBadge(booking.status)} flex items-center gap-1.5`}>
                {booking.status === 'confirmed' && <CheckCircle2 className="w-4 h-4" />}
                {booking.status === 'pending' && <AlertCircle className="w-4 h-4" />}
                {booking.status === 'cancelled' && <XCircle className="w-4 h-4" />}
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
              <button
                onClick={fetchBooking}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Package Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex gap-6">
              {booking.travel_package.featured_image && (
                <img
                  src={booking.travel_package.featured_image}
                  alt={booking.travel_package.name}
                  className="w-32 h-32 object-cover rounded-xl flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{booking.travel_package.name}</h2>
                <p className="text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {booking.travel_package.destination}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {booking.travel_package.duration_days} days / {booking.travel_package.duration_nights} nights
                </p>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(booking.travel_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{booking.number_of_travelers} traveler(s)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900 mt-1 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {booking.user.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 mt-1 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {booking.user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900 mt-1 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {booking.user.phone || '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking Date</p>
                    <p className="font-medium text-gray-900 mt-1 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {formatDate(booking.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Travelers */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Travelers Information</h2>
                {booking.travelers.length === 0 ? (
                  <p className="text-gray-500 text-sm">No traveler information available</p>
                ) : (
                  <div className="space-y-4">
                    {booking.travelers.map((traveler) => (
                      <div key={traveler.id} className="p-4 border border-gray-100 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                {traveler.first_name} {traveler.last_name}
                                {traveler.is_primary && (
                                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Primary</span>
                                )}
                              </h3>
                              <p className="text-sm text-gray-500 capitalize">{traveler.type} • {traveler.gender}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {traveler.passport_number && (
                              <>
                                <p className="text-sm text-gray-500">Passport</p>
                                <p className="font-medium text-gray-900">{traveler.passport_number}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Date of Birth</p>
                            <p className="text-gray-900">{traveler.date_of_birth ? formatDate(traveler.date_of_birth) : '-'}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Email</p>
                            <p className="text-gray-900">{traveler.email || '-'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Special Requests */}
              {booking.special_requests && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-400" />
                    Special Requests
                  </h2>
                  <p className="text-gray-600">{booking.special_requests}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getPaymentBadge(booking.payment_status)}`}>
                    {booking.payment_status === 'paid' ? 'Paid' : booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                  </span>
                </div>
                {booking.payment_method && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="text-gray-900 font-medium capitalize">{booking.payment_method.replace('_', ' ')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{formatCurrency(booking.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (11%)</span>
                    <span className="text-gray-900">{formatCurrency(booking.tax_amount)}</span>
                  </div>
                  {parseFloat(booking.discount_amount) > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{formatCurrency(booking.discount_amount)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-gray-900 text-lg">{formatCurrency(booking.total_amount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              {booking.payments.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
                  <div className="space-y-4">
                    {booking.payments.map((payment) => (
                      <div key={payment.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                            <p className="text-sm text-gray-500 mt-0.5">{payment.transaction_id || '-'}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {payment.paid_at ? formatDate(payment.paid_at) : formatDate(payment.created_at)}
                            </p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPaymentBadge(payment.status)}`}>
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
                <div className="space-y-2">
                  {booking.status === 'pending' && (
                    <button
                      onClick={handleConfirmBooking}
                      disabled={actionLoading}
                      className="w-full px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {actionLoading ? 'Processing...' : 'Confirm Booking'}
                    </button>
                  )}
                  {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                    <button
                      onClick={handleCancelBooking}
                      disabled={actionLoading}
                      className="w-full px-4 py-2.5 border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      {actionLoading ? 'Processing...' : 'Cancel Booking'}
                    </button>
                  )}
                  <button className="w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Confirmation Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
