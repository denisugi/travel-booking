import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Camera, 
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Shield
} from 'lucide-react';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  created_at: string;
}

const mockUser: UserProfile = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+6281234567890',
  avatar: null,
  created_at: '2024-01-15',
};

export default function Profile() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateProfile = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!passwordData.current_password) {
      newErrors.current_password = 'Current password is required';
    }
    
    if (!passwordData.new_password) {
      newErrors.new_password = 'New password is required';
    } else if (passwordData.new_password.length < 8) {
      newErrors.new_password = 'Password must be at least 8 characters';
    }
    
    if (!passwordData.confirm_password) {
      newErrors.confirm_password = 'Please confirm your password';
    } else if (passwordData.new_password !== passwordData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfile()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setUser({ ...user, ...formData });
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
      setIsChangingPassword(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to change password. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
            <CheckCircle2 className="w-5 h-5" />
            Changes saved successfully!
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
              )}
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">Member since {new Date(user.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
              <div className="flex items-center gap-2 mt-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Verified Account</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Edit
              </button>
            )}
          </div>

          <form onSubmit={handleProfileSubmit}>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none transition-colors ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    } ${!isEditing && 'bg-gray-50 text-gray-500'}`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none transition-colors ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    } ${!isEditing && 'bg-gray-50 text-gray-500'}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none transition-colors ${
                      errors.phone
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    } ${!isEditing && 'bg-gray-50 text-gray-500'}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ name: user.name, email: user.email, phone: user.phone });
                    setErrors({});
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
            {!isChangingPassword && (
              <button
                onClick={() => setIsChangingPassword(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Change
              </button>
            )}
          </div>

          {isChangingPassword ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    name="current_password"
                    value={passwordData.current_password}
                    onChange={handlePasswordChange}
                    className={`w-full pl-10 pr-12 py-2.5 border rounded-lg outline-none transition-colors ${
                      errors.current_password
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.current_password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.current_password}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    name="new_password"
                    value={passwordData.new_password}
                    onChange={handlePasswordChange}
                    className={`w-full pl-10 pr-12 py-2.5 border rounded-lg outline-none transition-colors ${
                      errors.new_password
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.new_password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.new_password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    name="confirm_password"
                    value={passwordData.confirm_password}
                    onChange={handlePasswordChange}
                    className={`w-full pl-10 pr-12 py-2.5 border rounded-lg outline-none transition-colors ${
                      errors.confirm_password
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirm_password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirm_password}
                  </p>
                )}
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-red-700 text-sm">{errors.submit}</p>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
                    setErrors({});
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-gray-500 text-sm">
              Leave blank if you don't want to change your password
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
