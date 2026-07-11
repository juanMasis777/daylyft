"use client";

import { useMemo, useState } from "react";

const featurePillars = [
  {
    title: "Plan",
    desc: "Organize your tasks, calendar, reminders, and daily priorities with clarity.",
    icon: "calendar",
  },
  {
    title: "Focus",
    desc: "Reduce distractions, use Pomodoro, and protect your deep work sessions.",
    icon: "target",
  },
  {
    title: "Track",
    desc: "Measure habits, sleep, workouts, budget, goals, and daily progress.",
    icon: "chart",
  },
  {
    title: "Improve",
    desc: "Get AI-powered insights to make smarter decisions and grow consistently.",
    icon: "arrow",
  },
];

const compareApps = [
  {
    app: "Motion",
    price: "$29/mo",
    tasks: true,
    calendar: true,
    notes: false,
    habits: false,
    finance: false,
    ai: false,
  },
  {
    app: "Sunsama",
    price: "$20/mo",
    tasks: true,
    calendar: true,
    notes: false,
    habits: false,
    finance: false,
    ai: false,
  },
  {
    app: "Notion",
    price: "$10/mo",
    tasks: true,
    calendar: false,
    notes: true,
    habits: false,
    finance: false,
    ai: false,
  },
  {
    app: "Habit App",
    price: "$8/mo",
    tasks: false,
    calendar: false,
    notes: false,
    habits: true,
    finance: false,
    ai: false,
  },
  {
    app: "Budget App",
    price: "$8/mo",
    tasks: false,
    calendar: false,
    notes: false,
    habits: false,
    finance: true,
    ai: false,
  },
  {
    app: "DayLyft",
    price: "$0+",
    tasks: true,
    calendar: true,
    notes: true,
    habits: true,
    finance: true,
    ai: true,
    highlight: true,
  },
];

