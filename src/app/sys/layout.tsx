import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin Dashboard - Pintu Universitas",
  description: "Admin dashboard untuk mengelola sistem Pintu Universitas",
};

export default function SysLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster 
        position="top-right"
        expand={true}
        richColors={true}
        closeButton={true}
        duration={4000}
      />
    </>
  );
}
