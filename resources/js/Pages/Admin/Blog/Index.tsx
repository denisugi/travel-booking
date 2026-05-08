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
  User
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  status: 'published' | 'draft' | 'scheduled';
  is_featured: boolean;
  view_count: number;
  published_at: string | null;
  scheduled_at: string | null;
  created_at: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Best Places to Visit in Bali',
    slug: '10-best-places-to-visit-in-bali',
    excerpt: 'Discover the most breathtaking destinations in Bali, from ancient temples to pristine beaches.',
    category: 'Travel Guide',
    author: 'Admin User',
    status: 'published',
    is_featured: true,
    view_count: 1520,
    published_at: '2024-05-01',
    scheduled_at: null,
    created_at: '2024-04-28',
  },
  {
    id: 2,
    title: 'How to Plan Your First Trip to Japan',
    slug: 'how-to-plan-your-first-trip-to-japan',
    excerpt: 'A comprehensive guide for first-time visitors to Japan covering visas, transportation, and must-see attractions.',
    category: 'Travel Tips',
    author: 'Admin User',
    status: 'published',
    is_featured: true,
    view_count: 2340,
    published_at: '2024-04-25',
    scheduled_at: null,
    created_at: '2024-04-20',
  },
  {
    id: 3,
    title: 'Budget Travel: Europe on a Shoestring',
    slug: 'budget-travel-europe-on-a-shoestring',
    excerpt: 'Tips and tricks for exploring Europe without breaking the bank.',
    category: 'Budget Travel',
    author: 'Admin User',
    status: 'draft',
    is_featured: false,
    view_count: 0,
    published_at: null,
    scheduled_at: null,
    created_at: '2024-05-05',
  },
  {
    id: 4,
    title: 'Swiss Alps: A Winter Wonderland',
    slug: 'swiss-alps-winter-wonderland',
    excerpt: 'Experience the magic of Swiss Alps during winter season.',
    category: 'Destinations',
    author: 'Admin User',
    status: 'scheduled',
    is_featured: false,
    view_count: 0,
    published_at: null,
    scheduled_at: '2024-06-01',
    created_at: '2024-05-03',
  },
  {
    id: 5,
    title: 'Paris Romance: Perfect Couples Getaway',
    slug: 'paris-romance-perfect-couples-getaway',
    excerpt: 'The ultimate guide to a romantic trip to Paris for couples.',
    category: 'Romantic Travel',
    author: 'Admin User',
    status: 'published',
    is_featured: false,
    view_count: 890,
    published_at: '2024-04-15',
    scheduled_at: null,
    created_at: '2024-04-10',
  },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'scheduled', label: 'Scheduled' },
];

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'Travel Guide', label: 'Travel Guide' },
  { value: 'Travel Tips', label: 'Travel Tips' },
  { value: 'Budget Travel', label: 'Budget Travel' },
  { value: 'Destinations', label: 'Destinations' },
  { value: 'Romantic Travel', label: 'Romantic Travel' },
];

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const itemsPerPage = 10;

  const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredPosts = mockBlogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === '' || post.status === statusFilter;
    const matchesCategory = categoryFilter === '' || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    setPostToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleting post:', postToDelete);
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setCategoryFilter('');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || statusFilter || categoryFilter;

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-yellow-100 text-yellow-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
            <p className="text-gray-600 mt-1">Manage your blog content</p>
          </div>
          <Link to="/admin/blog/editor"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            Create Post
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-xl font-bold text-gray-900">{mockBlogPosts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <EyeIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-xl font-bold text-gray-900">
                  {mockBlogPosts.filter(p => p.status === 'published').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-xl font-bold text-gray-900">
                  {mockBlogPosts.filter(p => p.status === 'draft').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-xl font-bold text-gray-900">
                  {mockBlogPosts.filter(p => p.status === 'scheduled').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search by title, slug, or excerpt..."
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
              <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                className="pl-4 pr-8 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white min-w-[160px]">
                {categoryOptions.map((option) => (
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
          {paginatedPosts.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No blog posts found</h3>
              <p className="text-gray-500 mt-1">{hasActiveFilters ? 'Try adjusting your filters' : 'Create your first blog post'}</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Post</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Views</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">{post.title}</p>
                              {post.is_featured && (
                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">Featured</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{post.slug}</p>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{post.excerpt}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{post.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{post.author}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(post.status)}`}>
                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                          </span>
                          {post.status === 'scheduled' && post.scheduled_at && (
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(post.scheduled_at)}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{post.view_count.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{formatDate(post.published_at)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <a href={`/blog/${post.slug}`} target="_blank"
                              className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </a>
                            <Link to={`/admin/blog/editor/${post.id}`}
                              className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button onClick={() => handleDelete(post.id)}
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
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
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
              <h3 className="text-lg font-semibold text-gray-900">Delete Blog Post</h3>
              <p className="text-gray-500 mt-2">
                Are you sure you want to delete this post? This action cannot be undone.
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
