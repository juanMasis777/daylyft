"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import SplashScreen from "@/app/components/SplashScreen";
import "./globals.css";

export default function RootLayout({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const splashSeen = sessionStorage.getItem("daylyft-splash-seen");
      if (splashSeen) {
        setShowSplash(false);
      }
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("daylyft-splash-seen", "true");
    }
  };

  return (
    <html lang="en">
      <head>
        <title>DayLyft — Your AI copilot for life</title>
        <meta name="description" content="40+ features for productivity, wellness, finance, and more. Powered by Kai AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#080d0b" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DayLyft" />
      </head>
      <body>
        <ThemeProvider>
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}