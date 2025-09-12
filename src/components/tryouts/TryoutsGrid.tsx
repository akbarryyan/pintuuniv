"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RegisterConfirmationModal from "./RegisterConfirmationModal";
import PaymentConfirmationModal from "./PaymentConfirmationModal";

interface Tryout {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  type: string;
  difficulty: string;
  participants: number;
  discount: number;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  isRegistered?: boolean;
  registrationStatus?: string;
}

interface UserData {
  name: string;
  avatar: string;
  id: number | null;
}

interface TryoutsGridProps {
  tryouts: Tryout[];
  onRegisterTryout: (tryoutId: number, tryoutTitle: string) => void;
  userData: UserData;
}

export default function TryoutsGrid({
  tryouts,
  onRegisterTryout,
  userData,
}: TryoutsGridProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedTryout, setSelectedTryout] = useState<Tryout | null>(null);
  const [loadingTryoutId, setLoadingTryoutId] = useState<number | null>(null);
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy":
        return "bg-emerald-100 text-emerald-800 border-emerald-400";
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-400";
      case "hard":
        return "bg-orange-100 text-orange-800 border-orange-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-400";
    }
  };

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case "easy":
        return "Mudah";
      case "medium":
        return "Sedang";
      case "hard":
        return "Sulit";
      default:
        return "Sedang";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRegisterClick = async (tryout: Tryout) => {
    if (!userData.id) {
      toast.error("Anda harus login terlebih dahulu");
      return;
    }

    // Set loading state
    setLoadingTryoutId(tryout.id);

    // Simulasi loading delay untuk UX yang lebih baik
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Buka modal sesuai jenis tryout
    setSelectedTryout(tryout);
    if (tryout.type === "free") {
      setIsModalOpen(true);
    } else {
      setIsPaymentModalOpen(true);
    }
    setLoadingTryoutId(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTryout(null);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
    setSelectedTryout(null);
  };

  const handleConfirmRegistration = async (
    tryoutId: number,
    tryoutTitle: string
  ) => {
    try {
      await onRegisterTryout(tryoutId, tryoutTitle);
    } catch (error) {
      console.error("Error in registration:", error);
      throw error; // Re-throw agar modal tidak tertutup jika ada error
    }
  };

  const handleConfirmPayment = async (
    tryoutId: number,
    tryoutTitle: string,
    paymentMethod: string
  ) => {
    try {
      // Logika pembayaran akan dihandle di halaman pembayaran
      console.log(
        `Redirecting to payment for tryout ${tryoutId} (${tryoutTitle})`
      );
    } catch (error) {
      console.error("Error in payment:", error);
      throw error; // Re-throw agar modal tidak tertutup jika ada error
    }
  };

  const canStartTryout = (
    isRegistered: boolean,
    registrationStatus: string | undefined,
    tryoutType: string
  ) => {
    if (!isRegistered) return false;

    // For free tryouts, user can start if registered
    if (tryoutType === "free" && registrationStatus === "registered") {
      return true;
    }

    // For paid tryouts, user can start only if approved
    if (tryoutType !== "free" && registrationStatus === "approved") {
      return true;
    }

    return false;
  };

  const getRegistrationStatusBadge = (
    isRegistered: boolean,
    registrationStatus: string | undefined,
    tryoutType: string
  ) => {
    if (!isRegistered) return null;

    switch (registrationStatus) {
      case "registered":
        if (tryoutType === "free") {
          return (
            <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-green-400 text-slate-900 inline-block">
              ✅ TERDAFTAR
            </div>
          );
        } else {
          return (
            <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-yellow-400 text-slate-900 inline-block">
              ⏳ PENDING
            </div>
          );
        }
      case "approved":
        return (
          <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-green-400 text-slate-900 inline-block">
            ✅ DISETUJUI
          </div>
        );
      case "waiting_confirmation":
        return (
          <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-yellow-400 text-slate-900 inline-block">
            ⏳ VERIFIKASI
          </div>
        );
      case "rejected":
        return (
          <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-red-400 text-slate-900 inline-block">
            ❌ DITOLAK
          </div>
        );
      default:
        return (
          <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-gray-400 text-slate-900 inline-block">
            ❓ UNKNOWN
          </div>
        );
    }
  };

  const handleStartClick = (tryout: Tryout) => {
    if (!userData.id) {
      toast.error("Anda harus login terlebih dahulu");
      return;
    }

    // Navigasi ke halaman tryout
    router.push(`/tryout/${tryout.id}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {tryouts.map((tryout) => (
          <div
            key={tryout.id}
            className="bg-white border-3 sm:border-4 border-slate-800 shadow-brutal hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:rotate-1"
          >
            {/* Card Header */}
            <div className="p-4 sm:p-6 border-b-3 border-slate-800 bg-gradient-to-r from-slate-50 to-slate-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${
                        tryout.type === "free"
                          ? "bg-emerald-400 text-slate-900"
                          : "bg-orange-400 text-slate-900"
                      }`}
                    >
                      {tryout.type === "free" ? "GRATIS" : "PREMIUM"}
                    </div>
                    <div
                      className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${getDifficultyColor(
                        tryout.difficulty
                      )}`}
                    >
                      {getDifficultyLabel(tryout.difficulty)}
                    </div>
                  </div>
                  {/* Registration Status Badge - Show below type and difficulty badges */}
                  {getRegistrationStatusBadge(
                    tryout.isRegistered || false,
                    tryout.registrationStatus,
                    tryout.type
                  ) && (
                    <div className="mb-2 max-w-fit">
                      {getRegistrationStatusBadge(
                        tryout.isRegistered || false,
                        tryout.registrationStatus,
                        tryout.type
                      )}
                    </div>
                  )}
                  <h3 className="font-black text-sm sm:text-base text-slate-900 mb-2 leading-tight">
                    {tryout.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold">
                    👥 {tryout.participants.toLocaleString()} peserta
                  </p>
                </div>
                <div className="text-right ml-3">
                  {tryout.price === 0 ? (
                    <div className="font-black text-lg text-emerald-600">
                      GRATIS
                    </div>
                  ) : (
                    <div>
                      <div className="font-black text-lg text-slate-900">
                        Rp {Math.round(tryout.price).toLocaleString("id-ID")}
                      </div>
                      {tryout.discount > 0 && (
                        <div className="text-xs text-slate-500 line-through font-bold">
                          Rp{" "}
                          {Math.round(tryout.originalPrice).toLocaleString(
                            "id-ID"
                          )}
                        </div>
                      )}
                      {tryout.discount > 0 && (
                        <div className="bg-red-500 text-white px-2 py-1 text-xs font-black border border-slate-800 mt-1">
                          -{tryout.discount}%
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 sm:p-6">
              <div className="space-y-3">
                {/* Date Range */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-600">
                      📅 Periode:
                    </span>
                    <span className="font-bold text-slate-900">
                      {formatDate(tryout.startDate)} -{" "}
                      {formatDate(tryout.endDate)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                  {canStartTryout(
                    tryout.isRegistered || false,
                    tryout.registrationStatus,
                    tryout.type
                  ) ? (
                    // Can start - show buttons side by side
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartClick(tryout)}
                        className="flex-1 bg-emerald-500 text-white px-3 py-2 sm:px-4 sm:py-3 font-black text-xs sm:text-sm border-2 border-slate-800 hover:bg-emerald-600 transition-colors"
                      >
                        🚀 MULAI
                      </button>
                      <button className="flex-1 bg-slate-100 text-slate-900 px-3 py-2 sm:px-4 sm:py-3 font-black text-xs sm:text-sm border-2 border-slate-800 hover:bg-slate-200 transition-colors">
                        📋 DETAIL
                      </button>
                    </div>
                  ) : tryout.isRegistered ? (
                    // User is registered but pending - show buttons stacked vertically
                    <div className="space-y-2">
                      <button
                        disabled
                        className="w-full bg-yellow-400 text-slate-900 px-3 py-2 sm:px-4 sm:py-3 font-black text-xs sm:text-sm border-2 border-slate-800 cursor-not-allowed opacity-75"
                      >
                        {tryout.type === "free"
                          ? "⏳ MENUNGGU KONFIRMASI"
                          : tryout.registrationStatus === "waiting_confirmation"
                          ? "⏳ MENUNGGU KONFIRMASI PEMBAYARAN"
                          : tryout.registrationStatus === "rejected"
                          ? "❌ PEMBAYARAN DITOLAK"
                          : "⏳ MENUNGGU PERSETUJUAN"}
                      </button>
                      <button className="w-full bg-slate-100 text-slate-900 px-3 py-2 sm:px-4 sm:py-3 font-black text-xs sm:text-sm border-2 border-slate-800 hover:bg-slate-200 transition-colors">
                        📋 DETAIL
                      </button>
                    </div>
                  ) : (
                    // Not registered - show buttons side by side
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRegisterClick(tryout)}
                        disabled={loadingTryoutId === tryout.id}
                        className={`flex-1 px-3 py-2 sm:px-4 sm:py-3 font-black text-xs sm:text-sm border-2 border-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          tryout.type === "free"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-orange-500 text-white hover:bg-orange-600"
                        }`}
                      >
                        {loadingTryoutId === tryout.id ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading...</span>
                          </div>
                        ) : tryout.type === "free" ? (
                          "📝 DAFTAR"
                        ) : (
                          "🛒 BELI TRYOUT"
                        )}
                      </button>
                      <button className="flex-1 bg-slate-100 text-slate-900 px-3 py-2 sm:px-4 sm:py-3 font-black text-xs sm:text-sm border-2 border-slate-800 hover:bg-slate-200 transition-colors">
                        📋 DETAIL
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Konfirmasi Pendaftaran */}
      <RegisterConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        tryout={selectedTryout}
        onConfirm={handleConfirmRegistration}
      />

      {/* Modal Konfirmasi Pembayaran */}
      <PaymentConfirmationModal
        isOpen={isPaymentModalOpen}
        onClose={handlePaymentModalClose}
        tryout={selectedTryout}
        onConfirmPayment={handleConfirmPayment}
      />
    </>
  );
}
