import { ReactNode } from 'react';

interface BlankLayoutProps {
  children: ReactNode;
}

export default function BlankLayout({ children }: BlankLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center p-4">
      {children}
    </div>
  );
}