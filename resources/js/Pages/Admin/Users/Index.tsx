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
  Users,
  UserCheck,
  UserX,
  Mail,
  Phone,
  X,
  Shield
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  is_active: boolean;
  email_verified: boolean;
  created_at: string;
  bookings_count: number;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+6281234567890',
    role: 'customer',
    is_active: true,
    email_verified: true,
    created_at: '2024-01-15',
    bookings_count: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+6281234567891',
    role: 'customer',
    is_active: true,
    email_verified: true,
    created_at: '2024-02-01',
    bookings_count: 3,
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    phone: '+6281234567892',
    role: 'customer',
    is_active: false,
    email_verified: true,
    created_at: '2024-02-10',
    bookings_count: 1,
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    phone: '+6281234567893',
    role: 'customer',
    is_active: true,
    email_verified: false,
    created_at: '2024-03-05',
    bookings_count: 2,
  },
  {
    id: 5,
    name: 'Admin User',
    email: 'admin@travelbooking.com',
    phone: '+6281234567894',
    role: 'admin',
    is_active: true,
    email_verified: true,
    created_at: '2024-01-01',
    bookings_count: 0,
  },
];

const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'admin', label: 'Admin' },
  { value: 'customer', label: 'Customer' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export default function UsersIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const itemsPerPage = 10;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    
    const matchesStatus = 
      statusFilter === '' || 
      (statusFilter === 'active' && user.is_active) ||
      (statusFilter === 'inactive' && !user.is_active);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleting user:', userToDelete);
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setRoleFilter('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || roleFilter || statusFilter;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage system users and customers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-xl font-bold text-gray-900">{mockUsers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-xl font-bold text-gray-900">
                  {mockUsers.filter(u => u.is_active).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                <UserX className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Inactive</p>
                <p className="text-xl font-bold text-gray-900">
                  {mockUsers.filter(u => !u.is_active).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-xl font-bold text-gray-900">
                  {mockUsers.filter(u => u.role === 'admin').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search by name, email, or phone..."
                value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white min-w-[140px]">
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="pl-4 pr-8 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white min-w-[140px]">
                {statusOptions.map((option) => (
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
          {paginatedUsers.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No users found</h3>
              <p className="text-gray-500 mt-1">{hasActiveFilters ? 'Try adjusting your filters' : 'No users yet'}</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Bookings</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-500">
                                {user.email_verified ? (
                                  <span className="text-green-600 flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> Verified
                                  </span>
                                ) : (
                                  <span className="text-yellow-600 flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> Unverified
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{user.email}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" /> {user.phone}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            user.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/admin/users/${user.id}/bookings`} className="text-blue-600 hover:text-blue-700">
                            {user.bookings_count} bookings
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{formatDate(user.created_at)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(user.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
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
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
              <p className="text-gray-500 mt-2">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
