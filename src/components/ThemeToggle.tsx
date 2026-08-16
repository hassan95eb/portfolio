"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "ha-theme";

/**
 * The initial class is set by the inline script in the layout, so this
 * component only has to stay in sync with it — it never decides the theme
 * on first paint.
 */
export function ThemeToggle({ label }: { label: string }) {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setReady(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Private mode — the toggle still works for this session.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-main transition-colors hover:border-accent hover:text-accent"
    >
      {/* Render a stable icon until we know the real theme, to avoid a swap. */}
      {ready && dark ? <Sun size={16} /> : <Moon size={16} />}
      <span>{label}</span>
    </button>
  );
}
