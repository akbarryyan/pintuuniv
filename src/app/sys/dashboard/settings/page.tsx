"use client";

import { useState } from "react";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Sidebar, TopHeader } from "@/components/sys";
import {
  SettingsNavigation,
  ProfileSettings,
  NotificationSettings,
  SecuritySettings,
  SystemSettings,
} from "@/components/sys/settings";
import { usePageTransition, useSmoothNavigation } from "@/lib/hooks";
import { SmoothTransition } from "@/components/ui/loading";

export default function AdminSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  // Use page transition and navigation hooks
  const { isLoading: pageLoading } = usePageTransition();
  const { isNavigating } = useSmoothNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveMessage({
        type: "success",
        message: "Pengaturan berhasil disimpan!",
      });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage({
        type: "error",
        message: "Gagal menyimpan pengaturan. Silakan coba lagi.",
      });
      setTimeout(() => setSaveMessage(null), 3000);
    }
    setIsLoading(false);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings isLoading={isLoading} onSave={handleSave} />;
      case "notifications":
        return (
          <NotificationSettings isLoading={isLoading} onSave={handleSave} />
        );
      case "security":
        return <SecuritySettings isLoading={isLoading} onSave={handleSave} />;
      case "system":
        return <SystemSettings isLoading={isLoading} onSave={handleSave} />;
      default:
        return <ProfileSettings isLoading={isLoading} onSave={handleSave} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem="settings"
        setActiveItem={() => {}}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle="Settings"
          pageDescription="Kelola pengaturan sistem dan preferensi admin"
        />

        {/* Save Message */}
        {saveMessage && (
          <div
            className={`mx-4 lg:mx-8 mt-4 p-4 rounded-lg flex items-center space-x-2 ${
              saveMessage.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : saveMessage.type === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}
          >
            {saveMessage.type === "success" && (
              <CheckCircle className="w-5 h-5" />
            )}
            {saveMessage.type === "error" && (
              <AlertTriangle className="w-5 h-5" />
            )}
            {saveMessage.type === "info" && <Info className="w-5 h-5" />}
            <span>{saveMessage.message}</span>
          </div>
        )}

        {/* Page Content */}
        <SmoothTransition isNavigating={isNavigating}>
          <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Settings Navigation */}
                <div className="lg:col-span-1">
                  <SettingsNavigation
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                  />
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="p-6">{renderActiveSection()}</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </SmoothTransition>
      </div>
    </div>
  );
}
