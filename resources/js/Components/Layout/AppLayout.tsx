import React from 'react';
import Navbar from './Navbar';
import { usePage } from '@inertiajs/react';

interface SiteSettings {
  site_name?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  social_facebook?: string;
  social_twitter?: string;
  social_instagram?: string;
  social_linkedin?: string;
}

interface PageProps {
  siteSettings?: SiteSettings;
}

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { siteSettings } = usePage<{ props: PageProps }>().props;

  const siteName = siteSettings?.site_name || 'Travel Booking';
  const contactEmail = siteSettings?.contact_email || 'info@travelbooking.com';
  const contactPhone = siteSettings?.contact_phone || '+62 21 1234 5678';
  const contactAddress = siteSettings?.contact_address || 'Jakarta, Indonesia';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{siteName}</h3>
              <p className="text-gray-400 text-sm">
                Your trusted partner for unforgettable travel experiences around the world.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/packages" className="hover:text-white">Packages</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/about" className="hover:text-white">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/terms" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{contactEmail}</li>
                <li>{contactPhone}</li>
                <li>{contactAddress}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2026 {siteName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;