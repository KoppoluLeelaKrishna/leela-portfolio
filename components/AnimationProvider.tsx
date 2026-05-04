"use client";
import { useEffect } from "react";

export default function AnimationProvider() {
  useEffect(() => {
    const root = document.documentElement;
    const all = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!all.length) return;

    const vh = window.innerHeight;
    const inView = new Set<HTMLElement>();

    // Mark elements already in viewport as visible BEFORE enabling hide CSS
    // This prevents a flash where content goes invisible then visible again
    all.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 1.1) {
        inView.add(el);
        el.classList.add("is-visible");
      }
    });

    // Now enable the opacity-0 CSS for everything not yet visible
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
  }, []);

  return null;
}
