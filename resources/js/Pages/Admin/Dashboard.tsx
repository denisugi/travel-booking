import { Link } from 'react-router-dom';
import { 
  Package, 
  Users, 
  CreditCard, 
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle
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
  total_amount: number;
  status: string;
  created_at: string;
}

interface RecentPayment {
  id: number;
  booking_number: string;
  customer_name: string;
  amount: number;
  payment_status: string;
  created_at: string;
}

const stats: StatCard[] = [
  {
    title: 'Total Packages',
    value: 24,
    change: 12,
    icon: <Package className="w-6 h-6" />,
    link: '/admin/packages',
  },
  {
    title: 'Total Users',
    value: 1250,
    change: 8,
    icon: <Users className="w-6 h-6" />,
    link: '/admin/users',
  },
  {
    title: 'Total Bookings',
    value: 486,
    change: 15,
    icon: <Calendar className="w-6 h-6" />,
    link: '/admin/bookings',
  },
  {
    title: 'Revenue (Month)',
    value: 'Rp 125.5M',
    change: 23,
    icon: <DollarSign className="w-6 h-6" />,
    link: '/admin/reports',
  },
];

const recentBookings: RecentBooking[] = [
  {
    id: 1,
    booking_number: 'BK-ABC123-20240501',
    customer_name: 'John Doe',
    package_name: 'Bali Paradise Trip',
    total_amount: 5500000,
    status: 'confirmed',
    created_at: '2024-05-01 10:30',
  },
  {
    id: 2,
    booking_number: 'BK-DEF456-20240502',
    customer_name: 'Jane Smith',
    package_name: 'Tokyo Adventure',
    total_amount: 7800000,
    status: 'pending',
    created_at: '2024-05-02 14:15',
  },
  {
    id: 3,
    booking_number: 'BK-GHI789-20240503',
    customer_name: 'Robert Johnson',
    package_name: 'Paris Romance',
    total_amount: 12000000,
    status: 'confirmed',
    created_at: '2024-05-03 09:45',
  },
  {
    id: 4,
    booking_number: 'BK-JKL012-20240503',
    customer_name: 'Emily Brown',
    package_name: 'Swiss Alps Experience',
    total_amount: 15000000,
    status: 'pending',
    created_at: '2024-05-03 16:20',
  },
];

const recentPayments: RecentPayment[] = [
  {
    id: 1,
    booking_number: 'BK-ABC123-20240501',
    customer_name: 'John Doe',
    amount: 5500000,
    payment_status: 'completed',
    created_at: '2024-05-01 10:35',
  },
  {
    id: 2,
    booking_number: 'BK-GHI789-20240503',
    customer_name: 'Robert Johnson',
    amount: 12000000,
    payment_status: 'completed',
    created_at: '2024-05-03 09:50',
  },
  {
    id: 3,
    booking_number: 'BK-MNO345-20240502',
    customer_name: 'Sarah Wilson',
    amount: 8500000,
    payment_status: 'pending',
    created_at: '2024-05-02 11:20',
  },
];

export default function AdminDashboard() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-purple-100 text-purple-800',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
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
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
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
                <p className="text-xl font-bold text-gray-900">12</p>
              </div>
            </div>
            <Link 
              to="/admin/bookings?status=pending"
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
                <p className="text-xl font-bold text-gray-900">8</p>
              </div>
            </div>
            <Link 
              to="/admin/payments?status=pending"
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
                <p className="text-sm text-gray-600">Confirmed Today</p>
                <p className="text-xl font-bold text-gray-900">5</p>
              </div>
            </div>
            <Link 
              to="/admin/bookings?status=confirmed"
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
                <p className="text-xl font-bold text-gray-900">2</p>
              </div>
            </div>
            <Link 
              to="/admin/bookings?status=cancelled"
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
                to="/admin/bookings" 
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <Link
                    key={booking.id}
                    to={`/admin/bookings/${booking.id}`}
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
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
              <Link 
                to="/admin/payments" 
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6">
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
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800">System Notifications</h3>
              <p className="text-yellow-700 text-sm mt-1">
                3 bookings are awaiting payment confirmation. 2 bank accounts need verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
