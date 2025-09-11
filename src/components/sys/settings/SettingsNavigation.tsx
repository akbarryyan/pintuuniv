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
  const [isAnimating, setIsAnimating] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    setIsAnimating(sectionId);
    
    if (expandedSections.includes(sectionId)) {
      // Closing animation
      setExpandedSections(prev => prev.filter(id => id !== sectionId));
    } else {
      // Opening animation
      setExpandedSections(prev => [...prev, sectionId]);
    }
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(null);
    }, 300);
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
                disabled={isAnimating === section.id}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg transition-all duration-200 ${
                  activeSection === section.id || (section.children && section.children.some(child => activeSection === child.id))
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                } ${
                  isAnimating === section.id ? 'opacity-75 cursor-wait' : ''
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
                  <div className={`text-slate-400 transition-transform duration-300 ${
                    isAnimating === section.id ? 'opacity-50' : ''
                  }`}>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        expandedSections.includes(section.id) 
                          ? 'rotate-0' 
                          : '-rotate-90'
                      }`} 
                    />
                  </div>
                )}
              </button>

              {/* Children Sections */}
              {section.children && (
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedSections.includes(section.id) 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-6 mt-1 space-y-1 transform transition-transform duration-300 ease-in-out">
                    {section.children.map((child, index) => (
                      <div
                        key={child.id}
                        className={`transform transition-all duration-300 ease-out ${
                          expandedSections.includes(section.id)
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-2 opacity-0'
                        }`}
                        style={{
                          transitionDelay: expandedSections.includes(section.id) 
                            ? `${index * 50}ms` 
                            : '0ms'
                        }}
                      >
                        <button
                          onClick={() => setActiveSection(child.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-all duration-200 ${
                            activeSection === child.id
                              ? "bg-blue-50 text-blue-700 border-l-2 border-blue-500"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <div
                            className={`p-1 rounded-lg transition-colors duration-200 ${
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
