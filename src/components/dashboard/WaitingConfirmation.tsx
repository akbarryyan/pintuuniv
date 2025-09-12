"use client";

import { useState, useEffect } from "react";
import { Clock, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface WaitingTryout {
  id: number;
  tryout_id: number;
  tryout_title: string;
  tryout_type: string;
  registration_date: string;
  status: string;
  payment_status: string;
  payment_method: string;
  payment_date: string | null;
  payment_amount: number;
  payment_method_name: string;
}

interface WaitingConfirmationProps {
  userId: number | null;
}

export default function WaitingConfirmation({
  userId,
}: WaitingConfirmationProps) {
  const [waitingTryouts, setWaitingTryouts] = useState<WaitingTryout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWaitingTryouts = async () => {
    if (!userId) return;

    try {
      const response = await fetch(
        `/api/user/waiting-confirmation?userId=${userId}`
      );
      const data = await response.json();

      if (data.success) {
        // Filter out approved status on client side as extra safety
        const filteredTryouts = data.tryouts.filter(
          (tryout: WaitingTryout) =>
            tryout.status === "waiting_confirmation" ||
            tryout.status === "rejected"
        );
        setWaitingTryouts(filteredTryouts);
      } else {
        console.error("Error fetching waiting tryouts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching waiting tryouts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitingTryouts();
  }, [userId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "waiting_confirmation":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "waiting_confirmation":
        return "Menunggu Konfirmasi";
      case "rejected":
        return "Ditolak";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting_confirmation":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6 mt-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-md animate-pulse">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Menunggu Konfirmasi Pembayaran
            </h2>
            <p className="text-gray-600 text-sm">Memuat data...</p>
          </div>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (waitingTryouts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6 mt-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-md">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Menunggu Konfirmasi Pembayaran
            </h2>
            <p className="text-gray-600 text-sm">
              Pantau status pembayaran tryout Anda di sini
            </p>
          </div>
        </div>
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <Clock className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Belum Ada Pembayaran
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Tidak ada tryout yang sedang menunggu konfirmasi pembayaran. Semua
            pembayaran Anda sudah dikonfirmasi atau belum ada pembayaran yang
            dilakukan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6 mt-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-md">
          <Clock className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Menunggu Konfirmasi Pembayaran
          </h2>
          <p className="text-gray-600 text-sm">
            Pantau status pembayaran tryout Anda di sini
          </p>
        </div>
        {waitingTryouts.length > 0 && (
          <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-sm font-bold px-4 py-2 rounded-full border border-yellow-200">
            {waitingTryouts.length} tryout
          </span>
        )}
      </div>

      <div className="space-y-5">
        {waitingTryouts
          .filter((tryout) => tryout.status !== "approved") // Extra safety filter
          .map((tryout) => (
            <div
              key={tryout.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {tryout.tryout_title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                        tryout.status
                      )}`}
                    >
                      {getStatusIcon(tryout.status)}
                      {getStatusText(tryout.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700 min-w-[100px]">
                          Tipe:
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium uppercase tracking-wide">
                          {tryout.tryout_type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700 min-w-[100px]">
                          Tanggal:
                        </span>
                        <span className="text-gray-600">
                          {formatDate(tryout.registration_date)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700 min-w-[100px]">
                          Jumlah:
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(tryout.payment_amount)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700 min-w-[100px]">
                          Metode:
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          {tryout.payment_method_name || tryout.payment_method}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700 min-w-[100px]">
                          Status:
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium capitalize">
                          {tryout.payment_status}
                        </span>
                      </div>
                      {tryout.payment_date && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-700 min-w-[100px]">
                            Dibayar:
                          </span>
                          <span className="text-gray-600">
                            {formatDate(tryout.payment_date)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {tryout.status === "waiting_confirmation" && (
                <div className="mt-5 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800 mb-1">
                        Pembayaran Sedang Diverifikasi
                      </p>
                      <p className="text-sm text-yellow-700">
                        Admin sedang memverifikasi pembayaran Anda. Proses ini
                        membutuhkan waktu maksimal 1×24 jam kerja.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {tryout.status === "rejected" && (
                <div className="mt-5 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 rounded-lg">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-800 mb-1">
                        Pembayaran Ditolak
                      </p>
                      <p className="text-sm text-red-700">
                        Pembayaran Anda tidak dapat diverifikasi. Silakan
                        hubungi admin untuk informasi lebih lanjut atau lakukan
                        pembayaran ulang dengan data yang benar.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