const testimonials = [
  {
    quote:
      "DayLyft replaced different apps I was using. Everything I need is in one place, with an AI that actually gets me.",
    name: "Sarah J.",
    role: "Product Manager",
    initials: "SJ",
  },
  {
    quote:
      "Kai's insights have been a game changer. I'm more focused, saving more, and finally building real habits.",
    name: "David L.",
    role: "Entrepreneur",
    initials: "DL",
  },
  {
    quote:
      "The best investment in myself this year. DayLyft keeps me organized and motivated every single day.",
    name: "Priya K.",
    role: "Marketing Director",
    initials: "PK",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$0",
    suffix: "/month",
    desc: "Everything you need to get started.",
    button: "Get started free",
    href: "/login",
    highlighted: false,
    items: [
      "Unlimited tasks",
      "Calendar integration",
      "Habit tracking",
      "Basic finance tracking",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$6.99",
    suffix: "/month",
    desc: "For individuals who want to do more.",
    button: "Start 7-day free trial",
    href: "https://buy.stripe.com/8x25kE2pK5Ho4Wo25AaR205",
    highlighted: true,
    items: [
      "Everything in Starter",
      "AI Copilot Kai",
      "Advanced analytics",
      "Health tracking",
      "Priority support",
    ],
  },
  {
    name: "Business",
    price: "$12.99",
    suffix: "/user /month",
    desc: "For teams and families.",
    button: "Join the waitlist",
    href: "mailto:juanmasis777@gmail.com?subject=DayLyft Business Early Access",
    highlighted: false,
    items: [
      "Everything in Pro",
      "Team collaboration",
      "Admin controls",
      "Custom reports",
      "Dedicated support",
    ],
  },
];

function Icon({ name, size = 22 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (name === "calendar") {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="18" rx="3" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    );
  }

  if (name === "target") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg {...common}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <rect x="7" y="11" width="3" height="5" rx="1" />
        <rect x="12" y="8" width="3" height="8" rx="1" />
        <rect x="17" y="5" width="3" height="11" rx="1" />
      </svg>
    );
  }

  if (name === "arrow") {
    return (
      <svg {...common}>
        <path d="M7 17L17 7" />
        <path d="M8 7h9v9" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg {...common}>
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg {...common}>
        <path d="M12 2l2.2 6.1L20 10l-5.8 1.9L12 18l-2.2-6.1L4 10l5.8-1.9L12 2z" />
      </svg>
    );
  }

  if (name === "lift") {
    return (
      <svg {...common} strokeWidth="2.4">
        <path d="M5 14l7-7 7 7" />
        <path d="M5 19h14" />
      </svg>
    );
  }

  if (name === "menu") {
    return (
      <svg {...common}>
        <path d="M4 7h16M4 17h16" />
      </svg>
    );
  }

  if (name === "close") {
    return (
      <svg {...common}>
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function CheckMark() {
  return (
    <span className="check-mark">
      <Icon name="check" size={13} />
    </span>
  );
}

function CompareValue({ value }) {
  return <span className={value ? "compare-yes" : "compare-no"}>{value ? "✓" : "—"}</span>;
}

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const apps = useMemo(() => compareApps, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <main className="daylyft-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        :root {
          --bg: #ffffff;
          --soft: #f6f8f6;
          --mint: #eaf8ee;
          --dark: #06120d;
          --dark-2: #0a1b14;
          --green: #10b981;
          --green-2: #059669;
          --text: #0b1512;
          --muted: #5f7269;
          --line: rgba(6, 18, 13, 0.09);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #ffffff;
        }

        .daylyft-page {
          min-height: 100vh;
          background: #ffffff;
          color: var(--text);
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow-x: hidden;
        }

        a {
          color: inherit;
        }

        button {
          font-family: inherit;
        }

        .container {
          width: min(1180px, calc(100% - 44px));
          margin: 0 auto;
        }

        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: rgba(5,8,7,0.88);
          backdrop-filter: blur(22px);
        }

        .nav-inner {
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: white;
          font-weight: 900;
          letter-spacing: -0.04em;
          font-family: "Space Grotesk", sans-serif;
          font-size: 24px;
        }

        .brand-mark {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, var(--green), #047857);
          color: #041008;
          box-shadow: 0 0 30px rgba(16,185,129,0.45);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 38px;
        }

        .nav-links button,
        .nav-links a.nav-link {
          background: transparent;
          border: 0;
          color: rgba(255,255,255,0.86);
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .nav-links button:hover,
        .nav-links a.nav-link:hover {
          color: var(--green);
        }

        .nav-cta {
          padding: 12px 20px;
          border-radius: 12px;
          text-decoration: none;
          background: linear-gradient(180deg, #34d399, #059669);
          color: #041008;
          font-size: 14px;
          font-weight: 900;
          box-shadow: 0 16px 40px rgba(16,185,129,0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 22px 55px rgba(16,185,129,0.38);
        }

        .menu-btn {
          display: none;
          background: transparent;
          border: 0;
          color: white;
          cursor: pointer;
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: rgba(5,8,7,0.97);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
        }

        .mobile-menu button,
        .mobile-menu a {
          color: white;
          background: transparent;
          border: 0;
          text-decoration: none;
          font-size: 24px;
          font-weight: 800;
          cursor: pointer;
        }

        .close-btn {
          position: absolute;
          right: 26px;
          top: 26px;
        }

        .hero {
          position: relative;
          min-height: 760px;
          padding: 126px 0 62px;
          background:
            radial-gradient(circle at 30% 55%, rgba(16,185,129,0.22), transparent 22%),
            radial-gradient(circle at 82% 28%, rgba(16,185,129,0.12), transparent 28%),
            linear-gradient(135deg, #070a09 0%, #020403 45%, #07130d 100%);
          color: white;
          overflow: hidden;
        }

        .hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(circle at 50% 40%, black, transparent 72%);
          pointer-events: none;
        }

        .hero-wave {
          position: absolute;
          right: -12%;
          bottom: 0;
          width: 75%;
          height: 280px;
          background:
            repeating-radial-gradient(ellipse at center, transparent 0 16px, rgba(16,185,129,0.13) 17px 18px);
          transform: rotate(-7deg);
          opacity: 0.5;
          pointer-events: none;
        }

        .hero-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 50px;
          align-items: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: 999px;
          padding: 9px 13px;
          color: rgba(255,255,255,0.86);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 13px;
          font-weight: 700;
        }

        .badge span {
          color: var(--green);
          font-weight: 900;
        }

        .hero-title {
          margin: 34px 0 20px;
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(48px, 6vw, 82px);
          line-height: 0.96;
          letter-spacing: -0.065em;
          font-weight: 800;
        }

        .green-text {
          color: var(--green);
        }

        .hero-subtitle {
          max-width: 560px;
          margin: 0 0 34px;
          color: rgba(255,255,255,0.72);
          font-size: 19px;
          line-height: 1.7;
          font-weight: 500;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .btn-primary,
        .btn-outline,
        .btn-white {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 54px;
          padding: 0 28px;
          border-radius: 13px;
          text-decoration: none;
          border: 0;
          cursor: pointer;
          font-size: 15px;
          font-weight: 900;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .btn-primary {
          background: linear-gradient(180deg, #34d399, #059669);
          color: #041008;
          box-shadow: 0 20px 50px rgba(16,185,129,0.32);
        }

        .btn-primary:hover,
        .btn-outline:hover,
        .btn-white:hover {
          transform: translateY(-2px);
        }

        .btn-outline {
          background: rgba(255,255,255,0.04);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .hero-trust {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          color: rgba(255,255,255,0.74);
          font-size: 13px;
          font-weight: 700;
        }

        .hero-trust span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .mini-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: var(--green);
          border: 1px solid rgba(16,185,129,0.42);
        }

        .dashboard {
          border-radius: 24px;
          overflow: hidden;
          background: #0b0f0d;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow:
            0 50px 130px rgba(0,0,0,0.58),
            0 0 80px rgba(16,185,129,0.16);
        }

        .dashboard-top {
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
        }

        .dashboard-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          font-weight: 900;
          color: white;
        }

        .dashboard-brand-mark {
          width: 24px;
          height: 24px;
          border-radius: 7px;
          display: grid;
          place-items: center;
          background: var(--green);
          color: #07100a;
        }

        .dashboard-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dash-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          color: rgba(255,255,255,0.78);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .add-btn {
          height: 30px;
          padding: 0 14px;
          border-radius: 8px;
          border: 0;
          color: #041008;
          font-weight: 900;
          background: var(--green);
        }

        .dashboard-body {
          display: grid;
          grid-template-columns: 145px 1fr;
          min-height: 475px;
        }

        .sidebar {
          padding: 18px 14px;
          border-right: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 11px;
          border-radius: 10px;
          color: rgba(255,255,255,0.62);
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .sidebar-link.active {
          background: rgba(16,185,129,0.11);
          color: var(--green);
        }

        .sidebar-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
        }

        .profile-mini {
          margin-top: 70px;
          padding: 12px;
          border-radius: 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .profile-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f6c177, #8bd5ca);
        }

        .dash-main {
          padding: 22px;
        }

        .dash-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .dash-heading h3 {
          margin: 0 0 6px;
          color: white;
          font-family: "Space Grotesk", sans-serif;
          font-size: 25px;
          letter-spacing: -0.04em;
        }

        .dash-heading p {
          margin: 0;
          color: rgba(255,255,255,0.56);
          font-size: 13px;
        }

        .ask-kai {
          border-radius: 999px;
          border: 1px solid rgba(16,185,129,0.28);
          color: var(--green);
          background: rgba(16,185,129,0.08);
          font-weight: 900;
          padding: 8px 13px;
        }

        .dash-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 14px;
        }

        .dash-card {
          border-radius: 18px;
          padding: 16px;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .dash-card h4 {
          margin: 0 0 13px;
          color: rgba(255,255,255,0.94);
          font-size: 13px;
        }

        .task-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.78);
          font-size: 13px;
        }

        .task-row:last-child {
          border-bottom: 0;
        }

        .task-row strong {
          color: white;
        }

        .calendar-item {
          padding: 11px;
          border-radius: 12px;
          margin-bottom: 9px;
          background: rgba(16,185,129,0.11);
          border: 1px solid rgba(16,185,129,0.14);
          color: rgba(255,255,255,0.78);
          font-size: 13px;
        }

        .small-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 14px;
        }

        .metric {
          min-height: 120px;
        }

        .metric-value {
          color: white;
          font-family: "Space Grotesk", sans-serif;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.05em;
        }

        .progress-ring {
          width: 78px;
          height: 78px;
          border-radius: 50%;
          margin: 8px auto 0;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle, #0b0f0d 52%, transparent 54%),
            conic-gradient(var(--green) 0deg 270deg, rgba(255,255,255,0.12) 270deg 360deg);
          color: white;
          font-weight: 900;
        }

        .bar-row {
          display: flex;
          align-items: end;
          gap: 5px;
          height: 58px;
          margin-top: 15px;
        }

        .bar {
          flex: 1;
          border-radius: 6px 6px 2px 2px;
          background: linear-gradient(180deg, var(--green), #047857);
        }

        .line-chart {
          height: 46px;
          margin-top: 12px;
          border-radius: 10px;
          background:
            linear-gradient(135deg, transparent 0 28%, rgba(16,185,129,0.4) 29% 32%, transparent 33% 48%, rgba(16,185,129,0.55) 49% 52%, transparent 53% 66%, rgba(16,185,129,0.8) 67% 70%, transparent 71%),
            rgba(16,185,129,0.06);
        }

        .life-section {
          background: white;
          padding: 70px 0 68px;
        }

        .section-heading {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 48px;
        }

        .section-heading h2 {
          margin: 0 0 12px;
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(34px, 4vw, 54px);
          line-height: 1.02;
          letter-spacing: -0.055em;
        }

        .section-heading p {
          margin: 0;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.65;
        }

        .pillar-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .pillar-card {
          padding: 4px 22px 4px 0;
          border-right: 1px solid rgba(0,0,0,0.12);
        }

        .pillar-card:last-child {
          border-right: 0;
        }

        .pillar-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #e7f8ea;
          color: #059669;
          margin-bottom: 20px;
        }

        .pillar-card h3 {
          margin: 0 0 10px;
          font-size: 19px;
          letter-spacing: -0.02em;
        }

        .pillar-card p {
          margin: 0 0 16px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.6;
        }

        .learn-link {
          color: #059669;
          text-decoration: none;
          font-weight: 900;
          font-size: 14px;
        }

        .kai-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 46% 50%, rgba(16,185,129,0.23), transparent 26%),
            linear-gradient(135deg, #060807, #020403 55%, #07130d);
          color: white;
          padding: 80px 0;
        }

        .kai-grid {
          display: grid;
          grid-template-columns: 0.8fr 0.7fr 1fr;
          align-items: center;
          gap: 34px;
        }

        .kai-section h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(36px, 4vw, 58px);
          line-height: 1;
          letter-spacing: -0.06em;
          margin: 0 0 16px;
        }

        .kai-section p {
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
        }

        .kai-list {
          display: grid;
          gap: 12px;
          margin-top: 24px;
        }

        .kai-list div {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.84);
          font-size: 14px;
          font-weight: 700;
        }

        .kai-orb {
          width: 240px;
          height: 240px;
          margin: 0 auto;
          border-radius: 50%;
          background:
            radial-gradient(circle, transparent 35%, rgba(110,231,183,0.9) 37%, rgba(16,185,129,0.72) 42%, transparent 48%),
            radial-gradient(circle, rgba(16,185,129,0.14), transparent 70%);
          box-shadow: 0 0 80px rgba(16,185,129,0.35);
          position: relative;
        }

        .kai-orb::before,
        .kai-orb::after {
          content: "";
          position: absolute;
          inset: 32px;
          border-radius: 50%;
          border: 1px solid rgba(110,231,183,0.25);
        }

        .kai-orb::after {
          inset: 62px;
        }

        .chat-stack {
          display: grid;
          gap: 12px;
        }

        .chat-message {
          padding: 14px 16px;
          border-radius: 14px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.84);
          font-size: 14px;
          line-height: 1.55;
        }

        .chat-message.user {
          margin-left: 42px;
          background: rgba(16,185,129,0.16);
          border-color: rgba(16,185,129,0.24);
          color: white;
        }

        .chat-input {
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 14px;
          color: rgba(255,255,255,0.48);
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(0,0,0,0.2);
          font-size: 13px;
        }

        .compare-section {
          background:
            radial-gradient(circle at 50% 25%, rgba(16,185,129,0.12), transparent 30%),
            #f7fbf8;
          padding: 90px 0;
        }

        .compare-title {
          text-align: center;
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(34px, 4vw, 54px);
          letter-spacing: -0.055em;
          margin: 0 0 14px;
        }

        .compare-subtitle {
          text-align: center;
          max-width: 620px;
          margin: 0 auto 40px;
          color: var(--muted);
          line-height: 1.65;
          font-size: 16px;
        }

        .compare-card {
          max-width: 960px;
          margin: 0 auto;
          border-radius: 30px;
          overflow: hidden;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(16,185,129,0.16);
          box-shadow: 0 38px 100px rgba(5, 8, 7, 0.08);
        }

        .compare-app-row {
          display: grid;
          grid-template-columns: 1.7fr 1.2fr repeat(5, 1fr);
          min-height: 64px;
          align-items: center;
          border-bottom: 1px solid rgba(5, 8, 7, 0.08);
          background: rgba(255,255,255,0.72);
        }

        .compare-app-row.header {
          min-height: 58px;
          background: #ddf3e7;
          color: #10251a;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 900;
        }

        .compare-app-row.highlight {
          background: #052e1a;
          color: white;
          border-bottom: 0;
        }

        .compare-app-row:last-child {
          border-bottom: 0;
        }

        .compare-app-cell {
          padding: 0 22px;
          font-size: 15px;
          font-weight: 800;
          color: #4c6b58;
        }

        .compare-app-row.header .compare-app-cell {
          color: #10251a;
          font-size: 12px;
        }

        .compare-app-row.highlight .compare-app-cell {
          color: white;
        }

        .compare-center {
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .compare-yes {
          color: #059669;
          font-size: 21px;
          font-weight: 900;
          line-height: 1;
        }

        .compare-no {
          color: #b7c5bd;
          font-size: 24px;
          font-weight: 600;
          line-height: 1;
        }

        .compare-app-row.highlight .compare-yes {
          color: #34d399;
        }

        .testimonials-section {
          background: #ffffff;
          padding: 34px 0 58px;
        }

        .testimonials-title {
          text-align: center;
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(28px, 3vw, 40px);
          letter-spacing: -0.05em;
          margin: 0 0 28px;
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          max-width: 920px;
          margin: 0 auto;
        }

        .testimonial-card {
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.08);
          background: white;
          box-shadow: 0 14px 40px rgba(0,0,0,0.06);
        }

        .quote-mark {
          color: var(--green-2);
          font-size: 28px;
          font-weight: 900;
          line-height: 1;
        }

        .testimonial-card p {
          color: #303632;
          line-height: 1.6;
          font-size: 14px;
          margin: 8px 0 18px;
        }

        .person {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 12px;
          font-weight: 900;
          color: white;
          background: linear-gradient(135deg, #064e3b, #10b981);
        }

        .person strong {
          display: block;
          font-size: 13px;
        }

        .person span {
          display: block;
          font-size: 12px;
          color: var(--muted);
        }

        .pricing-section {
          background: white;
          padding: 35px 0 80px;
        }

        .pricing-title {
          text-align: center;
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(32px, 4vw, 48px);
          letter-spacing: -0.055em;
          margin: 0 0 8px;
        }

        .pricing-sub {
          text-align: center;
          color: var(--muted);
          margin: 0 0 28px;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 920px;
          margin: 0 auto;
        }

        .price-card {
          position: relative;
          border-radius: 18px;
          border: 1px solid rgba(0,0,0,0.1);
          background: white;
          padding: 28px;
          box-shadow: 0 14px 44px rgba(0,0,0,0.06);
        }

        .price-card.highlighted {
          border-color: rgba(16,185,129,0.7);
          box-shadow:
            0 22px 70px rgba(16,185,129,0.12),
            inset 0 0 0 1px rgba(16,185,129,0.24);
        }

        .popular {
          position: absolute;
          top: -12px;
          right: 18px;
          padding: 6px 13px;
          border-radius: 999px;
          background: var(--green-2);
          color: white;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .plan-name {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .plan-dot {
          width: 18px;
          height: 18px;
          border-radius: 6px;
          display: grid;
          place-items: center;
          background: #eaf8ee;
          color: #059669;
        }

        .price {
          font-family: "Space Grotesk", sans-serif;
          font-size: 42px;
          letter-spacing: -0.055em;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .price small {
          font-family: Inter, sans-serif;
          font-size: 13px;
          color: var(--muted);
          letter-spacing: 0;
          font-weight: 700;
        }

        .plan-desc {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.55;
          margin-bottom: 20px;
        }

        .price-button {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          border-radius: 10px;
          border: 1px solid rgba(0,0,0,0.16);
          color: #101312;
          text-decoration: none;
          font-weight: 900;
          font-size: 13px;
          margin-bottom: 22px;
        }

        .price-card.highlighted .price-button {
          background: linear-gradient(180deg, #34d399, #059669);
          color: #041008;
          border: 0;
        }

        .plan-list {
          display: grid;
          gap: 10px;
        }

        .plan-list div {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: #303632;
          font-size: 13px;
          line-height: 1.45;
        }

        .check-mark {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          color: #059669;
        }

        .price-note {
          margin-top: 20px;
          text-align: center;
          color: var(--muted);
          font-size: 13px;
        }

        .final-cta {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 70% 10%, rgba(16,185,129,0.28), transparent 28%),
            linear-gradient(135deg, #07100a, #020403);
          color: white;
          padding: 52px 0;
        }

        .final-cta::before {
          content: "";
          position: absolute;
          left: 10%;
          right: 10%;
          bottom: -170px;
          height: 270px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(16,185,129,0.55), transparent 62%);
          filter: blur(20px);
        }

        .final-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .final-inner h2 {
          margin: 0 0 6px;
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(30px, 4vw, 44px);
          letter-spacing: -0.055em;
        }

        .final-inner p {
          margin: 0;
          color: rgba(255,255,255,0.68);
        }

        .footer {
          background: #050807;
          color: rgba(255,255,255,0.7);
          padding: 44px 0 26px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr repeat(4, 1fr);
          gap: 34px;
          margin-bottom: 34px;
        }

        .footer .brand {
          margin-bottom: 14px;
        }

        .footer p {
          margin: 0;
          color: rgba(255,255,255,0.58);
          font-size: 14px;
          line-height: 1.65;
          max-width: 300px;
        }

        .footer h4 {
          color: white;
          margin: 0 0 14px;
          font-size: 13px;
        }

        .footer a,
        .footer button {
          display: block;
          border: 0;
          background: transparent;
          color: rgba(255,255,255,0.58);
          text-decoration: none;
          font-size: 13px;
          padding: 0;
          margin: 0 0 9px;
          cursor: pointer;
          font-family: inherit;
        }

        .newsletter {
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          padding: 6px;
        }

        .newsletter input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: 0;
          outline: 0;
          color: white;
          font-size: 13px;
          padding: 0 8px;
        }

        .newsletter button {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          margin: 0;
          color: white;
          background: rgba(255,255,255,0.08);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 22px;
          display: flex;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
          font-size: 12px;
          color: rgba(255,255,255,0.44);
        }

        @media (max-width: 1050px) {
          .hero-grid,
          .kai-grid,
          .final-inner {
            grid-template-columns: 1fr;
          }

          .dashboard-body {
            grid-template-columns: 1fr;
          }

          .sidebar {
            display: none;
          }

          .dash-grid {
            grid-template-columns: 1fr;
          }

          .small-grid {
            grid-template-columns: 1fr;
          }

          .pillar-grid,
          .pricing-grid,
          .testimonial-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 760px) {
          .container {
            width: min(100% - 28px, 1180px);
          }

          .nav-links {
            display: none;
          }

          .menu-btn {
            display: block;
          }

          .hero {
            padding-top: 105px;
            min-height: auto;
          }

          .hero-title {
            font-size: 48px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .hero-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .btn-primary,
          .btn-outline,
          .btn-white {
            width: 100%;
          }

          .hero-trust {
            gap: 14px;
            flex-direction: column;
          }

          .dashboard {
            border-radius: 18px;
          }

          .dash-main {
            padding: 16px;
          }

          .dashboard-top {
            padding: 0 12px;
          }

          .pillar-grid,
          .pricing-grid,
          .testimonial-grid,
          .footer-grid {
            grid-template-columns: 1fr;
          }

          .pillar-card {
            border-right: 0;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            padding: 0 0 22px;
          }

          .pillar-card:last-child {
            border-bottom: 0;
          }

          .kai-orb {
            width: 190px;
            height: 190px;
          }

          .compare-card {
            overflow-x: auto;
            border-radius: 22px;
          }

          .compare-app-row {
            min-width: 760px;
          }

          .final-inner {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }
        }
      `}</style>

      <nav className="nav">
        <div className="container nav-inner">
          <a href="/" className="brand">
            <span className="brand-mark">
              <Icon name="lift" size={18} />
            </span>
            DayLyft
          </a>

          <div className="nav-links">
            <button onClick={() => scrollTo("features")}>Features</button>
            <button onClick={() => scrollTo("kai")}>Kai AI</button>
            <button onClick={() => scrollTo("compare")}>Compare</button>
            <button onClick={() => scrollTo("pricing")}>Pricing</button>
            <a className="nav-link" href="/about">About</a>
          </div>

          <div className="nav-links" style={{ gap: 16 }}>
            <a className="nav-cta" href="/login">Get started free</a>
          </div>

          <button className="menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Icon name="menu" size={27} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          <button className="close-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <Icon name="close" size={30} />
          </button>
          <button onClick={() => scrollTo("features")}>Features</button>
          <button onClick={() => scrollTo("kai")}>Kai AI</button>
          <button onClick={() => scrollTo("compare")}>Compare</button>
          <button onClick={() => scrollTo("pricing")}>Pricing</button>
          <a href="/about">About</a>
          <a className="nav-cta" href="/login">Get started free</a>
        </div>
      )}

      <section className="hero">
        <div className="hero-wave" />

        <div className="container hero-grid">
          <div>
            <div className="badge">
              <span>NEW</span>
              v1.0 — 40+ tools with AI Copilot
            </div>

            <h1 className="hero-title">
              Your AI operating system for <span className="green-text">life.</span>
            </h1>

            <p className="hero-subtitle">
              Plan your day. Build habits. Manage money. Improve your health. Grow with Kai.
            </p>

            <div className="hero-actions">
              <a className="btn-primary" href="/login">
                Start free
                <span>→</span>
              </a>

              <button className="btn-outline" onClick={() => scrollTo("features")}>
                See features
              </button>
            </div>

            <div className="hero-trust">
              <span>
                <span className="mini-check"><Icon name="check" size={12} /></span>
                No credit card required
              </span>
              <span>
                <span className="mini-check"><Icon name="check" size={12} /></span>
                Free forever plan
              </span>
            </div>
          </div>

          <div className="dashboard">
            <div className="dashboard-top">
              <div className="dashboard-brand">
                <span className="dashboard-brand-mark">
                  <Icon name="lift" size={15} />
                </span>
                DayLyft
              </div>

              <div className="dashboard-actions">
                <span className="dash-icon">⌕</span>
                <span className="dash-icon">◔</span>
                <button className="add-btn">+ Add</button>
              </div>
            </div>

            <div className="dashboard-body">
              <aside className="sidebar">
                {["Home", "Tasks", "Calendar", "Habits", "Finance", "Health", "Kai AI", "Analytics", "Settings"].map((item, index) => (
                  <div key={item} className={`sidebar-link ${index === 0 ? "active" : ""}`}>
                    <span className="sidebar-dot" />
                    {item}
                  </div>
                ))}

                <div className="profile-mini">
                  <div className="profile-avatar" />
                  <div>
                    <div style={{ color: "white", fontSize: 12, fontWeight: 800 }}>Alex Morgan</div>
                    <div style={{ color: "rgba(255,255,255,0.44)", fontSize: 10 }}>alex@daylyft.com</div>
                  </div>
                </div>
              </aside>

              <div className="dash-main">
                <div className="dash-heading">
                  <div>
                    <h3>Good morning, Alex</h3>
                    <p>Thursday, May 15</p>
                  </div>
                  <button className="ask-kai">Ask Kai</button>
                </div>

                <div className="dash-grid">
                  <div className="dash-card">
                    <h4>Today’s Plan</h4>
                    {[
                      ["Review Q2 roadmap", "9:00 AM"],
                      ["Client call", "10:30 AM"],
                      ["Workout", "12:30 PM"],
                      ["Write newsletter", "2:00 PM"],
                      ["Grocery shopping", "6:00 PM"],
                    ].map(([task, time]) => (
                      <div className="task-row" key={task}>
                        <strong>{task}</strong>
                        <span>{time}</span>
                      </div>
                    ))}
                  </div>

                  <div className="dash-card">
                    <h4>Calendar</h4>
                    {[
                      "Review Q2 roadmap · 9:00 AM",
                      "Client call · 10:30 AM",
                      "Workout · 12:30 PM",
                      "Newsletter · 2:00 PM",
                    ].map((item) => (
                      <div className="calendar-item" key={item}>{item}</div>
                    ))}
                  </div>
                </div>

                <div className="small-grid">
                  <div className="dash-card metric">
                    <h4>Focus</h4>
                    <div style={{ color: "rgba(255,255,255,0.62)", fontSize: 12 }}>Deep Work</div>
                    <div className="metric-value">2h 30m</div>
                    <div className="progress-ring">75%</div>
                  </div>

                  <div className="dash-card metric">
                    <h4>Habits</h4>
                    <div style={{ color: "rgba(255,255,255,0.62)", fontSize: 12 }}>Daily progress</div>
                    <div className="metric-value">8/10</div>
                    <div className="bar-row">
                      {[38, 58, 74, 44, 86, 65, 90].map((height, index) => (
                        <div className="bar" key={index} style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>

                  <div className="dash-card metric">
                    <h4>Budget</h4>
                    <div style={{ color: "rgba(255,255,255,0.62)", fontSize: 12 }}>This month</div>
                    <div className="metric-value">$2,340</div>
                    <div className="line-chart" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="life-section" id="features">
        <div className="container">
          <div className="section-heading">
            <h2>
              One place for <span className="green-text">everything</span><br />
              that moves your life forward.
            </h2>
            <p>
              DayLyft brings your tasks, calendar, habits, finances, and health together so you can focus on what truly matters.
            </p>
          </div>

          <div className="pillar-grid">
            {featurePillars.map((item) => (
              <div className="pillar-card" key={item.title}>
                <div className="pillar-icon">
                  <Icon name={item.icon} size={23} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a className="learn-link" href="/login">Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kai-section" id="kai">
        <div className="container kai-grid">
          <div>
            <h2>Meet <span className="green-text">Kai</span>, your AI copilot.</h2>
            <p>
              Kai understands your life, learns your patterns, and helps you make better decisions every day.
            </p>

            <div className="kai-list">
              <div><CheckMark /> Plan smarter with AI recommendations</div>
              <div><CheckMark /> Get insights across tasks, habits, money & health</div>
              <div><CheckMark /> Stay accountable and build momentum</div>
              <div><CheckMark /> Available 24/7, right in your dashboard</div>
            </div>
          </div>

          <div className="kai-orb" />

          <div className="chat-stack">
            <div className="chat-message">How can I help you today?</div>
            <div className="chat-message user">I want to be more productive in the mornings.</div>
            <div className="chat-message">
              I noticed you’re most productive between 9–11 AM. How about blocking that time for deep work?
            </div>
            <div className="chat-message user">That makes sense. What should I focus on?</div>
            <div className="chat-message">
              Based on your goals, I recommend focusing on your Q2 roadmap and the client proposal.
            </div>
            <div className="chat-input">
              Ask Kai anything...
              <span>➜</span>
            </div>
          </div>
        </div>
      </section>

      <section className="compare-section" id="compare">
        <div className="container">
          <h2 className="compare-title">
            More value. <span className="green-text">Less app switching.</span>
          </h2>
          <p className="compare-subtitle">
            DayLyft brings tasks, calendar, notes, habits, finance, and AI together in one clean platform.
          </p>

          <div className="compare-card">
            <div className="compare-app-row header">
              <div className="compare-app-cell">App</div>
              <div className="compare-app-cell">Price</div>
              <div className="compare-app-cell compare-center">Tasks</div>
              <div className="compare-app-cell compare-center">Calendar</div>
              <div className="compare-app-cell compare-center">Notes</div>
              <div className="compare-app-cell compare-center">Habits</div>
              <div className="compare-app-cell compare-center">Finance</div>
              <div className="compare-app-cell compare-center">AI</div>
            </div>

            {apps.map((app) => (
              <div key={app.app} className={`compare-app-row ${app.highlight ? "highlight" : ""}`}>
                <div className="compare-app-cell">{app.app}</div>
                <div className="compare-app-cell">{app.price}</div>
                <div className="compare-app-cell compare-center"><CompareValue value={app.tasks} /></div>
                <div className="compare-app-cell compare-center"><CompareValue value={app.calendar} /></div>
                <div className="compare-app-cell compare-center"><CompareValue value={app.notes} /></div>
                <div className="compare-app-cell compare-center"><CompareValue value={app.habits} /></div>
                <div className="compare-app-cell compare-center"><CompareValue value={app.finance} /></div>
                <div className="compare-app-cell compare-center"><CompareValue value={app.ai} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2 className="testimonials-title">Trusted by people who want more from their day.</h2>

          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <div className="testimonial-card" key={testimonial.name}>
                <div className="quote-mark">“</div>
                <p>{testimonial.quote}</p>
                <div className="person">
                  <div className="avatar">{testimonial.initials}</div>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="container">
          <h2 className="pricing-title">Simple pricing. Powerful value.</h2>
          <p className="pricing-sub">Start free. Upgrade when you’re ready.</p>

          <div className="pricing-grid">
            {pricing.map((plan) => (
              <div className={`price-card ${plan.highlighted ? "highlighted" : ""}`} key={plan.name}>
                {plan.highlighted && <div className="popular">Most popular</div>}

                <div className="plan-name">
                  <span className="plan-dot">
                    <Icon name="spark" size={12} />
                  </span>
                  {plan.name}
                </div>

                <div className="price">
                  {plan.price} <small>{plan.suffix}</small>
                </div>

                <p className="plan-desc">{plan.desc}</p>

                <a href={plan.href} className="price-button">
                  {plan.button}
                </a>

                <div className="plan-list">
                  {plan.items.map((item) => (
                    <div key={item}>
                      <CheckMark />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="price-note">
            7-day free trial · Cancel anytime · Your data is always secure
          </p>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-inner">
          <div>
            <h2>Ready to upgrade your life?</h2>
            <p>Join DayLyft today and start your journey with Kai.</p>
          </div>

          <a className="btn-primary" href="/login">
            Start free →
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="/" className="brand">
                <span className="brand-mark">
                  <Icon name="lift" size={18} />
                </span>
                DayLyft
              </a>
              <p>
                Your AI operating system for life. Plan better. Live better.
              </p>
            </div>

            <div>
              <h4>Product</h4>
              <button onClick={() => scrollTo("features")}>Features</button>
              <button onClick={() => scrollTo("kai")}>Kai AI</button>
              <button onClick={() => scrollTo("compare")}>Compare</button>
              <button onClick={() => scrollTo("pricing")}>Pricing</button>
            </div>

            <div>
              <h4>Company</h4>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/login">Login</a>
            </div>

            <div>
              <h4>Legal</h4>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>

            <div>
              <h4>Stay in the loop</h4>
              <p style={{ marginBottom: 12 }}>
                Get tips and updates delivered to your inbox.
              </p>
              <div className="newsletter">
                <input placeholder="Enter your email" />
                <button aria-label="Subscribe">→</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 DayLyft, Inc. All rights reserved.</span>
            <span>Built for better days.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}