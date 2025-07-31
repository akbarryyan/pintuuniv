"use client";

import Link from "next/link";
import HeaderNavigation from "@/components/HeaderNavigation";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
          <div className="bg-purple-500 text-white px-6 py-3 border-4 border-slate-800 inline-block mb-6 shadow-brutal transform -rotate-2">
            <h1 className="text-2xl md:text-3xl font-black uppercase">
              🔒 KEBIJAKAN PRIVASI
            </h1>
          </div>
          <p className="text-slate-600 font-bold">
            Terakhir diperbarui: Juli 2025
          </p>
        </div>

        {/* Privacy Content */}
        <div className="bg-white border-4 border-slate-800 p-6 md:p-8 shadow-brutal mb-8">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-purple-400 pb-2">
              1. PENGANTAR
            </h2>
            <p className="mb-6 font-medium leading-relaxed">
              PintuUniv berkomitmen untuk melindungi privasi dan keamanan data
              pribadi pengguna. Kebijakan privasi ini menjelaskan bagaimana kami
              mengumpulkan, menggunakan, dan melindungi informasi Anda saat
              menggunakan platform pembelajaran kami.
            </p>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-purple-400 pb-2">
              2. INFORMASI YANG KAMI KUMPULKAN
            </h2>

            <h3 className="text-lg font-bold text-slate-800 mb-3">
              📝 Informasi yang Anda Berikan:
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 font-medium">
              <li>Nama lengkap dan informasi profil</li>
              <li>Alamat email dan nomor telepon</li>
              <li>Informasi sekolah dan tingkat kelas</li>
              <li>Data pembayaran (diproses melalui gateway aman)</li>
              <li>Komunikasi dengan tim support</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 mb-3">
              📊 Informasi yang Dikumpulkan Otomatis:
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 font-medium">
              <li>Alamat IP dan lokasi geografis</li>
              <li>Jenis browser dan sistem operasi</li>
              <li>Halaman yang dikunjungi dan durasi sesi</li>
              <li>Hasil tryout dan progress belajar</li>
              <li>Waktu login dan aktivitas platform</li>
            </ul>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-purple-400 pb-2">
              3. PENGGUNAAN INFORMASI
            </h2>
            <p className="mb-4 font-medium leading-relaxed">
              Kami menggunakan data Anda untuk:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 font-medium">
              <li>Menyediakan dan meningkatkan layanan platform</li>
              <li>Memberikan analisis hasil belajar yang personal</li>
              <li>Mengirim notifikasi penting dan update layanan</li>
              <li>Memberikan dukungan teknis dan customer service</li>
              <li>Melakukan riset untuk pengembangan fitur baru</li>
              <li>Memproses pembayaran dan mengelola langganan</li>
            </ul>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-purple-400 pb-2">
              4. BERBAGI INFORMASI
            </h2>
            <p className="mb-4 font-medium leading-relaxed">
              Kami TIDAK akan menjual atau menyewakan data pribadi Anda.
              Informasi hanya dibagikan dalam kondisi berikut:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 font-medium">
              <li>
                <strong>Penyedia Layanan:</strong> Partner tepercaya untuk
                payment gateway, hosting, dan analytics
              </li>
              <li>
                <strong>Kewajiban Hukum:</strong> Jika diminta oleh otoritas
                yang berwenang
              </li>
              <li>
                <strong>Keamanan:</strong> Untuk melindungi hak dan keamanan
                pengguna lain
              </li>
              <li>
                <strong>Persetujuan:</strong> Dengan izin eksplisit dari Anda
              </li>
            </ul>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-purple-400 pb-2">
              5. KEAMANAN DATA
            </h2>
            <p className="mb-4 font-medium leading-relaxed">
              Kami menerapkan langkah-langkah keamanan yang ketat:
            </p>
            <div className="bg-slate-100 border-2 border-slate-800 p-4 mb-6">
              <ul className="space-y-2 font-medium">
                <li>
                  🔐 <strong>Enkripsi SSL/TLS</strong> untuk semua transmisi
                  data
                </li>
                <li>
                  🛡️ <strong>Firewall dan monitoring</strong> server 24/7
                </li>
                <li>
                  🔑 <strong>Hashing password</strong> dengan algoritma aman
                </li>
                <li>
                  🚨 <strong>Regular security audit</strong> dan penetration
                  testing
                </li>
                <li>
                  💾 <strong>Backup data</strong> secara berkala dan aman
                </li>
              </ul>
            </div>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-purple-400 pb-2">
              6. HAK PENGGUNA
            </h2>
            <p className="mb-4 font-medium leading-relaxed">
              Sebagai pengguna, Anda memiliki hak untuk:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 font-medium">
              <li>
                <strong>Akses:</strong> Meminta copy data pribadi yang kami
                simpan
              </li>
              <li>
                <strong>Koreksi:</strong> Mengubah atau memperbaiki data yang
                tidak akurat
              </li>
              <li>
                <strong>Penghapusan:</strong> Meminta penghapusan akun dan data
                pribadi
              </li>
              <li>
                <strong>Portabilitas:</strong> Mendapatkan data dalam format
                yang dapat dipindah
              </li>
              <li>
                <strong>Objection:</strong> Menolak penggunaan data untuk
                keperluan tertentu
              </li>
            </ul>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-purple-400 pb-2">
              7. COOKIES & TRACKING
            </h2>
            <p className="mb-4 font-medium leading-relaxed">
              Kami menggunakan cookies untuk:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 font-medium">
              <li>Menjaga sesi login Anda tetap aktif</li>
              <li>Mengingat preferensi dan pengaturan</li>
              <li>Menganalisis penggunaan platform untuk perbaikan</li>
              <li>Memberikan konten yang relevan</li>
            </ul>
            <p className="mb-6 font-medium">
              Anda dapat mengatur browser untuk menolak cookies, namun beberapa
              fitur mungkin tidak berfungsi optimal.
            </p>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-purple-400 pb-2">
              8. RETENSI DATA
            </h2>
            <p className="mb-6 font-medium leading-relaxed">
              Kami menyimpan data pribadi selama akun Anda aktif dan 2 tahun
              setelah penghapusan akun untuk keperluan legal dan audit. Data
              pembelajaran dapat disimpan lebih lama untuk riset pendidikan
              (dalam bentuk anonim).
            </p>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-purple-400 pb-2">
              9. PERUBAHAN KEBIJAKAN
            </h2>
            <p className="mb-6 font-medium leading-relaxed">
              Kami dapat memperbarui kebijakan privasi ini untuk mencerminkan
              perubahan dalam layanan atau regulasi. Perubahan signifikan akan
              dinotifikasi melalui email atau pengumuman di platform minimal 30
              hari sebelum berlaku.
            </p>

            <h2 className="text-xl font-black text-slate-900 mb-4 uppercase border-b-2 border-purple-400 pb-2">
              10. KONTAK PRIVASI
            </h2>
            <p className="mb-4 font-medium leading-relaxed">
              Untuk pertanyaan mengenai privasi atau menggunakan hak Anda:
            </p>
            <div className="bg-purple-50 border-2 border-slate-800 p-4 font-bold">
              <p>
                🛡️ <strong>Data Protection Officer</strong>
              </p>
              <p>📧 Email: privacy@pintuuniv.com</p>
              <p>📱 WhatsApp: +62 812-3456-7890</p>
              <p>
                📝 Form:{" "}
                <Link href="/contact" className="text-purple-600 underline">
                  Hubungi Kami
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Register */}
        <div className="text-center">
          <Link
            href="/register"
            className="bg-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 font-black text-sm sm:text-lg uppercase border-3 sm:border-4 border-slate-800 transform hover:rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-brutal inline-block"
          >
            🚀 LANJUT DAFTAR
          </Link>
        </div>
      </div>
    </div>
  );
}
