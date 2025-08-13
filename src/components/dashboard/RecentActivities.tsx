"use client";

import Link from "next/link";

interface Activity {
  id: number;
  title: string;
  date: string;
  type: string;
  score?: number;
  status?: string;
  progress?: number;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export default function RecentActivities({
  activities,
}: RecentActivitiesProps) {
  return (
    <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
          📊 Aktivitas Terbaru
        </h2>
        <Link
          href="/activities"
          className="bg-blue-500 text-white px-3 sm:px-4 py-2 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-blue-600 transition-colors text-center sm:text-left"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="border-2 border-slate-800 p-3 sm:p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-0">
                <div className="flex items-start space-x-3 flex-1">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 border-2 border-slate-800 flex items-center justify-center font-black text-sm sm:text-base ${
                      activity.type === "tryout"
                        ? "bg-orange-400"
                        : "bg-emerald-400"
                    }`}
                  >
                    {activity.type === "tryout" ? "📝" : "📚"}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-sm sm:text-base text-slate-900 mb-1 leading-tight">
                      {activity.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-bold">
                      {activity.date}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  {activity.type === "tryout" ? (
                    <div className="bg-blue-500 text-white px-2 sm:px-3 py-1 border-2 border-slate-800 font-black text-xs sm:text-sm inline-block">
                      Skor: {activity.score}
                    </div>
                  ) : (
                    <div
                      className={`px-2 sm:px-3 py-1 border-2 border-slate-800 font-black text-xs sm:text-sm inline-block ${
                        activity.status === "completed"
                          ? "bg-emerald-500 text-white"
                          : "bg-yellow-400 text-slate-900"
                      }`}
                    >
                      {activity.status === "completed"
                        ? "Selesai"
                        : `${activity.progress}%`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-slate-200 border-3 border-slate-800 mx-auto mb-4 flex items-center justify-center text-2xl">
              📊
            </div>
            <h3 className="font-black text-lg text-slate-900 mb-2">
              Belum Ada Aktivitas
            </h3>
            <p className="text-slate-600 font-bold mb-4">
              Mulai tryout atau pelajari materi untuk melihat aktivitas terbaru
              kamu!
            </p>
            <Link
              href="/tryouts"
              className="inline-block bg-orange-500 text-white px-4 py-2 font-black text-sm border-2 border-slate-800 hover:bg-orange-600 transition-colors"
            >
              🚀 Mulai Tryout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
