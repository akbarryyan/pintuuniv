"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Smartphone, Building2, CheckCircle, Clock, Shield } from "lucide-react";
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
}

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const [tryout, setTryout] = useState<Tryout | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedDetail, setSelectedDetail] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"method" | "processing" | "success">("method");

  const paymentMethods = [
    {
      id: "qris",
      name: "QRIS",
      icon: Smartphone,
      description: "Scan QR Code untuk pembayaran",
      color: "bg-green-500",
      popular: true,
      qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZmZmZiIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDAwMDAiLz4KICA8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZmZmZiIvPgogIDxyZWN0IHg9IjE0MCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZmZmZiIvPgogIDxyZWN0IHg9IjIwIiB5PSIxNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZmZmZiIvPgogIDxyZWN0IHg9IjE0MCIgeT0iMTQwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjExMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5RUklTPC90ZXh0Pgo8L3N2Zz4K",
      bankDetails: null
    },
    {
      id: "e_wallet",
      name: "E-Wallet",
      icon: Smartphone,
      description: "GoPay, OVO, DANA, ShopeePay",
      color: "bg-blue-500",
      popular: false,
      qrCode: null,
      bankDetails: [
        { name: "GoPay", account: "08123456789", nameAccount: "PintuUniv" },
        { name: "OVO", account: "08123456789", nameAccount: "PintuUniv" },
        { name: "DANA", account: "08123456789", nameAccount: "PintuUniv" },
        { name: "ShopeePay", account: "08123456789", nameAccount: "PintuUniv" }
      ]
    },
    {
      id: "bank_transfer",
      name: "Transfer Bank",
      icon: Building2,
      description: "BCA, Mandiri, BRI, BNI",
      color: "bg-purple-500",
      popular: false,
      qrCode: null,
      bankDetails: [
        { name: "BCA", account: "1234567890", nameAccount: "PintuUniv" },
        { name: "Mandiri", account: "1234567890", nameAccount: "PintuUniv" },
        { name: "BRI", account: "1234567890", nameAccount: "PintuUniv" },
        { name: "BNI", account: "1234567890", nameAccount: "PintuUniv" }
      ]
    },
  ];

  useEffect(() => {
    // Fetch data tryout dari API
    const fetchTryout = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/tryouts/${params.id}`);
        const data = await response.json();
        
        if (data.success && data.tryout) {
          setTryout(data.tryout);
        } else {
          throw new Error(data.error || "Tryout tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching tryout:", error);
        toast.error("Gagal memuat data tryout");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTryout();
    }
  }, [params.id, router]);

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error("Pilih metode pembayaran terlebih dahulu");
      return;
    }

    const method = paymentMethods.find(m => m.id === selectedMethod);
    if (method && method.bankDetails && !selectedDetail) {
      toast.error("Pilih tujuan transfer terlebih dahulu");
      return;
    }

    setIsProcessing(true);
    setStep("processing");

    try {
      // Simulasi delay pembayaran
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Daftarkan user ke tryout setelah pembayaran berhasil
      const registerResponse = await fetch('/api/user/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          tryoutId: tryout?.id,
          paymentMethod: selectedMethod,
          paymentStatus: 'paid'
        })
      });

      if (!registerResponse.ok) {
        throw new Error('Gagal mendaftarkan ke tryout');
      }
      
      setStep("success");
      toast.success("Pembayaran berhasil! Anda telah terdaftar ke tryout.");
      
      // Redirect ke dashboard setelah 2 detik
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Gagal memproses pembayaran");
      setStep("method");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-bold">Memuat data pembayaran...</p>
        </div>
      </div>
    );
  }

  if (!tryout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 font-bold">Data tryout tidak ditemukan</p>
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
              <h1 className="font-black text-2xl text-slate-900">💳 Pembayaran</h1>
              <p className="text-slate-600 font-bold">Selesaikan pembayaran untuk mengakses tryout</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {step === "method" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border-4 border-slate-800 shadow-brutal p-6 sticky top-8">
                <h2 className="font-black text-lg text-slate-900 mb-4">📋 Ringkasan Pesanan</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-base text-slate-900">{tryout.title}</h3>
                      <p className="text-sm text-slate-600">Tryout Berbayar</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-lg text-slate-900">
                        Rp {Math.round(tryout.price).toLocaleString('id-ID')}
                      </p>
                      {tryout.discount > 0 && tryout.originalPrice && (
                        <p className="text-sm text-slate-500 line-through">
                          Rp {Math.round(tryout.originalPrice).toLocaleString('id-ID')}
                        </p>
                      )}
                    </div>
                  </div>

                  {tryout.discount > 0 && tryout.originalPrice && (
                    <div className="bg-green-100 border-2 border-green-400 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-black text-green-800">
                          Hemat {tryout.discount}% - Rp {(tryout.originalPrice - tryout.price).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="border-t-2 border-slate-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-black text-lg text-slate-900">Total</span>
                      <span className="font-black text-xl text-slate-900">
                        Rp {Math.round(tryout.price).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="lg:col-span-2">
              <div className="bg-white border-4 border-slate-800 shadow-brutal p-6">
                <h2 className="font-black text-xl text-slate-900 mb-6">💳 Pilih Metode Pembayaran</h2>
                
                <div className="space-y-4">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    const isSelected = selectedMethod === method.id;
                    
                    return (
                      <div key={method.id}>
                        <button
                          onClick={() => {
                            if (selectedMethod === method.id) {
                              // Jika method yang sama diklik, tutup dropdown
                              setSelectedMethod("");
                              setSelectedDetail("");
                            } else {
                              // Jika method berbeda diklik, buka dropdown
                              setSelectedMethod(method.id);
                              setSelectedDetail("");
                            }
                          }}
                          className={`w-full p-4 border-4 border-slate-800 rounded-lg text-left transition-all duration-300 ease-in-out transform ${
                            isSelected
                              ? "bg-slate-900 text-white scale-105 shadow-lg"
                              : "bg-white hover:bg-slate-50 hover:scale-105"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${method.color} border-2 border-slate-800 rounded-lg flex items-center justify-center`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-black text-lg">{method.name}</span>
                                {method.popular && (
                                  <span className="bg-orange-500 text-white px-2 py-1 text-xs font-black border border-slate-800">
                                    POPULER
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-slate-600">{method.description}</p>
                            </div>
                            <div className="w-6 h-6 border-2 border-slate-800 rounded-full flex items-center justify-center">
                              {isSelected && (
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </button>

                        {/* Dropdown untuk detail pembayaran */}
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out transform ${
                          isSelected 
                            ? 'max-h-96 opacity-100 mt-4 scale-100 translate-y-0' 
                            : 'max-h-0 opacity-0 mt-0 scale-95 -translate-y-2'
                        }`}>
                          <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-lg transform transition-transform duration-300">
                            {method.qrCode ? (
                              /* QRIS - Tampilkan QR Code */
                              <div className="text-center">
                                <h4 className={`font-black text-lg text-slate-900 mb-4 transition-all duration-700 delay-100 ${
                                  isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}>
                                  Scan QR Code untuk Pembayaran
                                </h4>
                                <div className={`bg-white p-4 border-2 border-slate-800 rounded-lg inline-block transition-all duration-700 delay-200 ${
                                  isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                }`}>
                                  <img 
                                    src={method.qrCode} 
                                    alt="QRIS Code" 
                                    className="w-48 h-48 mx-auto"
                                  />
                                </div>
                                <p className={`text-sm text-slate-600 mt-2 font-bold transition-all duration-700 delay-300 ${
                                  isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}>
                                  Gunakan aplikasi e-wallet atau mobile banking untuk scan QR code
                                </p>
                              </div>
                            ) : method.bankDetails ? (
                              /* E-Wallet atau Bank Transfer - Tampilkan dropdown */
                              <div>
                                <h4 className={`font-black text-lg text-slate-900 mb-4 transition-all duration-700 delay-100 ${
                                  isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}>
                                  Pilih Tujuan Transfer:
                                </h4>
                                <div className="space-y-2">
                                  {method.bankDetails.map((detail, index) => (
                                    <button
                                      key={index}
                                      onClick={() => setSelectedDetail(`${method.name}-${detail.name}`)}
                                      className={`w-full p-3 border-2 border-slate-800 rounded-lg text-left transition-all duration-500 ${
                                        selectedDetail === `${method.name}-${detail.name}`
                                          ? "bg-slate-900 text-white"
                                          : "bg-white hover:bg-slate-100"
                                      } ${
                                        isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                      }`}
                                      style={{
                                        transitionDelay: isSelected ? `${200 + (index * 100)}ms` : '0ms'
                                      }}
                                    >
                                      <div className="flex justify-between items-center">
                                        <div>
                                          <div className="font-black text-base">{detail.name}</div>
                                          <div className="text-sm text-slate-600">
                                            {method.id === "e_wallet" ? "Nomor:" : "Rekening:"} {detail.account}
                                          </div>
                                          <div className="text-sm text-slate-600">
                                            A.n: {detail.nameAccount}
                                          </div>
                                        </div>
                                        <div className="w-5 h-5 border-2 border-slate-800 rounded-full flex items-center justify-center">
                                          {selectedDetail === `${method.name}-${detail.name}` && (
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                          )}
                                        </div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Security Info */}
                <div className="mt-8 bg-slate-50 border-2 border-slate-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-black text-green-800">Pembayaran Aman</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Data pembayaran Anda dilindungi dengan enkripsi SSL 256-bit dan tidak akan disimpan di server kami.
                  </p>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  disabled={(() => {
                    if (!selectedMethod || isProcessing) return true;
                    const method = paymentMethods.find(m => m.id === selectedMethod);
                    return method?.bankDetails ? !selectedDetail : false;
                  })()}
                  className="w-full mt-6 bg-orange-500 text-white px-6 py-4 font-black text-lg border-4 border-slate-800 hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💳 Bayar Sekarang - Rp {Math.round(tryout.price).toLocaleString('id-ID')}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="text-center py-16">
            <div className="w-24 h-24 border-4 border-slate-800 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="font-black text-2xl text-slate-900 mb-4">Memproses Pembayaran...</h2>
            <p className="text-slate-600 font-bold">Mohon tunggu, jangan tutup halaman ini</p>
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-green-500 border-4 border-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="font-black text-2xl text-slate-900 mb-4">Pembayaran Berhasil! 🎉</h2>
            <p className="text-slate-600 font-bold mb-6">
              Anda akan dialihkan ke dashboard dalam beberapa detik...
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Mengalihkan...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
