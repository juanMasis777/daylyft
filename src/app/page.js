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
{ name: "Sarah K.", role: "Freelance Designer", text: "DayLyft replaced 6 apps for me. Kai literally plans my mornings now.", avatar: "SK", color: "#fd79a8" },
{ name: "Marcus T.", role: "Startup Founder", text: "40 features for free? I was skeptical. Then I tried Kai. Now I'm Pro.", avatar: "MT", color: "#6C5CE7" },
{ name: "Ana R.", role: "Student", text: "Flashcards + Pomodoro + Habit Tracker in one app. My GPA went up.", avatar: "AR", color: "#00CEC9" },
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
  <div style={{ background: "#ffffff", color: "#1a1a2e", fontFamily: "'Outfit', sans-serif", overflowX: "hidden" }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Sora:wght@400;500;600;700;800&display=swap');
      @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes gradientBg { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      @keyframes glow { 0%, 100% { box-shadow: 0 8px 30px rgba(108,92,231,0.15); } 50% { box-shadow: 0 8px 50px rgba(108,92,231,0.3); } }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      .nav-link { color: #6b7280; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.3s; cursor: pointer; }
      .nav-link:hover { color: #1a1a2e; }
      .btn-primary { padding: 14px 32px; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.3s; border: none; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; background: #6C5CE7; color: #fff; }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(108,92,231,0.3); background: #5a4bd6; }
      .btn-secondary { padding: 14px 32px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.3s; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; background: #f4f4f8; color: #1a1a2e; border: 1px solid #e8e8f0; }
      .btn-secondary:hover { background: #eaeaef; border-color: #d0d0da; }
      .feature-card { background: #ffffff; border: 1px solid #f0f0f5; border-radius: 16px; padding: 24px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: default; }
      .feature-card:hover { border-color: #6C5CE7; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(108,92,231,0.08); }
      .section-label { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 100px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; }
      @media (max-width: 768px) { .hero-title { font-size: 36px !important; } .hero-sub { font-size: 15px !important; } .stat-num { font-size: 36px !important; } .nav-desktop { display: none !important; } .hero-buttons { flex-direction: column !important; width: 100%; } .hero-buttons > * { width: 100%; justify-content: center; } .features-grid { grid-template-columns: 1fr !important; } .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } .pricing-grid { grid-template-columns: 1fr !important; } .footer-grid { grid-template-columns: 1fr !important; text-align: center; } .kai-grid { grid-template-columns: repeat(2, 1fr) !important; } .testimonial-grid { grid-template-columns: 1fr !important; } .compare-row { grid-template-columns: 1fr 60px 80px 50px 50px 50px !important; font-size: 12px !important; } .filter-tabs { overflow-x: auto; flex-wrap: nowrap !important; } }
    `}</style>

    {/* NAVBAR */}
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrollY > 50 ? "rgba(255,255,255,0.92)" : "transparent", backdropFilter: scrollY > 50 ? "blur(20px)" : "none", borderBottom: scrollY > 50 ? "1px solid #f0f0f5" : "1px solid transparent", padding: "0 24px", transition: "all 0.4s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" fill="white" /><circle cx="16" cy="14" r="3" fill="white" /><line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", fontFamily: "Sora, sans-serif" }}>DayLyft</span>
        </div>
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <span className="nav-link" onClick={() => scrollTo("features")}>Features</span>
          <span className="nav-link" onClick={() => scrollTo("compare")}>Compare</span>
          <span className="nav-link" onClick={() => scrollTo("pricing")}>Pricing</span>
          <a href="/about" className="nav-link" style={{ textDecoration: "none" }}>About</a>
          <a href="/login" className="btn-primary" style={{ padding: "9px 22px", fontSize: 13 }}>Get Started</a>
        </div>
        <div className="nav-mobile" style={{ display: "none" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2"><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="21" y2="17" /></svg>
        </div>
      </div>
    </nav>
    <style>{`@media (max-width: 768px) { .nav-desktop { display: none !important; } .nav-mobile { display: block !important; } }`}</style>

    {mobileMenuOpen && (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 99, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
        <div onClick={() => setMobileMenuOpen(false)} style={{ position: "absolute", top: 20, right: 24, cursor: "pointer" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </div>
        <span style={{ fontSize: 18, color: "#6b7280", cursor: "pointer" }} onClick={() => scrollTo("features")}>Features</span>
        <span style={{ fontSize: 18, color: "#6b7280", cursor: "pointer" }} onClick={() => scrollTo("compare")}>Compare</span>
        <span style={{ fontSize: 18, color: "#6b7280", cursor: "pointer" }} onClick={() => scrollTo("pricing")}>Pricing</span>
        <a href="/login" className="btn-primary" style={{ marginTop: 16 }}>Get Started Free</a>
      </div>
    )}

    {/* HERO */}
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "140px 24px 100px", overflow: "hidden", background: "linear-gradient(180deg, #f8f7ff 0%, #ffffff 50%, #f4f8ff 100%)" }}>
      <div style={{ position: "absolute", top: -200, right: -200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(108,92,231,0.08) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: -200, left: -200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,206,201,0.06) 0%, transparent 70%)" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        <div style={{ animation: "slideUp 0.6s ease" }}>
          <div className="section-label" style={{ background: "#f0eeff", color: "#6C5CE7", border: "1px solid #e0dcff" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00CEC9" }} />
            Now with 40+ features
          </div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 68, fontWeight: 900, lineHeight: 1.08, marginBottom: 24, fontFamily: "Sora, sans-serif", letterSpacing: "-0.03em", color: "#1a1a2e", animation: "slideUp 0.8s ease" }}>
          One app for<br />
          <span style={{ background: "linear-gradient(135deg, #6C5CE7 0%, #00CEC9 50%, #fd79a8 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientBg 5s ease infinite" }}>your entire life</span>
        </h1>
        <p className="hero-sub" style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 40px", animation: "slideUp 1s ease" }}>
          Productivity, wellness, finances, fitness, family, and learning —
          all powered by <span style={{ color: "#6C5CE7", fontWeight: 600 }}>Kai</span>, your AI copilot.
        </p>
        <div className="hero-buttons" style={{ display: "flex", gap: 14, justifyContent: "center", animation: "slideUp 1.2s ease" }}>
          <a href="/login" className="btn-primary" style={{ padding: "16px 36px", fontSize: 15 }}>
            Start free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
          <button className="btn-secondary" style={{ padding: "16px 32px" }} onClick={() => scrollTo("features")}>Explore features</button>
        </div>
        <div style={{ marginTop: 56, animation: "slideUp 1.4s ease" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            {["#6C5CE7", "#00CEC9", "#fd79a8", "#fdcb6e", "#00b894"].map((c, i) => (
              <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid #fff", background: c, marginLeft: i > 0 ? -8 : 0, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>{["J", "S", "M", "A", "R"][i]}</div>
            ))}
            <span style={{ fontSize: 13, color: "#9ca3af", marginLeft: 8 }}>Free forever · No credit card</span>
          </div>
        </div>
      </div>
    </section>

    {/* SCROLLING BANNER */}
    <div style={{ borderTop: "1px solid #f0f0f5", borderBottom: "1px solid #f0f0f5", padding: "14px 0", overflow: "hidden", background: "#fafaff" }}>
      <div style={{ display: "flex", animation: "marquee 30s linear infinite", width: "max-content" }}>
        {[...Array(2)].map((_, j) => (
          <div key={j} style={{ display: "flex", gap: 48, paddingRight: 48 }}>
            {["Smart Tasks", "Kai AI", "Calendar", "Pomodoro", "Zen Mode", "Water Tracker", "Budget", "Flashcards", "Habits", "Workout", "Sleep", "Journal", "Goals", "Email Writer"].map((item, i) => (
              <span key={i} style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500, whiteSpace: "nowrap" }}>
                <span style={{ color: "#6C5CE7", marginRight: 6 }}>✦</span>{item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>

    {/* STATS */}
    <section style={{ padding: "80px 24px" }}>
      <div className="stats-grid" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {[
          { number: "40+", label: "Features built", color: "#6C5CE7" },
          { number: "$0", label: "To get started", color: "#00CEC9" },
          { number: "7", label: "Life categories", color: "#fd79a8" },
          { number: "24/7", label: "AI copilot", color: "#fdcb6e" },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center", padding: 28, borderRadius: 16, background: "#fafaff", border: "1px solid #f0f0f5" }}>
            <div className="stat-num" style={{ fontSize: 48, fontWeight: 900, color: stat.color, fontFamily: "Sora, sans-serif", lineHeight: 1 }}>{stat.number}</div>
            <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 8, fontWeight: 500 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" data-animate style={{ padding: "80px 24px 100px", maxWidth: 1200, margin: "0 auto", ...(visibleSections.features ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }) }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div className="section-label" style={{ background: "#e8fff8", color: "#00b894", border: "1px solid #c8f5e6" }}>FEATURES</div>
        <h2 style={{ fontSize: 42, fontWeight: 800, color: "#1a1a2e", marginBottom: 12, fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}>
          Everything you need.<br /><span style={{ color: "#c0c0ca" }}>Nothing you don't.</span>
        </h2>
      </div>
      <div className="filter-tabs" style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 36, flexWrap: "wrap" }}>
        {filterTabs.map((tab) => (
          <button key={tab.id} onClick={() => setFeatureFilter(tab.id)} style={{
            padding: "8px 18px", borderRadius: 10, fontSize: 12, fontWeight: 600,
            border: featureFilter === tab.id ? "1px solid #6C5CE7" : "1px solid #e8e8f0",
            background: featureFilter === tab.id ? "#f0eeff" : "#ffffff",
            color: featureFilter === tab.id ? "#6C5CE7" : "#9ca3af",
            cursor: "pointer", fontFamily: "Outfit, sans-serif", transition: "all 0.3s", whiteSpace: "nowrap",
          }}>{tab.label} {tab.id === "all" && `(${features.length})`}</button>
        ))}
      </div>
      <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {filteredFeatures.map((feature, i) => (
          <div key={feature.title} className="feature-card" style={{ animation: `scaleIn 0.4s ease ${i * 0.03}s both` }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{feature.emoji}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 5, fontFamily: "Sora, sans-serif" }}>{feature.title}</div>
            <div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.6 }}>{feature.desc}</div>
          </div>
        ))}
      </div>
    </section>

    {/* KAI */}
    <section data-animate id="kai" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #f8f7ff, #fff, #f8f7ff)", ...(visibleSections.kai ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }) }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div className="section-label" style={{ background: "#f0eeff", color: "#6C5CE7", border: "1px solid #e0dcff" }}>AI COPILOT</div>
        <div style={{ width: 72, height: 72, borderRadius: 20, margin: "0 auto 28px", background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center", animation: "glow 4s ease-in-out infinite" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
        </div>
        <h2 style={{ fontSize: 42, fontWeight: 800, color: "#1a1a2e", marginBottom: 12, fontFamily: "Sora, sans-serif" }}>Meet Kai</h2>
        <p style={{ fontSize: 16, color: "#9ca3af", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 40px" }}>Your AI copilot that works across every area of your life — not just tasks.</p>
        <div className="kai-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, maxWidth: 650, margin: "0 auto" }}>
          {[
            { emoji: "🌅", text: "Plans your morning" },
            { emoji: "📧", text: "Writes your emails" },
            { emoji: "💪", text: "Suggests workouts" },
            { emoji: "📊", text: "Analyzes your habits" },
            { emoji: "💰", text: "Tracks your budget" },
            { emoji: "🌙", text: "Reviews your day" },
          ].map((item, i) => (
            <div key={i} style={{ padding: 16, borderRadius: 14, background: "#fff", border: "1px solid #f0f0f5", fontSize: 13, color: "#6b7280", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: 18 }}>{item.emoji}</span>
              <span style={{ fontWeight: 500 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* COMPARISON */}
    <section id="compare" data-animate style={{ padding: "100px 24px", ...(visibleSections.compare ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }) }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-label" style={{ background: "#fff0f0", color: "#ff6b6b", border: "1px solid #ffd4d4" }}>COMPARE</div>
          <h2 style={{ fontSize: 42, fontWeight: 800, color: "#1a1a2e", fontFamily: "Sora, sans-serif" }}>4x more. 4x less.</h2>
        </div>
        <div style={{ background: "#fff", border: "1px solid #f0f0f5", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
          <div className="compare-row" style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 70px 70px 70px", padding: "14px 24px", borderBottom: "1px solid #f0f0f5", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <div>App</div><div style={{ textAlign: "center" }}>Features</div><div style={{ textAlign: "center" }}>Price</div><div style={{ textAlign: "center" }}>Wellness</div><div style={{ textAlign: "center" }}>Family</div><div style={{ textAlign: "center" }}>Finance</div>
          </div>
          {comparisons.map((comp, i) => (
            <div key={i} className="compare-row" style={{
              display: "grid", gridTemplateColumns: "1fr 80px 100px 70px 70px 70px",
              padding: "16px 24px", alignItems: "center",
              borderBottom: i < comparisons.length - 1 ? "1px solid #f8f8fa" : "none",
              background: comp.highlight ? "#f8f5ff" : "#fff",
              borderLeft: comp.highlight ? "3px solid #6C5CE7" : "3px solid transparent",
            }}>
              <div style={{ fontSize: 14, fontWeight: comp.highlight ? 800 : 500, color: comp.highlight ? "#1a1a2e" : "#9ca3af", display: "flex", alignItems: "center", gap: 8 }}>
                {comp.highlight && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "#6C5CE7", color: "#fff", fontWeight: 700 }}>YOU</span>}
                {comp.app}
              </div>
              <div style={{ textAlign: "center", fontSize: 16, fontWeight: 700, color: comp.highlight ? "#6C5CE7" : "#9ca3af" }}>{comp.features}</div>
              <div style={{ textAlign: "center", fontSize: 14, fontWeight: 700, color: comp.highlight ? "#00b894" : "#ff6b6b" }}>{comp.price}</div>
              <div style={{ textAlign: "center", fontSize: 14, color: comp.wellness ? "#00b894" : "#d0d0da" }}>{comp.wellness ? "✓" : "—"}</div>
              <div style={{ textAlign: "center", fontSize: 14, color: comp.family ? "#00b894" : "#d0d0da" }}>{comp.family ? "✓" : "—"}</div>
              <div style={{ textAlign: "center", fontSize: 14, color: comp.finance ? "#00b894" : "#d0d0da" }}>{comp.finance ? "✓" : "—"}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section data-animate id="testimonials" style={{ padding: "100px 24px", background: "#fafaff", ...(visibleSections.testimonials ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }) }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-label" style={{ background: "#fff8e8", color: "#e17055", border: "1px solid #ffe8d0" }}>TESTIMONIALS</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#1a1a2e", fontFamily: "Sora, sans-serif" }}>People love DayLyft</h2>
        </div>
        <div className="testimonial-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ padding: 28, borderRadius: 18, background: "#fff", border: "1px solid #f0f0f5", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {[...Array(5)].map((_, s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#fdcb6e"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" /></svg>
                ))}
              </div>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* PRICING */}
    <section id="pricing" data-animate style={{
      padding: "100px 24px",
      ...(visibleSections.pricing ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }),
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-label" style={{ background: "#e8fff8", color: "#00b894", border: "1px solid #c8f5e6" }}>PRICING</div>
          <h2 style={{ fontSize: 42, fontWeight: 800, color: "#1a1a2e", fontFamily: "Sora, sans-serif" }}>Simple pricing</h2>
          <p style={{ fontSize: 15, color: "#9ca3af", marginTop: 8 }}>Start free. Upgrade when you're ready.</p>
        </div>

        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "start" }}>
          {/* STARTER */}
          <div style={{ background: "#fff", border: "1px solid #f0f0f5", borderRadius: 20, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af", marginBottom: 8 }}>Starter</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: "#1a1a2e", fontFamily: "Sora" }}>$0</span>
              <span style={{ fontSize: 14, color: "#c0c0ca" }}>/forever</span>
            </div>
            <div style={{ fontSize: 13, color: "#c0c0ca", marginBottom: 24 }}>11 features to get you hooked</div>
            <a href="/login" className="btn-secondary" style={{ width: "100%", justifyContent: "center", padding: "13px", marginBottom: 24, fontSize: 13 }}>Get started free</a>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Productivity</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {["Smart Tasks (basic)", "Calendar", "Pomodoro Timer", "Daily Checklist", "Quick Notes"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}><span style={{ color: "#00CEC9", fontSize: 14 }}>✓</span>{f}</div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Wellness</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {["Water Tracker", "Gratitude Journal", "Zen Mode (3 sounds)"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}><span style={{ color: "#00CEC9", fontSize: 14 }}>✓</span>{f}</div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>AI & More</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Kai Chat (10 msgs/day)", "Countdown Timer", "Link Saver", "3 color themes"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}><span style={{ color: "#00CEC9", fontSize: 14 }}>✓</span>{f}</div>
              ))}
            </div>
          </div>

          {/* PRO */}
          <div style={{
            background: "#fff", border: "2px solid #6C5CE7", borderRadius: 20, padding: 32,
            position: "relative", boxShadow: "0 8px 40px rgba(108,92,231,0.12)",
          }}>
            <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", borderRadius: 100, background: "#6C5CE7", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.08em" }}>MOST POPULAR</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#6C5CE7", marginBottom: 8 }}>Pro</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: "#1a1a2e", fontFamily: "Sora" }}>$6.99</span>
              <span style={{ fontSize: 14, color: "#c0c0ca" }}>/month</span>
            </div>
            <div style={{ fontSize: 13, color: "#c0c0ca", marginBottom: 24 }}>All 40+ features, unlimited everything</div>
            <a href="/login" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px", marginBottom: 24, fontSize: 13 }}>Start free trial</a>

            <div style={{ fontSize: 12, fontWeight: 600, color: "#6C5CE7", marginBottom: 12 }}>Everything in Starter, plus:</div>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>AI Copilot (unlimited)</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
              {["Unlimited Kai Chat", "Morning Autopilot", "Night Report", "Productivity DNA", "Weekly Wins", "Decision Maker", "Email Templates", "Kai's Wisdom"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}><span style={{ color: "#6C5CE7", fontSize: 14 }}>✓</span>{f}</div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Productivity</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
              {["Analytics", "Goal Setting", "Energy Map", "Focus Shield", "Habit Tracker"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}><span style={{ color: "#6C5CE7", fontSize: 14 }}>✓</span>{f}</div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Wellness & Fitness</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
              {["Sleep Tracker", "Workout Tracker", "Stretching Guide", "Daily Challenge", "Zen Mode (8 sounds + breathing)"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}><span style={{ color: "#6C5CE7", fontSize: 14 }}>✓</span>{f}</div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Life & Finance</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
              {["Life Journal + AI summaries", "Life Balance Wheel", "Family Mode", "Gift Planner", "Idea Vault", "Budget Tracker", "Savings Goals", "Bill Reminder"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}><span style={{ color: "#6C5CE7", fontSize: 14 }}>✓</span>{f}</div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Learning & Extras</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {["Flashcards", "Reading List", "7 premium themes", "Priority support"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}><span style={{ color: "#6C5CE7", fontSize: 14 }}>✓</span>{f}</div>
              ))}
            </div>
          </div>

          {/* BUSINESS */}
          <div style={{ background: "#fff", border: "1px solid #f0f0f5", borderRadius: 20, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af", marginBottom: 8 }}>Business</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: "#1a1a2e", fontFamily: "Sora" }}>$12.99</span>
              <span style={{ fontSize: 14, color: "#c0c0ca" }}>/user/mo</span>
            </div>
            <div style={{ fontSize: 13, color: "#c0c0ca", marginBottom: 24 }}>For teams that win together</div>
            <a href="https://buy.stripe.com/aFa28sggA8TA88A6lQaR207" className="btn-secondary" style={{ width: "100%", justifyContent: "center", padding: "13px", marginBottom: 24, fontSize: 13 }}>Subscribe</a>

            <div style={{ fontSize: 12, fontWeight: 600, color: "#00CEC9", marginBottom: 12 }}>Everything in Pro, plus:</div>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Team Features</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Team Dashboard", "Shared Tasks & assign members", "Team Analytics & reports", "Admin Panel & permissions", "Custom Branding (logo + colors)", "Priority Support (< 4hr)", "Export Reports (PDF/CSV)"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}><span style={{ color: "#00CEC9", fontSize: 14 }}>✓</span>{f}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section style={{ padding: "120px 24px", textAlign: "center", background: "linear-gradient(180deg, #fff, #f8f7ff)" }}>
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <h2 style={{ fontSize: 48, fontWeight: 900, color: "#1a1a2e", marginBottom: 16, fontFamily: "Sora, sans-serif", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Ready to<br /><span style={{ color: "#6C5CE7" }}>lift your day?</span>
        </h2>
        <p style={{ fontSize: 16, color: "#9ca3af", marginBottom: 36, lineHeight: 1.7 }}>Join people who replaced 10 apps with one. Start free, upgrade when you're hooked.</p>
        <a href="/login" className="btn-primary" style={{ fontSize: 16, padding: "18px 44px" }}>
          Get Started — It's Free
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </a>
        <div style={{ marginTop: 14, fontSize: 12, color: "#c0c0ca" }}>No credit card · Free forever plan</div>
      </div>
    </section>

    {/* FOOTER */}
    <footer style={{ borderTop: "1px solid #f0f0f5", padding: "48px 24px 24px", background: "#fafaff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" fill="white" /><circle cx="16" cy="14" r="3" fill="white" /><line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e", fontFamily: "Sora" }}>DayLyft</span>
            </div>
            <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7, maxWidth: 260 }}>AI-powered super app for productivity, wellness, and life management.</p>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Product</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span onClick={() => scrollTo("features")} style={{ fontSize: 13, color: "#9ca3af", cursor: "pointer" }}>Features</span>
              <span onClick={() => scrollTo("pricing")} style={{ fontSize: 13, color: "#9ca3af", cursor: "pointer" }}>Pricing</span>
              <span onClick={() => scrollTo("compare")} style={{ fontSize: 13, color: "#9ca3af", cursor: "pointer" }}>Compare</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Company</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="/about" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>About</a>
              <a href="/contact" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Contact</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Legal</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="/privacy" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Privacy</a>
              <a href="/terms" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>Terms</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #f0f0f5", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#c0c0ca" }}>© 2026 DayLyft. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "#c0c0ca" }}>Made with ❤️ in Miami</span>
        </div>
      </div>
    </footer>
  </div>
);
}