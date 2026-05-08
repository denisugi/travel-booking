import React from 'react';
import ReactDOM from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import '../css/app.css';

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.tsx');
    return pages[`./${name}.tsx`]();
  },
  setup({ el, App, props }) {
    ReactDOM.createRoot(el).render(
      <React.StrictMode>
        <App {...props} />
      </React.StrictMode>,
    );
  },
});
