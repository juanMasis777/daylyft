"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/lib/supabase";
import Onboarding from "@/app/components/Onboarding";
import { ProGate, isProFeature } from "@/app/components/ProGate";

function Logo() {
  return (
    <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #10b981, #34d399)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 14l7-7 7 7" />
        <path d="M5 19h14" />
      </svg>
    </div>
  );
}

const navGroups = [
  {
    label: "Core",
    items: [
      { id: "dashboard", label: "Home", color: "#10b981", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
      { id: "tasks", label: "Tasks", color: "#00CEC9", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 12l2 2 4-4" /></svg> },
      { id: "calendar", label: "Calendar", color: "#fd79a8", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
      { id: "analytics", label: "Analytics", color: "#fdcb6e", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>, pro: true },
    ],
  },
  {
    label: "AI Copilot",
    items: [
      { id: "chat", label: "Kai Chat", color: "#34d399", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
      { id: "autopilot", label: "Autopilot", color: "#ff6b6b", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>, pro: true },
      { id: "dna", label: "DNA", color: "#e17055", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 15c6.667-6 13.333 0 20-6" /><path d="M2 9c6.667 6 13.333 0 20 6" /></svg>, pro: true },
      { id: "wins", label: "Wins", color: "#ffc048", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 9 7 12 7s5-3 7.5-3a2.5 2.5 0 0 1 0 5H18" /><path d="M18 9v1a6 6 0 0 1-12 0V9" /></svg>, pro: true },
      { id: "nightreport", label: "Night Report", color: "#74b9ff", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>, pro: true },
      { id: "wisdom", label: "Wisdom", color: "#fd79a8", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" /></svg>, pro: true },
      { id: "decision", label: "Decision", color: "#10b981", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>, pro: true },
      { id: "emails", label: "Emails", color: "#74b9ff", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22 6 12 13 2 6" /></svg>, pro: true },
    ],
  },
  {
    label: "Focus",
    items: [
      { id: "pomodoro", label: "Pomodoro", color: "#ff6348", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2" /><path d="M12 5V3" /><path d="M9 3h6" /></svg> },
      { id: "focus", label: "Focus Shield", color: "#00b894", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, pro: true },
      { id: "energy", label: "Energy Map", color: "#f9ca24", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>, pro: true },
    ],
  },
  {
    label: "Wellness",
    items: [
      { id: "zen", label: "Zen Mode", color: "#74b9ff", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /></svg> },
      { id: "water", label: "Water", color: "#74b9ff", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg> },
      { id: "sleep", label: "Sleep", color: "#34d399", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>, pro: true },
      { id: "stretching", label: "Stretch", color: "#00CEC9", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 0 1-6 6" /><path d="M6 16a6 6 0 0 1 6-6" /></svg>, pro: true },
      { id: "workout", label: "Workout", color: "#e17055", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6.5 6.5L17.5 17.5" /><path d="M3 10l1-1 3 3" /><path d="M21 14l-1 1-3-3" /></svg>, pro: true },
      { id: "gratitude", label: "Gratitude", color: "#00CEC9", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 0 0 0-7.78z" /></svg> },
      { id: "challenge", label: "Challenge", color: "#e17055", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>, pro: true },
    ],
  },
  {
    label: "Life",
    items: [
      { id: "journal", label: "Journal", color: "#00b894", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>, pro: true },
      { id: "habits", label: "Habits", color: "#e84393", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>, pro: true },
      { id: "checklist", label: "Checklist", color: "#fdcb6e", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg> },
      { id: "goals", label: "Goals", color: "#fdcb6e", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>, pro: true },
      { id: "balance", label: "Balance", color: "#55efc4", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>, pro: true },
      { id: "family", label: "Family", color: "#00CEC9", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>, pro: true },
    ],
  },
  {
    label: "Finance",
    items: [
      { id: "budget", label: "Budget", color: "#00b894", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, pro: true },
      { id: "savings", label: "Savings", color: "#00b894", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2" /></svg>, pro: true },
      { id: "bills", label: "Bills", color: "#e17055", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>, pro: true },
    ],
  },
  {
    label: "Learn & Plan",
    items: [
      { id: "notes", label: "Notes", color: "#34d399", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
      { id: "ideas", label: "Ideas", color: "#fdcb6e", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" /></svg>, pro: true },
      { id: "reading", label: "Reading", color: "#e17055", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>, pro: true },
      { id: "flashcards", label: "Flashcards", color: "#fdcb6e", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M12 4v16" /></svg>, pro: true },
      { id: "links", label: "Links", color: "#74b9ff", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg> },
      { id: "countdown", label: "Countdown", color: "#e17055", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
      { id: "gifts", label: "Gifts", color: "#fd79a8", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /></svg>, pro: true },
    ],
  },
];

const allRoutes = {
  dashboard: "/dashboard", tasks: "/dashboard/tasks", analytics: "/dashboard/analytics",
  zen: "/dashboard/zen", calendar: "/dashboard/calendar", team: "/dashboard/team",
  chat: "/dashboard/chat", settings: "/dashboard/settings", journal: "/dashboard/journal",
  dna: "/dashboard/dna", autopilot: "/dashboard/autopilot", wins: "/dashboard/wins",
  balance: "/dashboard/balance", wisdom: "/dashboard/wisdom", family: "/dashboard/family",
  habits: "/dashboard/habits", pomodoro: "/dashboard/pomodoro", nightreport: "/dashboard/nightreport",
  goals: "/dashboard/goals", focus: "/dashboard/focus", energy: "/dashboard/energy",
  budget: "/dashboard/budget", checklist: "/dashboard/checklist", notes: "/dashboard/notes",
  water: "/dashboard/water", gratitude: "/dashboard/gratitude", challenge: "/dashboard/challenge",
  decision: "/dashboard/decision", ideas: "/dashboard/ideas", reading: "/dashboard/reading",
  savings: "/dashboard/savings", countdown: "/dashboard/countdown", sleep: "/dashboard/sleep",
  links: "/dashboard/links", workout: "/dashboard/workout", bills: "/dashboard/bills",
  gifts: "/dashboard/gifts", flashcards: "/dashboard/flashcards", emails: "/dashboard/emails",
  stretching: "/dashboard/stretching", pricing: "/pricing",
};

export default function DashboardLayout({ children }) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const { theme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [currentPath, setCurrentPath] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingPrefs, setOnboardingPrefs] = useState(null);
  const [showProGate, setShowProGate] = useState(false);

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
      const onboarding = localStorage.getItem("daylyft-onboarding");
      if (!onboarding) {
        setShowOnboarding(true);
      } else {
        setOnboardingPrefs(JSON.parse(onboarding));
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPath(path);
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 1 && segments[0] === "dashboard") {
      setActiveNav("dashboard");
    } else if (segments.length >= 2) {
      const page = segments[1];
      const match = Object.keys(allRoutes).find((key) => page === key);
      if (match) setActiveNav(match);
    }
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const navigate = (id) => {
    if (isProFeature(id)) {
      setShowProGate(true);
      return;
    }
    setActiveNav(id);
    setMenuOpen(false);
    setSearchQuery("");
    window.location.href = allRoutes[id] || "/dashboard";
  };

  const toggleGroup = (label) => {
    setCollapsedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const filteredGroups = searchQuery.trim()
    ? navGroups.map((group) => ({
        ...group,
        items: group.items.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase())),
      })).filter((group) => group.items.length > 0)
    : navGroups;

  if (loading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--fm-bg)" }}>
        <div style={{ textAlign: "center" }}>
          <Logo />
          <p style={{ color: "var(--fm-muted)", fontSize: 14, marginTop: 12, fontFamily: "Outfit, sans-serif" }}>Loading DayLyft...</p>
        </div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userInitials = userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const renderSidebar = () => (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, background: "linear-gradient(135deg, #10b981, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DayLyft</div>
            <div style={{ fontSize: 8, color: "var(--fm-muted)", fontWeight: 600, letterSpacing: "0.12em" }}>AI COPILOT</div>
          </div>
        </div>
        {isMobile && (
          <div onClick={() => setMenuOpen(false)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </div>
        )}
      </div>

      <div style={{ position: "relative", marginBottom: 16 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fm-muted)" strokeWidth="2" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search features..." style={{
          width: "100%", padding: "8px 10px 8px 32px", borderRadius: 10,
          border: "1px solid var(--fm-border)", background: "var(--fm-card)",
          color: "var(--fm-text)", fontSize: 12, fontFamily: "Outfit, sans-serif",
          outline: "none", boxSizing: "border-box",
        }} />
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, overflowY: "auto", paddingBottom: 8 }}>
        {filteredGroups.map((group) => {
          const isCollapsed = collapsedGroups[group.label] && !searchQuery.trim();
          const hasActive = group.items.some((item) => item.id === activeNav);
          return (
            <div key={group.label} style={{ marginBottom: 4 }}>
              <div onClick={() => !searchQuery.trim() && toggleGroup(group.label)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "6px 8px", cursor: searchQuery.trim() ? "default" : "pointer", borderRadius: 6,
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: hasActive ? "var(--fm-accent-light)" : "var(--fm-muted)", textTransform: "uppercase" }}>{group.label}</span>
                {!searchQuery.trim() && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--fm-muted)" strokeWidth="2" style={{ transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </div>
              {!isCollapsed && (
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {group.items.map((item) => (
                    <button key={item.id} onClick={() => navigate(item.id)} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "7px 10px",
                      background: activeNav === item.id ? `${item.color}12` : "transparent",
                      border: activeNav === item.id ? `1px solid ${item.color}25` : "1px solid transparent",
                      borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: activeNav === item.id ? 600 : 400,
                      color: activeNav === item.id ? item.color : "var(--fm-muted)",
                      fontFamily: "Outfit, sans-serif", width: "100%", textAlign: "left", transition: "all 0.15s ease",
                    }}>
                      <span style={{ color: activeNav === item.id ? item.color : `${item.color}80`, flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{item.label}</span>
                      {item.pro && (
                        <span style={{
                          fontSize: 8, padding: "1px 5px", borderRadius: 4, flexShrink: 0,
                          background: "rgba(16,185,129,0.12)", color: "var(--fm-accent-light)",
                          fontWeight: 700, letterSpacing: "0.05em",
                        }}>PRO</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div style={{ marginTop: 4, paddingTop: 8, borderTop: "1px solid var(--fm-border)" }}>
          <button onClick={() => navigate("pricing")} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "7px 10px",
            background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)",
            borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
            color: "#10b981", fontFamily: "Outfit, sans-serif", width: "100%", textAlign: "left",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" /></svg>
            Upgrade to Pro
          </button>
          <button onClick={() => navigate("settings")} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", marginTop: 4,
            background: activeNav === "settings" ? "rgba(99,110,114,0.12)" : "transparent",
            border: activeNav === "settings" ? "1px solid rgba(99,110,114,0.25)" : "1px solid transparent",
            borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: activeNav === "settings" ? 600 : 400,
            color: activeNav === "settings" ? "#636e72" : "var(--fm-muted)",
            fontFamily: "Outfit, sans-serif", width: "100%", textAlign: "left",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </button>
        </div>
      </nav>

      <button onClick={handleLogout} style={{
        display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
        background: "transparent", border: "1px solid transparent", borderRadius: 8,
        cursor: "pointer", fontSize: 12, fontWeight: 500, color: "var(--fm-danger)",
        fontFamily: "Outfit, sans-serif", width: "100%", textAlign: "left", marginBottom: 10,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
        Log out
      </button>

      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: 10,
        background: "var(--fm-card)", borderRadius: 12, border: "1px solid var(--fm-border)",
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #fd79a8, #e84393)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0,
        }}>{userInitials}</div>
        <div style={{ overflow: "hidden" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userName}</div>
          <div style={{ fontSize: 10, color: "var(--fm-accent-light)" }}>Free plan</div>
        </div>
      </div>
    </>
  );

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <style>{`
        @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes pageEnter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      {showOnboarding && (
        <Onboarding userName={userName} onComplete={(prefs) => { setOnboardingPrefs(prefs); setShowOnboarding(false); }} />
      )}

      <ProGate show={showProGate} onClose={() => setShowProGate(false)} />

      {!isMobile && (
        <div style={{
          width: 230, background: "var(--fm-surface)", borderRight: "1px solid var(--fm-border)",
          display: "flex", flexDirection: "column", padding: "16px 12px", flexShrink: 0,
        }}>
          {renderSidebar()}
        </div>
      )}

      {isMobile && menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.6)", zIndex: 200, backdropFilter: "blur(4px)",
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            position: "fixed", top: 0, left: 0, bottom: 0, width: 270,
            background: "var(--fm-surface)", padding: "16px 12px",
            display: "flex", flexDirection: "column", zIndex: 201,
            boxShadow: "4px 0 24px rgba(0,0,0,0.4)", animation: "slideInLeft 0.25s ease",
          }}>
            {renderSidebar()}
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto", background: "var(--fm-bg)" }}>
        <div style={{
          padding: isMobile ? "12px 16px" : "16px 28px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: "1px solid var(--fm-border)", background: "var(--fm-bg)",
          position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {isMobile && (
              <div onClick={() => setMenuOpen(true)} style={{
                padding: "7px 12px", borderRadius: 10, border: "1px solid var(--fm-border)",
                display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
                color: "var(--fm-muted)", background: "var(--fm-surface)",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" />
                </svg>
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
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div onClick={toggleTheme} style={{
              width: 36, height: 36, borderRadius: 10, border: "1px solid var(--fm-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--fm-muted)", cursor: "pointer", background: "var(--fm-surface)",
            }}>
              {theme === "snow" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              )}
            </div>
            {isMobile && (
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #fd79a8, #e84393)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: "#fff",
              }}>{userInitials}</div>
            )}
          </div>
        </div>

        <div key={currentPath} style={{
          padding: isMobile ? "16px" : "24px 28px",
          animation: "pageEnter 0.4s ease",
        }}>{children}</div>
      </div>
    </div>
  );
}