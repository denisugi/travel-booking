import { toast as toastFn, Toaster as SonnerToaster } from 'sonner';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
}

const toast = {
  success: (options: ToastOptions) => toastFn.success(options.title, { description: options.description, duration: options.duration }),
  error: (options: ToastOptions) => toastFn.error(options.title, { description: options.description, duration: options.duration }),
  warning: (options: ToastOptions) => toastFn.warning(options.title, { description: options.description, duration: options.duration }),
  info: (options: ToastOptions) => toastFn.info(options.title, { description: options.description, duration: options.duration }),
  custom: (component: React.ReactNode) => toastFn.custom((t) => component as React.ReactElement),
};

export { toast };
export { SonnerToaster as Toaster };
