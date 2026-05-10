import toast, { Toaster } from 'react-hot-toast';

interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
}

const toastLib = {
  success: (options: ToastOptions) => toast.success(options.title, { description: options.description, duration: options.duration }),
  error: (options: ToastOptions) => toast.error(options.title, { description: options.description, duration: options.duration }),
  warning: (options: ToastOptions) => toast(options.title, { icon: '⚠️', duration: options.duration }),
  info: (options: ToastOptions) => toast(options.title, { icon: 'ℹ️', duration: options.duration }),
};

export { toastLib as toast };
export { Toaster };
