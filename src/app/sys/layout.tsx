import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Pintu Universitas",
  description: "Admin dashboard untuk mengelola sistem Pintu Universitas",
};

export default function SysLayout({ children }: { children: React.ReactNode }) {
  return children;
}
