"use client";

import { createContext, useContext, useState, useEffect } from "react";

const themeVars = {
midnight: {
"--fm-bg": "#08080d", "--fm-surface": "#111118", "--fm-card": "#15151e",
"--fm-border": "#1c1c2a", "--fm-text": "#eaeaef", "--fm-muted": "#6b6b80",
"--fm-accent": "#6C5CE7", "--fm-accent-light": "#a29bfe",
"--fm-accent-glow": "rgba(108,92,231,0.25)", "--fm-teal": "#00CEC9",
"--fm-success": "#00CEC9", "--fm-warning": "#fdcb6e",
"--fm-danger": "#ff6b6b", "--fm-pink": "#fd79a8",
},
ocean: {
"--fm-bg": "#0a1628", "--fm-surface": "#111f35", "--fm-card": "#152640",
"--fm-border": "#1c3050", "--fm-text": "#e8eef6", "--fm-muted": "#6b8099",
"--fm-accent": "#378ADD", "--fm-accent-light": "#85B7EB",
"--fm-accent-glow": "rgba(55,138,221,0.25)", "--fm-teal": "#00CEC9",
"--fm-success": "#00CEC9", "--fm-warning": "#fdcb6e",
"--fm-danger": "#ff6b6b", "--fm-pink": "#fd79a8",
},
forest: {
"--fm-bg": "#0d1f17", "--fm-surface": "#122b20", "--fm-card": "#16352a",
"--fm-border": "#1e4435", "--fm-text": "#e8f5ee", "--fm-muted": "#6b9980",
"--fm-accent": "#1D9E75", "--fm-accent-light": "#5DCAA5",
"--fm-accent-glow": "rgba(29,158,117,0.25)", "--fm-teal": "#00CEC9",
"--fm-success": "#00CEC9", "--fm-warning": "#fdcb6e",
"--fm-danger": "#ff6b6b", "--fm-pink": "#fd79a8",
},
rose: {
"--fm-bg": "#1e0d1a", "--fm-surface": "#2a1424", "--fm-card": "#33192e",
"--fm-border": "#44213c", "--fm-text": "#f5e8f0", "--fm-muted": "#99708a",
"--fm-accent": "#D4537E", "--fm-accent-light": "#ED93B1",
"--fm-accent-glow": "rgba(212,83,126,0.25)", "--fm-teal": "#00CEC9",
"--fm-success": "#00CEC9", "--fm-warning": "#fdcb6e",
"--fm-danger": "#ff6b6b", "--fm-pink": "#fd79a8",
},
snow: {
"--fm-bg": "#f5f5f7", "--fm-surface": "#ffffff", "--fm-card": "#f0f0f3",
"--fm-border": "#e0e0e6", "--fm-text": "#1a1a2e", "--fm-muted": "#8888a0",
"--fm-accent": "#6C5CE7", "--fm-accent-light": "#6C5CE7",
"--fm-accent-glow": "rgba(108,92,231,0.15)", "--fm-teal": "#00b3ad",
"--fm-success": "#00b894", "--fm-warning": "#e5a800",
"--fm-danger": "#e24b4a", "--fm-pink": "#d4537e",
},
amber: {
"--fm-bg": "#1a150d", "--fm-surface": "#251e12", "--fm-card": "#2e2518",
"--fm-border": "#3d3220", "--fm-text": "#f5eeda", "--fm-muted": "#998a6b",
"--fm-accent": "#BA7517", "--fm-accent-light": "#FAC775",
"--fm-accent-glow": "rgba(186,117,23,0.25)", "--fm-teal": "#00CEC9",
"--fm-success": "#00CEC9", "--fm-warning": "#fdcb6e",
"--fm-danger": "#ff6b6b", "--fm-pink": "#fd79a8",
},
sunset: {
"--fm-bg": "#1a100d", "--fm-surface": "#261810", "--fm-card": "#2e1e16",
"--fm-border": "#3d2a1e", "--fm-text": "#f5ece7", "--fm-muted": "#99796b",
"--fm-accent": "#D85A30", "--fm-accent-light": "#F0997B",
"--fm-accent-glow": "rgba(216,90,48,0.25)", "--fm-teal": "#00CEC9",
"--fm-success": "#00CEC9", "--fm-warning": "#fdcb6e",
"--fm-danger": "#ff6b6b", "--fm-pink": "#fd79a8",
},
};

const themes = [
{ id: "midnight", name: "Midnight", color: "#6C5CE7", bg: "#08080d", free: true },
{ id: "ocean",    name: "Ocean",    color: "#378ADD", bg: "#0a1628", free: false },
{ id: "forest",   name: "Forest",   color: "#1D9E75", bg: "#0d1f17", free: false },
{ id: "rose",     name: "Rose",     color: "#D4537E", bg: "#1e0d1a", free: false },
{ id: "snow",     name: "Snow",     color: "#6C5CE7", bg: "#f5f5f7", free: true },
{ id: "amber",    name: "Amber",    color: "#BA7517", bg: "#1a150d", free: false },
{ id: "sunset",   name: "Sunset",   color: "#D85A30", bg: "#1a100d", free: false },
];

const ThemeContext = createContext();

function applyTheme(themeId) {
const vars = themeVars[themeId];
if (!vars) return;
const root = document.documentElement;
Object.entries(vars).forEach(([key, val]) => root.style.setProperty(key, val));
root.setAttribute("data-theme", themeId);
localStorage.setItem("fm-theme", themeId);
}

export function ThemeProvider({ children }) {
const [theme, setThemeState] = useState("midnight");

useEffect(() => {
const saved = localStorage.getItem("fm-theme") || "midnight";
setThemeState(saved);
applyTheme(saved);
}, []);

const setTheme = (themeId) => {
setThemeState(themeId);
applyTheme(themeId);
};

const toggleTheme = () => {
const currentIndex = themes.findIndex((t) => t.id === theme);
const next = themes[(currentIndex + 1) % themes.length];
setTheme(next.id);
};

return (
<ThemeContext.Provider value={{ theme, setTheme, toggleTheme, themes }}>
    {children}
</ThemeContext.Provider>
);
}

export function useTheme() {
return useContext(ThemeContext);
}