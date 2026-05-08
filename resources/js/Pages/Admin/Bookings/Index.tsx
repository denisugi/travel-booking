import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  User,
  X
} from 'lucide-react';

interface Booking {
  id: number;
  booking_number: string;
  customer_name: string;
  customer_email: string;
  package_name: string;
  package_destination: string;
  status: string;
  booking_date: string;
  travel_date: string;
  number_of_travelers: number;
  total_amount: number;
  payment_status: string;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    booking_number: 'BK-ABC123-20240501',
    customer_name: 'John Doe',
    customer_email: 'john.doe@example.com',
    package_name: 'Bali Paradise Trip',
    package_destination: 'Bali, Indonesia',
    status: 'confirmed',
    booking_date: '2024-05-01',
    travel_date: '2024-06-15',
    number_of_travelers: 2,
    total_amount: 5500000,
    payment_status: 'paid',
  },
  {
    id: 2,
    booking_number: 'BK-DEF456-20240502',
    customer_name: 'Jane Smith',
    customer_email: 'jane.smith@example.com',
    package_name: 'Tokyo Adventure',
    package_destination: 'Tokyo, Japan',
    status: 'pending',
    booking_date: '2024-05-02',
    travel_date: '2024-07-20',
    number_of_travelers: 1,
    total_amount: 7800000,
    payment_status: 'pending',
  },
  {
    id: 3,
    booking_number: 'BK-GHI789-20240415',
    customer_name: 'Robert Johnson',
    customer_email: 'robert.j@example.com',
    package_name: 'Paris Romance',
    package_destination: 'Paris, France',
    status: 'completed',
    booking_date: '2024-04-15',
    travel_date: '2024-05-10',
    number_of_travelers: 2,
    total_amount: 12000000,
    payment_status: 'paid',
  },
  {
    id: 4,
    booking_number: 'BK-JKL012-20240320',
    customer_name: 'Emily Brown',
    customer_email: 'emily.b@example.com',
    package_name: 'Swiss Alps Experience',
    package_destination: 'Zurich, Switzerland',
    status: 'cancelled',
    booking_date: '2024-03-20',
    travel_date: '2024-04-05',
    number_of_travelers: 3,
    total_amount: 15000000,
    payment_status: 'refunded',
  },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const paymentStatusOptions = [
  { value: '', label: 'All Payments' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'refunded', label: 'Refunded' },
  { value: 'failed', label: 'Failed' },
];

export default function BookingsIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
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
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = 
      booking.booking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.package_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === '' || booking.status === statusFilter;
    const matchesPayment = paymentFilter === '' || booking.payment_status === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setPaymentFilter('');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || statusFilter || paymentFilter;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-1">Manage all travel bookings</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search by booking number, customer name, email, or package..."
                value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white min-w-[140px]">
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select value={paymentFilter} onChange={(e) => { setPaymentFilter(e.target.value); setCurrentPage(1); }}
                className="pl-4 pr-8 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white min-w-[140px]">
                {paymentStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="px-4 py-2.5 text-gray-600 hover:text-gray-800 flex items-center gap-2">
                <X className="w-4 h-4" /> Clear
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {paginatedBookings.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No bookings found</h3>
              <p className="text-gray-500 mt-1">{hasActiveFilters ? 'Try adjusting your filters' : 'No bookings yet'}</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Booking</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Package</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Travel Date</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{booking.booking_number}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Booked: {new Date(booking.booking_date).toLocaleDateString('id-ID')}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{booking.customer_name}</p>
                          <p className="text-sm text-gray-500">{booking.customer_email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{booking.package_name}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" /> {booking.package_destination}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">
                            {new Date(booking.travel_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <User className="w-3 h-3" /> {booking.number_of_travelers} traveler(s)
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{formatCurrency(booking.total_amount)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPaymentBadge(booking.payment_status)}`}>
                            {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/admin/bookings/${booking.id}`}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors inline-flex items-center gap-1">
                            <Eye className="w-4 h-4" /> View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} results
                  </p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button key={page} onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium ${currentPage === page ? 'bg-blue-600 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>
                        {page}
                      </button>
                    ))}
                    <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
