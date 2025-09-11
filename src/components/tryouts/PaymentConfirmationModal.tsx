"use client";

import { useState } from "react";
import { X, CreditCard, Smartphone, Building2 } from "lucide-react";
import { toast } from "sonner";

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

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tryout: Tryout | null;
  onConfirmPayment: (tryoutId: number, tryoutTitle: string, paymentMethod: string) => Promise<void>;
}

export default function PaymentConfirmationModal({
  isOpen,
  onClose,
  tryout,
  onConfirmPayment,
}: PaymentConfirmationModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: "credit_card",
      name: "Kartu Kredit",
      icon: CreditCard,
      description: "Visa, Mastercard, JCB",
      color: "bg-blue-500",
    },
    {
      id: "e_wallet",
      name: "E-Wallet",
      icon: Smartphone,
      description: "GoPay, OVO, DANA, ShopeePay",
      color: "bg-green-500",
    },
    {
      id: "bank_transfer",
      name: "Transfer Bank",
      icon: Building2,
      description: "BCA, Mandiri, BRI, BNI",
      color: "bg-purple-500",
    },
  ];

  const handleConfirm = async () => {
    if (!tryout || !selectedPaymentMethod) {
      toast.error("Pilih metode pembayaran terlebih dahulu");
      return;
    }

    setIsProcessing(true);
    try {
      await onConfirmPayment(tryout.id, tryout.title, selectedPaymentMethod);
      toast.success("Pembayaran berhasil diproses!");
      onClose();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Gagal memproses pembayaran");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      setSelectedPaymentMethod("");
      onClose();
    }
  };

  if (!isOpen || !tryout) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop dengan blur effect */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white border-4 border-slate-800 shadow-brutal max-w-md w-full mx-4 transform animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b-4 border-slate-800 bg-gradient-to-r from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-black text-lg sm:text-xl text-slate-900">
                🛒 Konfirmasi Pembayaran
              </h2>
              <p className="text-sm text-slate-600 font-bold mt-1">
                Lanjutkan ke proses pembayaran
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isProcessing}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Tryout Info */}
          <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-lg mb-6">
            <h3 className="font-black text-base text-slate-900 mb-2">
              {tryout.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-600">Harga:</span>
                <span className="font-black text-lg text-slate-900">
                  Rp {Math.round(tryout.price).toLocaleString('id-ID')}
                </span>
              </div>
              {tryout.discount > 0 && (
                <div className="bg-red-500 text-white px-2 py-1 text-xs font-black border border-slate-800">
                  -{tryout.discount}%
                </div>
              )}
            </div>
            {tryout.discount > 0 && (
              <div className="text-xs text-slate-500 line-through font-bold mt-1">
                Harga normal: Rp {Math.round(tryout.originalPrice).toLocaleString('id-ID')}
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h4 className="font-black text-sm text-slate-900 mb-3">
              Pilih Metode Pembayaran:
            </h4>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    disabled={isProcessing}
                    className={`w-full p-3 border-2 border-slate-800 rounded-lg text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedPaymentMethod === method.id
                        ? "bg-slate-900 text-white"
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${method.color} border-2 border-slate-800 rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-black text-sm">{method.name}</div>
                        <div className="text-xs text-slate-600">{method.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              disabled={isProcessing}
              className="flex-1 bg-slate-100 text-slate-900 px-4 py-3 font-black text-sm border-2 border-slate-800 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedPaymentMethod || isProcessing}
              className="flex-1 bg-orange-500 text-white px-4 py-3 font-black text-sm border-2 border-slate-800 hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memproses...</span>
                </div>
              ) : (
                "💳 Lanjutkan Pembayaran"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
