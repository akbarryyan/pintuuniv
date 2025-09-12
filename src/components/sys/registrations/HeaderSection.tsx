"use client";

import { Users, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface HeaderSectionProps {
  totalRegistrations: number;
  registeredRegistrations: number;
  waitingConfirmationRegistrations: number;
  approvedRegistrations: number;
  rejectedRegistrations: number;
}

export default function HeaderSection({
  totalRegistrations,
  registeredRegistrations,
  waitingConfirmationRegistrations,
  approvedRegistrations,
  rejectedRegistrations,
}: HeaderSectionProps) {
  return (
    <div className="mb-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">
                Total Registrasi
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {totalRegistrations.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Terdaftar</p>
              <p className="text-2xl font-bold text-slate-900">
                {registeredRegistrations.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">
                Menunggu Konfirmasi
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {waitingConfirmationRegistrations.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Disetujui</p>
              <p className="text-2xl font-bold text-slate-900">
                {approvedRegistrations.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Ditolak</p>
              <p className="text-2xl font-bold text-slate-900">
                {rejectedRegistrations.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
