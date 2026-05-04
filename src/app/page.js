"use client";

import { useState, useEffect } from "react";

const features = [
  { emoji: "🤖", title: "Kai AI Copilot", desc: "Plans your day, writes emails, analyzes habits, and gives personalized advice", cat: "ai" },
  { emoji: "✅", title: "Smart Tasks", desc: "Priorities, categories, and AI-powered scheduling", cat: "prod" },
  { emoji: "📅", title: "Calendar", desc: "Visual weekly calendar with color-coded events", cat: "prod" },
  { emoji: "🧬", title: "Productivity DNA", desc: "Discover your unique work personality", cat: "ai" },
  { emoji: "🧘", title: "Zen Mode", desc: "8 ambient sounds, breathing, and guided relaxation", cat: "well" },
  { emoji: "📊", title: "Analytics", desc: "Track patterns with beautiful charts and insights", cat: "prod" },
  { emoji: "🎯", title: "Goal Setting", desc: "Weekly, monthly, and yearly goals with tracking", cat: "prod" },
  { emoji: "📓", title: "Life Journal", desc: "Mood tracking and AI-generated summaries", cat: "life" },
  { emoji: "⚡", title: "Energy Map", desc: "Find your peak performance windows", cat: "prod" },
  { emoji: "🏆", title: "Weekly Wins", desc: "AI-graded performance reports", cat: "ai" },
  { emoji: "💵", title: "Budget Tracker", desc: "Income, expenses, and category breakdowns", cat: "fin" },
  { emoji: "🔥", title: "Habit Tracker", desc: "Streaks, visual grids, and accountability", cat: "life" },
  { emoji: "🛡", title: "Focus Shield", desc: "Block distractions during deep work", cat: "prod" },
  { emoji: "🍅", title: "Pomodoro Timer", desc: "Focus cycles with break reminders", cat: "prod" },
  { emoji: "👨‍👩‍👧", title: "Family Mode", desc: "Meals, chores, and family budget", cat: "life" },
  { emoji: "⚖️", title: "Life Balance", desc: "Radar chart across 8 life areas", cat: "life" },
  { emoji: "🙏", title: "Gratitude Journal", desc: "Daily practice for happiness", cat: "well" },
  { emoji: "💧", title: "Water Tracker", desc: "Visual tracking with weekly charts", cat: "well" },
  { emoji: "😴", title: "Sleep Tracker", desc: "Log patterns, get AI insights", cat: "well" },
  { emoji: "🏋️", title: "Workout Tracker", desc: "Exercises, sets, reps, AI suggestions", cat: "well" },
  { emoji: "🧠", title: "Flashcards", desc: "Create decks or let AI generate cards", cat: "learn" },
  { emoji: "✉️", title: "Email Templates", desc: "AI writes emails in any tone", cat: "ai" },
  { emoji: "💡", title: "Idea Vault", desc: "Capture and develop ideas with AI", cat: "learn" },
  { emoji: "🎁", title: "Gift Planner", desc: "AI suggests personalized gifts", cat: "life" },
  { emoji: "📖", title: "Reading List", desc: "Track books with AI recommendations", cat: "learn" },
  { emoji: "🐷", title: "Savings Goals", desc: "Visual targets with deadlines", cat: "fin" },
  { emoji: "📋", title: "Bill Reminder", desc: "Never miss a payment again", cat: "fin" },
  { emoji: "🔗", title: "Link Saver", desc: "Organized bookmarks with search", cat: "learn" },
  { emoji: "🎲", title: "Daily Challenge", desc: "28 rotating growth challenges", cat: "well" },
  { emoji: "🎯", title: "Decision Maker", desc: "AI analyzes options with pros & cons", cat: "ai" },
  { emoji: "⏳", title: "Countdown Timer", desc: "Live countdowns for exciting moments", cat: "life" },
  { emoji: "☑️", title: "Daily Checklist", desc: "Morning & evening routines with streaks", cat: "prod" },
  { emoji: "📝", title: "Quick Notes", desc: "Colors, pins, search, and AI expand", cat: "learn" },
  { emoji: "🌙", title: "Night Report", desc: "AI end-of-day summary with score", cat: "ai" },
  { emoji: "⏰", title: "Autopilot", desc: "Kai plans your entire day", cat: "ai" },
  { emoji: "💬", title: "Kai's Wisdom", desc: "Daily quotes personalized by AI", cat: "ai" },
  { emoji: "🧘", title: "Stretching Guide", desc: "5 guided routines with timers", cat: "well" },
  { emoji: "⏱", title: "Focus Music", desc: "Ambient sounds for concentration", cat: "prod" },
  { emoji: "🌅", title: "7 Themes", desc: "Midnight, Snow, Ocean, Forest, Rose, Amber, Sunset", cat: "prod" },
  { emoji: "🚀", title: "+More Coming", desc: "New features every week", cat: "prod" },
];

const filterTabs = [
  { id: "all", label: "All" },
  { id: "prod", label: "Productivity" },
  { id: "ai", label: "AI Copilot" },
  { id: "well", label: "Wellness" },
  { id: "life", label: "Life" },
  { id: "fin", label: "Finance" },
  { id: "learn", label: "Learning" },
];

const comparisons = [
  { app: "Motion", features: 10, price: "$29/mo", wellness: false, family: false, finance: false },
  { app: "Sunsama", features: 10, price: "$20/mo", wellness: false, family: false, finance: false },
  { app: "Notion", features: 10, price: "$10/mo", wellness: false, family: false, finance: false },
  { app: "DayLyft", features: 40, price: "FREE", wellness: true, family: true, finance: true, highlight: true },
];

const testimonials = [
  { name: "Sarah K.", role: "Freelance Designer", text: "DayLyft replaced 6 apps for me. Kai literally plans my mornings now.", avatar: "SK" },
  { name: "Marcus T.", role: "Startup Founder", text: "40 features for free? I was skeptical. Then I tried Kai. Now I'm Pro.", avatar: "MT" },
  { name: "Ana R.", role: "Student", text: "Flashcards + Pomodoro + Habit Tracker in one app. My GPA went up.", avatar: "AR" },
];

