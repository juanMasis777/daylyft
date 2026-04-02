
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "FlowMind — AI Copilot for Productivity",
  description: "Your AI copilot that organizes your day, learns your patterns, and helps you achieve more.",
  manifest: "/manifest.json",
  themeColor: "#6C5CE7",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FlowMind",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#6C5CE7",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}