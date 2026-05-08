import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  X,
  Download
} from 'lucide-react';

interface Payment {
  id: number;
  booking_number: string;
  customer_name: string;
  customer_email: string;
  amount: number;
  payment_method: string;
  payment_status: string;
  payment_date: string;
  transaction_id: string;
}

const mockPayments: Payment[] = [
  {
    id: 1,
    booking_number: 'BK-ABC123-20240501',
    customer_name: 'John Doe',
    customer_email: 'john.doe@example.com',
    amount: 5500000,
    payment_method: 'bank_transfer',
    payment_status: 'completed',
    payment_date: '2024-05-01',
    transaction_id: 'TRX-BANK-001',
  },
  {
    id: 2,
    booking_number: 'BK-DEF456-20240502',
    customer_name: 'Jane Smith',
    customer_email: 'jane.smith@example.com',
    amount: 7800000,
    payment_method: 'credit_card',
    payment_status: 'pending',
    payment_date: '2024-05-02',
    transaction_id: 'TRX-CC-002',
  },
  {
    id: 3,
    booking_number: 'BK-GHI789-20240503',
    customer_name: 'Robert Johnson',
    customer_email: 'robert.j@example.com',
    amount: 12000000,
    payment_method: 'bank_transfer',
    payment_status: 'completed',
    payment_date: '2024-05-03',
    transaction_id: 'TRX-BANK-003',
  },
  {
    id: 4,
    booking_number: 'BK-MNO345-20240504',
    customer_name: 'Sarah Wilson',
    customer_email: 'sarah.w@example.com',
    amount: 8500000,
    payment_method: 'e_wallet',
    payment_status: 'failed',
    payment_date: '2024-05-04',
    transaction_id: 'TRX-EW-004',
  },
  {
    id: 5,
    booking_number: 'BK-JKL012-20240505',
    customer_name: 'Emily Brown',
    customer_email: 'emily.b@example.com',
    amount: 15000000,
    payment_method: 'bank_transfer',
    payment_status: 'refunded',
    payment_date: '2024-05-05',
    transaction_id: 'TRX-BANK-005',
  },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
];

const methodOptions = [
  { value: '', label: 'All Methods' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'e_wallet', label: 'E-Wallet' },
];

export default function PaymentsIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
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
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-purple-100 text-purple-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch = 
      payment.booking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transaction_id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === '' || payment.payment_status === statusFilter;
    const matchesMethod = methodFilter === '' || payment.payment_method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setMethodFilter('');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || statusFilter || methodFilter;

  const viewDetail = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-1">Manage all payment transactions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold text-gray-900">
                  {mockPayments.filter(p => p.payment_status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold text-gray-900">
                  {mockPayments.filter(p => p.payment_status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-xl font-bold text-gray-900">
                  {mockPayments.filter(p => p.payment_status === 'failed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Refunded</p>
                <p className="text-xl font-bold text-gray-900">
                  {mockPayments.filter(p => p.payment_status === 'refunded').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search by booking number, customer name, email, or transaction ID..."
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
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select value={methodFilter} onChange={(e) => { setMethodFilter(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white min-w-[140px]">
                {methodOptions.map((option) => (
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
          {paginatedPayments.length === 0 ? (
            <div className="p-12 text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No payments found</h3>
              <p className="text-gray-500 mt-1">{hasActiveFilters ? 'Try adjusting your filters' : 'No payments yet'}</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Booking</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Method</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{payment.transaction_id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{payment.customer_name}</p>
                          <p className="text-sm text-gray-500">{payment.customer_email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/admin/bookings/${payment.booking_number}`} className="text-blue-600 hover:text-blue-700">
                            {payment.booking_number}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700 capitalize">{payment.payment_method.replace('_', ' ')}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(payment.payment_status)} flex items-center gap-1 w-fit`}>
                            {getStatusIcon(payment.payment_status)}
                            {payment.payment_status.charAt(0).toUpperCase() + payment.payment_status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{new Date(payment.payment_date).toLocaleDateString('id-ID')}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => viewDetail(payment)}
                              className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View Detail">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Download">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
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

      {/* Payment Detail Modal */}
      {showDetailModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-medium text-gray-900">{selectedPayment.transaction_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Booking Number</span>
                <span className="font-medium text-gray-900">{selectedPayment.booking_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer</span>
                <span className="font-medium text-gray-900">{selectedPayment.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-bold text-gray-900">{formatCurrency(selectedPayment.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method</span>
                <span className="font-medium text-gray-900 capitalize">{selectedPayment.payment_method.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedPayment.payment_status)}`}>
                  {selectedPayment.payment_status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium text-gray-900">{new Date(selectedPayment.payment_date).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                Close
              </button>
              {selectedPayment.payment_status === 'pending' && (
                <>
                  <button className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                    Approve
                  </button>
                  <button className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
