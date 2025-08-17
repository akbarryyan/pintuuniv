"use client";

import { useState } from "react";
import { Save, RefreshCw, Plus, Trash2 } from "lucide-react";

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  maxLoginAttempts: number;
  ipWhitelist: string[];
}

interface SecuritySettingsProps {
  isLoading: boolean;
  onSave: () => void;
}

export default function SecuritySettings({
  isLoading,
  onSave,
}: SecuritySettingsProps) {
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    ipWhitelist: ["192.168.1.1", "10.0.0.1"],
  });

  const [newIpAddress, setNewIpAddress] = useState("");

  const addIpAddress = () => {
    if (newIpAddress && !security.ipWhitelist.includes(newIpAddress)) {
      setSecurity((prev) => ({
        ...prev,
        ipWhitelist: [...prev.ipWhitelist, newIpAddress],
      }));
      setNewIpAddress("");
    }
  };

  const removeIpAddress = (ip: string) => {
    setSecurity((prev) => ({
      ...prev,
      ipWhitelist: prev.ipWhitelist.filter((address) => address !== ip),
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Pengaturan Keamanan
        </h3>

        {/* Two Factor Auth */}
        <div className="p-4 bg-slate-50 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900">
                Two-Factor Authentication
              </h4>
              <p className="text-sm text-slate-600">
                Tambahan keamanan dengan verifikasi dua langkah
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={security.twoFactorAuth}
                onChange={(e) =>
                  setSecurity((prev) => ({
                    ...prev,
                    twoFactorAuth: e.target.checked,
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
            </label>
          </div>
        </div>

        {/* Security Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Session Timeout (menit)
            </label>
            <input
              type="number"
              value={security.sessionTimeout}
              onChange={(e) =>
                setSecurity((prev) => ({
                  ...prev,
                  sessionTimeout: parseInt(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password Expiry (hari)
            </label>
            <input
              type="number"
              value={security.passwordExpiry}
              onChange={(e) =>
                setSecurity((prev) => ({
                  ...prev,
                  passwordExpiry: parseInt(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Max Login Attempts
            </label>
            <input
              type="number"
              value={security.maxLoginAttempts}
              onChange={(e) =>
                setSecurity((prev) => ({
                  ...prev,
                  maxLoginAttempts: parseInt(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* IP Whitelist */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            IP Whitelist
          </label>
          <div className="space-y-2">
            {security.ipWhitelist.map((ip, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={ip}
                  disabled
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-100"
                />
                <button
                  onClick={() => removeIpAddress(ip)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newIpAddress}
                onChange={(e) => setNewIpAddress(e.target.value)}
                placeholder="192.168.1.1"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
              <button
                onClick={addIpAddress}
                className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
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
