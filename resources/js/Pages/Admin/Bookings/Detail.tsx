import { Link, useParams } from 'react-router-dom';
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
  FileText
} from 'lucide-react';

interface Traveler {
  id: number;
  name: string;
  email: string;
  phone: string;
  id_type: string;
  id_number: string;
}

interface Payment {
  id: number;
  amount: number;
  payment_method: string;
  payment_status: string;
  payment_date: string;
  transaction_id: string;
  payment_proof: string | null;
}

interface BookingDetail {
  id: number;
  booking_number: string;
  status: string;
  booking_date: string;
  travel_date: string;
  return_date: string;
  number_of_travelers: number;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  payment_status: string;
  payment_method: string;
  special_requests: string | null;
  notes: string | null;
  travel_package: {
    id: number;
    name: string;
    slug: string;
    destination: string;
    duration_days: number;
    duration_nights: number;
    price: number;
  };
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  travelers: Traveler[];
  payments: Payment[];
}

const mockBooking: BookingDetail = {
  id: 1,
  booking_number: 'BK-ABC123-20240501',
  status: 'confirmed',
  booking_date: '2024-05-01',
  travel_date: '2024-06-15',
  return_date: '2024-06-22',
  number_of_travelers: 2,
  subtotal: 5000000,
  tax_amount: 500000,
  discount_amount: 0,
  total_amount: 5500000,
  payment_status: 'paid',
  payment_method: 'bank_transfer',
  special_requests: 'Vegetarian meals requested',
  notes: 'Booking confirmed via online payment',
  travel_package: {
    id: 1,
    name: 'Bali Paradise Trip',
    slug: 'bali-paradise-trip',
    destination: 'Bali, Indonesia',
    duration_days: 8,
    duration_nights: 7,
    price: 5500000,
  },
  customer: {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+6281234567890',
  },
  travelers: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+6281234567890',
      id_type: 'passport',
      id_number: 'AB1234567',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+6281234567891',
      id_type: 'passport',
      id_number: 'CD7654321',
    },
  ],
  payments: [
    {
      id: 1,
      amount: 5500000,
      payment_method: 'bank_transfer',
      payment_status: 'completed',
      payment_date: '2024-05-02',
      transaction_id: 'TRX-BANK-001',
      payment_proof: null,
    },
  ],
};

export default function BookingDetailAdmin() {
  const { id } = useParams();
  const booking = mockBooking;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
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
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentBadge = (status: string) => {
    const styles: Record<string, string> = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      refunded: 'bg-purple-100 text-purple-800',
      failed: 'bg-red-100 text-red-800',
      completed: 'bg-green-100 text-green-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle2 className="w-5 h-5" />;
      case 'pending': return <AlertCircle className="w-5 h-5" />;
      case 'cancelled': return <XCircle className="w-5 h-5" />;
      default: return null;
    }
  };

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
                {getStatusIcon(booking.status)}
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex gap-6">
              <div className="w-32 h-32 bg-gray-200 border-2 border-dashed rounded-xl flex-shrink-0" />
              <div className="flex-1">
                <Link to={`/packages/${booking.travel_package.slug}`} className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                  {booking.travel_package.name}
                </Link>
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
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900 mt-1">{booking.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 mt-1 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {booking.customer.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900 mt-1 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {booking.customer.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking Date</p>
                    <p className="font-medium text-gray-900 mt-1 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {formatDate(booking.booking_date)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Travelers Information</h2>
                <div className="space-y-4">
                  {booking.travelers.map((traveler) => (
                    <div key={traveler.id} className="p-4 border border-gray-100 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{traveler.name}</h3>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Mail className="w-4 h-4" />{traveler.email}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Phone className="w-4 h-4" />{traveler.phone}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{traveler.id_type.toUpperCase()}</p>
                          <p className="font-medium text-gray-900 mt-1">{traveler.id_number}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {booking.special_requests && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-400" />
                    Special Requests
                  </h2>
                  <p className="text-gray-600">{booking.special_requests}</p>
                </div>
              )}

              {booking.notes && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Notes</h2>
                  <p className="text-gray-600">{booking.notes}</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getPaymentBadge(booking.payment_status)}`}>
                    {booking.payment_status === 'paid' ? 'Paid' : booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="text-gray-900 font-medium capitalize">{booking.payment_method.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{formatCurrency(booking.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">{formatCurrency(booking.tax_amount)}</span>
                  </div>
                  {booking.discount_amount > 0 && (
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

              {booking.payments.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
                  <div className="space-y-4">
                    {booking.payments.map((payment) => (
                      <div key={payment.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                            <p className="text-sm text-gray-500 mt-0.5">{payment.transaction_id}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(payment.payment_date).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPaymentBadge(payment.payment_status)}`}>
                            {payment.payment_status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 text-left">
                    Confirm Booking
                  </button>
                  <button className="w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 text-left">
                    Cancel Booking
                  </button>
                  <button className="w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 text-left">
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
