"use client";

import { useState, useEffect, useRef } from "react";

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
  { name: "Sarah K.", role: "Freelance Designer", text: "DayLyft replaced 6 apps for me. Kai literally plans my mornings now.", avatar: "SK", color: "#fd79a8" },
  { name: "Marcus T.", role: "Startup Founder", text: "40 features for free? I was skeptical. Then I tried Kai. Now I'm Pro.", avatar: "MT", color: "#6C5CE7" },
  { name: "Ana R.", role: "Student", text: "Flashcards + Pomodoro + Habit Tracker in one app. My GPA went up.", avatar: "AR", color: "#00CEC9" },
];

export default function LandingPage() {
  const [visibleSections, setVisibleSections] = useState({});
  const [featureFilter, setFeatureFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);

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
    <div style={{ background: "#dddde4", color: "#e8e8f0", fontFamily: "'Outfit', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Sora:wght@400;500;600;700;800&display=swap');
        
        @keyframes heroFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 30px rgba(108,92,231,0.2); } 50% { box-shadow: 0 0 60px rgba(108,92,231,0.4); } }
        @keyframes gradientBg { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes countUp { from { opacity: 0; transform: translateY(20px) scale(0.8); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(108,92,231,0.15); }
          50% { border-color: rgba(108,92,231,0.4); }
        }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        
        .nav-link { color: #6a6a7a; text-decoration: none; font-size: 13px; font-weight: 500; transition: color 0.3s; cursor: pointer; letter-spacing: 0.02em; }
        .nav-link:hover { color: #fff; }
        
        .btn-primary {
          padding: 14px 32px; border-radius: 12px; font-size: 14px; font-weight: 700;
          cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.3s; border: none;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          background: #6C5CE7; color: #fff; letter-spacing: 0.01em;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(108,92,231,0.35); background: #7c6ef0; }
        
        .btn-secondary {
          padding: 14px 32px; border-radius: 12px; font-size: 14px; font-weight: 600;
          cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.3s;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.04); color: #b0b0c0; border: 1px solid rgba(255,255,255,0.08);
        }
        .btn-secondary:hover { background: rgba(255,255,255,0.08); color: #fff; border-color: rgba(255,255,255,0.15); }
        
        .feature-card {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px; padding: 22px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default; position: relative; overflow: hidden;
        }
        .feature-card::before {
          content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #6C5CE7, transparent);
          opacity: 0; transition: opacity 0.4s;
        }
        .feature-card:hover { background: rgba(108,92,231,0.06); border-color: rgba(108,92,231,0.2); transform: translateY(-6px); }
        .feature-card:hover::before { opacity: 1; }
        
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; }

        .section-label {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px; border-radius: 100px; font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px;
        }

        .grid-line {
          position: absolute; background: rgba(108,92,231,0.04);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 38px !important; }
          .hero-sub { font-size: 15px !important; }
          .stat-number { font-size: 40px !important; }
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
        }
      `}</style>

      {/* === NAVBAR === */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 50 ? "rgba(5,5,8,0.9)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
        padding: "0 24px", transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" fill="white" /><circle cx="16" cy="14" r="3" fill="white" /><line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "Sora, sans-serif" }}>DayLyft</span>
          </div>
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <span className="nav-link" onClick={() => scrollTo("features")}>Features</span>
            <span className="nav-link" onClick={() => scrollTo("compare")}>Compare</span>
            <span className="nav-link" onClick={() => scrollTo("pricing")}>Pricing</span>
            <a href="/about" className="nav-link" style={{ textDecoration: "none" }}>About</a>
            <a href="/login" className="btn-primary" style={{ padding: "9px 22px", fontSize: 13 }}>Get Started</a>
          </div>
          <div className="nav-mobile" style={{ display: "none" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="21" y2="17" /></svg>
          </div>
        </div>
      </nav>
      <style>{`@media (max-width: 768px) { .nav-desktop { display: none !important; } .nav-mobile { display: block !important; } }`}</style>

      {mobileMenuOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 99, background: "rgba(5,5,8,0.97)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
          <div onClick={() => setMobileMenuOpen(false)} style={{ position: "absolute", top: 20, right: 24, cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </div>
          <span style={{ fontSize: 18, color: "#8a8a9a", cursor: "pointer" }} onClick={() => scrollTo("features")}>Features</span>
          <span style={{ fontSize: 18, color: "#8a8a9a", cursor: "pointer" }} onClick={() => scrollTo("compare")}>Compare</span>
          <span style={{ fontSize: 18, color: "#8a8a9a", cursor: "pointer" }} onClick={() => scrollTo("pricing")}>Pricing</span>
          <a href="/login" className="btn-primary" style={{ marginTop: 16 }}>Get Started Free</a>
        </div>
      )}

      {/* === HERO === */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "140px 24px 100px", overflow: "hidden" }}>
        {/* Grid lines */}
        <div className="grid-line" style={{ width: 1, top: 0, bottom: 0, left: "25%", opacity: 0.5 }} />
        <div className="grid-line" style={{ width: 1, top: 0, bottom: 0, left: "50%", opacity: 0.5 }} />
        <div className="grid-line" style={{ width: 1, top: 0, bottom: 0, left: "75%", opacity: 0.5 }} />
        
        <div className="glow-orb" style={{ width: 600, height: 600, background: "#6C5CE7", top: -200, left: -200, opacity: 0.07, animation: "pulse 8s ease-in-out infinite" }} />
        <div className="glow-orb" style={{ width: 500, height: 500, background: "#00CEC9", bottom: -200, right: -200, opacity: 0.05, animation: "pulse 8s ease-in-out infinite 3s" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 860 }}>
          <div style={{ animation: "slideUp 0.6s ease" }}>
            <div className="section-label" style={{ background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)", color: "#a29bfe" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00CEC9" }} />
              Now with 40+ features
            </div>
          </div>

          <h1 className="hero-title" style={{
            fontSize: 72, fontWeight: 900, lineHeight: 1.05, marginBottom: 24,
            fontFamily: "Sora, sans-serif", letterSpacing: "-0.03em",
            animation: "slideUp 0.8s ease",
          }}>
            <span style={{ color: "#fff" }}>One app for</span><br />
            <span style={{
              background: "linear-gradient(135deg, #6C5CE7 0%, #00CEC9 50%, #fd79a8 100%)",
              backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "gradientBg 5s ease infinite",
            }}>your entire life</span>
          </h1>

          <p className="hero-sub" style={{
            fontSize: 18, color: "#6a6a7a", lineHeight: 1.8, maxWidth: 540,
            margin: "0 auto 40px", animation: "slideUp 1s ease", fontWeight: 400,
          }}>
            Productivity, wellness, finances, fitness, family, and learning —
            all powered by <span style={{ color: "#a29bfe", fontWeight: 600 }}>Kai</span>, your AI copilot.
          </p>

          <div className="hero-buttons" style={{ display: "flex", gap: 14, justifyContent: "center", animation: "slideUp 1.2s ease" }}>
            <a href="/login" className="btn-primary" style={{ padding: "16px 36px", fontSize: 15 }}>
              Start free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
            <button className="btn-secondary" style={{ padding: "16px 32px" }} onClick={() => scrollTo("features")}>Explore features</button>
          </div>

          <div style={{ marginTop: 56, animation: "slideUp 1.4s ease" }}>
            <p style={{ fontSize: 12, color: "#4a4a5a", marginBottom: 12 }}>TRUSTED BY EARLY ADOPTERS</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {["#6C5CE7", "#00CEC9", "#fd79a8", "#fdcb6e", "#00b894"].map((c, i) => (
                <div key={i} style={{
                  width: 30, height: 30, borderRadius: "50%", border: "2px solid #050508",
                  background: c, marginLeft: i > 0 ? -8 : 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: "#fff",
                }}>{["J", "S", "M", "A", "R"][i]}</div>
              ))}
              <span style={{ fontSize: 12, color: "#6a6a7a", marginLeft: 8 }}>Free forever · No credit card</span>
            </div>
          </div>
        </div>
      </section>

      {/* === SCROLLING BANNER === */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "14px 0", overflow: "hidden", background: "rgba(108,92,231,0.02)" }}>
        <div style={{ display: "flex", animation: "marquee 30s linear infinite", width: "max-content" }}>
          {[...Array(2)].map((_, j) => (
            <div key={j} style={{ display: "flex", gap: 48, paddingRight: 48 }}>
              {["Smart Tasks", "Kai AI", "Calendar", "Pomodoro", "Zen Mode", "Water Tracker", "Budget", "Flashcards", "Habits", "Workout", "Sleep", "Journal", "Goals", "Email Writer"].map((item, i) => (
                <span key={i} style={{ fontSize: 13, color: "#4a4a5a", fontWeight: 500, whiteSpace: "nowrap", letterSpacing: "0.02em" }}>
                  <span style={{ color: "#6C5CE7", marginRight: 6 }}>✦</span>{item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* === STATS === */}
      <section style={{ padding: "80px 24px" }}>
        <div className="stats-grid" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {[
            { number: "40+", label: "Features built", color: "#6C5CE7" },
            { number: "$0", label: "To get started", color: "#00CEC9" },
            { number: "7", label: "Life categories", color: "#fd79a8" },
            { number: "24/7", label: "AI copilot", color: "#fdcb6e" },
          ].map((stat, i) => (
            <div key={i} style={{
              textAlign: "center", padding: 24, borderRadius: 16,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div className="stat-number" style={{
                fontSize: 48, fontWeight: 900, color: stat.color,
                fontFamily: "Sora, sans-serif", lineHeight: 1,
              }}>{stat.number}</div>
              <div style={{ fontSize: 13, color: "#6a6a7a", marginTop: 8, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === FEATURES === */}
      <section id="features" data-animate style={{
        padding: "100px 24px", maxWidth: 1200, margin: "0 auto",
        ...(visibleSections.features ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }),
      }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-label" style={{ background: "rgba(0,206,201,0.08)", border: "1px solid rgba(0,206,201,0.15)", color: "#00CEC9" }}>FEATURES</div>
          <h2 style={{ fontSize: 44, fontWeight: 800, color: "#fff", marginBottom: 12, fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}>
            Everything you need.<br /><span style={{ color: "#4a4a5a" }}>Nothing you don't.</span>
          </h2>
        </div>

        <div className="filter-tabs" style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 36, flexWrap: "wrap" }}>
          {filterTabs.map((tab) => (
            <button key={tab.id} onClick={() => setFeatureFilter(tab.id)} style={{
              padding: "7px 18px", borderRadius: 10, fontSize: 12, fontWeight: 600,
              border: featureFilter === tab.id ? "1px solid rgba(108,92,231,0.3)" : "1px solid rgba(255,255,255,0.06)",
              background: featureFilter === tab.id ? "rgba(108,92,231,0.12)" : "rgba(255,255,255,0.02)",
              color: featureFilter === tab.id ? "#a29bfe" : "#6a6a7a",
              cursor: "pointer", fontFamily: "Outfit, sans-serif", transition: "all 0.3s",
              whiteSpace: "nowrap",
            }}>{tab.label} {tab.id === "all" && `(${features.length})`}</button>
          ))}
        </div>

        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {filteredFeatures.map((feature, i) => (
            <div key={i} className="feature-card" style={{ animation: `scaleIn 0.4s ease ${i * 0.03}s both` }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{feature.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 5, fontFamily: "Sora, sans-serif" }}>{feature.title}</div>
              <div style={{ fontSize: 12, color: "#6a6a7a", lineHeight: 1.6 }}>{feature.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === KAI SECTION === */}
      <section data-animate id="kai" style={{
        padding: "120px 24px", position: "relative", overflow: "hidden",
        background: "linear-gradient(180deg, transparent, rgba(108,92,231,0.03), transparent)",
        ...(visibleSections.kai ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }),
      }}>
        <div className="glow-orb" style={{ width: 500, height: 500, background: "#6C5CE7", top: "30%", left: -200, opacity: 0.06 }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)", color: "#a29bfe" }}>AI COPILOT</div>
          
          <div style={{
            width: 72, height: 72, borderRadius: 20, margin: "0 auto 28px",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "glow 4s ease-in-out infinite",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
          </div>

          <h2 style={{ fontSize: 44, fontWeight: 800, color: "#fff", marginBottom: 12, fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}>
            Meet Kai
          </h2>
          <p style={{ fontSize: 17, color: "#6a6a7a", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 40px" }}>
            Your AI copilot that works across every area of your life — not just tasks.
          </p>

          <div className="kai-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, maxWidth: 650, margin: "0 auto" }}>
            {[
              { emoji: "🌅", text: "Plans your morning", color: "#ff6b6b" },
              { emoji: "📧", text: "Writes your emails", color: "#74b9ff" },
              { emoji: "💪", text: "Suggests workouts", color: "#e17055" },
              { emoji: "📊", text: "Analyzes your habits", color: "#6C5CE7" },
              { emoji: "💰", text: "Tracks your budget", color: "#00b894" },
              { emoji: "🌙", text: "Reviews your day", color: "#a29bfe" },
            ].map((item, i) => (
              <div key={i} style={{
                padding: 16, borderRadius: 14,
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                fontSize: 13, color: "#b0b0c0", display: "flex", alignItems: "center", gap: 10,
                transition: "all 0.3s",
              }}>
                <span style={{ fontSize: 18 }}>{item.emoji}</span>
                <span style={{ fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === COMPARISON === */}
      <section id="compare" data-animate style={{
        padding: "100px 24px",
        ...(visibleSections.compare ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }),
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.15)", color: "#ff6b6b" }}>COMPARE</div>
            <h2 style={{ fontSize: 44, fontWeight: 800, color: "#fff", marginBottom: 12, fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}>
              4x more. 4x less.
            </h2>
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, overflow: "hidden" }}>
            <div className="compare-row" style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 70px 70px 70px", padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 11, fontWeight: 600, color: "#4a4a5a", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              <div>App</div><div style={{ textAlign: "center" }}>Features</div><div style={{ textAlign: "center" }}>Price</div><div style={{ textAlign: "center" }}>Wellness</div><div style={{ textAlign: "center" }}>Family</div><div style={{ textAlign: "center" }}>Finance</div>
            </div>
            {comparisons.map((comp, i) => (
              <div key={i} className="compare-row" style={{
                display: "grid", gridTemplateColumns: "1fr 80px 100px 70px 70px 70px",
                padding: "16px 24px", alignItems: "center",
                borderBottom: i < comparisons.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                background: comp.highlight ? "rgba(108,92,231,0.06)" : "transparent",
                animation: comp.highlight ? "borderGlow 3s ease-in-out infinite" : "none",
                borderLeft: comp.highlight ? "2px solid #6C5CE7" : "2px solid transparent",
              }}>
                <div style={{ fontSize: 14, fontWeight: comp.highlight ? 800 : 500, color: comp.highlight ? "#fff" : "#6a6a7a", display: "flex", alignItems: "center", gap: 8 }}>
                  {comp.highlight && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "#6C5CE7", color: "#fff", fontWeight: 700 }}>YOU</span>}
                  {comp.app}
                </div>
                <div style={{ textAlign: "center", fontSize: 16, fontWeight: 700, color: comp.highlight ? "#6C5CE7" : "#6a6a7a" }}>{comp.features}</div>
                <div style={{ textAlign: "center", fontSize: 14, fontWeight: 700, color: comp.highlight ? "#00CEC9" : "#ff6b6b" }}>{comp.price}</div>
                <div style={{ textAlign: "center", fontSize: 16 }}>{comp.wellness ? "✓" : "—"}</div>
                <div style={{ textAlign: "center", fontSize: 16 }}>{comp.family ? "✓" : "—"}</div>
                <div style={{ textAlign: "center", fontSize: 16 }}>{comp.finance ? "✓" : "—"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section data-animate id="testimonials" style={{
        padding: "100px 24px",
        ...(visibleSections.testimonials ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }),
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ background: "rgba(253,203,110,0.08)", border: "1px solid rgba(253,203,110,0.15)", color: "#fdcb6e" }}>TESTIMONIALS</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: "#fff", fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}>People love DayLyft</h2>
          </div>
          <div className="testimonial-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                padding: 24, borderRadius: 18,
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
              }}>
                <p style={{ fontSize: 14, color: "#b0b0c0", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: t.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, color: "#fff",
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "#6a6a7a" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === PRICING === */}
      <section id="pricing" data-animate style={{
        padding: "100px 24px",
        ...(visibleSections.pricing ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }),
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ background: "rgba(0,206,201,0.08)", border: "1px solid rgba(0,206,201,0.15)", color: "#00CEC9" }}>PRICING</div>
            <h2 style={{ fontSize: 44, fontWeight: 800, color: "#fff", marginBottom: 12, fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}>
              Simple pricing
            </h2>
            <p style={{ fontSize: 15, color: "#6a6a7a" }}>Start free. Upgrade when you're ready.</p>
          </div>

          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "start" }}>
            {/* Starter */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: 32 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#6a6a7a", marginBottom: 8 }}>Starter</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}><span style={{ fontSize: 48, fontWeight: 900, color: "#fff", fontFamily: "Sora" }}>$0</span><span style={{ fontSize: 14, color: "#4a4a5a" }}>/forever</span></div>
              <div style={{ fontSize: 13, color: "#4a4a5a", marginBottom: 24 }}>Everything to get started</div>
              <a href="/login" className="btn-secondary" style={{ width: "100%", justifyContent: "center", padding: "13px", marginBottom: 24, fontSize: 13 }}>Get started free</a>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["11 core features", "Kai Chat (10/day)", "3 color themes", "Pomodoro Timer", "Water Tracker", "Daily Checklist", "Gratitude Journal"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6a6a7a" }}>
                    <span style={{ color: "#00CEC9", fontSize: 14 }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </div>

            {/* Pro */}
            <div style={{
              background: "rgba(108,92,231,0.06)", border: "1px solid rgba(108,92,231,0.2)",
              borderRadius: 20, padding: 32, position: "relative",
              boxShadow: "0 0 80px rgba(108,92,231,0.08)",
            }}>
              <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", borderRadius: 100, background: "#6C5CE7", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.08em" }}>POPULAR</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#a29bfe", marginBottom: 8 }}>Pro</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}><span style={{ fontSize: 48, fontWeight: 900, color: "#fff", fontFamily: "Sora" }}>$6.99</span><span style={{ fontSize: 14, color: "#4a4a5a" }}>/month</span></div>
              <div style={{ fontSize: 13, color: "#4a4a5a", marginBottom: 24 }}>All 40+ features, unlimited</div>
              <a href="/login" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px", marginBottom: 24, fontSize: 13 }}>Start free trial</a>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["All 40+ features", "Unlimited Kai AI", "7 premium themes", "All Zen sounds", "Journal + AI summaries", "Budget + Savings + Bills", "Workout + Sleep + Energy", "Flashcards + Email Writer", "Priority support"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#b0b0c0" }}>
                    <span style={{ color: "#6C5CE7", fontSize: 14 }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </div>

            {/* Business */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: 32 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#6a6a7a", marginBottom: 8 }}>Business</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}><span style={{ fontSize: 48, fontWeight: 900, color: "#fff", fontFamily: "Sora" }}>$12.99</span><span style={{ fontSize: 14, color: "#4a4a5a" }}>/user/mo</span></div>
              <div style={{ fontSize: 13, color: "#4a4a5a", marginBottom: 24 }}>For teams that win together</div>
              <a href="/login" className="btn-secondary" style={{ width: "100%", justifyContent: "center", padding: "13px", marginBottom: 24, fontSize: 13 }}>Contact us</a>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Everything in Pro", "Team Dashboard", "Shared Tasks", "Team Analytics", "Admin Panel", "Custom Branding", "Priority Support"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6a6a7a" }}>
                    <span style={{ color: "#00CEC9", fontSize: 14 }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section style={{ padding: "120px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="glow-orb" style={{ width: 600, height: 600, background: "#6C5CE7", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0.05 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 580, margin: "0 auto" }}>
          <h2 style={{ fontSize: 52, fontWeight: 900, color: "#fff", marginBottom: 16, fontFamily: "Sora, sans-serif", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Ready to<br /><span style={{ color: "#6C5CE7" }}>lift your day?</span>
          </h2>
          <p style={{ fontSize: 16, color: "#6a6a7a", marginBottom: 36, lineHeight: 1.7 }}>
            Join people who replaced 10 apps with one. Start free, upgrade when you're hooked.
          </p>
          <a href="/login" className="btn-primary" style={{ fontSize: 16, padding: "18px 44px" }}>
            Get Started — It's Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
          <div style={{ marginTop: 14, fontSize: 12, color: "#4a4a5a" }}>No credit card · Free forever plan</div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" fill="white" /><circle cx="16" cy="14" r="3" fill="white" /><line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "Sora" }}>DayLyft</span>
              </div>
              <p style={{ fontSize: 13, color: "#4a4a5a", lineHeight: 1.7, maxWidth: 260 }}>AI-powered super app for productivity, wellness, and life management.</p>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#6a6a7a", marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Product</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span onClick={() => scrollTo("features")} style={{ fontSize: 13, color: "#4a4a5a", cursor: "pointer" }}>Features</span>
                <span onClick={() => scrollTo("pricing")} style={{ fontSize: 13, color: "#4a4a5a", cursor: "pointer" }}>Pricing</span>
                <span onClick={() => scrollTo("compare")} style={{ fontSize: 13, color: "#4a4a5a", cursor: "pointer" }}>Compare</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#6a6a7a", marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Company</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="/about" style={{ fontSize: 13, color: "#4a4a5a", textDecoration: "none" }}>About</a>
                <a href="/contact" style={{ fontSize: 13, color: "#4a4a5a", textDecoration: "none" }}>Contact</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#6a6a7a", marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Legal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="/privacy" style={{ fontSize: 13, color: "#4a4a5a", textDecoration: "none" }}>Privacy</a>
                <a href="/terms" style={{ fontSize: 13, color: "#4a4a5a", textDecoration: "none" }}>Terms</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#3a3a4a" }}>© 2026 DayLyft. All rights reserved.</span>
            <span style={{ fontSize: 12, color: "#3a3a4a" }}>Made with ❤️ in Miami</span>
          </div>
        </div>
      </footer>
    </div>
  );
}