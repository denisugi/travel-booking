import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Public Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold">
              TravelBooking
            </a>
            <div className="flex items-center gap-6">
              <a href="/packages" className="hover:text-primary">Packages</a>
              <a href="/blog" className="hover:text-primary">Blog</a>
              <a href="/login" className="text-sm text-muted-foreground hover:text-foreground">Login</a>
              <a href="/register" className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                Sign Up
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TravelBooking. All rights reserved.
          </div>
        </div>
      </footer>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default PublicLayout;