export default function LandingPage() {
  const [visibleSections, setVisibleSections] = useState({});
  const [featureFilter, setFeatureFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const filteredFeatures = featureFilter === "all" ? features : features.filter((f) => f.cat === featureFilter);

  return (
    <div style={{ background: "#e8f5ee", color: "#0a2818", fontFamily: "'Inter', sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; background: #e8f5ee; }

        /* ─── Animations ─── */
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUpStrong { from { opacity: 0; transform: translateY(80px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 0 1px rgba(34,197,94,0.2), 0 4px 20px rgba(34,197,94,0.3); } 50% { box-shadow: 0 0 0 1px rgba(34,197,94,0.3), 0 8px 40px rgba(34,197,94,0.5); } }

        /* ─── NEO-SKEUO BUTTONS (mint green) ─── */
        .btn-skeuo-primary {
          position: relative;
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          border: 1px solid rgba(0,0,0,0.08);
          background: linear-gradient(180deg, #0a2818 0%, #052010 100%);
          color: #cffce0;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.15s ease;
          box-shadow:
            inset 0 1px 0 rgba(160,255,200,0.15),
            inset 0 -2px 0 rgba(0,0,0,0.4),
            0 1px 0 rgba(255,255,255,0.5),
            0 4px 12px rgba(10,40,24,0.3),
            0 8px 32px rgba(34,197,94,0.15);
        }
        .btn-skeuo-primary:hover {
          transform: translateY(-1px);
          box-shadow:
            inset 0 1px 0 rgba(160,255,200,0.2),
            inset 0 -2px 0 rgba(0,0,0,0.4),
            0 1px 0 rgba(255,255,255,0.6),
            0 8px 24px rgba(10,40,24,0.35),
            0 12px 48px rgba(34,197,94,0.25);
        }
        .btn-skeuo-primary:active {
          transform: translateY(1px);
          box-shadow:
            inset 0 2px 4px rgba(0,0,0,0.4),
            0 2px 8px rgba(10,40,24,0.2);
        }

        .btn-skeuo-secondary {
          position: relative;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          border: 1px solid rgba(34,197,94,0.2);
          background: linear-gradient(180deg, #d8f5e1 0%, #b8e8c8 100%);
          color: #0a2818;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.15s ease;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 -2px 0 rgba(34,197,94,0.15),
            0 1px 0 rgba(255,255,255,0.4),
            0 4px 12px rgba(34,197,94,0.18);
        }
        .btn-skeuo-secondary:hover {
          background: linear-gradient(180deg, #e0f8e8 0%, #c0eed0 100%);
          transform: translateY(-1px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            inset 0 -2px 0 rgba(34,197,94,0.15),
            0 8px 24px rgba(34,197,94,0.25);
        }
        .btn-skeuo-secondary:active {
          transform: translateY(1px);
          box-shadow:
            inset 0 2px 4px rgba(34,197,94,0.2),
            0 1px 4px rgba(34,197,94,0.15);
        }

        .btn-skeuo-dark {
          position: relative;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          border: 1px solid rgba(0,0,0,0.15);
          background: linear-gradient(180deg, #0a2818 0%, #051f10 100%);
          color: #ffffff;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.15s ease;
          box-shadow:
            inset 0 1px 0 rgba(160,255,200,0.1),
            inset 0 -2px 0 rgba(0,0,0,0.5),
            0 1px 0 rgba(255,255,255,0.3),
            0 4px 12px rgba(10,40,24,0.4);
        }
        .btn-skeuo-dark:hover {
          transform: translateY(-1px);
          box-shadow:
            inset 0 1px 0 rgba(160,255,200,0.15),
            0 8px 24px rgba(10,40,24,0.5);
        }

        /* ─── NEO-SKEUO CARDS ─── */
        .card-skeuo {
          background: linear-gradient(180deg, #f0faf3 0%, #e2f3e8 100%);
          border: 1px solid rgba(34,197,94,0.12);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.25s ease;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 -1px 0 rgba(34,197,94,0.08),
            0 1px 0 rgba(255,255,255,0.5),
            0 8px 24px rgba(34,197,94,0.1);
          position: relative;
          overflow: hidden;
        }
        .card-skeuo:hover {
          transform: translateY(-3px);
          border-color: rgba(34,197,94,0.25);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(34,197,94,0.08),
            0 16px 40px rgba(34,197,94,0.18);
        }

        .card-skeuo-dark {
          background: linear-gradient(180deg, #0d3320 0%, #061d10 100%);
          border: 1px solid rgba(160,255,200,0.08);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.25s ease;
          box-shadow:
            inset 0 1px 0 rgba(160,255,200,0.06),
            inset 0 -1px 0 rgba(0,0,0,0.6),
            0 8px 24px rgba(0,0,0,0.4);
          position: relative;
        }
        .card-skeuo-dark:hover {
          transform: translateY(-3px);
          border-color: rgba(160,255,200,0.15);
          box-shadow:
            inset 0 1px 0 rgba(160,255,200,0.1),
            0 16px 40px rgba(0,0,0,0.5);
        }

        /* ─── Pill labels ─── */
        .pill-mint {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px;
          border-radius: 100px;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: linear-gradient(180deg, #ffffff, #d8f0e0);
          color: #0a2818;
          border: 1px solid rgba(34,197,94,0.2);
          font-family: 'JetBrains Mono', monospace;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            0 2px 8px rgba(34,197,94,0.15);
        }
        .pill-dark {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 16px;
          border-radius: 100px;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: linear-gradient(180deg, #133a25, #0a2818);
          color: #cffce0;
          border: 1px solid rgba(160,255,200,0.1);
          font-family: 'JetBrains Mono', monospace;
          box-shadow:
            inset 0 1px 0 rgba(160,255,200,0.08),
            0 2px 8px rgba(0,0,0,0.4);
        }

        /* ─── Nav links ─── */
        .nav-link {
          color: #4a6b58;
          text-decoration: none;
          font-size: 14px; font-weight: 500;
          transition: color 0.2s; cursor: pointer;
        }
        .nav-link:hover { color: #0a2818; }

        /* ─── Mockup neumorphic stage (dark mint) ─── */
        .mockup-neumorphic {
          background: linear-gradient(180deg, #0d3320 0%, #051f10 100%);
          border: 1px solid rgba(160,255,200,0.1);
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            inset 0 1px 0 rgba(160,255,200,0.06),
            inset 0 -1px 0 rgba(0,0,0,0.6),
            0 30px 80px rgba(0,0,0,0.5),
            0 50px 150px rgba(34,197,94,0.15);
        }

        /* ─── Mobile responsive ─── */
        @media (max-width: 768px) {
          .hero-title { font-size: 44px !important; line-height: 1.05 !important; }
          .hero-sub { font-size: 16px !important; }
          .stat-num { font-size: 36px !important; }
          .nav-desktop { display: none !important; }
          .hero-buttons { flex-direction: column !important; width: 100%; }
          .hero-buttons > * { width: 100%; justify-content: center; }
          .features-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; text-align: center; }
          .kai-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonial-grid { grid-template-columns: 1fr !important; }
          .compare-row { grid-template-columns: 1fr 60px 80px 50px 50px 50px !important; font-size: 12px !important; }
          .filter-tabs { overflow-x: auto; flex-wrap: nowrap !important; }
          .mockup-stage { transform: scale(0.85) !important; }
          .h2-large { font-size: 38px !important; }
          .hero { padding: 100px 20px 60px !important; }
          .nav-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none; }
        }

        /* ─── Headlines ─── */
        .h2-large {
          font-size: 56px;
          font-weight: 700;
          color: #0a2818;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.04em;
          line-height: 1.05;
        }
        .h2-large-dark {
          font-size: 56px;
          font-weight: 700;
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.04em;
          line-height: 1.05;
        }

        .text-embossed {
          color: #0a2818;
          text-shadow:
            0 1px 0 rgba(255,255,255,0.6),
            0 -1px 0 rgba(0,0,0,0.05);
        }
        .mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* NAVBAR                                                  */}
      {/* ═══════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
        zIndex: 100,
        width: "calc(100% - 32px)", maxWidth: 1200,
        background: scrollY > 40 ? "linear-gradient(180deg, rgba(232,245,238,0.92), rgba(216,240,224,0.85))" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(20px) saturate(180%)" : "none",
        border: scrollY > 40 ? "1px solid rgba(34,197,94,0.15)" : "1px solid transparent",
        borderRadius: 16,
        padding: "0 20px",
        transition: "all 0.4s ease",
        boxShadow: scrollY > 40 ? "inset 0 1px 0 rgba(255,255,255,0.8), 0 8px 32px rgba(34,197,94,0.15)" : "none",
      }}>
        <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: "linear-gradient(180deg, #22c55e, #15803d)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2), 0 4px 12px rgba(34,197,94,0.4)",
            }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <circle cx="8" cy="8" r="3" fill="#fff" />
                <circle cx="16" cy="14" r="3" fill="#fff" />
                <line x1="8" y1="8" x2="16" y2="14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{
              fontSize: 17, fontWeight: 700, color: "#0a2818",
              fontFamily: "Space Grotesk, sans-serif",
              letterSpacing: "-0.01em",
            }}>DayLyft</span>
          </div>

          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <span className="nav-link" onClick={() => scrollTo("features")}>Features</span>
            <span className="nav-link" onClick={() => scrollTo("compare")}>Compare</span>
            <span className="nav-link" onClick={() => scrollTo("pricing")}>Pricing</span>
            <a href="/about" className="nav-link" style={{ textDecoration: "none" }}>About</a>
            <a href="/login" className="btn-skeuo-primary" style={{ padding: "8px 18px", fontSize: 13, borderRadius: 10 }}>
              Get started
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            </a>
          </div>

          <div className="nav-mobile" style={{ display: "none", cursor: "pointer" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a2818" strokeWidth="2">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(232,245,238,0.97)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
        }}>
          <div onClick={() => setMobileMenuOpen(false)} style={{ position: "absolute", top: 20, right: 24, cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a2818" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <span style={{ fontSize: 20, color: "#0a2818", cursor: "pointer", fontWeight: 500 }} onClick={() => scrollTo("features")}>Features</span>
          <span style={{ fontSize: 20, color: "#0a2818", cursor: "pointer", fontWeight: 500 }} onClick={() => scrollTo("compare")}>Compare</span>
          <span style={{ fontSize: 20, color: "#0a2818", cursor: "pointer", fontWeight: 500 }} onClick={() => scrollTo("pricing")}>Pricing</span>
          <a href="/login" className="btn-skeuo-primary" style={{ marginTop: 16 }}>Get started free</a>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* HERO                                                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="hero" style={{
        position: "relative",
        minHeight: "100vh",
        background: "radial-gradient(ellipse at center top, #d8f0e0 0%, #e8f5ee 50%, #f4faf6 100%)",
        color: "#0a2818",
        padding: "140px 24px 100px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}>
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
        }} />

        {/* Spotlight */}
        <div style={{
          position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)",
          width: 1200, height: 600,
          background: "radial-gradient(ellipse, rgba(34,197,94,0.18) 0%, transparent 60%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 880, width: "100%" }}>
          {/* Top pill */}
          <div style={{ animation: "slideUp 0.6s ease both" }}>
            <a href="#features" style={{ textDecoration: "none" }}>
              <div className="pill-mint" style={{ marginBottom: 32, cursor: "pointer" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
                <span>v1.0 — Now with 40+ features</span>
              </div>
            </a>
          </div>

          {/* Main headline */}
          <h1 className="hero-title text-embossed" style={{
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.0,
            marginBottom: 28,
            fontFamily: "Space Grotesk, sans-serif",
            letterSpacing: "-0.05em",
            animation: "slideUpStrong 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
            animationDelay: "0.1s",
          }}>
            One app for<br />
            <span style={{
              background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>your entire life.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub" style={{
            fontSize: 19,
            color: "#4a6b58",
            lineHeight: 1.55,
            maxWidth: 580,
            margin: "0 auto 44px",
            fontWeight: 400,
            animation: "slideUp 1s ease both",
            animationDelay: "0.3s",
          }}>
            Productivity, wellness, finances, family, and learning — all powered by{" "}
            <span style={{ color: "#0a2818", fontWeight: 600 }}>Kai</span>, your AI copilot.<br />
            Built for an intentional day.
          </p>

          {/* CTA — Solo un botón, sin Watch Demo */}
          <div className="hero-buttons" style={{
            display: "flex", gap: 12, justifyContent: "center", alignItems: "center",
            animation: "slideUp 1.2s ease both", animationDelay: "0.5s",
          }}>
            <a href="/login" className="btn-skeuo-primary" style={{ padding: "16px 36px", fontSize: 15 }}>
              Start free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Trust line */}
          <div style={{
            marginTop: 40,
            animation: "slideUp 1.4s ease both", animationDelay: "0.7s",
            fontSize: 13, color: "#4a6b58",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontFamily: "JetBrains Mono, monospace",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            $0.00 forever · No credit card
          </div>
        </div>

        {/* Mockup */}
        <div className="mockup-stage" style={{
          marginTop: 80, position: "relative", maxWidth: 1100, width: "100%", zIndex: 2,
          animation: "slideUpStrong 1.4s cubic-bezier(0.16, 1, 0.3, 1) both", animationDelay: "0.9s",
          transform: `translateY(${Math.min(scrollY * 0.15, 60)}px)`,
        }}>
          <div className="mockup-neumorphic">
            {/* Window chrome */}
            <div style={{
              padding: "14px 18px",
              borderBottom: "1px solid rgba(160,255,200,0.08)",
              display: "flex", alignItems: "center", gap: 8,
              background: "linear-gradient(180deg, #133a25, #0a2818)",
            }}>
              <div style={{ display: "flex", gap: 8 }}>
                {["#22c55e", "#84cc16", "#10b981"].map((c, i) => (
                  <div key={i} style={{
                    width: 12, height: 12, borderRadius: "50%",
                    background: `linear-gradient(180deg, ${c}, #0a2818)`,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.5)",
                  }} />
                ))}
              </div>
              <div style={{
                marginLeft: 16, padding: "5px 14px",
                fontSize: 11, color: "#cffce0",
                background: "linear-gradient(180deg, #0a2818, #051f10)",
                borderRadius: 6,
                border: "1px solid rgba(160,255,200,0.05)",
                fontFamily: "JetBrains Mono, monospace",
              }}>daylyft.com/dashboard</div>
            </div>

            {/* App content */}
            <div style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 16, minHeight: 380 }}>
              {/* Sidebar */}
              <div>
                <div className="mono" style={{ fontSize: 11, fontWeight: 600, color: "#86efac", marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>// Today</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 4, fontFamily: "Space Grotesk", letterSpacing: "-0.02em" }}>Thursday</div>
                <div style={{ fontSize: 13, color: "#86efac", marginBottom: 24, fontFamily: "JetBrains Mono" }}>04.23.2026</div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { i: "🎯", l: "Focus blocks", v: "3 / 4" },
                    { i: "⚡", l: "Energy", v: "High" },
                    { i: "✅", l: "Tasks done", v: "7" },
                  ].map((s, i) => (
                    <div key={i} style={{
                      padding: "12px 14px",
                      background: "linear-gradient(180deg, #1a4a30, #0d3320)",
                      border: "1px solid rgba(160,255,200,0.06)",
                      borderRadius: 10,
                      display: "flex", alignItems: "center", gap: 10,
                      boxShadow: "inset 0 1px 0 rgba(160,255,200,0.04), 0 2px 6px rgba(0,0,0,0.3)",
                    }}>
                      <span style={{ fontSize: 16 }}>{s.i}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: "#86efac", fontFamily: "JetBrains Mono" }}>{s.l}</div>
                        <div style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{s.v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <div className="mono" style={{ fontSize: 11, fontWeight: 600, color: "#86efac", marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>// Schedule</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { t: "9:00 — 11:00", n: "Deep work: Product launch", on: true },
                    { t: "11:00 — 11:30", n: "Team standup", on: true },
                    { t: "13:00 — 15:00", n: "Focus: Design iterations", on: true },
                    { t: "15:30 — 16:00", n: "Email batch", on: false },
                    { t: "17:00 — 17:30", n: "Walk + reflection", on: false },
                  ].map((e, i) => (
                    <div key={i} style={{
                      padding: "13px 16px",
                      background: e.on
                        ? "linear-gradient(180deg, #1f5638, #133a25)"
                        : "linear-gradient(180deg, #0d3320, #061d10)",
                      border: `1px solid ${e.on ? "rgba(34,197,94,0.25)" : "rgba(160,255,200,0.04)"}`,
                      borderLeft: `3px solid ${e.on ? "#22c55e" : "rgba(160,255,200,0.1)"}`,
                      borderRadius: 10,
                      animation: `fadeIn 0.5s ease ${1 + i * 0.1}s both`,
                      boxShadow: e.on
                        ? "inset 0 1px 0 rgba(160,255,200,0.08), 0 4px 12px rgba(0,0,0,0.4)"
                        : "inset 0 1px 0 rgba(160,255,200,0.02), 0 2px 4px rgba(0,0,0,0.3)",
                    }}>
                      <div className="mono" style={{ fontSize: 10, color: "#86efac", marginBottom: 3 }}>{e.t}</div>
                      <div style={{ fontSize: 13, color: e.on ? "#fff" : "rgba(255,255,255,0.5)", fontWeight: 500 }}>{e.n}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kai panel */}
              <div>
                <div className="mono" style={{ fontSize: 11, fontWeight: 600, color: "#86efac", marginBottom: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>// Kai · AI</div>
                <div style={{
                  padding: 18, borderRadius: 12,
                  background: "linear-gradient(180deg, #1a4a30, #0d3320)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  boxShadow: "inset 0 1px 0 rgba(160,255,200,0.08), 0 8px 20px rgba(0,0,0,0.5)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: "linear-gradient(180deg, #22c55e, #15803d)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      animation: "float 4s ease-in-out infinite",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 12px rgba(34,197,94,0.5)",
                    }}>
                      <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>✦</span>
                    </div>
                    <div className="mono" style={{ fontSize: 11, color: "#86efac", fontWeight: 600 }}>KAI · BRIEFING</div>
                  </div>
                  <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.55, marginBottom: 12 }}>
                    Good morning, Juan. Your energy peaks 9–11am. I've placed your launch prep there.
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: "#86efac", display: "flex", alignItems: "center", gap: 4 }}>
                    {`> ask kai`}
                    <span style={{ display: "inline-block", width: 7, height: 12, background: "#22c55e", marginLeft: 4, animation: "fadeIn 1s steps(1) infinite alternate" }} />
                  </div>
                </div>

                <div style={{
                  marginTop: 14, padding: 16, borderRadius: 12,
                  background: "linear-gradient(180deg, #133a25, #0a2818)",
                  border: "1px solid rgba(160,255,200,0.05)",
                  boxShadow: "inset 0 1px 0 rgba(160,255,200,0.03), 0 2px 6px rgba(0,0,0,0.3)",
                }}>
                  <div className="mono" style={{ fontSize: 10, color: "#86efac", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Life balance</div>
                  <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 48 }}>
                    {[80, 65, 90, 75, 60, 55, 70, 85].map((v, i) => (
                      <div key={i} style={{
                        flex: 1, height: `${v}%`,
                        background: "linear-gradient(180deg, #22c55e, #15803d)",
                        borderRadius: 3,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.4)",
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow under mockup */}
          <div style={{
            position: "absolute", bottom: -60, left: "50%", transform: "translateX(-50%)",
            width: "75%", height: 120,
            background: "radial-gradient(ellipse, rgba(34,197,94,0.4), transparent 70%)",
            filter: "blur(50px)", pointerEvents: "none",
          }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* MARQUEE BANNER                                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div style={{
        background: "linear-gradient(180deg, #0a2818, #051f10)",
        borderTop: "1px solid rgba(160,255,200,0.1)",
        borderBottom: "1px solid rgba(160,255,200,0.1)",
        padding: "20px 0",
        overflow: "hidden",
        position: "relative",
        boxShadow: "inset 0 1px 0 rgba(160,255,200,0.05), inset 0 -1px 0 rgba(0,0,0,0.6)",
      }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 100,
          background: "linear-gradient(90deg, #051f10, transparent)",
          zIndex: 2,
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 100,
          background: "linear-gradient(-90deg, #051f10, transparent)",
          zIndex: 2,
        }} />
        <div style={{ display: "flex", animation: "marquee 40s linear infinite", width: "max-content" }}>
          {[...Array(2)].map((_, j) => (
            <div key={j} style={{ display: "flex", gap: 56, paddingRight: 56 }}>
              {["Smart Tasks", "Kai AI Copilot", "Calendar", "Pomodoro Focus", "Zen Mode", "Water Tracker", "Budget Tracker", "Flashcards", "Habit Streaks", "Workout Logs", "Sleep Insights", "Life Journal", "Goal Setting", "Email Templates", "Family Mode", "Productivity DNA"].map((item, i) => (
                <span key={i} className="mono" style={{ fontSize: 13, color: "#86efac", fontWeight: 500, whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#22c55e", fontSize: 10 }}>◆</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* STATS                                                   */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section data-animate id="stats" style={{
        padding: "100px 24px",
        background: "#e8f5ee",
        position: "relative",
        ...(visibleSections.stats ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }),
      }}>
        <div className="stats-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { number: "40+", label: "Features built" },
            { number: "$0", label: "To get started" },
            { number: "7", label: "Life categories" },
            { number: "24/7", label: "AI copilot" },
          ].map((stat, i) => (
            <div key={i} className="card-skeuo" style={{ padding: "44px 28px", textAlign: "center", animation: `slideUp 0.5s ease ${i * 0.08}s both` }}>
              <div className="stat-num text-embossed" style={{
                fontSize: 56, fontWeight: 700,
                fontFamily: "Space Grotesk, sans-serif", lineHeight: 1, letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>{stat.number}</div>
              <div className="mono" style={{ fontSize: 12, color: "#4a6b58", marginTop: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FEATURES                                                */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="features" data-animate style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #f4faf6 0%, #e8f5ee 100%)",
        ...(visibleSections.features ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }),
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="pill-mint" style={{ marginBottom: 24 }}>// FEATURES</div>
            <h2 className="h2-large">
              Everything you need.<br />
              <span style={{ color: "#86b89a" }}>Nothing you don't.</span>
            </h2>
          </div>

          <div className="filter-tabs" style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 36, flexWrap: "wrap" }}>
            {filterTabs.map((tab) => (
              <button key={tab.id} onClick={() => setFeatureFilter(tab.id)} style={{
                padding: "10px 20px", borderRadius: 100, fontSize: 13, fontWeight: 600,
                fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap",
                transition: "all 0.15s ease",
                ...(featureFilter === tab.id ? {
                  background: "linear-gradient(180deg, #0a2818, #051f10)",
                  color: "#fff",
                  border: "1px solid rgba(0,0,0,0.2)",
                  boxShadow: "inset 0 1px 0 rgba(160,255,200,0.1), 0 4px 12px rgba(10,40,24,0.3)",
                } : {
                  background: "linear-gradient(180deg, #ffffff, #d8f0e0)",
                  color: "#4a6b58",
                  border: "1px solid rgba(34,197,94,0.15)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,1), 0 1px 2px rgba(34,197,94,0.1)",
                }),
              }}>
                {tab.label} {tab.id === "all" && <span style={{ opacity: 0.6, marginLeft: 4 }}>{features.length}</span>}
              </button>
            ))}
          </div>

          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {filteredFeatures.map((feature, i) => (
              <div key={feature.title} className="card-skeuo" style={{ animation: `scaleIn 0.4s ease ${i * 0.025}s both` }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "linear-gradient(180deg, #ffffff, #c8e8d4)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, marginBottom: 14,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(34,197,94,0.1), 0 2px 4px rgba(34,197,94,0.15)",
                }}>{feature.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0a2818", marginBottom: 6, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.01em" }}>{feature.title}</div>
                <div style={{ fontSize: 12, color: "#4a6b58", lineHeight: 1.6 }}>{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* KAI section — DARK                                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section data-animate id="kai" style={{
        padding: "120px 24px",
        background: "radial-gradient(ellipse at center, #133a25 0%, #0a2818 50%, #051f10 100%)",
        position: "relative",
        overflow: "hidden",
        ...(visibleSections.kai ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }),
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 800, height: 800,
          background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div className="pill-dark" style={{ marginBottom: 36 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
            // AI COPILOT
          </div>

          {/* Glowing orb */}
          <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 40px" }}>
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "50%",
              background: "linear-gradient(180deg, #4ade80 0%, #15803d 100%)",
              animation: "float 5s ease-in-out infinite, glowPulse 3s ease-in-out infinite",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 50, color: "#fff",
              boxShadow: "inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -4px 0 rgba(0,0,0,0.2), 0 0 60px rgba(34,197,94,0.5), 0 20px 50px rgba(0,0,0,0.6)",
            }}>✦</div>
          </div>

          <h2 className="h2-large-dark" style={{ marginBottom: 16 }}>
            Meet <span style={{
              background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Kai</span>.
          </h2>
          <p style={{
            fontSize: 18, color: "#86efac",
            lineHeight: 1.6, maxWidth: 540, margin: "0 auto 48px",
          }}>
            Your AI copilot that works across every area of your life — not just tasks.
          </p>

          <div className="kai-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12, maxWidth: 720, margin: "0 auto",
          }}>
            {[
              { emoji: "🌅", text: "Plans your morning" },
              { emoji: "📧", text: "Writes your emails" },
              { emoji: "💪", text: "Suggests workouts" },
              { emoji: "📊", text: "Analyzes your habits" },
              { emoji: "💰", text: "Tracks your budget" },
              { emoji: "🌙", text: "Reviews your day" },
            ].map((item, i) => (
              <div key={i} className="card-skeuo-dark" style={{
                padding: 18,
                fontSize: 13, color: "#fff",
                display: "flex", alignItems: "center", gap: 12,
                animation: `slideUp 0.6s ease ${i * 0.08}s both`,
                cursor: "pointer",
              }}>
                <span style={{ fontSize: 22 }}>{item.emoji}</span>
                <span style={{ fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* COMPARISON                                              */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="compare" data-animate style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #e8f5ee 0%, #f4faf6 100%)",
        ...(visibleSections.compare ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }),
      }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="pill-mint" style={{ marginBottom: 24 }}>// COMPARE</div>
            <h2 className="h2-large">
              4× more.<br />
              <span style={{ color: "#86b89a" }}>4× less.</span>
            </h2>
          </div>

          <div style={{
            background: "linear-gradient(180deg, #ffffff, #f4faf6)",
            border: "1px solid rgba(34,197,94,0.15)",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,1), 0 8px 30px rgba(34,197,94,0.12)",
          }}>
            <div className="compare-row" style={{
              display: "grid", gridTemplateColumns: "1fr 80px 100px 70px 70px 70px",
              padding: "16px 24px",
              borderBottom: "1px solid rgba(34,197,94,0.1)",
              fontSize: 11, fontWeight: 700, color: "#4a6b58",
              textTransform: "uppercase", letterSpacing: "0.08em",
              background: "linear-gradient(180deg, #d8f0e0, #c8e8d4)",
              fontFamily: "JetBrains Mono, monospace",
            }}>
              <div>App</div>
              <div style={{ textAlign: "center" }}>Features</div>
              <div style={{ textAlign: "center" }}>Price</div>
              <div style={{ textAlign: "center" }}>Wellness</div>
              <div style={{ textAlign: "center" }}>Family</div>
              <div style={{ textAlign: "center" }}>Finance</div>
            </div>
            {comparisons.map((comp, i) => (
              <div key={i} className="compare-row" style={{
                display: "grid", gridTemplateColumns: "1fr 80px 100px 70px 70px 70px",
                padding: "20px 24px", alignItems: "center",
                borderBottom: i < comparisons.length - 1 ? "1px solid rgba(34,197,94,0.08)" : "none",
                background: comp.highlight ? "linear-gradient(180deg, #0a2818, #051f10)" : "transparent",
                color: comp.highlight ? "#fff" : "inherit",
                animation: `slideUp 0.5s ease ${i * 0.08}s both`,
                boxShadow: comp.highlight ? "inset 0 1px 0 rgba(160,255,200,0.08), 0 8px 20px rgba(0,0,0,0.4)" : "none",
              }}>
                <div style={{
                  fontSize: 14, fontWeight: comp.highlight ? 700 : 500,
                  color: comp.highlight ? "#fff" : "#4a6b58",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  {comp.highlight && (
                    <span style={{
                      fontSize: 9, padding: "3px 9px", borderRadius: 6,
                      background: "linear-gradient(180deg, #22c55e, #15803d)",
                      color: "#fff", fontWeight: 700, letterSpacing: "0.05em",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.4)",
                      fontFamily: "JetBrains Mono",
                    }}>YOU</span>
                  )}
                  {comp.app}
                </div>
                <div style={{ textAlign: "center", fontSize: 17, fontWeight: 700, color: comp.highlight ? "#4ade80" : "#86b89a", fontFamily: "Space Grotesk" }}>{comp.features}</div>
                <div style={{ textAlign: "center", fontSize: 14, fontWeight: 700, color: comp.highlight ? "#4ade80" : "#4a6b58", fontFamily: "JetBrains Mono" }}>{comp.price}</div>
                <div style={{ textAlign: "center", fontSize: 16, color: comp.wellness ? (comp.highlight ? "#4ade80" : "#22c55e") : "#c8e8d4" }}>{comp.wellness ? "✓" : "—"}</div>
                <div style={{ textAlign: "center", fontSize: 16, color: comp.family ? (comp.highlight ? "#4ade80" : "#22c55e") : "#c8e8d4" }}>{comp.family ? "✓" : "—"}</div>
                <div style={{ textAlign: "center", fontSize: 16, color: comp.finance ? (comp.highlight ? "#4ade80" : "#22c55e") : "#c8e8d4" }}>{comp.finance ? "✓" : "—"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TESTIMONIALS — DARK                                     */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section data-animate id="testimonials" style={{
        padding: "100px 24px",
        background: "#0a2818",
        position: "relative",
        ...(visibleSections.testimonials ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }),
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="pill-dark" style={{ marginBottom: 24 }}>// TESTIMONIALS</div>
            <h2 className="h2-large-dark">People love DayLyft.</h2>
          </div>
          <div className="testimonial-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card-skeuo-dark" style={{
                padding: 28,
                animation: `slideUp 0.5s ease ${i * 0.1}s both`,
              }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" /></svg>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: "#fff", lineHeight: 1.6, marginBottom: 24, fontWeight: 400 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "linear-gradient(180deg, #22c55e, #15803d)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: "#fff",
                    fontFamily: "JetBrains Mono",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 6px rgba(0,0,0,0.4)",
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{t.name}</div>
                    <div className="mono" style={{ fontSize: 11, color: "#86efac" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* PRICING — SIEMPRE VISIBLE                               */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="pricing" style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #f4faf6 0%, #e8f5ee 100%)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="pill-mint" style={{ marginBottom: 24 }}>// PRICING</div>
            <h2 className="h2-large">Simple pricing.</h2>
            <p style={{ fontSize: 16, color: "#4a6b58", marginTop: 12 }}>Start free. Upgrade when you're ready.</p>
          </div>

          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, alignItems: "start" }}>
            {/* STARTER */}
            <div className="card-skeuo" style={{ padding: 32 }}>
              <div className="mono" style={{ fontSize: 12, fontWeight: 600, color: "#4a6b58", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>STARTER</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 56, fontWeight: 700, color: "#0a2818", fontFamily: "Space Grotesk", letterSpacing: "-0.04em" }}>$0</span>
                <span style={{ fontSize: 14, color: "#86b89a" }}>/forever</span>
              </div>
              <div style={{ fontSize: 13, color: "#86b89a", marginBottom: 24 }}>11 features to get you hooked</div>
              <a href="/login" className="btn-skeuo-secondary" style={{ width: "100%", justifyContent: "center", padding: "13px", marginBottom: 28, fontSize: 13, textDecoration: "none" }}>Get started free</a>

              <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "#4a6b58", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>// Productivity</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {["Smart Tasks (basic)", "Calendar", "Pomodoro Timer", "Daily Checklist", "Quick Notes"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#4a6b58" }}>
                    <span style={{ color: "#22c55e", fontSize: 14, fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
              </div>

              <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "#4a6b58", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>// Wellness</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {["Water Tracker", "Gratitude Journal", "Zen Mode (3 sounds)"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#4a6b58" }}>
                    <span style={{ color: "#22c55e", fontSize: 14, fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
              </div>

              <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "#4a6b58", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>// AI & More</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Kai Chat (10 msgs/day)", "Countdown Timer", "Link Saver", "3 color themes"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#4a6b58" }}>
                    <span style={{ color: "#22c55e", fontSize: 14, fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </div>

            {/* PRO — DARK CARD */}
            <div style={{
              background: "linear-gradient(180deg, #0d3320 0%, #051f10 100%)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: 18,
              padding: 32,
              position: "relative",
              boxShadow: "inset 0 1px 0 rgba(160,255,200,0.1), 0 16px 40px rgba(0,0,0,0.4), 0 0 60px rgba(34,197,94,0.2)",
            }}>
              <div style={{
                position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                padding: "6px 16px", borderRadius: 100,
                background: "linear-gradient(180deg, #22c55e, #15803d)",
                fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.08em",
                fontFamily: "JetBrains Mono, monospace",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 12px rgba(34,197,94,0.5)",
              }}>MOST POPULAR</div>

              <div className="mono" style={{ fontSize: 12, fontWeight: 600, color: "#4ade80", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>PRO</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 56, fontWeight: 700, color: "#fff", fontFamily: "Space Grotesk", letterSpacing: "-0.04em" }}>$6.99</span>
                <span style={{ fontSize: 14, color: "#86efac" }}>/month</span>
              </div>
              <div style={{ fontSize: 13, color: "#86efac", marginBottom: 12 }}>All 40+ features, unlimited everything</div>
              <div className="mono" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 12px", borderRadius: 8,
                background: "rgba(34,197,94,0.15)",
                border: "1px solid rgba(34,197,94,0.25)",
                marginBottom: 20,
                fontSize: 11, fontWeight: 600, color: "#4ade80",
                boxShadow: "inset 0 1px 0 rgba(160,255,200,0.05)",
              }}>
                7 days free trial
              </div>

              <a href="https://buy.stripe.com/8x25kE2pK5Ho4Wo25AaR205" style={{
                width: "100%", padding: "14px", marginBottom: 28,
                fontSize: 13, fontWeight: 600, fontFamily: "inherit",
                borderRadius: 12, border: "1px solid rgba(0,0,0,0.15)",
                background: "linear-gradient(180deg, #4ade80, #22c55e)",
                color: "#0a2818", textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.15), 0 6px 20px rgba(34,197,94,0.5)",
              }}>Try Pro free for 7 days →</a>

              <div className="mono" style={{ fontSize: 11, fontWeight: 600, color: "#4ade80", marginBottom: 14 }}>{`> Everything in Starter, plus:`}</div>

              {[
                { title: "// AI COPILOT (UNLIMITED)", items: ["Unlimited Kai Chat", "Morning Autopilot", "Night Report", "Productivity DNA", "Weekly Wins", "Decision Maker", "Email Templates", "Kai's Wisdom"] },
                { title: "// PRODUCTIVITY", items: ["Analytics", "Goal Setting", "Energy Map", "Focus Shield", "Habit Tracker"] },
                { title: "// WELLNESS & FITNESS", items: ["Sleep Tracker", "Workout Tracker", "Stretching Guide", "Daily Challenge", "Zen Mode (8 sounds + breathing)"] },
                { title: "// LIFE & FINANCE", items: ["Life Journal + AI summaries", "Life Balance Wheel", "Family Mode", "Gift Planner", "Idea Vault", "Budget Tracker", "Savings Goals", "Bill Reminder"] },
                { title: "// LEARNING & EXTRAS", items: ["Flashcards", "Reading List", "7 premium themes", "Priority support"] },
              ].map((group, gi) => (
                <div key={gi} style={{ marginBottom: 14 }}>
                  <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "#86efac", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>{group.title}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {group.items.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
                        <span style={{ color: "#4ade80", fontSize: 14, fontWeight: 700 }}>✓</span>{f}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* BUSINESS */}
            <div className="card-skeuo" style={{ padding: 32, position: "relative" }}>
              <div style={{
                position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                padding: "6px 16px", borderRadius: 100,
                background: "linear-gradient(180deg, #c8e8d4, #86b89a)",
                fontSize: 10, fontWeight: 700, color: "#0a2818", letterSpacing: "0.08em",
                fontFamily: "JetBrains Mono",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 6px rgba(34,197,94,0.2)",
              }}>COMING SOON</div>
              <div className="mono" style={{ fontSize: 12, fontWeight: 600, color: "#4a6b58", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>BUSINESS</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 56, fontWeight: 700, color: "#0a2818", fontFamily: "Space Grotesk", letterSpacing: "-0.04em" }}>$12.99</span>
                <span style={{ fontSize: 14, color: "#86b89a" }}>/user/mo</span>
              </div>
              <div style={{ fontSize: 13, color: "#86b89a", marginBottom: 24 }}>For teams that win together</div>
              <a href="mailto:juanmasis777@gmail.com?subject=DayLyft Business - Early Access" className="btn-skeuo-secondary" style={{ width: "100%", justifyContent: "center", padding: "13px", marginBottom: 28, fontSize: 13, textDecoration: "none" }}>Join the waitlist</a>

              <div className="mono" style={{ fontSize: 11, fontWeight: 600, color: "#4a6b58", marginBottom: 14 }}>{`> Everything in Pro, plus:`}</div>

              <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "#4a6b58", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>// TEAM FEATURES</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Team Dashboard", "Shared Tasks & assign members", "Team Analytics & reports", "Admin Panel & permissions", "Custom Branding (logo + colors)", "Priority Support (< 4hr)", "Export Reports (PDF/CSV)"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#4a6b58" }}>
                    <span style={{ color: "#86b89a", fontSize: 14, fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FINAL CTA — DARK                                        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section style={{
        padding: "140px 24px",
        background: "radial-gradient(ellipse at center, #133a25 0%, #0a2818 50%, #051f10 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
          width: 1000, height: 600,
          background: "radial-gradient(ellipse, rgba(34,197,94,0.2) 0%, transparent 60%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h2 className="h2-large-dark" style={{
            fontSize: 72, fontWeight: 700,
            marginBottom: 20, fontFamily: "Space Grotesk, sans-serif",
            letterSpacing: "-0.04em", lineHeight: 1.0,
          }}>
            Ready to<br />
            <span style={{
              background: "linear-gradient(135deg, #4ade80, #22c55e)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>lift your day?</span>
          </h2>
          <p style={{
            fontSize: 18, color: "#86efac",
            marginBottom: 44, lineHeight: 1.6,
          }}>
            Join people who replaced 10 apps with one. Start free, upgrade when you're hooked.
          </p>
          <a href="/login" style={{
            padding: "20px 44px",
            fontSize: 16, fontWeight: 600, fontFamily: "inherit",
            borderRadius: 12, border: "1px solid rgba(0,0,0,0.15)",
            background: "linear-gradient(180deg, #4ade80, #22c55e)",
            color: "#0a2818", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 8,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.15), 0 8px 24px rgba(34,197,94,0.5)",
            cursor: "pointer", transition: "all 0.15s",
          }}>
            Get started — it's free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <div className="mono" style={{ marginTop: 18, fontSize: 12, color: "#86efac" }}>
            $0.00 forever · No credit card
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FOOTER — DARK                                            */}
      {/* ═══════════════════════════════════════════════════════ */}
      <footer style={{
        background: "#051f10",
        borderTop: "1px solid rgba(160,255,200,0.06)",
        padding: "60px 24px 28px",
        color: "#86efac",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40, marginBottom: 48,
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: "linear-gradient(180deg, #22c55e, #15803d)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 8px rgba(34,197,94,0.4)",
                }}>
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                    <circle cx="8" cy="8" r="3" fill="#fff" />
                    <circle cx="16" cy="14" r="3" fill="#fff" />
                    <line x1="8" y1="8" x2="16" y2="14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "Space Grotesk" }}>DayLyft</span>
              </div>
              <p style={{ fontSize: 13, color: "#86efac", lineHeight: 1.7, maxWidth: 280, marginBottom: 16 }}>
                AI-powered super app for productivity, wellness, and life management.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { icon: "𝕏", url: "#" },
                  { icon: "in", url: "#" },
                  { icon: "ig", url: "#" },
                ].map((s, i) => (
                  <a key={i} href={s.url} style={{
                    width: 34, height: 34, borderRadius: 9,
                    background: "linear-gradient(180deg, #133a25, #0a2818)",
                    border: "1px solid rgba(160,255,200,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, color: "#86efac",
                    textDecoration: "none", transition: "all 0.2s",
                    boxShadow: "inset 0 1px 0 rgba(160,255,200,0.04), 0 2px 4px rgba(0,0,0,0.3)",
                  }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: "#86efac", marginBottom: 18, letterSpacing: "0.08em", textTransform: "uppercase" }}>// Product</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span onClick={() => scrollTo("features")} style={{ fontSize: 13, color: "#86efac", cursor: "pointer" }}>Features</span>
                <span onClick={() => scrollTo("pricing")} style={{ fontSize: 13, color: "#86efac", cursor: "pointer" }}>Pricing</span>
                <span onClick={() => scrollTo("compare")} style={{ fontSize: 13, color: "#86efac", cursor: "pointer" }}>Compare</span>
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: "#86efac", marginBottom: 18, letterSpacing: "0.08em", textTransform: "uppercase" }}>// Company</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="/about" style={{ fontSize: 13, color: "#86efac", textDecoration: "none" }}>About</a>
                <a href="/contact" style={{ fontSize: 13, color: "#86efac", textDecoration: "none" }}>Contact</a>
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: "#86efac", marginBottom: 18, letterSpacing: "0.08em", textTransform: "uppercase" }}>// Legal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="/privacy" style={{ fontSize: 13, color: "#86efac", textDecoration: "none" }}>Privacy</a>
                <a href="/terms" style={{ fontSize: 13, color: "#86efac", textDecoration: "none" }}>Terms</a>
              </div>
            </div>
          </div>
          <div style={{
            borderTop: "1px solid rgba(160,255,200,0.06)",
            paddingTop: 24,
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
          }}>
            <span className="mono" style={{ fontSize: 12, color: "#86efac" }}>© 2026 DayLyft. All rights reserved.</span>
            <span className="mono" style={{ fontSize: 12, color: "#86efac" }}>Made with ♥ in Miami</span>
          </div>
        </div>
      </footer>
    </div>
  );
}