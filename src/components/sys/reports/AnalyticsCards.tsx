"use client";

import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  BookOpen,
  DollarSign,
} from "lucide-react";

interface AnalyticsCard {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  icon: React.ReactNode;
  color: string;
}

interface AnalyticsCardsProps {
  selectedPeriod: string;
}

export const AnalyticsCards = ({ selectedPeriod }: AnalyticsCardsProps) => {
  const analyticsCards: AnalyticsCard[] = [
    {
      title: "Total Pengguna",
      value: "1,234",
      change: "+12.5%",
      changeType: "increase",
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Tryout Selesai",
      value: "856",
      change: "+8.2%",
      changeType: "increase",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      title: "Total Revenue",
      value: "Rp 45.6M",
      change: "+15.3%",
      changeType: "increase",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-emerald-500",
    },
    {
      title: "Conversion Rate",
      value: "23.4%",
      change: "-2.1%",
      changeType: "decrease",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {analyticsCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>
              <div className="flex items-center mt-2">
                {card.changeType === "increase" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : card.changeType === "decrease" ? (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                ) : (
                  <Activity className="w-4 h-4 text-gray-500 mr-1" />
                )}
                <span
                  className={`text-sm font-medium ${
                    card.changeType === "increase"
                      ? "text-green-600"
                      : card.changeType === "decrease"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {card.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  dari periode sebelumnya
                </span>
              </div>
            </div>
            <div className={`${card.color} p-3 rounded-lg text-white`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
