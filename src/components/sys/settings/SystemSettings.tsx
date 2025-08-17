"use client";

import { useState } from "react";
import {
  Save,
  RefreshCw,
  Download,
  Upload,
  Monitor,
  Lock,
  Unlock,
} from "lucide-react";

interface SystemSettings {
  maintenanceMode: boolean;
  userRegistration: boolean;
  paymentGateway: boolean;
  debugMode: boolean;
  backupFrequency: string;
  maxFileSize: number;
}

interface SystemSettingsProps {
  isLoading: boolean;
  onSave: () => void;
}

export default function SystemSettings({
  isLoading,
  onSave,
}: SystemSettingsProps) {
  const [system, setSystem] = useState<SystemSettings>({
    maintenanceMode: false,
    userRegistration: true,
    paymentGateway: true,
    debugMode: false,
    backupFrequency: "daily",
    maxFileSize: 10,
  });

  const systemToggles = [
    {
      key: "maintenanceMode",
      label: "Maintenance Mode",
      desc: "Aktifkan mode maintenance untuk pemeliharaan sistem",
      icon: system.maintenanceMode ? (
        <Lock className="w-5 h-5 text-red-600" />
      ) : (
        <Unlock className="w-5 h-5 text-green-600" />
      ),
    },
    {
      key: "userRegistration",
      label: "User Registration",
      desc: "Izinkan pendaftaran user baru",
      icon: <Monitor className="w-5 h-5 text-slate-600" />,
    },
    {
      key: "paymentGateway",
      label: "Payment Gateway",
      desc: "Aktifkan sistem pembayaran",
      icon: <Monitor className="w-5 h-5 text-slate-600" />,
    },
    {
      key: "debugMode",
      label: "Debug Mode",
      desc: "Mode debug untuk development",
      icon: <Monitor className="w-5 h-5 text-slate-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Pengaturan Sistem
        </h3>

        {/* System Toggles */}
        <div className="space-y-4">
          {systemToggles.map(({ key, label, desc, icon }) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {icon}
                <div>
                  <h4 className="font-medium text-slate-900">{label}</h4>
                  <p className="text-sm text-slate-600">{desc}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={system[key as keyof SystemSettings] as boolean}
                  onChange={(e) =>
                    setSystem((prev) => ({ ...prev, [key]: e.target.checked }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>
          ))}
        </div>

        {/* Other Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Backup Frequency
            </label>
            <select
              value={system.backupFrequency}
              onChange={(e) =>
                setSystem((prev) => ({
                  ...prev,
                  backupFrequency: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Max File Size (MB)
            </label>
            <input
              type="number"
              value={system.maxFileSize}
              onChange={(e) =>
                setSystem((prev) => ({
                  ...prev,
                  maxFileSize: parseInt(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Backup Actions */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <h4 className="font-medium text-slate-900 mb-3">Backup & Restore</h4>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Create Backup</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Restore Backup</span>
            </button>
          </div>
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
