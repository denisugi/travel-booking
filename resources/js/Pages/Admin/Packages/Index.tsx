import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  X,
  Package
} from 'lucide-react';

interface TravelPackage {
  id: number;
  name: string;
  slug: string;
  destination: string;
  duration_days: number;
  duration_nights: number;
  price: number;
  discount_price: number | null;
  max_participants: number;
  featured: boolean;
  is_active: boolean;
  departure_date: string;
}

const mockPackages: TravelPackage[] = [
  {
    id: 1,
    name: 'Bali Paradise Trip',
    slug: 'bali-paradise-trip',
    destination: 'Bali, Indonesia',
    duration_days: 8,
    duration_nights: 7,
    price: 5500000,
    discount_price: 4800000,
    max_participants: 20,
    featured: true,
    is_active: true,
    departure_date: '2024-06-15',
  },
  {
    id: 2,
    name: 'Tokyo Adventure',
    slug: 'tokyo-adventure',
    destination: 'Tokyo, Japan',
    duration_days: 7,
    duration_nights: 6,
    price: 7800000,
    discount_price: null,
    max_participants: 15,
    featured: true,
    is_active: true,
    departure_date: '2024-07-20',
  },
  {
    id: 3,
    name: 'Paris Romance',
    slug: 'paris-romance',
    destination: 'Paris, France',
    duration_days: 8,
    duration_nights: 7,
    price: 12000000,
    discount_price: 10500000,
    max_participants: 10,
    featured: false,
    is_active: true,
    departure_date: '2024-08-10',
  },
  {
    id: 4,
    name: 'Swiss Alps Experience',
    slug: 'swiss-alps-experience',
    destination: 'Zurich, Switzerland',
    duration_days: 10,
    duration_nights: 9,
    price: 15000000,
    discount_price: null,
    max_participants: 12,
    featured: false,
    is_active: false,
    departure_date: '2024-09-05',
  },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const destinationOptions = [
  { value: '', label: 'All Destinations' },
  { value: 'bali', label: 'Bali' },
  { value: 'japan', label: 'Japan' },
  { value: 'france', label: 'France' },
  { value: 'switzerland', label: 'Switzerland' },
];

export default function PackagesIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<number | null>(null);
  const itemsPerPage = 10;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredPackages = mockPackages.filter((pkg) => {
    const matchesSearch = 
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === '' || 
      (statusFilter === 'active' && pkg.is_active) ||
      (statusFilter === 'inactive' && !pkg.is_active);
    
    const matchesDestination = 
      destinationFilter === '' || 
      pkg.destination.toLowerCase().includes(destinationFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesDestination;
  });

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    setPackageToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // In real app, call API to delete
    console.log('Deleting package:', packageToDelete);
    setShowDeleteModal(false);
    setPackageToDelete(null);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setDestinationFilter('');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || statusFilter || destinationFilter;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Travel Packages</h1>
            <p className="text-gray-600 mt-1">
              Manage your travel packages and tours
            </p>
          </div>
          <Link
            to="/admin/packages/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Package
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search packages by name or destination..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white min-w-[140px]"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={destinationFilter}
                onChange={(e) => {
                  setDestinationFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white min-w-[160px]"
              >
                {destinationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 text-gray-600 hover:text-gray-800 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Packages Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {paginatedPackages.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No packages found</h3>
              <p className="text-gray-500 mt-1">
                {hasActiveFilters
                  ? 'Try adjusting your search or filters'
                  : 'Create your first travel package'}
              </p>
              {hasActiveFilters ? (
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 mt-3"
                >
                  Clear filters
                </button>
              ) : (
                <Link
                  to="/admin/packages/create"
                  className="text-blue-600 hover:text-blue-700 mt-3 inline-block"
                >
                  Add package
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Package
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Destination
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Max Guests
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedPackages.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-200 border-2 border-dashed rounded-lg flex-shrink-0" />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-gray-900">{pkg.name}</p>
                                {pkg.featured && (
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">{pkg.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900 flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {pkg.destination}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900 flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {pkg.duration_days}D/{pkg.duration_nights}N
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {pkg.discount_price ? (
                            <div>
                              <p className="font-medium text-gray-900">
                                {formatCurrency(pkg.discount_price)}
                              </p>
                              <p className="text-xs text-gray-400 line-through">
                                {formatCurrency(pkg.price)}
                              </p>
                            </div>
                          ) : (
                            <p className="font-medium text-gray-900">
                              {formatCurrency(pkg.price)}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{pkg.max_participants}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            pkg.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {pkg.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/packages/${pkg.slug}`}
                              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              to={`/admin/packages/${pkg.id}/edit`}
                              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(pkg.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, filteredPackages.length)} of{' '}
                    {filteredPackages.length} packages
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Package</h3>
              <p className="text-gray-500 mt-2">
                Are you sure you want to delete this package? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
