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
        return <Clock className="h-5 w-5 text-black" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-black" />;
      default:
        return <AlertCircle className="h-5 w-5 text-black" />;
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
      <div className="bg-white rounded-lg border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mt-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-yellow-400 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-pulse">
            <Clock className="h-6 w-6 text-black" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-black mb-1 uppercase tracking-tight">
              Menunggu Konfirmasi Pembayaran
            </h2>
            <p className="text-gray-700 font-bold text-sm uppercase">
              Memuat data...
            </p>
          </div>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-100 border-2 border-black rounded-lg p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="h-6 bg-gray-300 border border-black rounded w-3/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 border border-black rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 border border-black rounded w-2/3"></div>
                <div className="h-4 bg-gray-300 border border-black rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (waitingTryouts.length === 0) {
    return (
      <div className="bg-white rounded-lg border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mt-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-yellow-400 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Clock className="h-6 w-6 text-black" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-black mb-1 uppercase tracking-tight">
              Menunggu Konfirmasi Pembayaran
            </h2>
            <p className="text-gray-700 font-bold text-sm uppercase">
              Pantau status pembayaran tryout Anda di sini
            </p>
          </div>
        </div>
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-200 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
            <Clock className="h-10 w-10 text-black" />
          </div>
          <h3 className="text-lg font-black text-black mb-2 uppercase">
            Belum Ada Pembayaran
          </h3>
          <p className="text-gray-700 font-bold max-w-md mx-auto">
            Tidak ada tryout yang sedang menunggu konfirmasi pembayaran. Semua
            pembayaran Anda sudah dikonfirmasi atau belum ada pembayaran yang
            dilakukan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 mt-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-yellow-400 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <Clock className="h-6 w-6 text-black" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-black text-black mb-1 uppercase tracking-tight">
            Menunggu Konfirmasi Pembayaran
          </h2>
          <p className="text-gray-700 font-bold text-sm uppercase">
            Pantau status pembayaran tryout Anda di sini
          </p>
        </div>
        {waitingTryouts.length > 0 && (
          <span className="bg-yellow-300 border-2 border-black text-black text-sm font-black px-4 py-2 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
            {waitingTryouts.length} tryout
          </span>
        )}
      </div>

      <div className="space-y-6">
        {waitingTryouts
          .filter((tryout) => tryout.status !== "approved") // Extra safety filter
          .map((tryout) => (
            <div
              key={tryout.id}
              className="bg-gray-50 border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-black text-black leading-tight uppercase">
                      {tryout.tryout_title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase ${
                        tryout.status === "waiting_confirmation"
                          ? "bg-yellow-300 text-black"
                          : "bg-red-300 text-black"
                      }`}
                    >
                      {getStatusIcon(tryout.status)}
                      {getStatusText(tryout.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-black min-w-[100px] uppercase">
                          Tipe:
                        </span>
                        <span className="px-3 py-1 bg-blue-300 border border-black text-black rounded-lg text-xs font-black uppercase tracking-wide shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                          {tryout.tryout_type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-black min-w-[100px] uppercase">
                          Tanggal:
                        </span>
                        <span className="text-gray-800 font-bold">
                          {formatDate(tryout.registration_date)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-black min-w-[100px] uppercase">
                          Jumlah:
                        </span>
                        <span className="text-lg font-black text-green-700 bg-green-200 px-3 py-1 border border-black rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                          {formatCurrency(tryout.payment_amount)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-black min-w-[100px] uppercase">
                          Metode:
                        </span>
                        <span className="px-3 py-1 bg-gray-200 border border-black text-black rounded-lg text-xs font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                          {tryout.payment_method_name || tryout.payment_method}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-black min-w-[100px] uppercase">
                          Status:
                        </span>
                        <span className="px-3 py-1 bg-purple-200 border border-black text-black rounded-lg text-xs font-black capitalize shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                          {tryout.payment_status}
                        </span>
                      </div>
                      {tryout.payment_date && (
                        <div className="flex items-center gap-3">
                          <span className="font-black text-black min-w-[100px] uppercase">
                            Dibayar:
                          </span>
                          <span className="text-gray-800 font-bold">
                            {formatDate(tryout.payment_date)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {tryout.status === "waiting_confirmation" && (
                <div className="mt-6 p-4 bg-yellow-200 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-black mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-black text-black mb-2 uppercase">
                        Pembayaran Sedang Diverifikasi
                      </p>
                      <p className="text-sm text-black font-bold">
                        Admin sedang memverifikasi pembayaran Anda. Proses ini
                        membutuhkan waktu maksimal 1×24 jam kerja.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {tryout.status === "rejected" && (
                <div className="mt-6 p-4 bg-red-200 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-6 w-6 text-black mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-black text-black mb-2 uppercase">
                        Pembayaran Ditolak
                      </p>
                      <p className="text-sm text-black font-bold">
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
