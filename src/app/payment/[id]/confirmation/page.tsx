"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Upload,
  CheckCircle,
  AlertTriangle,
  Copy,
  CreditCard,
  Smartphone,
  Building2,
  X,
  FileImage,
} from "lucide-react";
import { toast } from "sonner";

interface PaymentAccount {
  id: number;
  name: string;
  account: string;
  account_name: string;
  is_active: boolean;
}

interface PaymentMethod {
  id: number;
  name: string;
  type: "qris" | "e_wallet" | "bank_transfer";
  icon: string;
  color: string;
  qr_code?: string;
  logo?: string;
  is_active: boolean;
  is_popular: boolean;
  accounts: PaymentAccount[];
}

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
}

export default function PaymentConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tryout, setTryout] = useState<Tryout | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [selectedAccount, setSelectedAccount] = useState<PaymentAccount | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    CreditCard: CreditCard,
    Smartphone: Smartphone,
    Building2: Building2,
  };

  // Get URL parameters
  const methodId = searchParams.get("method");
  const accountDetail = searchParams.get("account");

  useEffect(() => {
    // Fetch tryout and payment data
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch tryout data
        const tryoutResponse = await fetch(`/api/tryouts/${params.id}`);
        const tryoutData = await tryoutResponse.json();

        if (tryoutData.success && tryoutData.tryout) {
          setTryout(tryoutData.tryout);
        } else {
          throw new Error("Tryout tidak ditemukan");
        }

        // Fetch payment methods
        const paymentResponse = await fetch("/api/payment-methods");
        const paymentData = await paymentResponse.json();

        if (paymentData.success && methodId) {
          const method = paymentData.data.find(
            (m: PaymentMethod) => m.id.toString() === methodId
          );
          setPaymentMethod(method || null);

          // Find selected account if specified
          if (method && accountDetail) {
            const account = method.accounts.find(
              (acc: PaymentAccount) =>
                `${method.name}-${acc.name}` === accountDetail
            );
            setSelectedAccount(account || null);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Gagal memuat data pembayaran");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (params.id && methodId) {
      fetchData();
    } else {
      router.back();
    }
  }, [params.id, methodId, accountDetail, router]);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error("Waktu pembayaran telah habis");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }

      setProofFile(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Remove uploaded file
  const removeFile = () => {
    setProofFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }
  };

  // Copy account number
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Nomor rekening disalin");
  };

  // Submit payment proof
  const handleSubmitProof = async () => {
    if (!proofFile) {
      toast.error("Silakan upload bukti pembayaran");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("proof", proofFile);
      formData.append("tryoutId", params.id as string);
      formData.append("paymentMethodId", methodId || "");
      formData.append("accountId", selectedAccount?.id.toString() || "");

      const response = await fetch("/api/user/payment-proof", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Bukti pembayaran berhasil dikirim!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        throw new Error("Gagal mengirim bukti pembayaran");
      }
    } catch (error) {
      console.error("Error submitting proof:", error);
      toast.error("Gagal mengirim bukti pembayaran");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-bold">
            Memuat konfirmasi pembayaran...
          </p>
        </div>
      </div>
    );
  }

  if (!tryout || !paymentMethod) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 font-bold">
            Data pembayaran tidak ditemukan
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 bg-slate-900 text-white px-6 py-3 font-black border-2 border-slate-800 hover:bg-slate-800 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[paymentMethod.icon] || CreditCard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <div className="bg-white border-b-4 border-slate-800 shadow-brutal">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div>
              <h1 className="font-black text-2xl text-slate-900">
                ⏰ Konfirmasi Pembayaran
              </h1>
              <p className="text-slate-600 font-bold">
                Selesaikan pembayaran dalam batas waktu yang ditentukan
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timer & Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Timer */}
            <div className="bg-red-50 border-4 border-red-500 shadow-brutal p-6">
              <div className="text-center">
                <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-black text-lg text-red-900 mb-2">
                  Batas Waktu Pembayaran
                </h3>
                <div className="text-3xl font-black text-red-600 mb-2">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-sm text-red-700 font-bold">
                  {timeLeft > 0 ? "Segera lakukan pembayaran" : "Waktu habis"}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white border-4 border-slate-800 shadow-brutal p-6">
              <h3 className="font-black text-lg text-slate-900 mb-4">
                📋 Ringkasan Pesanan
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-black text-base text-slate-900">
                    {tryout.title}
                  </h4>
                  <p className="text-sm text-slate-600">Tryout Berbayar</p>
                </div>
                <div className="border-t-2 border-slate-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-lg text-slate-900">
                      Total
                    </span>
                    <span className="font-black text-xl text-slate-900">
                      Rp {Math.round(tryout.price).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details & Upload */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Details */}
            <div className="bg-white border-4 border-slate-800 shadow-brutal p-6">
              <h3 className="font-black text-xl text-slate-900 mb-6">
                💳 Detail Pembayaran
              </h3>

              {/* Selected Payment Method */}
              <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 ${
                      paymentMethod.color || "bg-slate-500"
                    } border-2 border-slate-800 rounded-lg flex items-center justify-center`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-slate-900">
                      {paymentMethod.name}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {paymentMethod.type === "qris" &&
                        "Scan QR Code untuk pembayaran"}
                      {paymentMethod.type === "e_wallet" && "E-Wallet Transfer"}
                      {paymentMethod.type === "bank_transfer" &&
                        "Transfer Bank"}
                    </p>
                  </div>
                </div>

                {/* QR Code Display */}
                {paymentMethod.qr_code && (
                  <div className="text-center">
                    <div className="bg-white p-4 border-2 border-slate-800 rounded-lg inline-block mb-4">
                      <img
                        src={paymentMethod.qr_code}
                        alt="QR Code"
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                    <p className="text-sm text-slate-600 font-bold">
                      Scan QR Code dengan aplikasi e-wallet atau mobile banking
                    </p>
                  </div>
                )}

                {/* Account Details */}
                {selectedAccount && (
                  <div className="bg-white border-2 border-slate-800 p-4 rounded-lg">
                    <h5 className="font-black text-base text-slate-900 mb-3">
                      Detail Transfer:
                    </h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">
                          {paymentMethod.type === "e_wallet"
                            ? "Platform:"
                            : "Bank:"}
                        </span>
                        <span className="font-black text-slate-900">
                          {selectedAccount.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">
                          {paymentMethod.type === "e_wallet"
                            ? "Nomor:"
                            : "Rekening:"}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900">
                            {selectedAccount.account}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(selectedAccount.account)
                            }
                            className="p-1 hover:bg-slate-100 rounded transition-colors"
                          >
                            <Copy className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">
                          Atas Nama:
                        </span>
                        <span className="font-black text-slate-900">
                          {selectedAccount.account_name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Jumlah:</span>
                        <span className="font-black text-red-600">
                          Rp {Math.round(tryout.price).toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Proof Section */}
              <div className="bg-yellow-50 border-4 border-yellow-400 p-6 rounded-lg mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-yellow-900 mb-2">
                      WAJIB Upload Bukti Transfer
                    </h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>
                        • Upload screenshot atau foto bukti pembayaran yang
                        jelas
                      </li>
                      <li>• Format file: JPG, PNG (maksimal 5MB)</li>
                      <li>
                        • Pastikan nominal dan detail transfer terlihat jelas
                      </li>
                      <li>• Bukti pembayaran akan diverifikasi oleh admin</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <h4 className="font-black text-lg text-slate-900">
                  📤 Upload Bukti Pembayaran
                </h4>

                {!proofFile ? (
                  <div className="border-4 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="proof-upload"
                    />
                    <label htmlFor="proof-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="font-black text-slate-600 mb-2">
                        Klik untuk upload bukti pembayaran
                      </p>
                      <p className="text-sm text-slate-500">
                        JPG, PNG (maksimal 5MB)
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="bg-white border-2 border-slate-800 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {previewUrl && (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-24 h-24 object-cover border-2 border-slate-300 rounded"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileImage className="w-5 h-5 text-slate-600" />
                          <span className="font-black text-slate-900">
                            {proofFile.name}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          Ukuran: {(proofFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                          onClick={removeFile}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-bold"
                        >
                          <X className="w-4 h-4" />
                          Hapus file
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmitProof}
                  disabled={!proofFile || isSubmitting || timeLeft <= 0}
                  className="w-full bg-green-500 text-white px-6 py-4 font-black text-lg border-4 border-slate-800 hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Mengirim...
                    </div>
                  ) : (
                    <>✅ Konfirmasi Pembayaran</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
