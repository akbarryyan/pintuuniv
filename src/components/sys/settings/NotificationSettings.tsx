"use client";

import { useState } from "react";
import { Save, RefreshCw } from "lucide-react";

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
  systemAlerts: boolean;
  userRegistrations: boolean;
  paymentAlerts: boolean;
}

interface NotificationSettingsProps {
  isLoading: boolean;
  onSave: () => void;
}

export default function NotificationSettings({
  isLoading,
  onSave,
}: NotificationSettingsProps) {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    systemAlerts: true,
    userRegistrations: false,
    paymentAlerts: true,
  });

  const notificationLabels = {
    emailNotifications: {
      title: "Email Notifications",
      desc: "Terima notifikasi melalui email",
    },
    pushNotifications: {
      title: "Push Notifications",
      desc: "Terima notifikasi push di browser",
    },
    weeklyReports: {
      title: "Weekly Reports",
      desc: "Laporan mingguan aktivitas sistem",
    },
    systemAlerts: {
      title: "System Alerts",
      desc: "Alert untuk masalah sistem",
    },
    userRegistrations: {
      title: "User Registrations",
      desc: "Notifikasi pendaftaran user baru",
    },
    paymentAlerts: {
      title: "Payment Alerts",
      desc: "Alert untuk transaksi pembayaran",
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Pengaturan Notifikasi
        </h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-slate-900">
                  {notificationLabels[key as keyof NotificationSettings].title}
                </h4>
                <p className="text-sm text-slate-600">
                  {notificationLabels[key as keyof NotificationSettings].desc}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setNotifications((prev) => ({
                      ...prev,
                      [key]: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isLoading ? "Menyimpan..." : "Simpan Perubahan"}</span>
        </button>
      </div>
    </div>
  );
}
