"use client";

import { useEffect, useState } from "react";

const features = [
  { emoji: "🤖", title: "Kai AI Copilot", desc: "Plan your day, write emails, review habits, and get personalized guidance.", cat: "ai" },
  { emoji: "✅", title: "Smart Tasks", desc: "Prioritize your work with categories, focus modes, and AI scheduling.", cat: "prod" },
  { emoji: "📅", title: "Calendar", desc: "Visual weekly planning with events, blocks, and routines.", cat: "prod" },
  { emoji: "🧬", title: "Productivity DNA", desc: "Discover how you work best and build your day around your strengths.", cat: "ai" },
  { emoji: "🧘", title: "Zen Mode", desc: "Ambient sounds, breathing, and guided relaxation for better balance.", cat: "well" },
  { emoji: "📊", title: "Analytics", desc: "Track patterns, progress, consistency, and personal insights.", cat: "prod" },
  { emoji: "🎯", title: "Goal Setting", desc: "Weekly, monthly, and yearly goals with clean progress tracking.", cat: "prod" },
  { emoji: "📓", title: "Life Journal", desc: "Mood tracking, reflections, and AI-generated summaries.", cat: "life" },
  { emoji: "⚡", title: "Energy Map", desc: "Find your best hours for deep work and high-focus sessions.", cat: "prod" },
  { emoji: "🏆", title: "Weekly Wins", desc: "AI-graded weekly performance reports to help you improve.", cat: "ai" },
  { emoji: "💵", title: "Budget Tracker", desc: "Track income, expenses, categories, and monthly goals.", cat: "fin" },
  { emoji: "🔥", title: "Habit Tracker", desc: "Build streaks, visual grids, and daily accountability.", cat: "life" },
  { emoji: "🛡", title: "Focus Shield", desc: "Protect deep work blocks and reduce distractions.", cat: "prod" },
  { emoji: "🍅", title: "Pomodoro Timer", desc: "Focus cycles, breaks, and session tracking.", cat: "prod" },
  { emoji: "👨‍👩‍👧", title: "Family Mode", desc: "Meals, chores, family planning, and shared organization.", cat: "life" },
  { emoji: "⚖️", title: "Life Balance", desc: "Radar-style tracking across the most important areas of life.", cat: "life" },
  { emoji: "🙏", title: "Gratitude Journal", desc: "A simple daily practice to build positivity and reflection.", cat: "well" },
  { emoji: "💧", title: "Water Tracker", desc: "Stay hydrated with daily and weekly visual tracking.", cat: "well" },
  { emoji: "😴", title: "Sleep Tracker", desc: "Log sleep patterns and get AI-powered insights.", cat: "well" },
  { emoji: "🏋️", title: "Workout Tracker", desc: "Exercises, sets, reps, and AI fitness suggestions.", cat: "well" },
  { emoji: "🧠", title: "Flashcards", desc: "Create study decks manually or generate them with AI.", cat: "learn" },
  { emoji: "✉️", title: "Email Templates", desc: "Kai helps you write emails in the right tone.", cat: "ai" },
  { emoji: "💡", title: "Idea Vault", desc: "Capture ideas and turn them into plans with AI.", cat: "learn" },
  { emoji: "🎁", title: "Gift Planner", desc: "Get personalized gift ideas and reminders.", cat: "life" },
  { emoji: "📖", title: "Reading List", desc: "Track books and get AI-powered recommendations.", cat: "learn" },
  { emoji: "🐷", title: "Savings Goals", desc: "Set targets, deadlines, and savings progress.", cat: "fin" },
  { emoji: "📋", title: "Bill Reminder", desc: "Never miss a payment again.", cat: "fin" },
  { emoji: "🔗", title: "Link Saver", desc: "Save and organize useful links with search.", cat: "learn" },
  { emoji: "🎲", title: "Daily Challenge", desc: "Small daily growth challenges for better consistency.", cat: "well" },
  { emoji: "🎯", title: "Decision Maker", desc: "Let AI compare options, pros, cons, and next steps.", cat: "ai" },
  { emoji: "⏳", title: "Countdown Timer", desc: "Track important events and exciting moments.", cat: "life" },
  { emoji: "☑️", title: "Daily Checklist", desc: "Morning and evening routines with streaks.", cat: "prod" },
  { emoji: "📝", title: "Quick Notes", desc: "Capture notes, pin ideas, search, and expand with AI.", cat: "learn" },
  { emoji: "🌙", title: "Night Report", desc: "AI end-of-day summary with score and reflection.", cat: "ai" },
  { emoji: "⏰", title: "Autopilot", desc: "Kai can plan your entire day around your priorities.", cat: "ai" },
  { emoji: "💬", title: "Kai's Wisdom", desc: "Daily personalized quotes and motivation.", cat: "ai" },
  { emoji: "🧘", title: "Stretching Guide", desc: "Guided routines with timers and reminders.", cat: "well" },
  { emoji: "⏱", title: "Focus Music", desc: "Ambient sounds for deep work and concentration.", cat: "prod" },
  { emoji: "🌅", title: "7 Themes", desc: "Midnight, Snow, Ocean, Forest, Rose, Amber, and Sunset.", cat: "prod" },
  { emoji: "🚀", title: "+ More Coming", desc: "New tools and upgrades added regularly.", cat: "prod" },
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
  { app: "Motion", price: "$29/mo", tasks: true, calendar: true, notes: false, habits: false, finance: false, ai: false },
  { app: "Sunsama", price: "$20/mo", tasks: true, calendar: true, notes: false, habits: false, finance: false, ai: false },
  { app: "Notion", price: "$10/mo", tasks: true, calendar: false, notes: true, habits: false, finance: false, ai: false },
  { app: "Habit App", price: "$8/mo", tasks: false, calendar: false, notes: false, habits: true, finance: false, ai: false },
  { app: "Budget App", price: "$8/mo", tasks: false, calendar: false, notes: false, habits: false, finance: true, ai: false },
  { app: "DayLyft", price: "$0+", tasks: true, calendar: true, notes: true, habits: true, finance: true, ai: true, highlight: true },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Freelance Designer",
    text: "DayLyft replaced multiple apps for me. Kai literally helps me plan my mornings.",
    avatar: "SK",
  },
  {
    name: "Marcus T.",
    role: "Startup Founder",
    text: "It feels like a life dashboard. Tasks, habits, focus, budget, and AI in one place.",
    avatar: "MT",
  },
  {
    name: "Ana R.",
    role: "Student",
    text: "Flashcards, Pomodoro, habits, and notes in one app. It made my routine easier.",
    avatar: "AR",
  },
];

