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
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  X
} from 'lucide-react';

interface BankAccount {
  id: number;
  bank_name: string;
  bank_logo: string | null;
  account_number: string;
  account_holder: string;
  account_type: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

const mockBankAccounts: BankAccount[] = [
  {
    id: 1,
    bank_name: 'Bank Central Asia (BCA)',
    bank_logo: null,
    account_number: '1234567890',
    account_holder: 'PT Travel Booking Indonesia',
    account_type: 'corporate',
    is_active: true,
    is_verified: true,
    created_at: '2024-01-15',
  },
  {
    id: 2,
    bank_name: 'Bank Mandiri',
    bank_logo: null,
    account_number: '1300087654321',
    account_holder: 'PT Travel Booking Indonesia',
    account_type: 'corporate',
    is_active: true,
    is_verified: true,
    created_at: '2024-01-15',
  },
  {
    id: 3,
    bank_name: 'Bank Negara Indonesia (BNI)',
    bank_logo: null,
    account_number: '0098765432',
    account_holder: 'PT Travel Booking Indonesia',
    account_type: 'corporate',
    is_active: true,
    is_verified: true,
    created_at: '2024-02-01',
  },
  {
    id: 4,
    bank_name: 'Bank Rakyat Indonesia (BRI)',
    bank_logo: null,
    account_number: '001201000123456',
    account_holder: 'PT Travel Booking Indonesia',
    account_type: 'corporate',
    is_active: false,
    is_verified: true,
    created_at: '2024-02-10',
  },
  {
    id: 5,
    bank_name: 'Bank Permata',
    bank_logo: null,
    account_number: '1234567890123',
    account_holder: 'PT Travel Booking Indonesia',
    account_type: 'corporate',
    is_active: true,
    is_verified: false,
    created_at: '2024-03-05',
  },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const verifyOptions = [
  { value: '', label: 'All' },
  { value: 'verified', label: 'Verified' },
  { value: 'unverified', label: 'Unverified' },
];

export default function BankAccountsIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [verifyFilter, setVerifyFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<number | null>(null);
  const itemsPerPage = 10;

  const filteredAccounts = mockBankAccounts.filter((account) => {
    const matchesSearch = 
      account.bank_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.account_number.includes(searchQuery) ||
      account.account_holder.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === '' || 
      (statusFilter === 'active' && account.is_active) ||
      (statusFilter === 'inactive' && !account.is_active);
    
    const matchesVerify = 
      verifyFilter === '' ||
      (verifyFilter === 'verified' && account.is_verified) ||
      (verifyFilter === 'unverified' && !account.is_verified);
    
    return matchesSearch && matchesStatus && matchesVerify;
  });

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    setAccountToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleting account:', accountToDelete);
    setShowDeleteModal(false);
    setAccountToDelete(null);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setVerifyFilter('');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || statusFilter || verifyFilter;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bank Accounts</h1>
            <p className="text-gray-600 mt-1">Manage payment bank accounts for customer transfers</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            Add Bank Account
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search by bank name, account number, or holder..."
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
              <select value={verifyFilter} onChange={(e) => { setVerifyFilter(e.target.value); setCurrentPage(1); }}
                className="pl-4 pr-8 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white min-w-[140px]">
                {verifyOptions.map((option) => (
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
          {paginatedAccounts.length === 0 ? (
            <div className="p-12 text-center">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No bank accounts found</h3>
              <p className="text-gray-500 mt-1">{hasActiveFilters ? 'Try adjusting your filters' : 'Add your first bank account'}</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Bank</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Account Number</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Account Holder</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Verification</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedAccounts.map((account) => (
                      <tr key={account.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 border-2 border-dashed rounded-lg flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-gray-400" />
                            </div>
                            <span className="font-medium text-gray-900">{account.bank_name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900 font-mono">{account.account_number}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{account.account_holder}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700 capitalize">{account.account_type}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            account.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {account.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {account.is_verified ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                              <CheckCircle2 className="w-3 h-3" /> Verified
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1 w-fit">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(account.id)}
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
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAccounts.length)} of {filteredAccounts.length} accounts
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
              <h3 className="text-lg font-semibold text-gray-900">Delete Bank Account</h3>
              <p className="text-gray-500 mt-2">
                Are you sure you want to delete this bank account? This action cannot be undone.
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
