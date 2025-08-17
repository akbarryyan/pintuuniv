"use client";

import { User, Bell, Shield, Database } from "lucide-react";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface SettingsNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function SettingsNavigation({
  activeSection,
  setActiveSection,
}: SettingsNavigationProps) {
  const settingsSections: SettingsSection[] = [
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
        <nav className="space-y-2">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg transition-all duration-200 ${
                activeSection === section.id
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg ${
                  activeSection === section.id
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
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
