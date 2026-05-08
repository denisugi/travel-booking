import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  FileText,
  Eye as EyeIcon,
  Calendar,
  User,
  TrendingUp,
  Download,
  BarChart3,
  PieChart,
  Calendar as CalendarIcon,
  DollarSign
} from 'lucide-react';

export default function ReportsIndex() {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('overview');

  const stats = [
    { label: 'Total Revenue', value: 'Rp 456,750,000', change: '+12.5%', icon: DollarSign, color: 'green' },
    { label: 'Total Bookings', value: '142', change: '+8.2%', icon: CalendarIcon, color: 'blue' },
    { label: 'Average Order', value: 'Rp 3,216,549', change: '+4.3%', icon: BarChart3, color: 'purple' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.5%', icon: TrendingUp, color: 'orange' },
  ];

  const topPackages = [
    { name: 'Bali Paradise Trip', bookings: 45, revenue: 'Rp 247,500,000' },
    { name: 'Tokyo Adventure', bookings: 32, revenue: 'Rp 249,600,000' },
    { name: 'Paris Romance', bookings: 28, revenue: 'Rp 336,000,000' },
    { name: 'Swiss Alps Experience', bookings: 22, revenue: 'Rp 330,000,000' },
    { name: 'Barcelona Beach Getaway', bookings: 15, revenue: 'Rp 112,500,000' },
  ];

  const bookingTrends = [
    { month: 'Jan', bookings: 89 },
    { month: 'Feb', bookings: 102 },
    { month: 'Mar', bookings: 115 },
    { month: 'Apr', bookings: 98 },
    { month: 'May', bookings: 124 },
    { month: 'Jun', bookings: 142 },
  ];

  const paymentMethods = [
    { method: 'Bank Transfer', count: 78, percentage: 55 },
    { method: 'Credit Card', count: 35, percentage: 25 },
    { method: 'E-Wallet', count: 29, percentage: 20 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Track your business performance</p>
          </div>
          <div className="flex items-center gap-3">
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center text-${stat.color}-600`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Report Type Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="border-b border-gray-100">
            <div className="flex">
              {['overview', 'bookings', 'revenue', 'customers'].map((type) => (
                <button key={type} onClick={() => setReportType(type)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors capitalize ${
                    reportType === type
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Trends Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Trends</h3>
            <div className="h-64 flex items-end justify-between gap-4">
              {bookingTrends.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-blue-100 rounded-t-lg hover:bg-blue-200 transition-colors relative group" 
                    style={{ height: `${(item.bookings / 150) * 100}%`, minHeight: '20px' }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.bookings}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-4">
              {paymentMethods.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.method}</span>
                    <span className="text-sm text-gray-500">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <PieChart className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Most popular: Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Packages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Packages</h3>
            <Link to="/admin/packages" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Package</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Bookings</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Performance</th>
                </tr>
              </thead>
              <tbody>
                {topPackages.map((pkg, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 border-2 border-dashed rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-900">{pkg.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{pkg.bookings}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{pkg.revenue}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                          <div className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${(pkg.bookings / 50) * 100}%` }} />
                        </div>
                        <span className="text-sm text-gray-500">{Math.round((pkg.bookings / 50) * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
            <div className="space-y-4">
              {[
                { id: 'BK-ABC123', customer: 'John Doe', package: 'Bali Paradise Trip', amount: 'Rp 5,500,000', time: '5 min ago' },
                { id: 'BK-DEF456', customer: 'Jane Smith', package: 'Tokyo Adventure', amount: 'Rp 7,800,000', time: '12 min ago' },
                { id: 'BK-GHI789', customer: 'Robert Johnson', package: 'Paris Romance', amount: 'Rp 12,000,000', time: '1 hour ago' },
                { id: 'BK-JKL012', customer: 'Emily Brown', package: 'Swiss Alps Experience', amount: 'Rp 15,000,000', time: '2 hours ago' },
              ].map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{booking.customer}</p>
                    <p className="text-sm text-gray-500">{booking.package}</p>
                    <p className="text-xs text-gray-400 mt-1">{booking.id} • {booking.time}</p>
                  </div>
                  <span className="font-medium text-gray-900">{booking.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Destinations</h3>
            <div className="space-y-3">
              {[
                { destination: 'Bali, Indonesia', count: 45, percentage: 32 },
                { destination: 'Tokyo, Japan', count: 32, percentage: 23 },
                { destination: 'Paris, France', count: 28, percentage: 20 },
                { destination: 'Swiss Alps, Switzerland', count: 22, percentage: 15 },
                { destination: 'Barcelona, Spain', count: 15, percentage: 10 },
              ].map((dest, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{dest.destination}</span>
                    <span className="text-sm text-gray-500">{dest.count} bookings</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${dest.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
