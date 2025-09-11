'use client';

import { useState, useEffect } from 'react';
import { Globe, Image, Search, Phone, Mail, MapPin, Upload, Save, X } from 'lucide-react';

interface WebsiteSettingsProps {
  isLoading: boolean;
  onSave: () => void;
  activeTab?: string;
}

export default function WebsiteSettings({ isLoading, onSave, activeTab: propActiveTab }: WebsiteSettingsProps) {
  const [activeTab, setActiveTab] = useState(propActiveTab || 'general');
  
  // Update activeTab when propActiveTab changes
  useEffect(() => {
    if (propActiveTab) {
      const tabMap: { [key: string]: string } = {
        'website-general': 'general',
        'website-logo': 'logo',
        'website-seo': 'seo',
        'website-contact': 'contact',
      };
      setActiveTab(tabMap[propActiveTab] || 'general');
    }
  }, [propActiveTab]);
  
  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'PintuUniv',
    siteDescription: 'Platform tryout UTBK terpercaya untuk persiapan masuk perguruan tinggi',
    siteUrl: 'https://pintuuniv.com',
    siteLanguage: 'id',
    timezone: 'Asia/Jakarta',
  });

  // Logo Settings State
  const [logoSettings, setLogoSettings] = useState({
    logo: null as File | null,
    logoPreview: '',
    favicon: null as File | null,
    faviconPreview: '',
    logoAlt: 'PintuUniv Logo',
  });

  // SEO Settings State
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: 'PintuUniv - Platform Tryout UTBK Terpercaya',
    metaDescription: 'Siapkan diri untuk UTBK dengan tryout berkualitas tinggi di PintuUniv. Platform terpercaya untuk persiapan masuk perguruan tinggi.',
    metaKeywords: 'tryout utbk, persiapan utbk, masuk perguruan tinggi, universitas, kuliah',
    ogTitle: 'PintuUniv - Platform Tryout UTBK Terpercaya',
    ogDescription: 'Siapkan diri untuk UTBK dengan tryout berkualitas tinggi di PintuUniv.',
    ogImage: null as File | null,
    ogImagePreview: '',
    twitterCard: 'summary_large_image',
  });

  // Contact Settings State
  const [contactSettings, setContactSettings] = useState({
    email: 'info@pintuuniv.com',
    phone: '+62 812-3456-7890',
    address: 'Jl. Pendidikan No. 123, Jakarta Selatan 12345',
    city: 'Jakarta',
    province: 'DKI Jakarta',
    postalCode: '12345',
    whatsapp: '+62 812-3456-7890',
    instagram: '@pintuuniv',
    twitter: '@pintuuniv',
    facebook: 'PintuUniv',
    youtube: 'PintuUniv Official',
  });

  const handleGeneralChange = (field: string, value: string) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (type: 'logo' | 'favicon', file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    const preview = URL.createObjectURL(file);
    
    if (type === 'logo') {
      setLogoSettings(prev => ({
        ...prev,
        logo: file,
        logoPreview: preview
      }));
    } else {
      setLogoSettings(prev => ({
        ...prev,
        favicon: file,
        faviconPreview: preview
      }));
    }
  };

  const handleSEOChange = (field: string, value: string) => {
    setSeoSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: string, value: string) => {
    setContactSettings(prev => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'logo', label: 'Logo & Branding', icon: Image },
    { id: 'seo', label: 'SEO Settings', icon: Search },
    { id: 'contact', label: 'Contact Info', icon: Phone },
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Website
            </label>
            <input
              type="text"
              value={generalSettings.siteName}
              onChange={(e) => handleGeneralChange('siteName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan nama website"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Website
            </label>
            <input
              type="url"
              value={generalSettings.siteUrl}
              onChange={(e) => handleGeneralChange('siteUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Website
            </label>
            <textarea
              value={generalSettings.siteDescription}
              onChange={(e) => handleGeneralChange('siteDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan deskripsi website"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bahasa
            </label>
            <select
              value={generalSettings.siteLanguage}
              onChange={(e) => handleGeneralChange('siteLanguage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={generalSettings.timezone}
              onChange={(e) => handleGeneralChange('timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
              <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
              <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogoSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo & Branding</h3>
        
        {/* Logo Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo Website
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleLogoUpload('logo', e.target.files[0])}
              className="hidden"
              id="logo-upload"
            />
            <label htmlFor="logo-upload" className="cursor-pointer flex flex-col items-center gap-2">
              <Image className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">
                {logoSettings.logo ? 'Ganti logo' : 'Upload logo website'}
              </span>
              <span className="text-xs text-gray-500">PNG, JPG, SVG (max 5MB)</span>
            </label>
          </div>
          {logoSettings.logoPreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <div className="border border-gray-200 rounded-lg p-2 max-w-xs">
                <img
                  src={logoSettings.logoPreview}
                  alt="Logo Preview"
                  className="w-full h-auto max-h-20 object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Favicon Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Favicon
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleLogoUpload('favicon', e.target.files[0])}
              className="hidden"
              id="favicon-upload"
            />
            <label htmlFor="favicon-upload" className="cursor-pointer flex flex-col items-center gap-2">
              <Image className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">
                {logoSettings.favicon ? 'Ganti favicon' : 'Upload favicon'}
              </span>
              <span className="text-xs text-gray-500">ICO, PNG (16x16, 32x32)</span>
            </label>
          </div>
          {logoSettings.faviconPreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <div className="border border-gray-200 rounded-lg p-2 max-w-xs">
                <img
                  src={logoSettings.faviconPreview}
                  alt="Favicon Preview"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alt Text Logo
          </label>
          <input
            type="text"
            value={logoSettings.logoAlt}
            onChange={(e) => setLogoSettings(prev => ({ ...prev, logoAlt: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Deskripsi logo untuk accessibility"
          />
        </div>
      </div>
    </div>
  );

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              value={seoSettings.metaTitle}
              onChange={(e) => handleSEOChange('metaTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Judul untuk SEO (max 60 karakter)"
              maxLength={60}
            />
            <p className="text-xs text-gray-500 mt-1">
              {seoSettings.metaTitle.length}/60 karakter
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              value={seoSettings.metaDescription}
              onChange={(e) => handleSEOChange('metaDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Deskripsi untuk SEO (max 160 karakter)"
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1">
              {seoSettings.metaDescription.length}/160 karakter
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Keywords
            </label>
            <input
              type="text"
              value={seoSettings.metaKeywords}
              onChange={(e) => handleSEOChange('metaKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Kata kunci dipisahkan koma"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Open Graph Title
            </label>
            <input
              type="text"
              value={seoSettings.ogTitle}
              onChange={(e) => handleSEOChange('ogTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Judul untuk social media sharing"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Open Graph Description
            </label>
            <textarea
              value={seoSettings.ogDescription}
              onChange={(e) => handleSEOChange('ogDescription', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Deskripsi untuk social media sharing"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                value={contactSettings.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="info@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="tel"
                value={contactSettings.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+62 812-3456-7890"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <textarea
                value={contactSettings.address}
                onChange={(e) => handleContactChange('address', e.target.value)}
                rows={2}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Alamat lengkap"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kota
            </label>
            <input
              type="text"
              value={contactSettings.city}
              onChange={(e) => handleContactChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Jakarta"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Provinsi
            </label>
            <input
              type="text"
              value={contactSettings.province}
              onChange={(e) => handleContactChange('province', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="DKI Jakarta"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kode Pos
            </label>
            <input
              type="text"
              value={contactSettings.postalCode}
              onChange={(e) => handleContactChange('postalCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="12345"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp
            </label>
            <input
              type="tel"
              value={contactSettings.whatsapp}
              onChange={(e) => handleContactChange('whatsapp', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+62 812-3456-7890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram
            </label>
            <input
              type="text"
              value={contactSettings.instagram}
              onChange={(e) => handleContactChange('instagram', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="@username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter
            </label>
            <input
              type="text"
              value={contactSettings.twitter}
              onChange={(e) => handleContactChange('twitter', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="@username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook
            </label>
            <input
              type="text"
              value={contactSettings.facebook}
              onChange={(e) => handleContactChange('facebook', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Page Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube
            </label>
            <input
              type="text"
              value={contactSettings.youtube}
              onChange={(e) => handleContactChange('youtube', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Channel Name"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'logo':
        return renderLogoSettings();
      case 'seo':
        return renderSEOSettings();
      case 'contact':
        return renderContactSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={onSave}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />
          {isLoading ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </div>
    </div>
  );
}
