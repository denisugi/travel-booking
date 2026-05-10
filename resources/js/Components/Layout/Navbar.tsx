import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, User, LogOut } from 'lucide-react';

interface SiteSettings {
  site_name?: string;
  site_tagline?: string;
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

const Navbar: React.FC = () => {
  const { auth, siteSettings } = usePage<{ props: PageProps }>().props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const siteName = siteSettings?.site_name || 'Travel Booking';

  const navigationLinks = [
    { name: 'Packages', href: '/packages' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-emerald-600 hover:text-emerald-700"
            >
              {siteName}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center">
            {auth?.user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{auth.user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      My Bookings
                    </Link>
                    <hr className="my-1 border-gray-100" />
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
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-emerald-600 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {/* Navigation Links */}
            <div className="space-y-1 mb-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="pt-4 border-t border-gray-100">
              {auth?.user ? (
                <div className="space-y-1">
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Signed in as <span className="font-medium">{auth.user.name}</span>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/bookings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-emerald-600 font-medium hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;