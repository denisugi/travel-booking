import { Link } from 'react-router-dom';
import { 
  Calendar, 
  CreditCard, 
  MapPin, 
  TrendingUp, 
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Booking {
  id: number;
  booking_number: string;
  travel_package: {
    name: string;
    destination: string;
  };
  status: string;
  travel_date: string;
  total_amount: number;
  payment_status: string;
}

interface RecentActivity {
  id: number;
  type: 'booking' | 'payment' | 'profile';
  description: string;
  timestamp: string;
}

export default function UserDashboard() {
  // Mock data - replace with actual API data via props
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    member_since: 'January 2024',
  };

  const stats = {
    totalBookings: 5,
    upcomingTrips: 2,
    totalSpent: 12500000,
    loyaltyPoints: 1250,
  };

  const recentBookings: Booking[] = [
    {
      id: 1,
      booking_number: 'BK-ABC123-20240501',
      travel_package: {
        name: 'Bali Paradise Trip',
        destination: 'Bali, Indonesia',
      },
      status: 'confirmed',
      travel_date: '2024-06-15',
      total_amount: 5500000,
      payment_status: 'paid',
    },
    {
      id: 2,
      booking_number: 'BK-DEF456-20240502',
      travel_package: {
        name: 'Tokyo Adventure',
        destination: 'Tokyo, Japan',
      },
      status: 'pending',
      travel_date: '2024-07-20',
      total_amount: 7800000,
      payment_status: 'pending',
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      type: 'booking',
      description: 'Booking BK-ABC123 confirmed for Bali Paradise Trip',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'payment',
      description: 'Payment of Rp 5,500,000 received',
      timestamp: '2 hours ago',
    },
    {
      id: 3,
      type: 'profile',
      description: 'Profile information updated',
      timestamp: '1 day ago',
    },
  ];

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your travel plans
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalBookings}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Trips</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.upcomingTrips}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(stats.totalSpent)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Loyalty Points</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.loyaltyPoints}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
                <Link 
                  to="/user/bookings" 
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentBookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No bookings yet</p>
                  <Link 
                    to="/packages" 
                    className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
                  >
                    Browse travel packages
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <Link
                      key={booking.id}
                      to={`/user/bookings/${booking.id}`}
                      className="block p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">
                              {booking.travel_package.name}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {booking.travel_package.destination}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(booking.travel_date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {booking.booking_number}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(booking.total_amount)}
                          </p>
                          <p className={`text-sm mt-1 flex items-center justify-end gap-1 ${
                            booking.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {booking.payment_status === 'paid' ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <AlertCircle className="w-4 h-4" />
                            )}
                            {booking.payment_status === 'paid' ? 'Paid' : 'Pending'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              {recentActivities.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No recent activity</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'booking' ? 'bg-blue-500' :
                        activity.type === 'payment' ? 'bg-green-500' : 'bg-purple-500'
                      }`} />
                      <div>
                        <p className="text-sm text-gray-700">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Ready for your next adventure?</h2>
              <p className="text-blue-100 mt-1">Explore our exclusive travel packages and book your dream vacation</p>
            </div>
            <Link
              to="/packages"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              Browse Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
