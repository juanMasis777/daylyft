"use client";

import { useState, useEffect } from "react";

const features = [
  { emoji: "🤖", title: "Kai AI Copilot", desc: "Your personal AI assistant that plans your day, analyzes habits, and gives personalized advice" },
  { emoji: "✅", title: "Smart Tasks", desc: "Organize tasks with priorities, categories, and AI-powered scheduling" },
  { emoji: "📅", title: "Calendar", desc: "Visual weekly calendar with color-coded events and smart reminders" },
  { emoji: "🧬", title: "Productivity DNA", desc: "Discover your unique productivity personality and optimize your workflow" },
  { emoji: "🧘", title: "Zen Mode", desc: "8 ambient sounds, breathing exercises, and guided relaxation" },
  { emoji: "📊", title: "Analytics", desc: "Track your productivity patterns with beautiful charts and insights" },
  { emoji: "🎯", title: "Goal Setting", desc: "Set weekly, monthly, and yearly goals with visual progress tracking" },
  { emoji: "📓", title: "Life Journal", desc: "Daily journal with mood tracking and AI-generated summaries" },
  { emoji: "⚡", title: "Energy Map", desc: "Track your energy levels hourly to find your peak performance windows" },
  { emoji: "🏆", title: "Weekly Wins", desc: "AI-graded weekly performance reports with actionable feedback" },
  { emoji: "💵", title: "Budget Tracker", desc: "Track income and expenses with category breakdowns and AI tips" },
  { emoji: "🔥", title: "Habit Tracker", desc: "Build powerful habits with streaks, visual grids, and accountability" },
  { emoji: "🛡", title: "Focus Shield", desc: "Block distractions and protect deep work time with smart sessions" },
  { emoji: "🍅", title: "Pomodoro Timer", desc: "Customizable focus cycles with break reminders and session stats" },
  { emoji: "👨‍👩‍👧", title: "Family Mode", desc: "Manage meals, chores, and family budget all in one place" },
  { emoji: "⚖️", title: "Life Balance", desc: "Radar chart across 8 life areas with AI coaching" },
  { emoji: "🙏", title: "Gratitude Journal", desc: "Daily gratitude practice proven to increase happiness by 25%" },
  { emoji: "💧", title: "Water Tracker", desc: "Stay hydrated with visual tracking, goals, and weekly charts" },
  { emoji: "😴", title: "Sleep Tracker", desc: "Log sleep patterns and get AI insights for better rest" },
  { emoji: "🏋️", title: "Workout Tracker", desc: "Log exercises with sets, reps, weight, and AI suggestions" },
  { emoji: "🧠", title: "Flashcards", desc: "Create study decks or let AI generate cards from any topic" },
  { emoji: "✉️", title: "Email Templates", desc: "AI writes perfect emails for any situation in your chosen tone" },
  { emoji: "💡", title: "Idea Vault", desc: "Capture ideas instantly and let AI help develop the best ones" },
  { emoji: "🎁", title: "Gift Planner", desc: "Never forget a birthday — AI suggests personalized gift ideas" },
  { emoji: "📖", title: "Reading List", desc: "Track books with ratings, notes, and AI recommendations" },
  { emoji: "🐷", title: "Savings Goals", desc: "Visual savings targets with deposits, deadlines, and AI advice" },
  { emoji: "📋", title: "Bill Reminder", desc: "Track bills, due dates, auto-pay status, and payment history" },
  { emoji: "🔗", title: "Link Saver", desc: "Organize bookmarks by category with search and favorites" },
  { emoji: "🎲", title: "Daily Challenge", desc: "28 rotating challenges to push you outside your comfort zone" },
  { emoji: "🎯", title: "Decision Maker", desc: "AI analyzes your options with pros, cons, and recommendations" },
  { emoji: "⏳", title: "Countdown Timer", desc: "Live countdowns for events, deadlines, and exciting moments" },
  { emoji: "☑️", title: "Daily Checklist", desc: "Morning and evening routines that reset daily with streaks" },
  { emoji: "📝", title: "Quick Notes", desc: "Capture thoughts with colors, pins, search, and AI expand" },
  { emoji: "🌙", title: "Night Report", desc: "AI-generated end-of-day summary with score and insights" },
  { emoji: "⏰", title: "Autopilot", desc: "Kai plans your entire day based on your tasks and energy" },
  { emoji: "💬", title: "Kai's Wisdom", desc: "Daily motivational quotes and advice personalized by AI" },
  { emoji: "🧘", title: "Stretching Guide", desc: "5 guided routines with timers for every moment of your day" },
  { emoji: "⏱", title: "Focus Music", desc: "Ambient soundscapes designed for deep concentration" },
  { emoji: "🌅", title: "7 Themes", desc: "Midnight, Snow, Ocean, Forest, Rose, Amber, and Sunset" },
  { emoji: "🚀", title: "+More Coming", desc: "We ship new features every week based on user feedback" },
];