const appPillars = [
  {
    icon: "✦",
    title: "Kai AI Copilot",
    desc: "Plan, write, reflect, organize, and make better decisions with one AI assistant for your life.",
  },
  {
    icon: "⚡",
    title: "Productivity",
    desc: "Smart tasks, calendar, Pomodoro, focus shield, notes, goals, analytics, and routines.",
  },
  {
    icon: "💚",
    title: "Wellness",
    desc: "Track habits, sleep, water, gratitude, workouts, stretching, breathing, and balance.",
  },
  {
    icon: "💼",
    title: "Life Management",
    desc: "Budget tracker, savings goals, bill reminders, family mode, gift planner, and more.",
  },
];

export default function LandingPage() {
  const [featureFilter, setFeatureFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const filteredFeatures =
    featureFilter === "all"
      ? features
      : features.filter((feature) => feature.cat === featureFilter);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <main className="dl-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        :root {
          --dl-bg: #f4faf6;
          --dl-bg-2: #e8f6ee;
          --dl-dark: #03180c;
          --dl-dark-2: #062514;
          --dl-dark-3: #0b351f;
          --dl-green: #22c55e;
          --dl-green-2: #4ade80;
          --dl-green-3: #86efac;
          --dl-text: #071f12;
          --dl-muted: #4e6d5a;
          --dl-border: rgba(34, 197, 94, 0.16);
          --dl-shadow: 0 24px 80px rgba(7, 31, 18, 0.12);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--dl-bg);
        }

        .dl-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 18% 12%, rgba(34,197,94,0.18), transparent 32%),
            radial-gradient(circle at 85% 18%, rgba(134,239,172,0.22), transparent 30%),
            linear-gradient(180deg, #f6fbf8 0%, #eaf7ef 45%, #f6fbf8 100%);
          color: var(--dl-text);
          font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }

        .dl-container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .mono {
          font-family: "JetBrains Mono", monospace;
        }

        .gradient-text {
          background: linear-gradient(135deg, #22c55e 0%, #0f7a38 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(34,197,94,0.18);
          background: rgba(255,255,255,0.74);
          color: #0d572d;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), 0 10px 24px rgba(34,197,94,0.1);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          font-family: "JetBrains Mono", monospace;
          backdrop-filter: blur(16px);
        }

        .section-kicker.dark {
          color: #bbf7d0;
          border-color: rgba(134,239,172,0.16);
          background: rgba(255,255,255,0.06);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 16px 40px rgba(0,0,0,0.22);
        }

        .kicker-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--dl-green);
          box-shadow: 0 0 18px rgba(34,197,94,0.9);
        }

        .btn-primary,
        .btn-secondary,
        .btn-light {
          text-decoration: none;
          border: 0;
          cursor: pointer;
          font-family: inherit;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 14px;
          transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
          white-space: nowrap;
        }

        .btn-primary {
          padding: 16px 28px;
          color: white;
          background: linear-gradient(180deg, #0c3b22 0%, #03180c 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.12),
            0 16px 40px rgba(3,24,12,0.22),
            0 0 0 1px rgba(34,197,94,0.18);
        }

        .btn-primary:hover,
        .btn-secondary:hover,
        .btn-light:hover {
          transform: translateY(-2px);
          filter: brightness(1.03);
        }

        .btn-secondary {
          padding: 16px 26px;
          color: #062514;
          background: linear-gradient(180deg, #ffffff 0%, #e4f6ea 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.95),
            0 12px 28px rgba(34,197,94,0.12),
            0 0 0 1px rgba(34,197,94,0.18);
        }

        .btn-light {
          padding: 16px 30px;
          color: #052010;
          background: linear-gradient(180deg, #69f596 0%, #22c55e 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.4),
            0 18px 48px rgba(34,197,94,0.35);
        }

        .dl-nav {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: min(1180px, calc(100% - 32px));
          z-index: 50;
          border-radius: 18px;
          transition: all 0.25s ease;
        }

        .dl-nav-inner {
          min-height: 64px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 18px;
          border: 1px solid rgba(34,197,94,0.16);
          background: rgba(246,251,248,0.76);
          backdrop-filter: blur(22px) saturate(160%);
          box-shadow: ${scrolled ? "0 20px 60px rgba(7,31,18,0.12)" : "0 8px 30px rgba(7,31,18,0.06)"};
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--dl-text);
        }

        .brand-mark {
          width: 34px;
          height: 34px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, #4ade80, #16a34a);
          color: white;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.38), 0 12px 28px rgba(34,197,94,0.25);
          font-weight: 900;
        }

        .brand-name {
          font-family: "Space Grotesk", sans-serif;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-links button,
        .nav-links a.link {
          border: 0;
          background: transparent;
          color: var(--dl-muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
        }

        .nav-links button:hover,
        .nav-links a.link:hover {
          color: var(--dl-text);
        }

        .nav-menu-btn {
          display: none;
          border: 0;
          background: transparent;
          cursor: pointer;
          color: var(--dl-text);
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 49;
          background: rgba(246,251,248,0.96);
          backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
        }

        .mobile-menu button,
        .mobile-menu a {
          font-size: 22px;
          font-weight: 800;
          color: var(--dl-text);
          background: transparent;
          border: 0;
          text-decoration: none;
          cursor: pointer;
        }

        .hero {
          position: relative;
          padding: 150px 0 80px;
          min-height: 100vh;
          overflow: hidden;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 52px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,197,94,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.06) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(circle at center, black 0%, transparent 72%);
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          width: 900px;
          height: 900px;
          top: -420px;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(34,197,94,0.22), transparent 62%);
          filter: blur(30px);
          pointer-events: none;
        }

        .hero h1 {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(56px, 8vw, 96px);
          line-height: 0.96;
          letter-spacing: -0.07em;
          margin: 22px 0 24px;
          color: var(--dl-text);
        }

        .hero p {
          font-size: 19px;
          line-height: 1.7;
          color: var(--dl-muted);
          max-width: 590px;
          margin: 0 0 34px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .trust-row {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          color: var(--dl-muted);
          font-size: 13px;
          font-weight: 700;
        }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .trust-icon {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          background: rgba(34,197,94,0.12);
          color: #16a34a;
        }

        .dashboard-shell {
          position: relative;
        }

        .dashboard-card {
          border-radius: 30px;
          overflow: hidden;
          background: linear-gradient(180deg, #0e3822 0%, #03180c 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.09),
            0 38px 120px rgba(3,24,12,0.38),
            0 0 0 1px rgba(134,239,172,0.12);
          transform: rotate(1.2deg);
        }

        .dashboard-card:hover {
          transform: rotate(0deg) translateY(-4px);
          transition: all 0.25s ease;
        }

        .dashboard-top {
          height: 54px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 18px;
          border-bottom: 1px solid rgba(134,239,172,0.1);
          background: rgba(255,255,255,0.035);
        }

        .dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #22c55e;
        }

        .dashboard-url {
          margin-left: 8px;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(0,0,0,0.22);
          color: #bbf7d0;
          font-size: 11px;
          font-family: "JetBrains Mono", monospace;
        }

        .dashboard-content {
          padding: 22px;
          display: grid;
          grid-template-columns: 0.72fr 1fr 0.78fr;
          gap: 14px;
        }

        .dash-panel {
          border-radius: 18px;
          padding: 16px;
          background: linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025));
          border: 1px solid rgba(134,239,172,0.1);
        }

        .dash-title {
          color: #86efac;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: "JetBrains Mono", monospace;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .dash-big {
          color: white;
          font-size: 32px;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 800;
          letter-spacing: -0.05em;
        }

        .dash-small {
          color: rgba(220,252,231,0.7);
          font-size: 12px;
          line-height: 1.5;
        }

        .schedule-item {
          padding: 12px;
          border-radius: 13px;
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.18);
          margin-bottom: 9px;
        }

        .schedule-time {
          font-size: 10px;
          color: #86efac;
          font-family: "JetBrains Mono", monospace;
          margin-bottom: 4px;
        }

        .schedule-name {
          font-size: 12px;
          color: white;
          font-weight: 700;
        }

        .kai-bubble {
          border-radius: 18px;
          padding: 16px;
          background: linear-gradient(180deg, rgba(34,197,94,0.18), rgba(34,197,94,0.08));
          border: 1px solid rgba(74,222,128,0.22);
        }

        .bars {
          display: flex;
          gap: 5px;
          align-items: end;
          height: 58px;
          margin-top: 14px;
        }

        .bar {
          flex: 1;
          border-radius: 5px 5px 2px 2px;
          background: linear-gradient(180deg, #4ade80, #16a34a);
          box-shadow: 0 0 16px rgba(34,197,94,0.22);
        }

        .float-card {
          position: absolute;
          border-radius: 18px;
          padding: 14px 16px;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(34,197,94,0.18);
          backdrop-filter: blur(18px);
          box-shadow: var(--dl-shadow);
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--dl-text);
          font-size: 13px;
          font-weight: 800;
        }

        .float-card.one {
          left: -30px;
          top: 80px;
        }

        .float-card.two {
          right: -20px;
          top: 165px;
        }

        .float-card.three {
          left: 18px;
          bottom: -26px;
        }

        .float-icon {
          width: 34px;
          height: 34px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, #ecfdf5, #bbf7d0);
        }

        .stats {
          padding: 54px 0 90px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .stat-card {
          padding: 32px;
          border-radius: 24px;
          background: rgba(255,255,255,0.62);
          border: 1px solid rgba(34,197,94,0.14);
          box-shadow: 0 18px 55px rgba(7,31,18,0.07);
          text-align: center;
          backdrop-filter: blur(18px);
        }

        .stat-number {
          font-size: 52px;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 800;
          letter-spacing: -0.06em;
        }

        .stat-label {
          margin-top: 8px;
          color: var(--dl-muted);
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: "JetBrains Mono", monospace;
        }

        .replace {
          padding: 90px 0;
          background: linear-gradient(180deg, #ffffff 0%, #f1faf4 100%);
        }

        .section-head {
          text-align: center;
          margin-bottom: 48px;
        }

        .section-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(42px, 5vw, 68px);
          line-height: 1;
          letter-spacing: -0.06em;
          margin: 20px 0 14px;
        }

        .section-subtitle {
          color: var(--dl-muted);
          font-size: 17px;
          line-height: 1.7;
          max-width: 680px;
          margin: 0 auto;
        }

        .replace-box {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 18px;
          align-items: stretch;
        }

        .app-cloud,
        .daylyft-system {
          border-radius: 28px;
          border: 1px solid rgba(34,197,94,0.16);
          background: rgba(255,255,255,0.76);
          box-shadow: 0 20px 70px rgba(7,31,18,0.08);
          padding: 28px;
        }

        .app-icons {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-top: 22px;
        }

        .app-icon-card {
          min-height: 82px;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(180deg, #ffffff, #edf8f1);
          border: 1px solid rgba(34,197,94,0.12);
          color: var(--dl-muted);
          font-size: 12px;
          font-weight: 800;
        }

        .system-card {
          height: 100%;
          border-radius: 24px;
          padding: 28px;
          background:
            radial-gradient(circle at 70% 30%, rgba(34,197,94,0.22), transparent 34%),
            linear-gradient(180deg, #0d351f, #03180c);
          color: white;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .system-logo {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, #4ade80, #16a34a);
          font-size: 28px;
          box-shadow: 0 20px 50px rgba(34,197,94,0.28);
        }

        .pillars {
          padding: 95px 0;
        }

        .pillar-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .pillar-card,
        .feature-card,
        .testimonial-card,
        .pricing-card {
          border-radius: 24px;
          background: rgba(255,255,255,0.68);
          border: 1px solid rgba(34,197,94,0.14);
          box-shadow: 0 18px 55px rgba(7,31,18,0.07);
          backdrop-filter: blur(18px);
        }

        .pillar-card {
          padding: 28px;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .pillar-card:hover,
        .feature-card:hover,
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 26px 80px rgba(7,31,18,0.1);
        }

        .pillar-icon,
        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, #ffffff, #dff8e8);
          border: 1px solid rgba(34,197,94,0.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,1), 0 10px 22px rgba(34,197,94,0.12);
          font-size: 22px;
          margin-bottom: 18px;
        }

        .pillar-card h3,
        .feature-card h3 {
          font-family: "Space Grotesk", sans-serif;
          font-size: 20px;
          letter-spacing: -0.03em;
          margin: 0 0 10px;
        }

        .pillar-card p,
        .feature-card p {
          margin: 0;
          color: var(--dl-muted);
          font-size: 14px;
          line-height: 1.65;
        }

        .features {
          padding: 95px 0;
          background: linear-gradient(180deg, #f6fbf8 0%, #eaf7ef 100%);
        }

        .filter-tabs {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 34px;
        }

        .filter-btn {
          border: 1px solid rgba(34,197,94,0.14);
          border-radius: 999px;
          padding: 10px 18px;
          background: rgba(255,255,255,0.72);
          color: var(--dl-muted);
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          font-family: inherit;
        }

        .filter-btn.active {
          color: white;
          background: linear-gradient(180deg, #0d351f, #03180c);
          box-shadow: 0 14px 34px rgba(3,24,12,0.18);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .feature-card {
          padding: 22px;
        }

        .feature-card h3 {
          font-size: 16px;
        }

        .feature-card p {
          font-size: 13px;
        }

        .kai-section {
          padding: 115px 0;
          background:
            radial-gradient(circle at 50% 40%, rgba(34,197,94,0.24), transparent 34%),
            linear-gradient(180deg, #062514 0%, #03180c 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .kai-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 40px;
          align-items: center;
        }

        .kai-orb-wrap {
          position: relative;
          display: grid;
          place-items: center;
          min-height: 360px;
        }

        .kai-ring {
          position: absolute;
          border: 1px solid rgba(134,239,172,0.18);
          border-radius: 50%;
        }

        .kai-ring.one {
          width: 260px;
          height: 260px;
        }

        .kai-ring.two {
          width: 360px;
          height: 360px;
        }

        .kai-orb {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: radial-gradient(circle at 30% 22%, #bbf7d0 0%, #4ade80 22%, #16a34a 58%, #065f2b 100%);
          font-size: 60px;
          color: white;
          box-shadow:
            inset 0 3px 0 rgba(255,255,255,0.32),
            0 0 80px rgba(34,197,94,0.5),
            0 36px 90px rgba(0,0,0,0.36);
        }

        .kai-chat-stack {
          display: grid;
          gap: 14px;
        }

        .chat-card {
          padding: 20px;
          border-radius: 20px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(134,239,172,0.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .chat-label {
          color: #86efac;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: "JetBrains Mono", monospace;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .chat-text {
          color: rgba(255,255,255,0.9);
          font-size: 15px;
          line-height: 1.55;
        }

        .compare {
          padding: 100px 0;
          background: #f6fbf8;
        }

        .compare-layout {
          display: grid;
          grid-template-columns: 0.35fr 0.65fr;
          gap: 24px;
          align-items: center;
        }

        .compare-table {
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid rgba(34,197,94,0.14);
          background: rgba(255,255,255,0.72);
          box-shadow: 0 20px 70px rgba(7,31,18,0.08);
        }

        .compare-row {
          display: grid;
          grid-template-columns: 1.1fr 0.8fr repeat(6, 0.55fr);
          align-items: center;
          gap: 10px;
          padding: 16px 18px;
          border-bottom: 1px solid rgba(34,197,94,0.09);
          color: var(--dl-muted);
          font-size: 13px;
          font-weight: 700;
        }

        .compare-row.header {
          background: rgba(34,197,94,0.1);
          color: var(--dl-text);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: "JetBrains Mono", monospace;
        }

        .compare-row.highlight {
          background: linear-gradient(180deg, #0d351f, #03180c);
          color: white;
          border-bottom: 0;
        }

        .check {
          text-align: center;
          color: #16a34a;
          font-weight: 900;
        }

        .highlight .check {
          color: #4ade80;
        }

        .dash {
          text-align: center;
          color: rgba(78,109,90,0.35);
        }

        .testimonials {
          padding: 100px 0;
          background:
            radial-gradient(circle at 50% 0%, rgba(34,197,94,0.2), transparent 38%),
            linear-gradient(180deg, #03180c 0%, #062514 100%);
          color: white;
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .testimonial-card {
          padding: 28px;
          background: rgba(255,255,255,0.07);
          border-color: rgba(134,239,172,0.12);
        }

        .stars {
          color: #4ade80;
          letter-spacing: 4px;
          margin-bottom: 18px;
        }

        .testimonial-text {
          color: rgba(255,255,255,0.9);
          font-size: 15px;
          line-height: 1.65;
          margin-bottom: 24px;
        }

        .person {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, #4ade80, #16a34a);
          color: white;
          font-weight: 900;
          font-size: 13px;
          box-shadow: 0 14px 30px rgba(34,197,94,0.22);
        }

        .pricing {
          padding: 105px 0;
          background: linear-gradient(180deg, #f6fbf8, #eaf7ef);
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          align-items: start;
        }

        .pricing-card {
          padding: 32px;
        }

        .pricing-card.pro {
          background:
            radial-gradient(circle at 70% 12%, rgba(74,222,128,0.24), transparent 34%),
            linear-gradient(180deg, #0d351f, #03180c);
          color: white;
          transform: translateY(-18px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.08),
            0 34px 100px rgba(3,24,12,0.34);
          position: relative;
        }

        .badge {
          display: inline-flex;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(34,197,94,0.14);
          color: #16a34a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: "JetBrains Mono", monospace;
          margin-bottom: 16px;
        }

        .pro .badge {
          background: rgba(74,222,128,0.16);
          color: #86efac;
        }

        .price {
          font-family: "Space Grotesk", sans-serif;
          font-size: 54px;
          letter-spacing: -0.06em;
          font-weight: 800;
          margin: 8px 0 4px;
        }

        .price span {
          font-size: 15px;
          letter-spacing: 0;
          color: var(--dl-muted);
        }

        .pro .price span {
          color: #86efac;
        }

        .pricing-desc {
          color: var(--dl-muted);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .pro .pricing-desc {
          color: rgba(220,252,231,0.76);
        }

        .feature-list {
          display: grid;
          gap: 10px;
          margin-top: 24px;
        }

        .feature-list div {
          display: flex;
          gap: 9px;
          align-items: flex-start;
          color: var(--dl-muted);
          font-size: 14px;
          line-height: 1.45;
        }

        .pro .feature-list div {
          color: rgba(255,255,255,0.82);
        }

        .feature-list span {
          color: #16a34a;
          font-weight: 900;
        }

        .pro .feature-list span {
          color: #4ade80;
        }

        .final-cta {
          padding: 100px 0;
          background:
            radial-gradient(circle at 50% 20%, rgba(34,197,94,0.22), transparent 36%),
            linear-gradient(180deg, #062514, #03180c);
          color: white;
          text-align: center;
        }

        .final-box {
          width: min(960px, calc(100% - 40px));
          margin: 0 auto;
          border-radius: 34px;
          padding: 54px 34px;
          border: 1px solid rgba(134,239,172,0.12);
          background: rgba(255,255,255,0.055);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 34px 110px rgba(0,0,0,0.28);
          backdrop-filter: blur(20px);
        }

        .footer {
          background: #03180c;
          color: #86efac;
          padding: 58px 0 28px;
          border-top: 1px solid rgba(134,239,172,0.08);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 34px;
          margin-bottom: 42px;
        }

        .footer h4 {
          margin: 0 0 16px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: "JetBrains Mono", monospace;
          color: #bbf7d0;
        }

        .footer a,
        .footer button {
          display: block;
          color: #86efac;
          text-decoration: none;
          background: transparent;
          border: 0;
          cursor: pointer;
          padding: 0;
          font: inherit;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .footer-bottom {
          border-top: 1px solid rgba(134,239,172,0.08);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          color: rgba(187,247,208,0.74);
          font-size: 12px;
          font-family: "JetBrains Mono", monospace;
        }

        @media (max-width: 1024px) {
          .hero-grid,
          .replace-box,
          .kai-grid,
          .compare-layout {
            grid-template-columns: 1fr;
          }

          .pillar-grid,
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .pricing-grid,
          .testimonial-grid {
            grid-template-columns: 1fr;
          }

          .pricing-card.pro {
            transform: none;
          }

          .dashboard-content {
            grid-template-columns: 1fr;
          }

          .float-card {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .dl-container {
            width: min(100% - 28px, 1180px);
          }

          .nav-links {
            display: none;
          }

          .nav-menu-btn {
            display: block;
          }

          .hero {
            padding: 126px 0 58px;
          }

          .hero h1 {
            font-size: 52px;
          }

          .hero p {
            font-size: 16px;
          }

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .stats-grid,
          .pillar-grid,
          .features-grid,
          .app-icons,
          .footer-grid {
            grid-template-columns: 1fr;
          }

          .compare-table {
            overflow-x: auto;
          }

          .compare-row {
            min-width: 780px;
          }

          .section-title {
            font-size: 42px;
          }

          .dashboard-card {
            transform: none;
            border-radius: 22px;
          }

          .stat-card {
            padding: 24px;
          }

          .final-box {
            padding: 38px 22px;
          }
        }
      `}</style>

      <nav className="dl-nav">
        <div className="dl-nav-inner">
          <a className="brand" href="/">
            <div className="brand-mark">✦</div>
            <div className="brand-name">DayLyft</div>
          </a>

          <div className="nav-links">
            <button onClick={() => scrollTo("features")}>Features</button>
            <button onClick={() => scrollTo("kai")}>Kai AI</button>
            <button onClick={() => scrollTo("compare")}>Compare</button>
            <button onClick={() => scrollTo("pricing")}>Pricing</button>
            <a className="link" href="/about">About</a>
            <a className="btn-primary" href="/login" style={{ padding: "11px 18px", borderRadius: 12 }}>
              Get started →
            </a>
          </div>

          <button className="nav-menu-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: "absolute", top: 28, right: 28 }}
            aria-label="Close menu"
          >
            ✕
          </button>
          <button onClick={() => scrollTo("features")}>Features</button>
          <button onClick={() => scrollTo("kai")}>Kai AI</button>
          <button onClick={() => scrollTo("compare")}>Compare</button>
          <button onClick={() => scrollTo("pricing")}>Pricing</button>
          <a href="/login" className="btn-primary">Get started free</a>
        </div>
      )}

      <section className="hero">
        <div className="hero-glow" />
        <div className="dl-container hero-grid">
          <div>
            <div className="section-kicker">
              <span className="kicker-dot" />
              v1.0 · 40+ tools · AI copilot
            </div>

            <h1>
              One app for <span className="gradient-text">your entire life.</span>
            </h1>

            <p>
              Plan your day, track your habits, manage your money, improve your wellness,
              and grow with <strong style={{ color: "#071f12" }}>Kai</strong> — your AI copilot for life.
            </p>

            <div className="hero-actions">
              <a className="btn-primary" href="/login">
                Start free
                <span>→</span>
              </a>
              <button className="btn-secondary" onClick={() => scrollTo("kai")}>
                Meet Kai
                <span>✦</span>
              </button>
            </div>

            <div className="trust-row">
              <div className="trust-item">
                <span className="trust-icon">✓</span>
                40+ tools
              </div>
              <div className="trust-item">
                <span className="trust-icon">✦</span>
                AI-powered
              </div>
              <div className="trust-item">
                <span className="trust-icon">$</span>
                $0 to start
              </div>
            </div>
          </div>

          <div className="dashboard-shell">
            <div className="dashboard-card">
              <div className="dashboard-top">
                <span className="dot" />
                <span className="dot" style={{ background: "#84cc16" }} />
                <span className="dot" style={{ background: "#10b981" }} />
                <span className="dashboard-url">daylyft.com/dashboard</span>
              </div>

              <div className="dashboard-content">
                <div className="dash-panel">
                  <div className="dash-title">// Today</div>
                  <div className="dash-big">Thursday</div>
                  <div className="dash-small">A focused day ahead.</div>

                  <div style={{ height: 18 }} />

                  {[
                    ["🎯", "Focus blocks", "3 / 4"],
                    ["⚡", "Energy", "High"],
                    ["✅", "Tasks done", "7"],
                  ].map((item) => (
                    <div
                      key={item[1]}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                        marginTop: 9,
                        padding: 11,
                        borderRadius: 13,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(134,239,172,0.08)",
                      }}
                    >
                      <span>{item[0]}</span>
                      <span style={{ color: "rgba(220,252,231,0.72)", fontSize: 12 }}>{item[1]}</span>
                      <strong style={{ color: "white", fontSize: 12 }}>{item[2]}</strong>
                    </div>
                  ))}
                </div>

                <div className="dash-panel">
                  <div className="dash-title">// Smart schedule</div>
                  {[
                    ["9:00 — 11:00", "Deep work: Product launch"],
                    ["11:00 — 11:30", "Team standup"],
                    ["13:00 — 15:00", "Design iterations"],
                    ["15:30 — 16:00", "Email batch"],
                  ].map((item) => (
                    <div className="schedule-item" key={item[1]}>
                      <div className="schedule-time">{item[0]}</div>
                      <div className="schedule-name">{item[1]}</div>
                    </div>
                  ))}
                </div>

                <div className="dash-panel">
                  <div className="dash-title">// Kai AI</div>
                  <div className="kai-bubble">
                    <div style={{ color: "#86efac", fontWeight: 900, fontSize: 12, marginBottom: 8 }}>
                      ✦ Morning briefing
                    </div>
                    <div className="dash-small" style={{ color: "rgba(255,255,255,0.86)" }}>
                      Good morning, Juan. Your best focus window is 9–11am. I placed your launch prep there.
                    </div>
                  </div>

                  <div className="bars">
                    {[72, 48, 62, 84, 70, 58, 74, 92].map((height, index) => (
                      <div className="bar" key={index} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="float-card one">
              <span className="float-icon">🤖</span>
              Kai AI Copilot
            </div>
            <div className="float-card two">
              <span className="float-icon">💵</span>
              Budget on track
            </div>
            <div className="float-card three">
              <span className="float-icon">🔥</span>
              12 day habit streak
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="dl-container stats-grid">
          {[
            ["40+", "Features built"],
            ["$0", "To get started"],
            ["7", "Life categories"],
            ["24/7", "AI copilot"],
          ].map((stat) => (
            <div className="stat-card" key={stat[1]}>
              <div className="stat-number gradient-text">{stat[0]}</div>
              <div className="stat-label">{stat[1]}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="replace">
        <div className="dl-container">
          <div className="section-head">
            <div className="section-kicker">
              <span className="kicker-dot" />
              Replace scattered tools
            </div>
            <h2 className="section-title">Replace 10 apps with one.</h2>
            <p className="section-subtitle">
              DayLyft brings productivity, wellness, finances, family, fitness, learning,
              and AI guidance into one clean life operating system.
            </p>
          </div>

          <div className="replace-box">
            <div className="app-cloud">
              <h3 style={{ fontFamily: "Space Grotesk", fontSize: 28, letterSpacing: "-0.04em", margin: 0 }}>
                Everything connected.
              </h3>
              <p style={{ color: "var(--dl-muted)", lineHeight: 1.7 }}>
                Stop jumping between tools. Keep your day, habits, budget, health, notes, and goals together.
              </p>

              <div className="app-icons">
                {[
                  ["✅", "Tasks"],
                  ["📅", "Calendar"],
                  ["📝", "Notes"],
                  ["🔥", "Habits"],
                  ["💵", "Finance"],
                  ["🎧", "Focus"],
                  ["💚", "Wellness"],
                  ["📓", "Journal"],
                  ["📊", "Analytics"],
                  ["✦", "AI"],
                ].map((item) => (
                  <div className="app-icon-card" key={item[1]}>
                    <span style={{ fontSize: 24 }}>{item[0]}</span>
                    {item[1]}
                  </div>
                ))}
              </div>
            </div>

            <div className="daylyft-system">
              <div className="system-card">
                <div>
                  <div className="system-logo">✦</div>
                  <h3 style={{ fontFamily: "Space Grotesk", fontSize: 38, letterSpacing: "-0.06em", margin: "24px 0 10px" }}>
                    DayLyft
                  </h3>
                  <p style={{ color: "#bbf7d0", lineHeight: 1.7, margin: 0 }}>
                    One dashboard. One AI copilot. One system for your entire life.
                  </p>
                </div>

                <div style={{ marginTop: 36, display: "grid", gap: 10 }}>
                  {["Plan smarter", "Track everything", "Stay consistent", "Grow daily"].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "center", color: "#dcfce7", fontWeight: 800 }}>
                      <span style={{ color: "#4ade80" }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pillars">
        <div className="dl-container">
          <div className="section-head">
            <div className="section-kicker">
              <span className="kicker-dot" />
              Life system
            </div>
            <h2 className="section-title">Built around how real life works.</h2>
            <p className="section-subtitle">
              DayLyft is not just a to-do list. It connects your day, energy, focus, health, money, and goals.
            </p>
          </div>

          <div className="pillar-grid">
            {appPillars.map((pillar) => (
              <div className="pillar-card" key={pillar.title}>
                <div className="pillar-icon">{pillar.icon}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="dl-container">
          <div className="section-head">
            <div className="section-kicker">
              <span className="kicker-dot" />
              Features
            </div>
            <h2 className="section-title">
              Everything you need. <br />
              <span className="gradient-text">Nothing you don’t.</span>
            </h2>
          </div>

          <div className="filter-tabs">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                className={`filter-btn ${featureFilter === tab.id ? "active" : ""}`}
                onClick={() => setFeatureFilter(tab.id)}
              >
                {tab.label}
                {tab.id === "all" ? ` ${features.length}` : ""}
              </button>
            ))}
          </div>

          <div className="features-grid">
            {filteredFeatures.map((feature) => (
              <div className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.emoji}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kai-section" id="kai">
        <div className="dl-container kai-grid">
          <div>
            <div className="section-kicker dark">
              <span className="kicker-dot" />
              AI Copilot
            </div>
            <h2 className="section-title" style={{ color: "white" }}>
              Meet <span className="gradient-text">Kai.</span>
            </h2>
            <p className="section-subtitle" style={{ color: "#bbf7d0", margin: "0 0 30px" }}>
              Your AI copilot that helps you plan, write, focus, track, reflect, and improve across every area of your life.
            </p>
            <a href="/login" className="btn-light">Try Kai free →</a>
          </div>

          <div className="kai-chat-stack">
            {[
              ["Juan", "Kai, organize my day."],
              ["Kai", "You have 3 priorities today. I moved deep work to your strongest focus window."],
              ["Juan", "How is my budget this week?"],
              ["Kai", "You’re on track. Food spending is 12% lower than last week."],
              ["Juan", "Help me stay consistent."],
              ["Kai", "Start with a 25-minute focus session and one habit check-in."],
            ].map((chat, index) => (
              <div className="chat-card" key={index}>
                <div className="chat-label">{chat[0]}</div>
                <div className="chat-text">{chat[1]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="kai-orb-wrap" style={{ marginTop: 58 }}>
          <div className="kai-ring one" />
          <div className="kai-ring two" />
          <div className="kai-orb">✦</div>
        </div>
      </section>

      <section className="compare" id="compare">
        <div className="dl-container compare-layout">
          <div>
            <div className="section-kicker">
              <span className="kicker-dot" />
              Compare
            </div>
            <h2 className="section-title">
              More value. <br />
              <span className="gradient-text">Less cost.</span>
            </h2>
            <p style={{ color: "var(--dl-muted)", lineHeight: 1.75, fontSize: 16 }}>
              DayLyft gives you the power of multiple apps in one clean platform.
              Start free and upgrade only when you are ready.
            </p>
          </div>

          <div className="compare-table">
            <div className="compare-row header">
              <div>App</div>
              <div>Price</div>
              <div>Tasks</div>
              <div>Calendar</div>
              <div>Notes</div>
              <div>Habits</div>
              <div>Finance</div>
              <div>AI</div>
            </div>

            {comparisons.map((item) => (
              <div className={`compare-row ${item.highlight ? "highlight" : ""}`} key={item.app}>
                <div style={{ fontWeight: 900 }}>{item.app}</div>
                <div>{item.price}</div>
                <div className={item.tasks ? "check" : "dash"}>{item.tasks ? "✓" : "—"}</div>
                <div className={item.calendar ? "check" : "dash"}>{item.calendar ? "✓" : "—"}</div>
                <div className={item.notes ? "check" : "dash"}>{item.notes ? "✓" : "—"}</div>
                <div className={item.habits ? "check" : "dash"}>{item.habits ? "✓" : "—"}</div>
                <div className={item.finance ? "check" : "dash"}>{item.finance ? "✓" : "—"}</div>
                <div className={item.ai ? "check" : "dash"}>{item.ai ? "✓" : "—"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="dl-container">
          <div className="section-head">
            <div className="section-kicker dark">
              <span className="kicker-dot" />
              Testimonials
            </div>
            <h2 className="section-title" style={{ color: "white" }}>Built for people who want more from their day.</h2>
            <p className="section-subtitle" style={{ color: "#bbf7d0" }}>
              Freelancers, founders, students, and families can use DayLyft to create better routines.
            </p>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <div className="testimonial-card" key={testimonial.name}>
                <div className="stars">★★★★★</div>
                <div className="testimonial-text">“{testimonial.text}”</div>
                <div className="person">
                  <div className="avatar">{testimonial.avatar}</div>
                  <div>
                    <div style={{ color: "white", fontWeight: 900 }}>{testimonial.name}</div>
                    <div style={{ color: "#86efac", fontSize: 13 }}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="dl-container">
          <div className="section-head">
            <div className="section-kicker">
              <span className="kicker-dot" />
              Pricing
            </div>
            <h2 className="section-title">Simple pricing. Start free.</h2>
            <p className="section-subtitle">
              Use DayLyft for free. Upgrade when you are ready for unlimited AI and the full life system.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="badge">Starter</div>
              <div className="price">$0 <span>/forever</span></div>
              <p className="pricing-desc">For anyone who wants to get organized and start building better routines.</p>
              <a href="/login" className="btn-secondary" style={{ width: "100%" }}>Get started free</a>
              <div className="feature-list">
                {["Smart tasks", "Calendar", "Pomodoro timer", "Quick notes", "Water tracker", "Gratitude journal", "Kai chat limited"].map((item) => (
                  <div key={item}><span>✓</span>{item}</div>
                ))}
              </div>
            </div>

            <div className="pricing-card pro">
              <div className="badge">Most popular</div>
              <div className="price">$6.99 <span>/month</span></div>
              <p className="pricing-desc">For people who want unlimited Kai, deeper insights, and all 40+ tools.</p>
              <a href="https://buy.stripe.com/8x25kE2pK5Ho4Wo25AaR205" className="btn-light" style={{ width: "100%" }}>
                Try Pro free for 7 days →
              </a>
              <div className="feature-list">
                {[
                  "Everything in Starter",
                  "Unlimited Kai AI Copilot",
                  "Morning autopilot",
                  "Night report",
                  "Productivity DNA",
                  "Budget tracker",
                  "Workout tracker",
                  "Life balance",
                  "Family mode",
                  "Premium themes",
                ].map((item) => (
                  <div key={item}><span>✓</span>{item}</div>
                ))}
              </div>
            </div>

            <div className="pricing-card">
              <div className="badge">Business</div>
              <div className="price">$12.99 <span>/user</span></div>
              <p className="pricing-desc">For teams, families, and groups that want shared dashboards and reports.</p>
              <a
                href="mailto:juanmasis777@gmail.com?subject=DayLyft Business - Early Access"
                className="btn-secondary"
                style={{ width: "100%" }}
              >
                Join the waitlist
              </a>
              <div className="feature-list">
                {["Team dashboard", "Shared tasks", "Members and roles", "Team analytics", "Admin permissions", "Custom branding", "Export reports"].map((item) => (
                  <div key={item}><span>✓</span>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-box">
          <div className="section-kicker dark">
            <span className="kicker-dot" />
            Start today
          </div>
          <h2 className="section-title" style={{ color: "white" }}>
            Ready to <span className="gradient-text">lift your day?</span>
          </h2>
          <p className="section-subtitle" style={{ color: "#bbf7d0", marginBottom: 30 }}>
            Replace scattered apps with one AI-powered system for your life.
          </p>
          <a href="/login" className="btn-light">Get started — it’s free →</a>
          <div className="mono" style={{ color: "#86efac", marginTop: 16, fontSize: 12 }}>
            $0 forever · No credit card required
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="dl-container">
          <div className="footer-grid">
            <div>
              <a className="brand" href="/" style={{ color: "white", marginBottom: 14 }}>
                <div className="brand-mark">✦</div>
                <div className="brand-name">DayLyft</div>
              </a>
              <p style={{ maxWidth: 330, color: "#86efac", lineHeight: 1.7, fontSize: 14 }}>
                AI-powered life operating system for productivity, wellness, finances, learning, and daily growth.
              </p>
            </div>

            <div>
              <h4>Product</h4>
              <button onClick={() => scrollTo("features")}>Features</button>
              <button onClick={() => scrollTo("pricing")}>Pricing</button>
              <button onClick={() => scrollTo("compare")}>Compare</button>
            </div>

            <div>
              <h4>Company</h4>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/login">Login</a>
            </div>

            <div>
              <h4>Legal</h4>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 DayLyft. All rights reserved.</span>
            <span>Made with ♥ in Miami</span>
          </div>
        </div>
      </footer>
    </main>
  );
}