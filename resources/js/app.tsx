import React from 'react';
import ReactDOM from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { route } from 'ziggy-js';
import '../css/app.css';

declare global {
  interface Window {
    route: typeof route;
    Ziggy: {
      routes: Record<string, any>;
      url: string;
    };
  }
}

// Initialize Ziggy route helper from server-provided config
if (window.Ziggy) {
  window.route = route.bind(null, window.Ziggy);
}

createInertiaApp({
  resolve: async (name) => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
    return pages[`./Pages/${name}.tsx`];
  },
  setup({ el, App, props }) {
    // Set axios default CSRF token from meta tag (fixes 419 Page Expired on form POSTs)
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken && typeof window !== 'undefined') {
      (window as any).axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    }

    const root = ReactDOM.createRoot(el);
    root.render(<App {...props} />);
  },
});