const comparisons = [
  { app: "Motion", features: 10, price: "$29/mo", wellness: false, family: false, finance: false },
  { app: "Sunsama", features: 10, price: "$20/mo", wellness: false, family: false, finance: false },
  { app: "Notion", features: 10, price: "$10/mo", wellness: false, family: false, finance: false },
  { app: "DayLyft", features: 40, price: "FREE", wellness: true, family: true, finance: true, highlight: true },
];

export default function LandingPage() {
  const [visibleSections, setVisibleSections] = useState({});
  const [featurePage, setFeaturePage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const featuresPerPage = 8;
  const totalPages = Math.ceil(features.length / featuresPerPage);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div style={{ background: "#0a0a0f", color: "#e8e8f0", fontFamily: "'Outfit', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(108,92,231,0.3); } 50% { box-shadow: 0 0 40px rgba(108,92,231,0.6); } }
        @keyframes gradientBg { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .nav-link { color: #8a8a9a; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.3s; cursor: pointer; }
        .nav-link:hover { color: #e8e8f0; }
        .hero-btn { padding: 16px 36px; border-radius: 14px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.3s; border: none; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
        .hero-btn-primary { background: linear-gradient(135deg, #6C5CE7, #a29bfe); color: #fff; }
        .hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(108,92,231,0.4); }
        .hero-btn-secondary { background: rgba(255,255,255,0.06); color: #e8e8f0; border: 1px solid rgba(255,255,255,0.1); }
        .hero-btn-secondary:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }
        .feature-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px; transition: all 0.3s; cursor: default; }
        .feature-card:hover { background: rgba(108,92,231,0.08); border-color: rgba(108,92,231,0.2); transform: translateY(-4px); }
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.15; animation: pulse 6s ease-in-out infinite; }
        .stat-number { font-size: 56px; font-weight: 900; line-height: 1; background: linear-gradient(135deg, #6C5CE7, #00CEC9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        @media (max-width: 768px) { .hero-title { font-size: 36px !important; } .hero-subtitle { font-size: 16px !important; } .stat-number { font-size: 36px !important; } .nav-desktop { display: none !important; } .hero-buttons { flex-direction: column !important; } .features-grid { grid-template-columns: 1fr !important; } .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } .pricing-grid { grid-template-columns: 1fr !important; } .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" fill="white" /><circle cx="16" cy="14" r="3" fill="white" /><line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>DayLyft</span>
          </div>
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <span className="nav-link" onClick={() => scrollTo("features")}>Features</span>
            <span className="nav-link" onClick={() => scrollTo("compare")}>Compare</span>
            <span className="nav-link" onClick={() => scrollTo("pricing")}>Pricing</span>
            <a href="/login" style={{ padding: "8px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff", textDecoration: "none" }}>Get Started Free</a>
          </div>
          <div className="nav-mobile" style={{ display: "none" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </div>
        </div>
      </nav>
      <style>{`@media (max-width: 768px) { .nav-desktop { display: none !important; } .nav-mobile { display: block !important; } }`}</style>

      {mobileMenuOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, bottom: 0, zIndex: 99, background: "rgba(10,10,15,0.95)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          <span className="nav-link" style={{ fontSize: 20 }} onClick={() => scrollTo("features")}>Features</span>
          <span className="nav-link" style={{ fontSize: 20 }} onClick={() => scrollTo("compare")}>Compare</span>
          <span className="nav-link" style={{ fontSize: 20 }} onClick={() => scrollTo("pricing")}>Pricing</span>
          <a href="/login" className="hero-btn hero-btn-primary" style={{ marginTop: 16 }}>Get Started Free</a>
        </div>
      )}

      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", overflow: "hidden" }}>
        <div className="glow-orb" style={{ width: 500, height: 500, background: "#6C5CE7", top: -100, left: -100 }} />
        <div className="glow-orb" style={{ width: 400, height: 400, background: "#00CEC9", bottom: -100, right: -100, animationDelay: "3s" }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "#fd79a8", top: "40%", right: "20%", animationDelay: "1.5s" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, marginBottom: 24, background: "rgba(108,92,231,0.12)", border: "1px solid rgba(108,92,231,0.25)", animation: "slideUp 0.6s ease" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00CEC9", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#a29bfe" }}>40 features · 100% free to start</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.1, marginBottom: 20, animation: "slideUp 0.8s ease" }}>
            <span style={{ color: "#fff" }}>Your life.</span><br />
            <span style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9, #fd79a8)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientBg 4s ease infinite" }}>One app.</span>
          </h1>
          <p className="hero-subtitle" style={{ fontSize: 20, color: "#8a8a9a", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 36px", animation: "slideUp 1s ease" }}>
            Productivity. Wellness. Finances. Family. Fitness. Learning.<br />
            <span style={{ color: "#a29bfe" }}>All powered by Kai, your AI copilot.</span>
          </p>
          <div className="hero-buttons" style={{ display: "flex", gap: 16, justifyContent: "center", animation: "slideUp 1.2s ease" }}>
            <a href="/login" className="hero-btn hero-btn-primary">Start free — No credit card<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></a>
            <button className="hero-btn hero-btn-secondary" onClick={() => scrollTo("features")}>See all 40 features</button>
          </div>
          <div style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, animation: "slideUp 1.4s ease" }}>
            <div style={{ display: "flex" }}>
              {["#6C5CE7", "#00CEC9", "#fd79a8", "#fdcb6e"].map((color, i) => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #0a0a0f", background: `linear-gradient(135deg, ${color}, ${color}aa)`, marginLeft: i > 0 ? -10 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>{["J", "M", "A", "S"][i]}</div>
              ))}
            </div>
            <span style={{ fontSize: 14, color: "#8a8a9a" }}>Join early adopters using DayLyft</span>
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "48px 24px", background: "rgba(108,92,231,0.03)" }}>
        <div className="stats-grid" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
          {[{ number: "40+", label: "Features" }, { number: "$0", label: "To start" }, { number: "1", label: "App for everything" }, { number: "24/7", label: "AI Copilot" }].map((stat, i) => (
            <div key={i}><div className="stat-number">{stat.number}</div><div style={{ fontSize: 14, color: "#8a8a9a", marginTop: 4 }}>{stat.label}</div></div>
          ))}
        </div>
      </section>

      <section id="features" data-animate style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto", ...(visibleSections.features ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }) }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 100, marginBottom: 16, background: "rgba(0,206,201,0.1)", border: "1px solid rgba(0,206,201,0.2)", fontSize: 13, fontWeight: 600, color: "#00CEC9" }}>40 FEATURES</div>
          <h2 style={{ fontSize: 42, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Everything you need.<br /><span style={{ color: "#8a8a9a" }}>Nothing you don't.</span></h2>
          <p style={{ fontSize: 16, color: "#8a8a9a", maxWidth: 500, margin: "0 auto" }}>Productivity, wellness, finances, fitness, learning, and family — all in one beautiful app.</p>
        </div>
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {features.slice(featurePage * featuresPerPage, (featurePage + 1) * featuresPerPage).map((feature, i) => (
            <div key={i} className="feature-card"><div style={{ fontSize: 32, marginBottom: 12 }}>{feature.emoji}</div><div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{feature.title}</div><div style={{ fontSize: 13, color: "#8a8a9a", lineHeight: 1.6 }}>{feature.desc}</div></div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
          {Array.from({ length: totalPages }, (_, i) => (<button key={i} onClick={() => setFeaturePage(i)} style={{ width: featurePage === i ? 32 : 10, height: 10, borderRadius: 5, border: "none", background: featurePage === i ? "#6C5CE7" : "rgba(255,255,255,0.15)", cursor: "pointer", transition: "all 0.3s" }} />))}
        </div>
        <div style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: "#8a8a9a" }}>Showing {featurePage * featuresPerPage + 1}-{Math.min((featurePage + 1) * featuresPerPage, features.length)} of {features.length} features</div>
      </section>

      <section id="compare" data-animate style={{ padding: "100px 24px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", ...(visibleSections.compare ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }) }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 100, marginBottom: 16, background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)", fontSize: 13, fontWeight: 600, color: "#ff6b6b" }}>VS THE COMPETITION</div>
            <h2 style={{ fontSize: 42, fontWeight: 800, color: "#fff", marginBottom: 12 }}>4x more features.<br /><span style={{ color: "#8a8a9a" }}>4x less price.</span></h2>
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 70px 70px 70px", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 12, fontWeight: 600, color: "#8a8a9a", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <div>App</div><div style={{ textAlign: "center" }}>Features</div><div style={{ textAlign: "center" }}>Price</div><div style={{ textAlign: "center" }}>Wellness</div><div style={{ textAlign: "center" }}>Family</div><div style={{ textAlign: "center" }}>Finance</div>
            </div>
            {comparisons.map((comp, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px 70px 70px 70px", padding: "18px 24px", alignItems: "center", borderBottom: i < comparisons.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", background: comp.highlight ? "rgba(108,92,231,0.08)" : "transparent" }}>
                <div style={{ fontSize: 16, fontWeight: comp.highlight ? 800 : 500, color: comp.highlight ? "#fff" : "#8a8a9a", display: "flex", alignItems: "center", gap: 8 }}>{comp.highlight && <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 6, background: "#6C5CE7", color: "#fff" }}>YOU</span>}{comp.app}</div>
                <div style={{ textAlign: "center", fontSize: 18, fontWeight: 700, color: comp.highlight ? "#6C5CE7" : "#8a8a9a" }}>{comp.features}</div>
                <div style={{ textAlign: "center", fontSize: 16, fontWeight: 700, color: comp.highlight ? "#00CEC9" : "#ff6b6b" }}>{comp.price}</div>
                <div style={{ textAlign: "center", fontSize: 18 }}>{comp.wellness ? "✅" : "❌"}</div>
                <div style={{ textAlign: "center", fontSize: 18 }}>{comp.family ? "✅" : "❌"}</div>
                <div style={{ textAlign: "center", fontSize: 18 }}>{comp.finance ? "✅" : "❌"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-animate id="kai" style={{ padding: "100px 24px", position: "relative", overflow: "hidden", ...(visibleSections.kai ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }) }}>
        <div className="glow-orb" style={{ width: 400, height: 400, background: "#6C5CE7", top: "20%", left: -100 }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, margin: "0 auto 24px", background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center", animation: "glow 3s ease-in-out infinite" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
          </div>
          <h2 style={{ fontSize: 42, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Meet Kai.<br /><span style={{ color: "#a29bfe" }}>Your AI copilot.</span></h2>
          <p style={{ fontSize: 18, color: "#8a8a9a", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 36px" }}>Kai plans your day, analyzes your habits, writes your emails, suggests workouts, recommends books, and gives you personalized advice across every area of your life.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 700, margin: "0 auto" }}>
            {[{ emoji: "🌅", text: "Plans your morning" }, { emoji: "📧", text: "Writes your emails" }, { emoji: "💪", text: "Suggests workouts" }, { emoji: "📊", text: "Analyzes your habits" }, { emoji: "💰", text: "Budgets your money" }, { emoji: "🌙", text: "Reviews your day" }].map((item, i) => (
              <div key={i} style={{ padding: "16px", borderRadius: 14, background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)", fontSize: 14, color: "#e8e8f0", display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 20 }}>{item.emoji}</span> {item.text}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" data-animate style={{ padding: "100px 24px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", ...(visibleSections.pricing ? { opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease" } : { opacity: 0, transform: "translateY(40px)" }) }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 100, marginBottom: 16, background: "rgba(253,203,110,0.1)", border: "1px solid rgba(253,203,110,0.2)", fontSize: 13, fontWeight: 600, color: "#fdcb6e" }}>PRICING</div>
            <h2 style={{ fontSize: 42, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Start free.<br /><span style={{ color: "#8a8a9a" }}>Upgrade when you're hooked.</span></h2>
          </div>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 32 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#8a8a9a", marginBottom: 8 }}>Starter</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}><span style={{ fontSize: 48, fontWeight: 900, color: "#fff" }}>$0</span><span style={{ fontSize: 16, color: "#8a8a9a" }}>/forever</span></div>
              <div style={{ fontSize: 13, color: "#8a8a9a", marginBottom: 24 }}>Everything you need to get started</div>
              <a href="/login" className="hero-btn hero-btn-secondary" style={{ width: "100%", justifyContent: "center", padding: "14px", marginBottom: 24 }}>Get started free</a>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["11 core features", "Kai Chat (10/day)", "3 color themes", "Pomodoro Timer", "Water Tracker", "Daily Checklist", "Gratitude Journal", "Zen Mode (3 sounds)"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8a8a9a" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00CEC9" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>{f}</div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(108,92,231,0.08)", border: "2px solid rgba(108,92,231,0.3)", borderRadius: 20, padding: 32, position: "relative", boxShadow: "0 0 60px rgba(108,92,231,0.15)" }}>
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", borderRadius: 100, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>MOST POPULAR</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#a29bfe", marginBottom: 8 }}>Pro</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}><span style={{ fontSize: 48, fontWeight: 900, color: "#fff" }}>$6.99</span><span style={{ fontSize: 16, color: "#8a8a9a" }}>/month</span></div>
              <div style={{ fontSize: 13, color: "#8a8a9a", marginBottom: 24 }}>All 40 features, unlimited everything</div>
              <a href="/login" className="hero-btn hero-btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px", marginBottom: 24 }}>Start free trial</a>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["All 40 features", "Unlimited Kai AI", "7 premium themes", "All Zen sounds + breathing", "Journal + AI summaries", "DNA + Autopilot + Night Report", "Budget + Savings + Bills", "Workout + Sleep + Energy", "Flashcards + Email Templates", "Priority support"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#e8e8f0" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>{f}</div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 32 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#8a8a9a", marginBottom: 8 }}>Business</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}><span style={{ fontSize: 48, fontWeight: 900, color: "#fff" }}>$12.99</span><span style={{ fontSize: 16, color: "#8a8a9a" }}>/user/mo</span></div>
              <div style={{ fontSize: 13, color: "#8a8a9a", marginBottom: 24 }}>For teams that want to win together</div>
              <a href="/login" className="hero-btn hero-btn-secondary" style={{ width: "100%", justifyContent: "center", padding: "14px", marginBottom: 24 }}>Contact us</a>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Everything in Pro", "Team Dashboard", "Shared Tasks", "Team Analytics", "Admin Panel", "Custom Branding", "Priority Support", "Export Reports"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8a8a9a" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00CEC9" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>{f}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="glow-orb" style={{ width: 500, height: 500, background: "#6C5CE7", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 48, fontWeight: 900, color: "#fff", marginBottom: 16 }}>Ready to<br /><span style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>lift your day?</span></h2>
          <p style={{ fontSize: 18, color: "#8a8a9a", marginBottom: 32, lineHeight: 1.7 }}>Join thousands of people who are already using DayLyft to be more productive, healthier, and happier.</p>
          <a href="/login" className="hero-btn hero-btn-primary" style={{ fontSize: 18, padding: "18px 44px" }}>Get Started — It's Free<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></a>
          <div style={{ marginTop: 16, fontSize: 13, color: "#636e72" }}>No credit card required · Free forever plan available</div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" fill="white" /><circle cx="16" cy="14" r="3" fill="white" /><line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </div>
                <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>DayLyft</span>
              </div>
              <p style={{ fontSize: 14, color: "#636e72", lineHeight: 1.7, maxWidth: 280 }}>The AI-powered super app for productivity, wellness, and life management. 40+ features. One app.</p>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Product</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span onClick={() => scrollTo("features")} style={{ fontSize: 13, color: "#636e72", cursor: "pointer" }}>Features</span>
                <span onClick={() => scrollTo("pricing")} style={{ fontSize: 13, color: "#636e72", cursor: "pointer" }}>Pricing</span>
                <span onClick={() => scrollTo("compare")} style={{ fontSize: 13, color: "#636e72", cursor: "pointer" }}>Compare</span>
                <span style={{ fontSize: 13, color: "#636e72", cursor: "pointer" }}>Changelog</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Company</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 13, color: "#636e72", cursor: "pointer" }}>About</span>
                <span style={{ fontSize: 13, color: "#636e72", cursor: "pointer" }}>Blog</span>
                <span style={{ fontSize: 13, color: "#636e72", cursor: "pointer" }}>Careers</span>
                <a href="mailto:juanmasis777@gmail.com" style={{ fontSize: 13, color: "#636e72", cursor: "pointer", textDecoration: "none" }}>Contact</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Legal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="/privacy" style={{ fontSize: 13, color: "#636e72", cursor: "pointer", textDecoration: "none" }}>Privacy</a>
                <a href="/privacy" style={{ fontSize: 13, color: "#636e72", cursor: "pointer", textDecoration: "none" }}>Terms</a>
                <a href="/privacy" style={{ fontSize: 13, color: "#636e72", cursor: "pointer", textDecoration: "none" }}>Security</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#636e72" }}>© 2026 DayLyft. All rights reserved.</span>
            <span style={{ fontSize: 13, color: "#636e72" }}>Made with ❤️ in Miami</span>
          </div>
        </div>
      </footer>
    </div>
  );
}