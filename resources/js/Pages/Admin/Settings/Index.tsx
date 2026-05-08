import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Save,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Bell,
  Shield,
  CreditCard,
  Palette,
  FileText,
  Image as ImageIcon,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

type TabKey = 'general' | 'company' | 'notifications' | 'security' | 'payment' | 'appearance';

export default function SettingsIndex() {
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [generalSettings, setGeneralSettings] = useState({
    site_name: 'Travel Booking',
    site_tagline: 'Your Dream Vacation Starts Here',
    site_url: 'https://travelbooking.com',
    support_email: 'support@travelbooking.com',
    contact_phone: '+62 21 1234 5678',
    maintenance_mode: false,
  });

  const [companySettings, setCompanySettings] = useState({
    company_name: 'PT Travel Booking Indonesia',
    company_address: 'Jl. Sudirman No. 123, Jakarta Pusat 10220',
    company_phone: '+62 21 1234 5678',
    company_email: 'info@travelbooking.com',
    company_website: 'https://travelbooking.com',
    tax_id: '01.234.567.8-123.000',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email_booking_confirmation: true,
    email_payment_confirmation: true,
    email_booking_reminder: true,
    email_promotions: false,
    whatsapp_notifications: true,
    push_notifications: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    two_factor_enabled: false,
    session_timeout: '60',
    password_min_length: '8',
    login_attempt_limit: '5',
    ip_whitelist_enabled: false,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    payment_gateway: 'midtrans',
    midtrans_client_key: 'SB-Mid-client-xxxxx',
    midtrans_server_key: 'SB-Mid-server-xxxxx',
    midtrans_environment: 'sandbox',
    tax_rate: '10',
    currency: 'IDR',
  });

  const tabs = [
    { key: 'general' as TabKey, label: 'General', icon: Globe },
    { key: 'company' as TabKey, label: 'Company', icon: Building2 },
    { key: 'notifications' as TabKey, label: 'Notifications', icon: Bell },
    { key: 'security' as TabKey, label: 'Security', icon: Shield },
    { key: 'payment' as TabKey, label: 'Payment', icon: CreditCard },
    { key: 'appearance' as TabKey, label: 'Appearance', icon: Palette },
  ];

  const handleSave = async () => {
    setIsSubmitting(true);
    setSaveMessage(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSaveMessage({ type: 'success', message: 'Settings saved successfully!' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage({ type: 'error', message: 'Failed to save settings. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input type="text" value={generalSettings.site_name} onChange={(e) => setGeneralSettings({ ...generalSettings, site_name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Tagline</label>
                <input type="text" value={generalSettings.site_tagline} onChange={(e) => setGeneralSettings({ ...generalSettings, site_tagline: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site URL</label>
                <input type="url" value={generalSettings.site_url} onChange={(e) => setGeneralSettings({ ...generalSettings, site_url: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                <input type="email" value={generalSettings.support_email} onChange={(e) => setGeneralSettings({ ...generalSettings, support_email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                <input type="tel" value={generalSettings.contact_phone} onChange={(e) => setGeneralSettings({ ...generalSettings, contact_phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={generalSettings.maintenance_mode} 
                  onChange={(e) => setGeneralSettings({ ...generalSettings, maintenance_mode: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300" />
                <span className="text-sm font-medium text-gray-700">Enable Maintenance Mode</span>
              </label>
            </div>
          </div>
        );

      case 'company':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" value={companySettings.company_name} onChange={(e) => setCompanySettings({ ...companySettings, company_name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID / NPWP</label>
                <input type="text" value={companySettings.tax_id} onChange={(e) => setCompanySettings({ ...companySettings, tax_id: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea value={companySettings.company_address} onChange={(e) => setCompanySettings({ ...companySettings, company_address: e.target.value })}
                  rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={companySettings.company_phone} onChange={(e) => setCompanySettings({ ...companySettings, company_phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={companySettings.company_email} onChange={(e) => setCompanySettings({ ...companySettings, company_email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input type="url" value={companySettings.company_website} onChange={(e) => setCompanySettings({ ...companySettings, company_website: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
            </div>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Email Notifications</h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Booking Confirmation</span>
                    <input type="checkbox" checked={notificationSettings.email_booking_confirmation}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, email_booking_confirmation: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Payment Confirmation</span>
                    <input type="checkbox" checked={notificationSettings.email_payment_confirmation}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, email_payment_confirmation: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Booking Reminders</span>
                    <input type="checkbox" checked={notificationSettings.email_booking_reminder}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, email_booking_reminder: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Promotions & Newsletter</span>
                    <input type="checkbox" checked={notificationSettings.email_promotions}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, email_promotions: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  </label>
                </div>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Other Notifications</h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">WhatsApp Notifications</span>
                    <input type="checkbox" checked={notificationSettings.whatsapp_notifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, whatsapp_notifications: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Push Notifications</span>
                    <input type="checkbox" checked={notificationSettings.push_notifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, push_notifications: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded border-gray-300" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Require 2FA for all admin users</p>
                </div>
                <input type="checkbox" checked={securitySettings.two_factor_enabled}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, two_factor_enabled: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300" />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                  <select value={securitySettings.session_timeout} onChange={(e) => setSecuritySettings({ ...securitySettings, session_timeout: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white">
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Password Length</label>
                  <select value={securitySettings.password_min_length} onChange={(e) => setSecuritySettings({ ...securitySettings, password_min_length: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white">
                    <option value="6">6 characters</option>
                    <option value="8">8 characters</option>
                    <option value="10">10 characters</option>
                    <option value="12">12 characters</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Login Attempt Limit</label>
                  <select value={securitySettings.login_attempt_limit} onChange={(e) => setSecuritySettings({ ...securitySettings, login_attempt_limit: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white">
                    <option value="3">3 attempts</option>
                    <option value="5">5 attempts</option>
                    <option value="10">10 attempts</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Settings</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Gateway</label>
                <select value={paymentSettings.payment_gateway} onChange={(e) => setPaymentSettings({ ...paymentSettings, payment_gateway: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white">
                  <option value="midtrans">Midtrans</option>
                  <option value="xendit">Xendit</option>
                  <option value="tripay">Tripay</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                <select value={paymentSettings.midtrans_environment} onChange={(e) => setPaymentSettings({ ...paymentSettings, midtrans_environment: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white">
                  <option value="sandbox">Sandbox / Testing</option>
                  <option value="production">Production / Live</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Midtrans Client Key</label>
                <input type="text" value={paymentSettings.midtrans_client_key} onChange={(e) => setPaymentSettings({ ...paymentSettings, midtrans_client_key: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Midtrans Server Key</label>
                <input type="password" value={paymentSettings.midtrans_server_key} onChange={(e) => setPaymentSettings({ ...paymentSettings, midtrans_server_key: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                <input type="number" value={paymentSettings.tax_rate} onChange={(e) => setPaymentSettings({ ...paymentSettings, tax_rate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select value={paymentSettings.currency} onChange={(e) => setPaymentSettings({ ...paymentSettings, currency: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white">
                  <option value="IDR">IDR - Indonesian Rupiah</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance Settings</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value="#3B82F6" className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer" />
                  <input type="text" value="#3B82F6" className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value="#10B981" className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer" />
                  <input type="text" value="#10B981" className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Favicon</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to upload favicon</p>
                  <p className="text-xs text-gray-400 mt-1">ICO, PNG up to 512KB</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your application settings</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-100 overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                {saveMessage && (
                  <div className={`flex items-center gap-2 ${saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {saveMessage.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="text-sm font-medium">{saveMessage.message}</span>
                  </div>
                )}
              </div>
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
