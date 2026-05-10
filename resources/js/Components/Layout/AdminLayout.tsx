import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  Package,
  Users,
  Calendar,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown
} from 'lucide-react';

interface SiteSettings {
  site_name?: string;
}

interface AuthUser {
  id: number;
  name: string;
  email: string;
}

interface PageProps {
  auth?: {
    user: AuthUser;
  };
  siteSettings?: SiteSettings;
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { auth, siteSettings } = usePage<{ props: PageProps }>().props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const siteName = siteSettings?.site_name || 'Travel Booking';

  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Packages', href: '/admin/packages', icon: Package },
    { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-emerald-600 p-2 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/admin" className="text-xl font-bold text-emerald-600">
              {siteName}
            </Link>
            <span className="hidden lg:inline text-sm text-gray-500 border-l border-gray-300 pl-4">
              Admin Panel
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {auth?.user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 text-gray-700 hover:text-emerald-600"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-medium">
                    {auth.user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline font-medium">{auth.user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                    <div className="px-4 py-2 text-sm text-gray-500">
                      {auth.user.email}
                    </div>
                    <hr className="my-1" />
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      View Site
                    </Link>
                    <Link
                      href="/logout"
                      method="post"
                      as="button"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-emerald-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-white shadow-lg z-20 transform transition-transform duration-200 lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } w-64`}
        >
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;