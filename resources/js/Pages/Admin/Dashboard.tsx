import { Link, usePage } from '@inertiajs/react';
import {
  Package,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CreditCard
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  link: string;
}

interface RecentBooking {
  id: number;
  booking_number: string;
  customer_name: string;
  package_name: string;
  total_amount: string | number;
  status: string;
  payment_status: string;
  created_at: string;
}

interface RecentPayment {
  id: number;
  booking_number: string;
  customer_name: string;
  amount: string | number;
  payment_status: string;
  created_at: string;
}

interface DashboardProps {
  stats: {
    total_packages: number;
    total_users: number;
    total_bookings: number;
    total_blogs: number;
    pending_bookings: number;
    confirmed_bookings: number;
    cancelled_bookings: number;
    paid_bookings: number;
    pending_payments: number;
  };
  recentBookings: RecentBooking[];
  recentPayments: RecentPayment[];
}

export default function AdminDashboard() {
  const { stats, recentBookings, recentPayments } = usePage<{ props: DashboardProps }>().props;

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  const statCards: StatCard[] = [
    {
      title: 'Total Packages',
      value: stats.total_packages,
      change: 12,
      icon: <Package className="w-6 h-6" />,
      link: '/admin/packages',
    },
    {
      title: 'Total Users',
      value: stats.total_users,
      change: 8,
      icon: <Users className="w-6 h-6" />,
      link: '/admin/users',
    },
    {
      title: 'Total Bookings',
      value: stats.total_bookings,
      change: 15,
      icon: <Calendar className="w-6 h-6" />,
      link: '/admin/bookings',
    },
    {
      title: 'Confirmed Bookings',
      value: stats.confirmed_bookings,
      change: 5,
      icon: <CheckCircle2 className="w-6 h-6" />,
      link: '/admin/bookings?status=confirmed',
    },
  ];

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
      partial: 'bg-orange-100 text-orange-800',
      unpaid: 'bg-red-100 text-red-800',
      refunded: 'bg-purple-100 text-purple-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your travel business.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Link
              key={index}
              href={stat.link}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {stat.icon}
                </div>
                {stat.change !== undefined && (
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {Math.abs(stat.change)}%
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Pending Bookings */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Bookings</p>
                <p className="text-xl font-bold text-gray-900">{stats.pending_bookings}</p>
              </div>
            </div>
            <Link
              href="/admin/bookings?status=pending"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pending Payments */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-xl font-bold text-gray-900">{stats.pending_payments}</p>
              </div>
            </div>
            <Link
              href="/admin/payments?status=pending"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Confirmed Today */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Confirmed Bookings</p>
                <p className="text-xl font-bold text-gray-900">{stats.confirmed_bookings}</p>
              </div>
            </div>
            <Link
              href="/admin/bookings?status=confirmed"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cancelled */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-xl font-bold text-gray-900">{stats.cancelled_bookings}</p>
              </div>
            </div>
            <Link
              href="/admin/bookings?status=cancelled"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
              <Link
                href="/admin/bookings"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6">
              {recentBookings.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No bookings yet</p>
              ) : (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <Link
                      key={booking.id}
                      href={`/admin/bookings/${booking.id}`}
                      className="block p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{booking.customer_name}</p>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5">{booking.package_name}</p>
                          <p className="text-xs text-gray-400 mt-1">{booking.booking_number}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(booking.total_amount)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center justify-end gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.created_at}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
              <Link
                href="/admin/payments"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6">
              {recentPayments.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No payments yet</p>
              ) : (
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="p-4 border border-gray-100 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{payment.customer_name}</p>
                          <p className="text-sm text-gray-500 mt-0.5">{payment.booking_number}</p>
                          <p className="text-xs text-gray-400 mt-1">{payment.created_at}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(payment.amount)}
                          </p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium mt-1 inline-block ${getPaymentBadge(payment.payment_status)}`}>
                            {payment.payment_status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        {stats.pending_bookings > 0 && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800">System Notifications</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  {stats.pending_bookings} bookings are awaiting confirmation. {stats.pending_payments} payments are pending.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
