import React from 'react';
import ReactDOM from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { route } from 'ziggy-js';
import '../css/app.css';
import AppLayout from './Components/Layout/AppLayout';
import toast, { Toaster } from 'react-hot-toast';

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
    const page = pages[`./Pages/${name}.tsx`];
    console.log('[DEBUG] Resolving:', name, '→', page ? 'FOUND' : 'NOT FOUND', 'Available keys sample:', Object.keys(pages).slice(0, 5).join(', '));
    return page;
  },
  setup({ el, App, props }) {
    console.log('[DEBUG] Inertia setup called', { el: el.id || el, component: props.page?.component });
    const root = ReactDOM.createRoot(el);
    root.render(
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '8px',
              padding: '12px 16px',
            },
          }}
        />
        <App {...props} />
      </>
    );
  },
});