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
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Reset loading state when pathname changes
    setIsLoading(true);

    // Add smooth transition for page changes
    const handleRouteChange = () => {
      const mainContent = document.querySelector(
        "main[data-main-content]"
      ) as HTMLElement;
      if (mainContent) {
        // Add CSS classes for smooth transition
        mainContent.classList.add("page-content", "page-content-enter");

        // Remove any existing blur effects
        mainContent.style.filter = "none";

        // Reveal content after ensuring it's fully rendered
        const timer = setTimeout(() => {
          mainContent.classList.remove("page-content-enter");
          mainContent.classList.add("page-content-enter-active");
          setIsLoading(false);
        }, 150); // Increased timing to ensure content is ready

        return () => clearTimeout(timer);
      } else {
        // Fallback if no main content found
        setIsLoading(false);
      }
    };

    // Trigger transition
    handleRouteChange();
  }, [pathname]); // Re-run when pathname changes

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

    // Add blur effect to current content
    const mainContent = document.querySelector(
      "main[data-main-content]"
    ) as HTMLElement;
    const sidebarContent = document.querySelector(
      "[data-sidebar]"
    ) as HTMLElement;

    if (mainContent) {
      mainContent.style.filter = "blur(3px)";
      mainContent.style.transition = "filter 0.3s ease-in-out";
    }

    if (sidebarContent) {
      sidebarContent.style.filter = "blur(1px)";
      sidebarContent.style.transition = "filter 0.3s ease-in-out";
    }

    // Create elegant loading spinner
    const loadingOverlay = document.createElement("div");
    loadingOverlay.id = "navigation-loading";
    loadingOverlay.className = "navigation-loading navigation-loading-enter";
    loadingOverlay.innerHTML = `
      <div class="flex flex-col items-center space-y-4">
        <div class="relative">
          <div class="w-12 h-12 border-4 border-blue-100 rounded-full"></div>
          <div class="absolute inset-0 w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent loading-spinner"></div>
        </div>
        <div class="bg-white/95 backdrop-blur-sm rounded-full px-5 py-2 shadow-xl border border-gray-100">
          <p class="text-blue-600 text-sm font-semibold">Memuat halaman...</p>
        </div>
      </div>
    `;

    document.body.appendChild(loadingOverlay);

    // Trigger enter animation
    requestAnimationFrame(() => {
      loadingOverlay.classList.remove("navigation-loading-enter");
      loadingOverlay.classList.add("navigation-loading-enter-active");
    });

    // Wait a bit for loading to be visible
    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      // Start navigation
      const navigationPromise = router.push(href);

      // Wait for navigation to complete
      await navigationPromise;

      // Wait for new content to be rendered and ready
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      // Remove blur effects
      if (mainContent) {
        mainContent.style.filter = "none";
      }

      if (sidebarContent) {
        sidebarContent.style.filter = "none";
      }

      // Remove loading overlay with fade-out
      const overlay = document.getElementById("navigation-loading");
      if (overlay) {
        overlay.classList.remove("navigation-loading-enter-active");
        overlay.classList.add("navigation-loading-exit");

        requestAnimationFrame(() => {
          overlay.classList.add("navigation-loading-exit-active");
        });

        setTimeout(() => {
          overlay.remove();
        }, 200);
      }

      setIsNavigating(false);
    }
  };

  return { isNavigating, navigateWithAnimation };
}
