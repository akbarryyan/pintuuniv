"use client";

import Link from "next/link";
import HeaderNavigation from "@/components/HeaderNavigation";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <HeaderNavigation
        showBackButton={true}
        backButtonText="Kembali ke Beranda"
        backButtonHref="/"
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="bg-blue-500 text-white px-6 py-3 border-4 border-slate-800 inline-block mb-6 shadow-brutal transform rotate-2">
            <h1 className="text-2xl md:text-3xl font-black uppercase">
              📋 SYARAT & KETENTUAN
            </h1>
          </div>
          <p className="text-slate-600 font-bold">
            Terakhir diperbarui: Juli 2025
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-white border-4 border-slate-800 p-6 md:p-8 shadow-brutal mb-8">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-orange-400 pb-2">
              1. PENERIMAAN KETENTUAN
            </h2>
            <p className="mb-6 font-medium leading-relaxed">
              Dengan mengakses dan menggunakan platform PintuUniv, Anda setuju
              untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak
              setuju dengan ketentuan ini, mohon untuk tidak menggunakan layanan
              kami.
            </p>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-orange-400 pb-2">
              2. LAYANAN YANG DISEDIAKAN
            </h2>
            <p className="mb-4 font-medium leading-relaxed">
              PintuUniv menyediakan platform pembelajaran online untuk persiapan
              UTBK yang meliputi:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 font-medium">
              <li>Simulasi tryout UTBK interaktif</li>
              <li>Bank soal dan pembahasan</li>
              <li>Analisis hasil belajar</li>
              <li>Konsultasi dengan mentor</li>
              <li>Materi pembelajaran digital</li>
            </ul>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-orange-400 pb-2">
              3. AKUN PENGGUNA
            </h2>
            <p className="mb-4 font-medium leading-relaxed">
              Untuk menggunakan layanan premium kami, Anda harus:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 font-medium">
              <li>Mendaftar dengan informasi yang akurat dan lengkap</li>
              <li>Menjaga kerahasiaan password akun</li>
              <li>Bertanggung jawab atas semua aktivitas dalam akun Anda</li>
              <li>
                Segera memberitahu kami jika terjadi penggunaan akun yang tidak
                sah
              </li>
            </ul>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-orange-400 pb-2">
              4. PEMBAYARAN & LANGGANAN
            </h2>
            <p className="mb-4 font-medium leading-relaxed">
              Ketentuan pembayaran:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 font-medium">
              <li>Pembayaran dilakukan di muka sebelum layanan aktif</li>
              <li>Harga dapat berubah sewaktu-waktu dengan pemberitahuan</li>
              <li>Refund sesuai dengan kebijakan yang berlaku</li>
              <li>Langganan akan diperpanjang otomatis kecuali dibatalkan</li>
            </ul>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-orange-400 pb-2">
              5. KEKAYAAN INTELEKTUAL
            </h2>
            <p className="mb-6 font-medium leading-relaxed">
              Semua konten, soal, pembahasan, dan materi dalam platform
              PintuUniv adalah milik kami dan dilindungi hak cipta. Pengguna
              dilarang menyalin, mendistribusikan, atau menggunakan konten untuk
              kepentingan komersial tanpa izin tertulis.
            </p>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-orange-400 pb-2">
              6. LARANGAN PENGGUNAAN
            </h2>
            <p className="mb-4 font-medium leading-relaxed">
              Pengguna dilarang:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 font-medium">
              <li>Menyalahgunakan platform untuk aktivitas ilegal</li>
              <li>Berbagi akun dengan orang lain</li>
              <li>Melakukan reverse engineering pada sistem</li>
              <li>Mengganggu atau merusak server dan infrastruktur</li>
              <li>Menggunakan bot atau script otomatis</li>
            </ul>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-orange-400 pb-2">
              7. PEMBATASAN TANGGUNG JAWAB
            </h2>
            <p className="mb-6 font-medium leading-relaxed">
              PintuUniv tidak bertanggung jawab atas kerugian yang timbul akibat
              penggunaan layanan, termasuk namun tidak terbatas pada kegagalan
              teknis, kesalahan data, atau hasil ujian yang tidak sesuai
              harapan. Layanan disediakan "as is" tanpa jaminan apapun.
            </p>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-orange-400 pb-2">
              8. PERUBAHAN KETENTUAN
            </h2>
            <p className="mb-6 font-medium leading-relaxed">
              Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu.
              Perubahan akan diberitahukan melalui email atau notifikasi dalam
              platform. Penggunaan layanan setelah perubahan dianggap sebagai
              persetujuan terhadap ketentuan yang baru.
            </p>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-orange-400 pb-2">
              9. KONTAK
            </h2>
            <p className="mb-4 font-medium leading-relaxed">
              Jika ada pertanyaan mengenai syarat dan ketentuan ini, silakan
              hubungi kami:
            </p>
            <div className="bg-slate-100 border-2 border-slate-800 p-4 font-bold">
              <p>📧 Email: legal@pintuuniv.com</p>
              <p>📱 WhatsApp: +62 812-3456-7890</p>
              <p>🏢 Alamat: Jakarta, Indonesia</p>
            </div>
          </div>
        </div>

        {/* Back to Register */}
        <div className="text-center">
          <Link
            href="/register"
            className="bg-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 font-black text-sm sm:text-lg uppercase border-3 sm:border-4 border-slate-800 transform hover:-rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-brutal inline-block"
          >
            🚀 LANJUT DAFTAR
          </Link>
        </div>
      </div>
    </div>
  );
}
