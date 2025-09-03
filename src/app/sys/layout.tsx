import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Admin Dashboard - Pintu Universitas",
  description: "Admin dashboard untuk mengelola sistem Pintu Universitas",
};

export default function SysLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster 
        position="top-right"
        expand={true}
        richColors={true}
        closeButton={true}
        duration={4000}
      />
    </AuthProvider>
  );
}
