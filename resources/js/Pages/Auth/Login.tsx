import { FormEventHandler, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Label } from '@/Components/ui/Label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/ui/Card';

interface Props {
  canResetPassword?: boolean;
}

export default function Login({ canResetPassword = true }: Props) {
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    clearErrors();
    post(route('login.store'), {
      onError: (errors) => {
        if (errors.csrf_token || errors._token) {
          toast.error('Sesi telah kedaluwarsa. Mohon refresh halaman dan coba lagi.', {
            description: 'Token keamanan tidak valid.',
            duration: 5000,
          });
        } else if (errors.email || errors.password) {
          // Validation errors already shown inline, but show a toast too
          const msg = errors.email || errors.password;
          toast.error('Login gagal', { description: msg });
        } else {
          toast.error('Login gagal', {
            description: 'Terjadi kesalahan. Silakan coba lagi.',
            duration: 4000,
          });
        }
      },
      onFinish: () => setData('password', ''),
    });
  };

  return (
    <>
      <Head title="Masuk — Wanderlust Travel" />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo + Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold text-blue-600">
                Wanderlust Travel
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Selamat datang kembali
            </h1>
            <p className="text-gray-600 mt-1">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Masuk</CardTitle>
              <CardDescription>
                Gunakan kredensial admin untuk akses dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      placeholder="admin@travelbooking.com"
                      autoComplete="email"
                      autoFocus
                      className="pl-10"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                      placeholder="Masukkan password"
                      autoComplete="current-password"
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                {/* Remember me + Forgot password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.remember}
                      onChange={(e) => setData('remember', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-600">Ingat saya</span>
                  </label>
                  {canResetPassword && (
                    <Link
                      href="/forgot-password"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Lupa password?
                    </Link>
                  )}
                </div>

                {/* Submit button */}
                <Button type="submit" disabled={processing} className="w-full">
                  {processing ? 'Memproses...' : 'Masuk'}
                </Button>
              </form>

              {/* Sign up link */}
              <div className="mt-6 text-center text-sm text-gray-600">
                Belum punya akun?{' '}
                <Link
                  href="/register"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Daftar sekarang
                </Link>
              </div>

              {/* Demo credentials */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 text-center mb-2">
                  Akun Admin Demo:
                </p>
                <p className="text-xs text-gray-600 text-center font-mono">
                  admin@travelbooking.com / password
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}