"use client";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnimationProvider() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;

    // Remove hide CSS and clear previous page's visible state synchronously,
    // before the browser paints — this prevents the new page from flashing invisible.
    root.classList.remove("reveal-ready");
    document.querySelectorAll<HTMLElement>("[data-reveal].is-visible").forEach((el) => {
      el.classList.remove("is-visible");
    });

    const all = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!all.length) {
      root.classList.add("reveal-ready");
      return;
    }

    const vh = window.innerHeight;
    const inView = new Set<HTMLElement>();

    // Mark elements already in the viewport as visible before re-enabling the hide CSS
    all.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 1.1) {
        inView.add(el);
        el.classList.add("is-visible");
      }
    });

    // Re-enable opacity:0 only for elements that are off-screen
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const ms = parseInt(el.dataset.revealDelay ?? "0", 10);
          const show = () => el.classList.add("is-visible");
          ms > 0 ? setTimeout(show, ms) : show();
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    all.forEach((el) => {
      if (!inView.has(el)) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]); // Re-runs on every route change

  return null;
}
