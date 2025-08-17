"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useActiveItem(setActiveItem: (item: string) => void) {
  const pathname = usePathname();

  useEffect(() => {
    // Extract the last segment of the path to determine active item
    const pathSegments = pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Map the path to the correct active item
    if (pathname === "/sys/dashboard") {
      setActiveItem("dashboard");
    } else if (pathname.includes("/users")) {
      setActiveItem("users");
    } else if (pathname.includes("/tryouts")) {
      setActiveItem("tryouts");
    } else if (pathname.includes("/payments")) {
      setActiveItem("payments");
    } else if (pathname.includes("/reports")) {
      setActiveItem("reports");
    } else if (pathname.includes("/settings")) {
      setActiveItem("settings");
    } else {
      setActiveItem(lastSegment || "dashboard");
    }
  }, [pathname, setActiveItem]);
}

export function usePageTransition() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add smooth transition for page changes
    const handleRouteChange = () => {
      const mainContent = document.querySelector("main");
      if (mainContent) {
        // Start with loading state
        setIsLoading(true);
        mainContent.style.opacity = "0";
        mainContent.style.transform = "translateY(20px)";
        mainContent.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

        // Reset after content loads
        setTimeout(() => {
          mainContent.style.opacity = "1";
          mainContent.style.transform = "translateY(0)";
          setIsLoading(false);
        }, 200);
      }
    };

    // Trigger transition on component mount
    handleRouteChange();
  }, []);

  return { isLoading };
}

export function useSmoothNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigateWithAnimation = async (href: string) => {
    // Don't navigate if already on the same page
    if (pathname === href) return;

    // Prevent multiple clicks
    if (isNavigating) return;

    setIsNavigating(true);

    // Create and show loading overlay
    const loadingOverlay = document.createElement("div");
    loadingOverlay.id = "navigation-loading";
    loadingOverlay.className =
      "fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center";
    loadingOverlay.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center space-y-4 animate-pulse">
        <div class="relative">
          <div class="w-8 h-8 border-4 border-blue-200 rounded-full"></div>
          <div class="absolute inset-0 w-8 h-8 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p class="text-gray-600 text-sm">Memuat halaman...</p>
      </div>
    `;

    document.body.appendChild(loadingOverlay);

    // Add fade-in animation to overlay
    requestAnimationFrame(() => {
      loadingOverlay.style.opacity = "0";
      loadingOverlay.style.transition = "opacity 0.2s ease-in-out";
      requestAnimationFrame(() => {
        loadingOverlay.style.opacity = "1";
      });
    });

    try {
      // Navigate to new page
      await router.push(href);

      // Ensure minimum loading time for smooth UX
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      // Remove loading overlay
      const overlay = document.getElementById("navigation-loading");
      if (overlay) {
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.remove();
        }, 200);
      }

      setIsNavigating(false);
    }
  };

  return { isNavigating, navigateWithAnimation };
}
