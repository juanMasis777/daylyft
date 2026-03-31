"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
const [theme, setTheme] = useState("dark");

useEffect(() => {
const saved = localStorage.getItem("fm-theme");
if (saved) setTheme(saved);
}, []);

useEffect(() => {
document.documentElement.setAttribute("data-theme", theme);
localStorage.setItem("fm-theme", theme);
}, [theme]);

const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

return (
<ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
</ThemeContext.Provider>
);
}

export function useTheme() {
return useContext(ThemeContext);
}