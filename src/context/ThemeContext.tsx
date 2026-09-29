import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "app_theme";

// Sprig's default CSS variable values (light) as shipped by the SDK today.
// Sourced from the installed @sprig-technologies/sprig-browser package.
const LIGHT_VARS: Record<string, string> = {
  "--background-color": "#fff",
  "--background-color-darker": "#f7f7f7",
  "--text-color": "#000",
  "--text-color-light": "#8f8f8f",
  "--text-color-lighter": "#a8a8a8",
  "--border-color": "#e6e6e6",
  "--border-color-heavy": "#ebebeb",
  "--button-disabled-background": "#f2f2f2",
  "--button-disabled-text-color": "#a8a8a8",
  "--sprig-logo-background": "#f9c600",
  "--progress-bar-background": "rgba(0, 0, 0, .1)",
  "--prototype-button-background": "rgba(0, 0, 0, .01)",
  "--thank-you-link-background": "rgba(0, 0, 0, .01)",
  "--thank-you-link-background-hover": "rgba(0, 0, 0, .03)",
  "--selection-border-color": "#c2c2c2",
  "--selection-background-color": "#f2f2f2",
  "--selection-background-color-hover": "#e6e6e6",
  "--selection-indicator-color": "#a8a8a8",
  "--selection-indicator-color-selected": "#000",
  "--matrix-header-background": "#f7f7f7",
  "--nps-unselected": "#fcfcfc",
  "--nps-unselected-border": "#e6e6e6",
  "--nps-selected-color-low": "#f44336",
  "--nps-selected-color-high": "#4caf50",
  "--rank-order-background": "#f2f2f2",
  "--rank-order-border": "#e6e6e6",
  "--rank-order-border-hover": "#d9d9d9",
  "--rank-order-number-background": "#fff",
  "--record-task-background": "#f2f2f2",
  "--record-task-border": "#e6e6e6",
  "--record-task-border-hover": "#d9d9d9",
  "--record-task-number-background": "#fff",
  "--select-border": "#e6e6e6",
  "--select-border-hover": "#d9d9d9",
  "--select-background": "#fff",
  "--select-background-hover": "#f2f2f2",
  "--voice-video-background": "#f2f2f2",
  "--voice-video-border": "#e6e6e6",
  "--voice-video-border-hover": "#d9d9d9",
  "--voice-video-icon-color": "#a8a8a8",
  "--likert-symbol-color": "transparent",
  "--sprig-brand-color": "#000000",
};

// Hand-authored dark counterparts, for testing a customer-style dark-mode
// override delivered via applyStyles.
const DARK_VARS: Record<string, string> = {
  "--background-color": "#1c1c1e",
  "--background-color-darker": "#141416",
  "--text-color": "#f5f5f5",
  "--text-color-light": "#a8a8ad",
  "--text-color-lighter": "#7a7a80",
  "--border-color": "#3a3a3d",
  "--border-color-heavy": "#48484b",
  "--button-disabled-background": "#2c2c2e",
  "--button-disabled-text-color": "#6e6e73",
  "--sprig-logo-background": "#f9c600",
  "--progress-bar-background": "rgba(255, 255, 255, .15)",
  "--prototype-button-background": "rgba(255, 255, 255, .04)",
  "--thank-you-link-background": "rgba(255, 255, 255, .04)",
  "--thank-you-link-background-hover": "rgba(255, 255, 255, .08)",
  "--selection-border-color": "#5a5a5e",
  "--selection-background-color": "#2c2c2e",
  "--selection-background-color-hover": "#3a3a3d",
  "--selection-indicator-color": "#8e8e93",
  "--selection-indicator-color-selected": "#fff",
  "--matrix-header-background": "#202022",
  "--nps-unselected": "#2c2c2e",
  "--nps-unselected-border": "#3a3a3d",
  "--nps-selected-color-low": "#ff453a",
  "--nps-selected-color-high": "#32d74b",
  "--rank-order-background": "#2c2c2e",
  "--rank-order-border": "#3a3a3d",
  "--rank-order-border-hover": "#48484b",
  "--rank-order-number-background": "#1c1c1e",
  "--record-task-background": "#2c2c2e",
  "--record-task-border": "#3a3a3d",
  "--record-task-border-hover": "#48484b",
  "--record-task-number-background": "#1c1c1e",
  "--select-border": "#3a3a3d",
  "--select-border-hover": "#48484b",
  "--select-background": "#1c1c1e",
  "--select-background-hover": "#2c2c2e",
  "--voice-video-background": "#2c2c2e",
  "--voice-video-border": "#3a3a3d",
  "--voice-video-border-hover": "#48484b",
  "--voice-video-icon-color": "#8e8e93",
  "--likert-symbol-color": "transparent",
  "--sprig-brand-color": "#ffffff",
};

// applyStyles calls are not additive - each call must carry the full
// variable set, since it fully replaces whatever was injected before.
function buildSprigStyles(theme: Theme): string {
  const vars = theme === "dark" ? DARK_VARS : LIGHT_VARS;
  const declarations = Object.entries(vars)
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ");
  return `:root { ${declarations} }`;
}

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Re-applied on every theme change, live-patching any survey on screen.
    window.Sprig?.applyStyles(buildSprigStyles(theme));
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
};
