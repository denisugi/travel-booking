import { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
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
  Check,
  AlertCircle,
  Settings as SettingsIcon,
} from 'lucide-react';

interface SiteSetting {
  id: number;
  key: string;
  value: string;
  type: string;
  group: string;
  is_public: boolean;
}

interface GroupedSettings {
  [key: string]: {
    [key: string]: SiteSetting;
  };
}

interface PageProps {
  settings: SiteSetting[];
  groupedSettings: GroupedSettings;
}

type TabKey = 'general' | 'contact' | 'social' | 'seo';

export default function SettingsIndex() {
  const { groupedSettings } = usePage<{ props: PageProps }>().props;
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Initialize form state from grouped settings
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {};
    for (const group in groupedSettings) {
      initial[group] = {};
      for (const key in groupedSettings[group]) {
        initial[group][key] = groupedSettings[group][key]?.value || '';
      }
    }
    return initial;
  });

  const tabs = [
    { key: 'general' as TabKey, label: 'General', icon: Globe },
    { key: 'contact' as TabKey, label: 'Contact', icon: Phone },
    { key: 'social' as TabKey, label: 'Social Media', icon: Bell },
    { key: 'seo' as TabKey, label: 'SEO', icon: SettingsIcon },
  ];

  const handleInputChange = (group: string, key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    setSaveMessage(null);

    try {
      // Flatten all settings into a single object for submission
      const settingsFlat: Record<string, string> = {};
      for (const group in formData) {
        for (const key in formData[group]) {
          settingsFlat[key] = formData[group][key];
        }
      }

      router.put('/admin/settings', { settings: settingsFlat }, {
        onSuccess: () => {
          setSaveMessage({ type: 'success', message: 'Settings saved successfully!' });
          setTimeout(() => setSaveMessage(null), 3000);
        },
        onError: () => {
          setSaveMessage({ type: 'error', message: 'Failed to save settings. Please try again.' });
        },
        onFinish: () => {
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      setSaveMessage({ type: 'error', message: 'Failed to save settings. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const getFieldValue = (group: string, key: string): string => {
    return formData[group]?.[key] || '';
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
                <input
                  type="text"
                  value={getFieldValue('general', 'site_name')}
                  onChange={(e) => handleInputChange('general', 'site_name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Tagline</label>
                <input
                  type="text"
                  value={getFieldValue('general', 'site_tagline')}
                  onChange={(e) => handleInputChange('general', 'site_tagline', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site URL</label>
                <input
                  type="url"
                  value={getFieldValue('general', 'site_url')}
                  onChange={(e) => handleInputChange('general', 'site_url', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                <input
                  type="email"
                  value={getFieldValue('contact', 'support_email')}
                  onChange={(e) => handleInputChange('contact', 'support_email', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={getFieldValue('contact', 'contact_email')}
                  onChange={(e) => handleInputChange('contact', 'contact_email', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={getFieldValue('contact', 'contact_phone')}
                  onChange={(e) => handleInputChange('contact', 'contact_phone', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Address</label>
                <textarea
                  value={getFieldValue('contact', 'contact_address')}
                  onChange={(e) => handleInputChange('contact', 'contact_address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                <input
                  type="url"
                  value={getFieldValue('social', 'social_facebook')}
                  onChange={(e) => handleInputChange('social', 'social_facebook', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                <input
                  type="url"
                  value={getFieldValue('social', 'social_twitter')}
                  onChange={(e) => handleInputChange('social', 'social_twitter', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                <input
                  type="url"
                  value={getFieldValue('social', 'social_instagram')}
                  onChange={(e) => handleInputChange('social', 'social_instagram', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  type="url"
                  value={getFieldValue('social', 'social_linkedin')}
                  onChange={(e) => handleInputChange('social', 'social_linkedin', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  value={getFieldValue('seo', 'meta_description')}
                  onChange={(e) => handleInputChange('seo', 'meta_description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 resize-none"
                  placeholder="Enter meta description for search engines"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                <input
                  type="text"
                  value={getFieldValue('seo', 'meta_keywords')}
                  onChange={(e) => handleInputChange('seo', 'meta_keywords', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500"
                  placeholder="travel, vacation, tours, packages"
                />
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
          <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
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
                      ? 'border-emerald-600 text-emerald-600'
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
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50"
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