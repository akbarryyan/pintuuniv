"use client";

interface UserData {
  name: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  avatar: string;
  joinDate: string;
  subscription: string;
  subscriptionExpiry: string;
  targetUniversity: string;
  targetMajor: string;
  utbkTarget: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  date: string;
  color: string;
}

interface SubscriptionHistory {
  id: number;
  plan: string;
  duration: string;
  price: number;
  startDate: string;
  endDate: string;
  status: string;
}

interface Preferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReport: boolean;
  studyReminder: boolean;
  examReminder: boolean;
  marketingEmails: boolean;
}

interface TabContentProps {
  activeTab: string;
  userData: UserData;
  achievements: Achievement[];
  subscriptionHistory: SubscriptionHistory[];
  preferences: Preferences;
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onUserDataChange: (field: keyof UserData, value: any) => void;
  onPreferenceChange: (key: keyof Preferences) => void;
  onLogout: () => void;
  onRefreshUserData: () => void;
}

export default function TabContent({
  activeTab,
  userData,
  achievements,
  subscriptionHistory,
  preferences,
  isEditing,
  isSaving,
  onEdit,
  onCancel,
  onSave,
  onUserDataChange,
  onPreferenceChange,
  onLogout,
  onRefreshUserData,
}: TabContentProps) {
  if (activeTab === "profile") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Personal Information */}
        <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
              👤 Informasi Personal
            </h2>
            {!isEditing ? (
              <button
                onClick={onEdit}
                className="bg-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-blue-600 transition-colors"
              >
                ✏️ Edit
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={onCancel}
                  className="bg-gray-500 text-white px-3 py-1 sm:py-2 font-black text-xs sm:text-sm border-2 border-slate-800 hover:bg-gray-600 transition-colors"
                >
                  ❌ Batal
                </button>
                <button
                  onClick={onSave}
                  disabled={isSaving}
                  className="bg-emerald-500 text-white px-3 py-1 sm:py-2 font-black text-xs sm:text-sm border-2 border-slate-800 hover:bg-emerald-600 transition-colors disabled:opacity-50"
                >
                  {isSaving ? "💾 Menyimpan..." : "💾 Simpan"}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                📝 Nama Lengkap
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => onUserDataChange("name", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                />
              ) : (
                <div className="bg-slate-100 border-2 border-slate-800 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                  {userData.name}
                </div>
              )}
            </div>

            <div>
              <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                📧 Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => onUserDataChange("email", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                />
              ) : (
                <div className="bg-slate-100 border-2 border-slate-800 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                  {userData.email}
                </div>
              )}
            </div>

            <div>
              <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                📱 No. HP
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={userData.phone || ""}
                  onChange={(e) => onUserDataChange("phone", e.target.value)}
                  placeholder="Masukkan nomor HP"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                />
              ) : (
                <div className="bg-slate-100 border-2 border-slate-800 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                  {userData.phone || "Belum diset"}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                  🏫 Sekolah
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.school || ""}
                    onChange={(e) => onUserDataChange("school", e.target.value)}
                    placeholder="Masukkan nama sekolah"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  />
                ) : (
                  <div className="bg-slate-100 border-2 border-slate-800 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                    {userData.school || "Belum diset"}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                  📚 Kelas
                </label>
                {isEditing ? (
                  <select
                    value={userData.grade || ""}
                    onChange={(e) => onUserDataChange("grade", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="">Pilih Kelas</option>
                    <option value="10">Kelas 10</option>
                    <option value="11">Kelas 11</option>
                    <option value="12">Kelas 12</option>
                    <option value="Gap Year">Gap Year</option>
                  </select>
                ) : (
                  <div className="bg-slate-100 border-2 border-slate-800 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                    {userData.grade ? `Kelas ${userData.grade}` : "Belum diset"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Academic Goals */}
        <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
            🎯 Target Akademik
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                🏛️ Universitas Target
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData.targetUniversity || ""}
                  onChange={(e) => onUserDataChange("targetUniversity", e.target.value)}
                  placeholder="Masukkan universitas target"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-emerald-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-emerald-100 focus:border-emerald-500 transition-colors text-sm sm:text-base"
                />
              ) : (
                <div className="bg-emerald-100 border-2 border-emerald-400 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                  {userData.targetUniversity || "Belum diset"}
                </div>
              )}
            </div>

            <div>
              <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                🎓 Jurusan Target
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData.targetMajor || ""}
                  onChange={(e) => onUserDataChange("targetMajor", e.target.value)}
                  placeholder="Masukkan jurusan target"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-emerald-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-emerald-100 focus:border-emerald-500 transition-colors text-sm sm:text-base"
                />
              ) : (
                <div className="bg-emerald-100 border-2 border-emerald-400 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                  {userData.targetMajor || "Belum diset"}
                </div>
              )}
            </div>

            <div>
              <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                📊 Target Skor UTBK
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={userData.utbkTarget || ""}
                  onChange={(e) => onUserDataChange("utbkTarget", parseInt(e.target.value) || 0)}
                  placeholder="Masukkan target skor UTBK"
                  min="0"
                  max="1000"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-emerald-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-emerald-100 focus:border-emerald-500 transition-colors text-sm sm:text-base"
                />
              ) : (
                <div className="bg-emerald-100 border-2 border-emerald-400 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                  {userData.utbkTarget ? `${userData.utbkTarget} poin` : "Belum diset"}
                </div>
              )}
            </div>

            {/* Progress Indicator */}
            <div className="bg-blue-100 border-2 border-blue-400 p-3 sm:p-4">
              <h3 className="font-black text-slate-900 text-sm mb-2 uppercase">
                📈 Progress Target
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Skor Saat Ini: 520</span>
                  <span>Target: {userData.utbkTarget || "Belum diset"}</span>
                </div>
                {userData.utbkTarget ? (
                  <>
                    <div className="w-full bg-gray-200 border-2 border-slate-800 h-4">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 border-r-2 border-slate-800 transition-all duration-500"
                        style={{
                          width: `${Math.min((520 / userData.utbkTarget) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs font-bold text-slate-600">
                      {Math.round((520 / userData.utbkTarget) * 100)}% dari target tercapai
                    </p>
                  </>
                ) : (
                  <p className="text-xs font-bold text-slate-600">
                    Set target UTBK terlebih dahulu untuk melihat progress
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "achievements") {
    return (
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
          🏆 Pencapaian & Badge
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`${achievement.color} border-3 border-slate-800 p-4 sm:p-6 text-center shadow-brutal transform hover:-rotate-2 hover:-translate-y-2 transition-all duration-200`}
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{achievement.icon}</div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base mb-2 uppercase">
                {achievement.title}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-800 mb-2">
                {achievement.description}
              </p>
              <div className="bg-slate-900 text-white px-2 py-1 border-2 border-slate-800 inline-block">
                <span className="text-xs font-black">{achievement.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Progress */}
        <div className="mt-6 sm:mt-8 bg-slate-100 border-2 border-slate-800 p-4 sm:p-6">
          <h3 className="font-black text-slate-900 text-lg sm:text-xl mb-4 uppercase">
            📊 Progress Pencapaian
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Badge Terkumpul</span>
                <span>4/10</span>
              </div>
              <div className="w-full bg-gray-200 border-2 border-slate-800 h-4">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 w-2/5 border-r-2 border-slate-800"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Level Progress</span>
                <span>Level 3</span>
              </div>
              <div className="w-full bg-gray-200 border-2 border-slate-800 h-4">
                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 w-3/5 border-r-2 border-slate-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "subscription") {
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Current Subscription */}
        <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
            💎 Langganan Aktif
          </h2>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 border-3 border-slate-800 p-4 sm:p-6 shadow-brutal">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 uppercase">
                  {userData.subscription === "premium"
                    ? "PREMIUM"
                    : userData.subscription === "pro"
                    ? "PRO"
                    : "FREE"}{" "}
                  PLAN
                </h3>
                <p className="text-sm sm:text-base font-bold text-slate-800 mb-2">
                  {userData.subscription === "free"
                    ? "Paket gratis - Upgrade untuk fitur lengkap"
                    : userData.subscriptionExpiry &&
                      userData.subscriptionExpiry !== "Tidak ada"
                    ? `Berlaku sampai: ${userData.subscriptionExpiry}`
                    : "Paket berlangganan aktif"}
                </p>
                <div className="flex items-center space-x-4 text-xs sm:text-sm font-bold text-slate-800">
                  {userData.subscription === "free" ? (
                    <>
                      <span>✅ 3 Tryout/bulan</span>
                      <span>❌ AI Analysis</span>
                      <span>❌ Mentor 24/7</span>
                    </>
                  ) : (
                    <>
                      <span>✅ Unlimited Tryout</span>
                      <span>✅ AI Analysis</span>
                      <span>✅ Mentor 24/7</span>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <button className="bg-slate-900 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-slate-800 transition-colors">
                  {userData.subscription === "free" ? "🚀 UPGRADE" : "📱 KELOLA LANGGANAN"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription History */}
        <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
            📋 Riwayat Langganan
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {subscriptionHistory.map((sub) => (
              <div
                key={sub.id}
                className="border-2 border-slate-800 p-3 sm:p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-black text-sm sm:text-base text-slate-900">
                        {sub.plan} Plan - {sub.duration}
                      </h3>
                      <div
                        className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${
                          sub.status === "active"
                            ? "bg-emerald-400 text-slate-900"
                            : "bg-gray-400 text-slate-900"
                        }`}
                      >
                        {sub.status === "active" ? "AKTIF" : "EXPIRED"}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-600">
                      📅 {sub.startDate} - {sub.endDate}
                    </div>
                  </div>
                  <div className="text-right mt-2 sm:mt-0">
                    <div className="font-black text-sm sm:text-base text-slate-900">
                      Rp {sub.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Options */}
        <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
            🚀 Upgrade Langganan
          </h2>

          <div className="text-center">
            <p className="text-sm sm:text-base font-bold text-slate-600 mb-4">
              Sudah menggunakan Premium Plan? Tetap bisa perpanjang dengan diskon khusus!
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 font-black text-sm sm:text-base uppercase border-3 border-slate-800 transform hover:-rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-brutal">
              🎯 PERPANJANG SEKARANG
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "settings") {
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Notification Settings */}
        <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
            🔔 Pengaturan Notifikasi
          </h2>

          <div className="space-y-4">
            {(Object.entries(preferences) as Array<[keyof Preferences, boolean]>).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 border-2 border-slate-800 bg-slate-50"
              >
                <div>
                  <h3 className="font-black text-sm text-slate-900 mb-1">
                    {key === "emailNotifications" && "📧 Email Notifications"}
                    {key === "pushNotifications" && "📱 Push Notifications"}
                    {key === "weeklyReport" && "📊 Weekly Report"}
                    {key === "studyReminder" && "📚 Study Reminder"}
                    {key === "examReminder" && "🎯 Exam Reminder"}
                    {key === "marketingEmails" && "📢 Marketing Emails"}
                  </h3>
                  <p className="text-xs text-slate-600 font-bold">
                    {key === "emailNotifications" && "Notifikasi melalui email"}
                    {key === "pushNotifications" && "Notifikasi push di device"}
                    {key === "weeklyReport" && "Laporan mingguan progress"}
                    {key === "studyReminder" && "Pengingat waktu belajar"}
                    {key === "examReminder" && "Pengingat jadwal ujian"}
                    {key === "marketingEmails" && "Email promosi dan penawaran"}
                  </p>
                </div>
                <button
                  onClick={() => onPreferenceChange(key)}
                  className={`w-12 h-6 border-2 border-slate-800 relative ${
                    value ? "bg-emerald-500" : "bg-gray-300"
                  } transition-colors`}
                >
                  <div
                    className={`w-4 h-4 bg-white border border-slate-800 absolute top-0.5 transition-transform ${
                      value ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
            🔐 Keamanan Akun
          </h2>

          <div className="space-y-4">
            <button className="w-full bg-blue-500 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-blue-600 transition-colors text-left">
              🔑 UBAH PASSWORD
            </button>

            <button className="w-full bg-emerald-500 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-emerald-600 transition-colors text-left">
              📱 AKTIFKAN 2FA
            </button>

            <button className="w-full bg-orange-500 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-orange-600 transition-colors text-left">
              📋 DOWNLOAD DATA SAYA
            </button>

            <button className="w-full bg-red-500 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-red-600 transition-colors text-left">
              🗑️ HAPUS AKUN
            </button>

            {/* Debug button - for fixing join date */}
            <button
              onClick={onRefreshUserData}
              className="w-full bg-purple-500 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-purple-600 transition-colors text-left"
            >
              🔄 REFRESH DATA USER (Debug)
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
            🚪 Logout
          </h2>

          <div className="text-center">
            <p className="text-sm font-bold text-slate-600 mb-4">Keluar dari akun PintuUniv</p>
            <button
              onClick={onLogout}
              className="bg-slate-900 text-white px-6 py-3 font-black text-sm uppercase border-3 border-slate-800 hover:bg-slate-800 transition-colors"
            >
              🔓 LOGOUT SEKARANG
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
