"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/lib/supabase";

function Logo() {
  return (
    <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="8" r="3" fill="white" />
        <circle cx="16" cy="14" r="3" fill="white" />
        <line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const navItems = [
  { id: "dashboard", label: "Home", color: "#6C5CE7", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  { id: "tasks", label: "Tasks", color: "#00CEC9", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 12l2 2 4-4" /></svg> },
  { id: "calendar", label: "Calendar", color: "#fd79a8", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
  { id: "analytics", label: "Analytics", color: "#fdcb6e", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> },
  { id: "journal", label: "Journal", color: "#00b894", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg> },
  { id: "dna", label: "DNA", color: "#e17055", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 15c6.667-6 13.333 0 20-6" /><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" /><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" /><path d="M2 9c6.667 6 13.333 0 20 6" /></svg> },
  { id: "zen", label: "Zen", color: "#74b9ff", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg> },
  { id: "chat", label: "Kai", color: "#a29bfe", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
  { id: "autopilot", label: "Autopilot", color: "#ff6b6b", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
  { id: "wins", label: "Wins", color: "#ffc048", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 9 7 12 7s5-3 7.5-3a2.5 2.5 0 0 1 0 5H18" /><path d="M18 9v1a6 6 0 0 1-12 0V9" /><line x1="12" y1="16" x2="12" y2="21" /><line x1="8" y1="21" x2="16" y2="21" /></svg> },
  { id: "balance", label: "Balance", color: "#55efc4", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg> },
  { id: "wisdom", label: "Wisdom", color: "#fd79a8", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" /></svg> },
  { id: "family", label: "Family", color: "#00CEC9", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
  { id: "habits", label: "Habits", color: "#e84393", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> },
  { id: "pomodoro", label: "Pomodoro", color: "#ff6348", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2" /><path d="M12 5V3" /><path d="M9 3h6" /></svg> },
  { id: "nightreport", label: "Night", color: "#74b9ff", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg> },
  { id: "goals", label: "Goals", color: "#fdcb6e", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg> },
  { id: "focus", label: "Focus", color: "#00b894", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  { id: "energy", label: "Energy", color: "#f9ca24", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> },
  { id: "budget", label: "Budget", color: "#00b894", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg> },
  { id: "checklist", label: "Checklist", color: "#fdcb6e", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg> },
  { id: "notes", label: "Notes", color: "#a29bfe", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> },
  { id: "water", label: "Water", color: "#74b9ff", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg> },
  { id: "gratitude", label: "Gratitude", color: "#00CEC9", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> },
  { id: "challenge", label: "Challenge", color: "#e17055", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg> },
  { id: "decision", label: "Decision", color: "#6C5CE7", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg> },
  { id: "ideas", label: "Ideas", color: "#fdcb6e", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" /></svg> },
  { id: "reading", label: "Reading", color: "#e17055", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg> },
  { id: "savings", label: "Savings", color: "#00b894", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2" /><path d="M2 9.1C1.5 11 2 14 2 14" /></svg> },
  { id: "countdown", label: "Countdown", color: "#e17055", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
  { id: "sleep", label: "Sleep", color: "#a29bfe", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /><path d="M14 11l2-2 2 2" /><path d="M18 13v-4" /></svg> },
  { id: "links", label: "Links", color: "#74b9ff", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg> },
  { id: "workout", label: "Workout", color: "#e17055", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6.5 6.5L17.5 17.5" /><path d="M3 10l1-1 3 3" /><path d="M21 14l-1 1-3-3" /><path d="M14 3l1 1-3 3" /><path d="M10 21l-1-1 3-3" /></svg> },
  { id: "bills", label: "Bills", color: "#e17055", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg> },
  { id: "flashcards", label: "Flashcards", color: "#fdcb6e", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M12 4v16" /><path d="M2 12h20" /></svg> },
  { id: "settings", label: "Settings", color: "#636e72", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg> },
];

const sidebarItems = [
  ...navItems.slice(0, 4),
  { id: "team", label: "Team", color: "#dfe6e9", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
  ...navItems.slice(4),
];

export default function DashboardLayout({ children }) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const { theme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = "/login"; return; }
      setUser(session.user);
      setLoading(false);
    };
    checkUser();
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/dashboard") setActiveNav("dashboard");
    else if (path.includes("tasks")) setActiveNav("tasks");
    else if (path.includes("calendar")) setActiveNav("calendar");
    else if (path.includes("analytics")) setActiveNav("analytics");
    else if (path.includes("team")) setActiveNav("team");
    else if (path.includes("zen")) setActiveNav("zen");
    else if (path.includes("chat")) setActiveNav("chat");
    else if (path.includes("settings")) setActiveNav("settings");
    else if (path.includes("journal")) setActiveNav("journal");
    else if (path.includes("dna")) setActiveNav("dna");
    else if (path.includes("autopilot")) setActiveNav("autopilot");
    else if (path.includes("wins")) setActiveNav("wins");
    else if (path.includes("balance")) setActiveNav("balance");
    else if (path.includes("wisdom")) setActiveNav("wisdom");
    else if (path.includes("family")) setActiveNav("family");
    else if (path.includes("habits")) setActiveNav("habits");
    else if (path.includes("pomodoro")) setActiveNav("pomodoro");
    else if (path.includes("nightreport")) setActiveNav("nightreport");
    else if (path.includes("goals")) setActiveNav("goals");
    else if (path.includes("focus")) setActiveNav("focus");
    else if (path.includes("energy")) setActiveNav("energy");
    else if (path.includes("budget")) setActiveNav("budget");
    else if (path.includes("checklist")) setActiveNav("checklist");
    else if (path.includes("notes")) setActiveNav("notes");
    else if (path.includes("water")) setActiveNav("water");
    else if (path.includes("gratitude")) setActiveNav("gratitude");
    else if (path.includes("challenge")) setActiveNav("challenge");
    else if (path.includes("decision")) setActiveNav("decision");
    else if (path.includes("ideas")) setActiveNav("ideas");
    else if (path.includes("reading")) setActiveNav("reading");
    else if (path.includes("savings")) setActiveNav("savings");
    else if (path.includes("countdown")) setActiveNav("countdown");
    else if (path.includes("sleep")) setActiveNav("sleep");
    else if (path.includes("links")) setActiveNav("links");
    else if (path.includes("workout")) setActiveNav("workout");
    else if (path.includes("bills")) setActiveNav("bills");
    else if (path.includes("flashcards")) setActiveNav("flashcards");
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const navigate = (id) => {
    setActiveNav(id);
    setMenuOpen(false);
    const routes = {
      dashboard: "/dashboard",
      tasks: "/dashboard/tasks",
      analytics: "/dashboard/analytics",
      zen: "/dashboard/zen",
      calendar: "/dashboard/calendar",
      team: "/dashboard/team",
      chat: "/dashboard/chat",
      settings: "/dashboard/settings",
      journal: "/dashboard/journal",
      dna: "/dashboard/dna",
      autopilot: "/dashboard/autopilot",
      wins: "/dashboard/wins",
      balance: "/dashboard/balance",
      wisdom: "/dashboard/wisdom",
      family: "/dashboard/family",
      habits: "/dashboard/habits",
      pomodoro: "/dashboard/pomodoro",
      nightreport: "/dashboard/nightreport",
      goals: "/dashboard/goals",
      focus: "/dashboard/focus",
      energy: "/dashboard/energy",
      budget: "/dashboard/budget",
      checklist: "/dashboard/checklist",
      notes: "/dashboard/notes",
      water: "/dashboard/water",
      gratitude: "/dashboard/gratitude",
      challenge: "/dashboard/challenge",
      decision: "/dashboard/decision",
      ideas: "/dashboard/ideas",
      reading: "/dashboard/reading",
      savings: "/dashboard/savings",
      countdown: "/dashboard/countdown",
      sleep: "/dashboard/sleep",
      links: "/dashboard/links",
      workout: "/dashboard/workout",
      bills: "/dashboard/bills",
      flashcards: "/dashboard/flashcards",
    };
    window.location.href = routes[id] || "/dashboard";
  };

  if (loading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--fm-bg)" }}>
        <div style={{ textAlign: "center" }}>
          <Logo />
          <p style={{ color: "var(--fm-muted)", fontSize: 14, marginTop: 12 }}>Loading DayLyft...</p>
        </div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userInitials = userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const renderSidebar = (items) => (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px", marginBottom: 28 }}>
        <Logo />
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DayLyft</div>
          <div style={{ fontSize: 9, color: "var(--fm-muted)", fontWeight: 500, letterSpacing: "0.08em" }}>AI COPILOT</div>
        </div>
        {isMobile && (
          <div onClick={() => setMenuOpen(false)} style={{ marginLeft: "auto", cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </div>
        )}
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, overflowY: "auto" }}>
        {items.map((item) => (
          <button key={item.id} onClick={() => navigate(item.id)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
            background: activeNav === item.id ? `${item.color}15` : "transparent",
            border: activeNav === item.id ? `1px solid ${item.color}30` : "1px solid transparent",
            borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 500,
            color: activeNav === item.id ? item.color : "var(--fm-muted)",
            fontFamily: "Outfit, sans-serif", width: "100%", textAlign: "left",
          }}>
            <span style={{ color: activeNav === item.id ? item.color : item.color + "90" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "transparent", border: "1px solid transparent", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 500, color: "var(--fm-danger)", fontFamily: "Outfit, sans-serif", width: "100%", textAlign: "left", marginBottom: 10 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
        Log out
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, background: "var(--fm-card)", borderRadius: 12, border: "1px solid var(--fm-border)" }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #fd79a8, #e84393)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>{userInitials}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-text)" }}>{userName}</div>
          <div style={{ fontSize: 10, color: "var(--fm-accent-light)" }}>Free plan</div>
        </div>
      </div>
    </>
  );

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {!isMobile && (
        <div style={{ width: 220, background: "var(--fm-surface)", borderRight: "1px solid var(--fm-border)", display: "flex", flexDirection: "column", padding: "20px 12px", flexShrink: 0 }}>
          {renderSidebar(sidebarItems)}
        </div>
      )}

      {isMobile && menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200 }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            position: "fixed", top: 0, left: 0, bottom: 0, width: 260,
            background: "var(--fm-surface)", padding: "20px 12px",
            display: "flex", flexDirection: "column", zIndex: 201,
            boxShadow: "4px 0 20px rgba(0,0,0,0.3)",
            animation: "slideInLeft 0.25s ease",
          }}>
            {renderSidebar(navItems)}
          </div>
        </div>
      )}

      <style>{`@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>

      <div style={{ flex: 1, overflowY: "auto", background: "var(--fm-bg)" }}>
        <div style={{ padding: isMobile ? "14px 16px" : "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--fm-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {isMobile && (
              <div onClick={() => setMenuOpen(true)} style={{ padding: "6px 12px", borderRadius: 10, border: "1px solid var(--fm-border)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", color: "var(--fm-muted)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>Menu</span>
              </div>
            )}
            <div>
              <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, color: "var(--fm-text)" }}>
                {`${greeting}, ${userName.split(" ")[0]}`}
              </div>
              <div style={{ fontSize: isMobile ? 11 : 13, color: "var(--fm-muted)" }}>
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div onClick={toggleTheme} style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--fm-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fm-muted)", cursor: "pointer" }}>
              {theme === "snow" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              )}
            </div>
            {isMobile && (
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #fd79a8, #e84393)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{userInitials}</div>
            )}
          </div>
        </div>
        <div style={{ padding: isMobile ? "14px 16px" : "24px 28px" }}>{children}</div>
      </div>
    </div>
  );
}