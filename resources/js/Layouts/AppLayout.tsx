import { Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AppLayout = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Bookings', href: '/bookings' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="text-xl font-bold">
                TravelBooking
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'text-sm transition-colors hover:text-foreground',
                      location.pathname === item.href
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm text-muted-foreground hover:text-foreground">
                Notifications
              </button>
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                U
              </div>
              <button className="text-sm text-muted-foreground hover:text-foreground">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 py-3 overflow-x-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm whitespace-nowrap transition-colors',
                  location.pathname === item.href
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;