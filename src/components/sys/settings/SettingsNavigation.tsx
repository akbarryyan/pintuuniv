"use client";

import { useState } from "react";
import { User, Bell, Shield, Database, Globe, Image, Search, Phone, Mail, MapPin, ChevronDown, ChevronRight } from "lucide-react";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: SettingsSection[];
}

interface SettingsNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function SettingsNavigation({
  activeSection,
  setActiveSection,
}: SettingsNavigationProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['website']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const settingsSections: SettingsSection[] = [
    {
      id: "website",
      title: "Website Settings",
      description: "Konfigurasi website dan branding",
      icon: <Globe className="w-5 h-5" />,
      children: [
        {
          id: "website-general",
          title: "General",
          description: "Nama website, deskripsi, dan informasi dasar",
          icon: <Globe className="w-4 h-4" />,
        },
        {
          id: "website-logo",
          title: "Logo & Branding",
          description: "Logo website, favicon, dan identitas visual",
          icon: <Image className="w-4 h-4" />,
        },
        {
          id: "website-seo",
          title: "SEO Settings",
          description: "Meta tags, keywords, dan optimasi SEO",
          icon: <Search className="w-4 h-4" />,
        },
        {
          id: "website-contact",
          title: "Contact Information",
          description: "Informasi kontak dan alamat",
          icon: <Phone className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "profile",
      title: "Profile",
      description: "Kelola informasi profil dan password",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Pengaturan notifikasi dan alert",
      icon: <Bell className="w-5 h-5" />,
    },
    {
      id: "security",
      title: "Security",
      description: "Pengaturan keamanan dan akses",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: "system",
      title: "System",
      description: "Pengaturan sistem dan maintenance",
      icon: <Database className="w-5 h-5" />,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Pengaturan
        </h2>
        <nav className="space-y-1">
          {settingsSections.map((section) => (
            <div key={section.id}>
              {/* Parent Section */}
              <button
                onClick={() => {
                  if (section.children) {
                    toggleSection(section.id);
                  } else {
                    setActiveSection(section.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg transition-all duration-200 ${
                  activeSection === section.id || (section.children && section.children.some(child => activeSection === child.id))
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-1.5 rounded-lg ${
                      activeSection === section.id || (section.children && section.children.some(child => activeSection === child.id))
                        ? "bg-slate-200 text-slate-700"
                        : "text-slate-500"
                    }`}
                  >
                    {section.icon}
                  </div>
                  <div>
                    <div className="font-medium">{section.title}</div>
                    <div className="text-xs text-slate-500 hidden lg:block">
                      {section.description}
                    </div>
                  </div>
                </div>
                {section.children && (
                  <div className="text-slate-400">
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                )}
              </button>

              {/* Children Sections */}
              {section.children && expandedSections.includes(section.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {section.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setActiveSection(child.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-all duration-200 ${
                        activeSection === child.id
                          ? "bg-blue-50 text-blue-700 border-l-2 border-blue-500"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <div
                        className={`p-1 rounded-lg ${
                          activeSection === child.id
                            ? "bg-blue-100 text-blue-600"
                            : "text-slate-400"
                        }`}
                      >
                        {child.icon}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{child.title}</div>
                        <div className="text-xs text-slate-500 hidden lg:block">
                          {child.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
