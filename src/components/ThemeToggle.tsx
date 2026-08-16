"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "ha-theme";

/**
 * The inline script in the layout already decided the theme before paint, so
 * this component's only job is to stay in sync with it and flip it on click.
 * It must not compute the theme itself during render: on the server there is no
 * localStorage, so any guess would differ from the markup the browser is
 * already showing and React would report a hydration mismatch.
 */
export function ThemeToggle({
  className = "",
  toLight,
  toDark,
}: {
  className?: string;
  /** Label used when the current theme is dark. */
  toLight: string;
  /** Label used when the current theme is light. */
  toDark: string;
}) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Private browsing blocks writes; the toggle still works for this session.
    }
  }

  const label = isDark ? toLight : toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid h-10 w-10 place-items-center rounded-md border border-border text-text-main transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {/* Until mounted the real theme is unknown, so render a fixed icon to
          keep server and client markup identical. */}
      {mounted && isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
