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

    setIsNavigating(true);

    // Add smooth transition effect
    const mainContent = document.querySelector("main");
    const sidebar = document.querySelector("[data-sidebar]");

    if (mainContent) {
      // Phase 1: Fade out current content
      mainContent.style.opacity = "0.4";
      mainContent.style.transform = "translateX(10px) scale(0.98)";
      mainContent.style.filter = "blur(1px)";
      mainContent.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    }

    if (sidebar) {
      // Add subtle sidebar animation
      sidebar.classList.add("border-r-2", "border-blue-200");
    }

    // Wait for animation to complete before navigation
    await new Promise((resolve) => setTimeout(resolve, 150));

    try {
      // Navigate to new page
      router.push(href);

      // Wait for navigation to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Phase 2: Fade in new content
      if (mainContent) {
        mainContent.style.opacity = "1";
        mainContent.style.transform = "translateX(0) scale(1)";
        mainContent.style.filter = "blur(0)";
      }

      if (sidebar) {
        sidebar.classList.remove("border-r-2", "border-blue-200");
      }
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsNavigating(false);
    }
  };

  return { isNavigating, navigateWithAnimation };
}
