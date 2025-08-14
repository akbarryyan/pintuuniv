"use client";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "overall", label: "🎯 Keseluruhan", icon: "🏆" },
    { id: "mathematics", label: "🔢 Matematika", icon: "📊" },
    { id: "science", label: "🧪 Saintek", icon: "🔬" },
    { id: "language", label: "📝 Bahasa", icon: "📚" },
  ];

  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-2 sm:p-3 shadow-brutal">
        <div className="flex overflow-x-auto space-x-1 sm:space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 sm:px-4 py-2 sm:py-3 font-black text-xs sm:text-sm uppercase border-2 sm:border-3 border-slate-800 transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white transform -rotate-1 -translate-y-1"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
