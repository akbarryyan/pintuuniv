"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
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
  payment_reference: string | null;
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
        setWaitingTryouts(data.tryouts);
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
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
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
      case "approved":
        return "Disetujui";
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
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Menunggu Konfirmasi Pembayaran
          </h2>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (waitingTryouts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Menunggu Konfirmasi Pembayaran
          </h2>
        </div>
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            Tidak ada tryout yang menunggu konfirmasi
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Clock className="h-5 w-5 text-yellow-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Menunggu Konfirmasi Pembayaran
        </h2>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {waitingTryouts.length} tryout
        </span>
      </div>

      <div className="space-y-4">
        {waitingTryouts.map((tryout) => (
          <div
            key={tryout.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-gray-900">
                    {tryout.tryout_title}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      tryout.status
                    )}`}
                  >
                    {getStatusIcon(tryout.status)}
                    {getStatusText(tryout.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div>
                    <p>
                      <span className="font-medium">Tipe:</span>{" "}
                      {tryout.tryout_type}
                    </p>
                    <p>
                      <span className="font-medium">Tanggal Daftar:</span>{" "}
                      {formatDate(tryout.registration_date)}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">Jumlah:</span>{" "}
                      {formatCurrency(tryout.payment_amount)}
                    </p>
                    <p>
                      <span className="font-medium">Metode:</span>{" "}
                      {tryout.payment_method_name || tryout.payment_method}
                    </p>
                    <p>
                      <span className="font-medium">Status Bayar:</span>{" "}
                      {tryout.payment_status}
                    </p>
                    {tryout.payment_reference && (
                      <p>
                        <span className="font-medium">Referensi:</span>{" "}
                        {tryout.payment_reference}
                      </p>
                    )}
                    {tryout.payment_date && (
                      <p>
                        <span className="font-medium">Tanggal Bayar:</span>{" "}
                        {formatDate(tryout.payment_date)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {tryout.status === "waiting_confirmation" && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <p className="text-sm text-yellow-700">
                    Pembayaran Anda sedang diverifikasi oleh admin. Proses ini
                    membutuhkan waktu 1x24 jam.
                  </p>
                </div>
              </div>
            )}

            {tryout.status === "approved" && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <p className="text-sm text-green-700">
                    Pembayaran disetujui! Anda sekarang dapat mengikuti tryout
                    ini.
                  </p>
                </div>
              </div>
            )}

            {tryout.status === "rejected" && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-700">
                    Pembayaran ditolak. Silakan hubungi admin untuk informasi
                    lebih lanjut.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
