"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export const LoadingSpinner = ({
  size = "md",
  text = "Memuat...",
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
      {text && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  );
};

interface PageLoadingProps {
  isLoading: boolean;
}

export const PageLoading = ({ isLoading }: PageLoadingProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-600 text-sm">Memuat halaman...</p>
      </div>
    </div>
  );
};

export const SmoothTransition = ({
  children,
  isNavigating,
}: {
  children: React.ReactNode;
  isNavigating: boolean;
}) => {
  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isNavigating
          ? "opacity-60 scale-[0.98] blur-[1px]"
          : "opacity-100 scale-100 blur-0"
      }`}
    >
      {children}
    </div>
  );
};
