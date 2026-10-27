"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────────── */

const PRO_PRICE = 6.99;
const PRO_LINK = "https://buy.stripe.com/8x25kE2pK5Ho4Wo25AaR205";

// Typical monthly prices by category. Users can edit them in the calculator.
const stackApps = [
  { id: "planner", label: "AI planner / scheduler", price: 19, on: true },
  { id: "notes", label: "Notes & docs", price: 10, on: true },
  { id: "habits", label: "Habit tracker", price: 5, on: true },
  { id: "budget", label: "Budgeting app", price: 9, on: true },
  { id: "focus", label: "Focus & ambient sounds", price: 7, on: true },
  { id: "journal", label: "Journaling app", price: 5, on: true },
  { id: "ai", label: "AI chat assistant", price: 20, on: false },
];

const tools = [
  "Tasks", "Calendar", "Habits", "Budget", "Bills", "Savings", "Goals", "Notes",
  "Journal", "Pomodoro", "Focus Shield", "Zen Mode", "Sleep", "Workouts", "Stretching",
  "Water", "Energy Map", "Night Report", "Morning Autopilot", "Productivity DNA",
  "Life Balance", "Weekly Wins", "Gratitude", "Ideas", "Reading", "Flashcards",
  "Decisions", "Countdowns", "Gifts", "Checklists", "Family Mode", "Links",
];

const dayFlow = [
  {
    time: "7:00",
    title: "Morning Autopilot",
    text: "Kai builds your plan before you open your eyes — priorities, meetings, and the one thing that matters today.",
    tag: "AUTO",
  },
  {
    time: "9:30",
    title: "Focus Shield",
    text: "Deep work protected. Notifications pause, ambient sound fades in, and Kai guards the block.",
    tag: "FOCUS",
  },
  {
    time: "13:15",
    title: "Smart break",
    text: "Energy dipping? Kai notices the pattern and nudges a 4-minute breathing reset.",
    tag: "ZEN",
  },
  {
    time: "21:30",
    title: "Night Report",
    text: "What you finished, what slipped, and tomorrow's top priority — already decided for you.",
    tag: "RECAP",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    suffix: "forever",
    desc: "Everything you need to get your day in order.",
    cta: "Get started free",
    href: "/login",
    items: ["Unlimited tasks", "Calendar", "Habit tracking", "Basic finance tracking", "Community support"],
  },
  {
    name: "Pro",
    price: "$6.99",
    suffix: "/month",
    desc: "Your whole life, with an AI that knows it.",
    cta: "Start 7-day free trial",
    href: PRO_LINK,
    featured: true,
    items: [
      "Everything in Starter",
      "Kai, your AI copilot",
      "Advanced analytics & Energy Map",
      "Health & wellness tracking",
      "Priority support",
    ],
  },
  {
    name: "Business",
    price: "$12.99",
    suffix: "/user/month",
    desc: "For teams and families. Early access.",
    cta: "Join the waitlist",
    href: "mailto:juanmasis777@gmail.com?subject=DayLyft%20Business%20Early%20Access",
    items: ["Everything in Pro", "Shared spaces", "Admin controls", "Custom reports", "Dedicated support"],
  },
];

const faqs = [
  {
    q: "Is the free plan really free?",
    a: "Yes. Starter costs $0, needs no credit card, and has no time limit. Upgrade only if you want Kai and the advanced tools.",
  },
  {
    q: "What does Kai actually do?",
    a: "Kai reads the context across your tasks, calendar, habits and money to plan your morning, protect focus time, spot patterns and summarize your day each night. It suggests — you decide.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Anytime, in two clicks. Pro starts with a 7-day free trial, and you keep the free plan if you cancel.",
  },
  {
    q: "What happens to my data?",
    a: "It is encrypted in transit and at rest, never sold, and you can export or delete your account whenever you want.",
  },
  {
    q: "Does it work on my phone?",
    a: "Yes. DayLyft runs in any browser and installs on your phone's home screen like an app — no app store needed.",
  },
  {
    q: "Is it available in Spanish?",
    a: "Yes. DayLyft is bilingual — English and Spanish — and detects your language automatically.",
  },
];

const kaiScript = [
  { from: "kai", text: "Good morning ☀️ You have 3 meetings and a clear 9–11 block. Want me to protect it for the proposal?" },
  { from: "you", text: "Yes. And remind me to move today." },
  { from: "kai", text: "Done. Focus Shield is on 9:00–11:00, and I added a 20-min walk at 1:15 — your energy usually dips then." },
  { from: "you", text: "How am I doing on money this month?" },
  { from: "kai", text: "You're $184 under budget. At this pace you'll hit your savings goal 9 days early. 🎯" },
];

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

function Icon({ name, size = 20, stroke = 2 }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const paths = {
    lift: <><path d="M5 14l7-7 7 7" /><path d="M5 19h14" /></>,
    check: <path d="M20 6L9 17l-5-5" />,
    arrow: <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
    menu: <path d="M4 8h16M4 16h16" />,
    close: <path d="M18 6L6 18M6 6l12 12" />,
    spark: <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></>,
    moon: <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />,
    leaf: <><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z" /><path d="M5 19l7-7" /></>,
    dna: <><path d="M7 3c0 6 10 6 10 12s-10 6-10 6" /><path d="M17 3c0 6-10 6-10 12" /><path d="M8 7h8M8 17h8" /></>,
    book: <><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" /><path d="M4 19a2 2 0 012-2h13" /></>,
    wallet: <><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M16 12.5h2" /><path d="M3 9h15a3 3 0 013 3" /></>,
    lock: <><rect x="4" y="11" width="16" height="10" rx="3" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
    download: <><path d="M12 4v11" /><path d="M7 10l5 5 5-5" /><path d="M5 20h14" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    phone: <><rect x="7" y="2" width="10" height="20" rx="3" /><path d="M11 18h2" /></>,
  };
  return <svg {...p}>{paths[name] || <circle cx="12" cy="12" r="9" />}</svg>;
}

function Logo({ size = 30 }) {
  return (
    <span className="dl-logo" style={{ width: size, height: size }}>
      <Icon name="lift" size={size * 0.56} stroke={2.6} />
    </span>
  );
}

// Adds .is-in to elements with [data-reveal] once they scroll into view.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useInView(ref, threshold = 0.35) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

function useCountUp(target, run, duration = 900) {
  const [value, setValue] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    const a = from.current;
    let raf;
    const tick = (t) => {
      const k = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setValue(a + (target - a) * eased);
      if (k < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

const money = (n) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

/* ─────────────────────────────────────────────────────────────
   SECTIONS
   ───────────────────────────────────────────────────────────── */

function HeroMockup() {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="dl-mock-wrap" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="dl-mock" ref={ref}>
        <div className="dl-mock-bar">
          <span className="dl-dots"><i /><i /><i /></span>
          <span className="dl-mock-url">app.daylyft.com/today</span>
          <span />
        </div>

        <div className="dl-mock-body">
          <aside className="dl-mock-side">
            <div className="dl-mock-brand"><Logo size={22} /> DayLyft</div>
            {["Today", "Tasks", "Calendar", "Habits", "Money", "Health", "Kai"].map((x, i) => (
              <div key={x} className={`dl-side-item ${i === 0 ? "on" : ""}`}>
                <span />{x}
              </div>
            ))}
          </aside>

          <div className="dl-mock-main">
            <div className="dl-mock-head">
              <div>
                <small>Tuesday · 7:02 AM</small>
                <h3>Good morning, Alex</h3>
              </div>
              <span className="dl-pill-kai"><Icon name="spark" size={13} /> Kai planned your day</span>
            </div>

            <div className="dl-mock-grid">
              <div className="dl-card dl-card-plan">
                <div className="dl-card-title">Today’s plan <b>4 / 6</b></div>
                {[
                  ["Finish client proposal", "9:00", true, "focus"],
                  ["Team standup", "11:15", true, ""],
                  ["Walk + reset", "13:15", true, "zen"],
                  ["Review budget", "16:00", true, ""],
                  ["Read 20 pages", "20:30", false, ""],
                ].map(([t, h, done, tag]) => (
                  <div key={t} className={`dl-task ${done ? "done" : ""}`}>
                    <span className="dl-box">{done && <Icon name="check" size={10} stroke={3} />}</span>
                    <span className="dl-task-t">{t}</span>
                    {tag && <em className={`dl-tag ${tag}`}>{tag}</em>}
                    <span className="dl-task-h">{h}</span>
                  </div>
                ))}
              </div>

              <div className="dl-card dl-card-ring">
                <div className="dl-card-title">Focus</div>
                <div className="dl-ring"><span>2h 40m</span></div>
                <small>+38% vs last week</small>
              </div>

              <div className="dl-card dl-card-habits">
                <div className="dl-card-title">Habit streak <b>12🔥</b></div>
                <div className="dl-heat">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const v = [0, 1, 2, 3, 3, 2, 3, 1, 3, 2][(i * 7 + 3) % 10];
                    return <i key={i} className={`h${v}`} />;
                  })}
                </div>
              </div>

              <div className="dl-card dl-card-money">
                <div className="dl-card-title">October budget</div>
                <div className="dl-money">$1,816 <small>/ $2,000</small></div>
                <div className="dl-bar"><span style={{ width: "78%" }} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dl-float dl-float-a">
        <span className="dl-float-ic"><Icon name="shield" size={16} /></span>
        <div><b>Focus Shield on</b><small>3 messages auto-replied</small></div>
      </div>
      <div className="dl-float dl-float-b">
        <span className="dl-float-ic gold"><Icon name="moon" size={16} /></span>
        <div><b>Night Report ready</b><small>Tomorrow: ship the proposal</small></div>
      </div>
    </div>
  );
}

function StackCalculator() {
  const [apps, setApps] = useState(stackApps);
  const ref = useRef(null);
  const visible = useInView(ref, 0.3);

  const total = apps.filter((a) => a.on).reduce((s, a) => s + (Number(a.price) || 0), 0);
  const monthlySave = Math.max(0, total - PRO_PRICE);
  const yearly = monthlySave * 12;
  const shownYearly = useCountUp(yearly, visible);
  const count = apps.filter((a) => a.on).length;

  const toggle = (id) => setApps((xs) => xs.map((a) => (a.id === id ? { ...a, on: !a.on } : a)));
  const setPrice = (id, v) =>
    setApps((xs) => xs.map((a) => (a.id === id ? { ...a, price: v.replace(/[^0-9.]/g, "").slice(0, 6) } : a)));

  return (
    <div className="dl-calc" ref={ref} data-reveal>
      <div className="dl-calc-left">
        <p className="dl-eyebrow">Your app stack</p>
        <h3>What are you paying for right now?</h3>
        <p className="dl-calc-help">Tap what you use. Prices are typical — edit them to match yours.</p>

        <div className="dl-calc-list">
          {apps.map((a) => (
            <div key={a.id} className={`dl-calc-row ${a.on ? "on" : ""}`}>
              <button type="button" className="dl-switch" onClick={() => toggle(a.id)} aria-pressed={a.on}>
                <span className="dl-check">{a.on && <Icon name="check" size={12} stroke={3} />}</span>
                {a.label}
              </button>
              <label className="dl-price-in">
                $
                <input
                  inputMode="decimal"
                  value={a.price}
                  onChange={(e) => setPrice(a.id, e.target.value)}
                  aria-label={`${a.label} monthly price`}
                />
                <small>/mo</small>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="dl-calc-right">
        <div className="dl-calc-compare">
          <div>
            <small>{count} separate apps</small>
            <strong className="strike">${money(total)}<em>/mo</em></strong>
          </div>
          <div className="dl-calc-vs">vs</div>
          <div>
            <small>DayLyft Pro</small>
            <strong>${PRO_PRICE}<em>/mo</em></strong>
          </div>
        </div>

        <div className="dl-calc-result">
          <small>You keep every year</small>
          <div className="dl-calc-big">${money(shownYearly)}</div>
          <p>
            {monthlySave > 0
              ? `That's $${money(monthlySave)} back in your pocket every month — plus one place for everything instead of ${count}.`
              : "Pick the apps you pay for to see what you'd save."}
          </p>
        </div>

        <a className="dl-btn dl-btn-primary full" href="/login">
          Start free — switch in minutes <Icon name="arrow" size={18} />
        </a>
      </div>
    </div>
  );
}

function KaiChat() {
  const ref = useRef(null);
  const visible = useInView(ref, 0.4);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    let t;
    if (reduce) {
      t = setTimeout(() => setShown(kaiScript.length), 0);
      return () => clearTimeout(t);
    }
    const next = () => {
      if (i >= kaiScript.length) return;
      const isKai = kaiScript[i].from === "kai";
      setTyping(isKai);
      t = setTimeout(() => {
        setTyping(false);
        i += 1;
        setShown(i);
        t = setTimeout(next, 650);
      }, isKai ? 1100 : 500);
    };
    next();
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="dl-chat" ref={ref}>
      <div className="dl-chat-head">
        <span className="dl-kai-av"><Icon name="spark" size={16} /></span>
        <div>
          <b>Kai</b>
          <small><i className="dl-live" /> knows your day</small>
        </div>
      </div>
      <div className="dl-chat-body">
        {kaiScript.slice(0, shown).map((m, i) => (
          <div key={i} className={`dl-msg ${m.from}`}>{m.text}</div>
        ))}
        {typing && (
          <div className="dl-msg kai typing" aria-label="Kai is typing">
            <i /><i /><i />
          </div>
        )}
      </div>
      <div className="dl-chat-input">
        Ask Kai anything…
        <span><Icon name="arrow" size={16} /></span>
      </div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="dl-faq">
      {faqs.map((f, i) => (
        <div key={f.q} className={`dl-faq-item ${open === i ? "open" : ""}`}>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {f.q}
            <span className="dl-faq-ic"><Icon name="plus" size={18} /></span>
          </button>
          <div className="dl-faq-a"><p>{f.a}</p></div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */

export default function LandingPage() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const onHeroMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const marquee = useMemo(() => [...tools, ...tools], []);
  const nav = [
    ["features", "Features"],
    ["kai", "Kai AI"],
    ["savings", "Savings"],
    ["pricing", "Pricing"],
    ["faq", "FAQ"],
  ];

  return (
    <main className="dl">
      <style>{css}</style>

      {/* NAV */}
      <header className={`dl-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="dl-wrap dl-nav-in">
          <Link href="/" className="dl-brand"><Logo /> DayLyft</Link>
          <nav className="dl-links">
            {nav.map(([id, label]) => (
              <button key={id} type="button" onClick={() => go(id)}>{label}</button>
            ))}
          </nav>
          <div className="dl-nav-r">
            <a href="/login" className="dl-login">Log in</a>
            <a href="/login" className="dl-btn dl-btn-primary sm">Start free</a>
            <button type="button" className="dl-burger" onClick={() => setMenu(true)} aria-label="Open menu">
              <Icon name="menu" size={24} />
            </button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="dl-sheet" role="dialog" aria-modal="true">
          <button type="button" className="dl-sheet-x" onClick={() => setMenu(false)} aria-label="Close menu">
            <Icon name="close" size={26} />
          </button>
          {nav.map(([id, label]) => (
            <button key={id} type="button" onClick={() => go(id)}>{label}</button>
          ))}
          <a href="/login">Log in</a>
          <a href="/login" className="dl-btn dl-btn-primary">Start free</a>
        </div>
      )}

      {/* HERO */}
      <section className="dl-hero" ref={heroRef} onMouseMove={onHeroMove}>
        <div className="dl-aurora" aria-hidden>
          <span className="a1" /><span className="a2" /><span className="a3" />
        </div>
        <div className="dl-gridbg" aria-hidden />
        <div className="dl-spot" aria-hidden />

        <div className="dl-wrap dl-hero-in">
          <div className="dl-hero-copy">
            <a href="#kai" className="dl-chip" onClick={(e) => { e.preventDefault(); go("kai"); }}>
              <span className="dl-chip-new">NEW</span>
              Kai now plans your morning automatically
              <Icon name="arrow" size={14} />
            </a>

            <h1 className="dl-h1">
              Six apps.<br />
              <span className="dl-nowrap"><span className="dl-serif">One</span> <span className="dl-grad">lifted</span> day.</span>
            </h1>

            <p className="dl-lead">
              Tasks, calendar, habits, money and health — finally in one place, with <b>Kai</b>,
              an AI copilot that actually knows your day. Stop juggling. Start lifting.
            </p>

            <div className="dl-hero-cta">
              <a className="dl-btn dl-btn-primary lg" href="/login">
                Start free <Icon name="arrow" size={18} />
              </a>
              <button type="button" className="dl-btn dl-btn-ghost lg" onClick={() => go("savings")}>
                See how much you’d save
              </button>
            </div>

            <ul className="dl-trust">
              <li><Icon name="check" size={14} stroke={3} /> Free forever plan</li>
              <li><Icon name="check" size={14} stroke={3} /> No credit card</li>
              <li><Icon name="check" size={14} stroke={3} /> English & Español</li>
            </ul>
          </div>

          <HeroMockup />
        </div>

        <div className="dl-stats dl-wrap" data-reveal>
          <div><strong>40+</strong><span>tools in one app</span></div>
          <div><strong>1</strong><span>AI that sees the whole picture</span></div>
          <div><strong>$6.99</strong><span>instead of $50+ a month</span></div>
          <div><strong>2 min</strong><span>to set up your day</span></div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="dl-marquee" aria-label="Included tools">
        <div className="dl-marquee-track">
          {marquee.map((t, i) => (
            <span key={i}><Icon name="spark" size={12} /> {t}</span>
          ))}
        </div>
      </section>

      {/* FEATURES / BENTO */}
      <section className="dl-sec" id="features">
        <div className="dl-wrap">
          <div className="dl-head" data-reveal>
            <p className="dl-eyebrow">Everything, connected</p>
            <h2>Not another to-do app.<br /><span className="dl-serif">A system</span> for your whole life.</h2>
            <p>Every tool shares one brain. Your sleep shapes your plan. Your budget shapes your goals. Kai connects the dots so you don’t have to.</p>
          </div>

          <div className="dl-bento">
            <article className="dl-tile t-kai" data-reveal>
              <div className="dl-tile-ic"><Icon name="sun" /></div>
              <h3>Morning Autopilot</h3>
              <p>Wake up to a plan that’s already done — priorities, meetings, habits and the one task that moves the needle.</p>
              <div className="dl-brief">
                <div className="dl-brief-row"><span>☀️</span> 3 meetings · 1 deep-work block</div>
                <div className="dl-brief-row"><span>🎯</span> Priority: <b>Client proposal</b></div>
                <div className="dl-brief-row"><span>💧</span> Habits: water, walk, read</div>
              </div>
            </article>

            <article className="dl-tile t-energy" data-reveal>
              <div className="dl-tile-ic"><Icon name="dna" /></div>
              <h3>Smart Energy Map</h3>
              <p>See when you do your best work — and schedule around it.</p>
              <div className="dl-energy">
                {[22, 35, 72, 95, 88, 60, 34, 46, 70, 64, 40, 20].map((h, i) => (
                  <i key={i} style={{ "--h": `${h}%`, "--d": `${i * 60}ms` }} />
                ))}
              </div>
              <div className="dl-energy-l"><span>6 AM</span><span>Peak 9–11</span><span>6 PM</span></div>
            </article>

            <article className="dl-tile t-shield" data-reveal>
              <div className="dl-tile-ic"><Icon name="shield" /></div>
              <h3>Focus Shield</h3>
              <p>Deep work, defended. Auto-replies while you’re in the zone.</p>
              <div className="dl-shield-ui">
                <div className="dl-timer">47:12</div>
                <small>3 interruptions blocked</small>
              </div>
            </article>

            <article className="dl-tile t-money" data-reveal>
              <div className="dl-tile-ic"><Icon name="wallet" /></div>
              <h3>Money, handled</h3>
              <p>Budget, bills and savings goals that live next to your plans — not in another app.</p>
              <div className="dl-goal">
                <div><small>Emergency fund</small><b>72%</b></div>
                <div className="dl-bar"><span style={{ width: "72%" }} /></div>
              </div>
            </article>

            <article className="dl-tile t-zen" data-reveal>
              <div className="dl-tile-ic"><Icon name="leaf" /></div>
              <h3>Zen Mode</h3>
              <p>Ambient soundscapes and guided breathing, triggered when Kai sees you need it.</p>
              <div className="dl-breathe"><span /></div>
            </article>

            <article className="dl-tile t-journal" data-reveal>
              <div className="dl-tile-ic"><Icon name="book" /></div>
              <h3>Life Journal</h3>
              <p>Your days, auto-summarized into a Life Book you can keep forever.</p>
            </article>

            <article className="dl-tile t-night" data-reveal>
              <div className="dl-tile-ic"><Icon name="moon" /></div>
              <h3>Night Report</h3>
              <p>A 30-second recap of today and tomorrow’s priority, decided before bed.</p>
            </article>
          </div>
        </div>
      </section>

      {/* KAI */}
      <section className="dl-sec dl-kai" id="kai">
        <div className="dl-kai-glow" aria-hidden />
        <div className="dl-wrap dl-kai-in">
          <div data-reveal>
            <p className="dl-eyebrow">Meet Kai</p>
            <h2>An AI that knows<br /><span className="dl-serif">your</span> <span className="dl-grad">whole</span> day.</h2>
            <p className="dl-kai-lead">
              Chatbots know the internet. Kai knows <em>you</em> — your calendar, your habits, your energy and your money —
              and turns it into decisions you can act on in seconds.
            </p>
            <ul className="dl-kai-list">
              <li><span><Icon name="check" size={14} stroke={3} /></span> Plans your morning before you wake up</li>
              <li><span><Icon name="check" size={14} stroke={3} /></span> Spots patterns across tasks, sleep and spending</li>
              <li><span><Icon name="check" size={14} stroke={3} /></span> Suggests — never takes over. You stay in control</li>
              <li><span><Icon name="check" size={14} stroke={3} /></span> Speaks English and Spanish</li>
            </ul>
          </div>
          <div data-reveal>
            <KaiChat />
          </div>
        </div>
      </section>

      {/* A DAY */}
      <section className="dl-sec dl-day">
        <div className="dl-wrap">
          <div className="dl-head" data-reveal>
            <p className="dl-eyebrow">A day with DayLyft</p>
            <h2>From first coffee<br />to <span className="dl-serif">lights out.</span></h2>
          </div>
          <ol className="dl-timeline">
            {dayFlow.map((s, i) => (
              <li key={s.title} data-reveal style={{ "--i": i }}>
                <div className="dl-tl-time">{s.time}</div>
                <div className="dl-tl-card">
                  <em>{s.tag}</em>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SAVINGS */}
      <section className="dl-sec dl-save" id="savings">
        <div className="dl-wrap">
          <div className="dl-head" data-reveal>
            <p className="dl-eyebrow">Do the math</p>
            <h2>One app instead of six.<br /><span className="dl-grad">Real money back.</span></h2>
            <p>Most people pay for a planner, a notes app, a habit tracker and a budget app — and none of them talk to each other.</p>
          </div>
          <StackCalculator />
        </div>
      </section>

      {/* PRIVACY */}
      <section className="dl-sec dl-privacy">
        <div className="dl-wrap">
          <div className="dl-privacy-card" data-reveal>
            <div className="dl-privacy-copy">
              <span className="dl-lock"><Icon name="lock" size={26} /></span>
              <h2>Your life is private.<br />We keep it that way.</h2>
              <p>An app that knows your whole day has to earn your trust. Here’s our promise.</p>
            </div>
            <div className="dl-privacy-grid">
              {[
                ["lock", "Encrypted", "In transit and at rest, always."],
                ["eye", "Never sold", "Your data is not our product. Period."],
                ["download", "Yours to take", "Export or delete your account anytime."],
                ["globe", "Privacy-first", "Built with GDPR & CCPA principles in mind."],
              ].map(([ic, t, d]) => (
                <div key={t}>
                  <Icon name={ic} size={20} />
                  <b>{t}</b>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="dl-sec dl-pricing" id="pricing">
        <div className="dl-wrap">
          <div className="dl-head" data-reveal>
            <p className="dl-eyebrow">Pricing</p>
            <h2>Less than two coffees<br />a <span className="dl-serif">month.</span></h2>
            <p>Start free. Upgrade when Kai has earned it.</p>
          </div>

          <div className="dl-plans">
            {plans.map((p) => (
              <div key={p.name} className={`dl-plan ${p.featured ? "featured" : ""}`} data-reveal>
                {p.featured && <div className="dl-plan-badge">Most popular</div>}
                <div className="dl-plan-name">{p.name}</div>
                <div className="dl-plan-price">{p.price}<small>{p.suffix}</small></div>
                <p className="dl-plan-desc">{p.desc}</p>
                <a href={p.href} className={`dl-btn ${p.featured ? "dl-btn-primary" : "dl-btn-ghost"} full`}>
                  {p.cta}
                </a>
                <ul>
                  {p.items.map((it) => (
                    <li key={it}><Icon name="check" size={14} stroke={3} /> {it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="dl-plans-note">7-day free trial on Pro · Cancel anytime · Secure checkout by Stripe</p>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="dl-sec dl-founder">
        <div className="dl-wrap">
          <figure className="dl-founder-card" data-reveal>
            <div className="dl-quote-mark">“</div>
            <blockquote>
              I was paying for six apps and still felt behind. So I built the one I wanted: a single place for my
              tasks, money and health — with an AI that could see all of it. That’s DayLyft.
            </blockquote>
            <figcaption>
              <span className="dl-founder-av">JM</span>
              <div><b>Juan Masis</b><small>Founder · Built in Miami</small></div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FAQ */}
      <section className="dl-sec dl-faqsec" id="faq">
        <div className="dl-wrap dl-faq-in">
          <div data-reveal>
            <p className="dl-eyebrow">FAQ</p>
            <h2>Questions,<br /><span className="dl-serif">answered.</span></h2>
            <p className="dl-faq-side">Something else? <a href="/contact">Talk to us</a> — a real human replies.</p>
          </div>
          <div data-reveal><Faq /></div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="dl-final">
        <div className="dl-aurora small" aria-hidden>
          <span className="a1" /><span className="a2" />
        </div>
        <div className="dl-wrap dl-final-in" data-reveal>
          <Logo size={56} />
          <h2>Tomorrow starts<br /><span className="dl-grad">tonight.</span></h2>
          <p>Set up DayLyft in two minutes and wake up to a day that’s already planned.</p>
          <div className="dl-hero-cta center">
            <a className="dl-btn dl-btn-primary lg" href="/login">Start free <Icon name="arrow" size={18} /></a>
            <a className="dl-btn dl-btn-ghost lg" href={PRO_LINK}>Try Pro free for 7 days</a>
          </div>
          <small className="dl-final-note"><Icon name="phone" size={14} /> Works on any phone, tablet or computer</small>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="dl-foot">
        <div className="dl-wrap">
          <div className="dl-foot-grid">
            <div>
              <Link href="/" className="dl-brand"><Logo /> DayLyft</Link>
              <p>Your AI operating system for life. One app, one AI, your whole day.</p>
            </div>
            <div>
              <h4>Product</h4>
              <button type="button" onClick={() => go("features")}>Features</button>
              <button type="button" onClick={() => go("kai")}>Kai AI</button>
              <button type="button" onClick={() => go("savings")}>Savings calculator</button>
              <button type="button" onClick={() => go("pricing")}>Pricing</button>
            </div>
            <div>
              <h4>Company</h4>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/login">Log in</a>
            </div>
            <div>
              <h4>Legal</h4>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/delete-account">Delete account</a>
            </div>
          </div>
          <div className="dl-foot-bottom">
            <span>© {new Date().getFullYear()} DayLyft. All rights reserved.</span>
            <span>Made with care in Miami 🌴</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────
   STYLES (scoped under .dl)
   ───────────────────────────────────────────────────────────── */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

body { background: #030806; }
.dl {
  --bg: #030806;
  --bg-2: #07110d;
  --card: rgba(255,255,255,0.035);
  --card-2: rgba(255,255,255,0.06);
  --line: rgba(255,255,255,0.08);
  --line-2: rgba(255,255,255,0.14);
  --text: #eef5f1;
  --muted: #8da397;
  --green: #10b981;
  --green-2: #34d399;
  --green-3: #6ee7b7;
  --teal: #2dd4bf;
  --gold: #f5c66b;
  --radius: 22px;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: "Inter Tight", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.dl *, .dl *::before, .dl *::after { box-sizing: border-box; }
.dl a { color: inherit; text-decoration: none; }
.dl button { font-family: inherit; color: inherit; }
.dl h1, .dl h2, .dl h3 { margin: 0; }
.dl ::selection { background: rgba(16,185,129,0.35); }

.dl-wrap { width: min(1200px, calc(100% - 32px)); margin: 0 auto; }

.dl-serif { font-family: "Instrument Serif", Georgia, serif; font-style: italic; font-weight: 400; letter-spacing: -0.01em; }
.dl-grad {
  background: linear-gradient(100deg, var(--green-3) 0%, var(--green) 40%, var(--teal) 70%, var(--green-3) 100%);
  background-size: 220% 100%;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: dlShine 7s ease-in-out infinite;
}
@keyframes dlShine { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

.dl-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  margin: 0 0 18px; color: var(--green-2);
  font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
}
.dl-eyebrow::before { content: ""; width: 18px; height: 1px; background: currentColor; opacity: .7; }

/* Logo */
.dl-logo {
  display: inline-grid; place-items: center; flex: 0 0 auto;
  border-radius: 30%; color: #022c1c;
  background: linear-gradient(145deg, var(--green-3), var(--green) 55%, #047857);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.18) inset, 0 8px 28px rgba(16,185,129,0.45);
}

/* Buttons */
.dl-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  height: 48px; padding: 0 22px; border-radius: 14px; border: 0; cursor: pointer;
  font-size: 15px; font-weight: 700; letter-spacing: -0.01em; white-space: nowrap;
  transition: transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s, background .25s, border-color .25s;
}
.dl-btn.sm { height: 40px; padding: 0 16px; font-size: 14px; border-radius: 12px; }
.dl-btn.lg { height: 56px; padding: 0 28px; font-size: 16px; border-radius: 16px; }
.dl-btn.full { width: 100%; }
.dl-btn-primary {
  color: #02170f;
  background: linear-gradient(180deg, #5eead4 -40%, var(--green-2) 20%, var(--green) 100%);
  box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 10px 30px rgba(16,185,129,.35), 0 0 0 1px rgba(16,185,129,.5);
}
.dl-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 18px 46px rgba(16,185,129,.5), 0 0 0 1px rgba(110,231,183,.7); }
.dl-btn-primary svg { transition: transform .25s; }
.dl-btn-primary:hover svg { transform: translateX(3px); }
.dl-btn-ghost { background: rgba(255,255,255,0.04); border: 1px solid var(--line-2); color: var(--text); backdrop-filter: blur(10px); }
.dl-btn-ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(110,231,183,0.45); transform: translateY(-2px); }

/* Nav */
.dl-nav { position: fixed; inset: 0 0 auto 0; z-index: 100; transition: background .3s, border-color .3s, backdrop-filter .3s; border-bottom: 1px solid transparent; }
.dl-nav.scrolled { background: rgba(3,8,6,0.72); backdrop-filter: blur(18px) saturate(140%); -webkit-backdrop-filter: blur(18px) saturate(140%); border-bottom-color: var(--line); }
.dl-nav-in { height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.dl-brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 800; font-size: 21px; letter-spacing: -0.04em; }
.dl-links { display: flex; gap: 4px; padding: 5px; border-radius: 14px; background: rgba(255,255,255,0.035); border: 1px solid var(--line); }
.dl-links button { background: transparent; border: 0; padding: 8px 14px; border-radius: 10px; font-size: 14px; font-weight: 600; color: rgba(238,245,241,0.72); cursor: pointer; transition: color .2s, background .2s; }
.dl-links button:hover { color: #fff; background: rgba(255,255,255,0.06); }
.dl-nav-r { display: flex; align-items: center; gap: 10px; }
.dl-login { font-size: 14px; font-weight: 600; color: rgba(238,245,241,0.8); padding: 8px 10px; }
.dl-login:hover { color: #fff; }
.dl-burger { display: none; background: transparent; border: 0; cursor: pointer; padding: 6px; }

.dl-sheet { position: fixed; inset: 0; z-index: 200; background: rgba(3,8,6,0.96); backdrop-filter: blur(20px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; animation: dlFade .25s ease; }
.dl-sheet > button, .dl-sheet > a:not(.dl-btn) { background: transparent; border: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.03em; cursor: pointer; }
.dl-sheet .dl-btn { margin-top: 10px; min-width: 220px; }
.dl-sheet-x { position: absolute; top: 20px; right: 18px; }
@keyframes dlFade { from { opacity: 0; } to { opacity: 1; } }

/* Hero */
.dl-hero { position: relative; padding: 140px 0 40px; overflow: hidden; isolation: isolate; }
.dl-aurora { position: absolute; inset: -20% -10% auto -10%; height: 900px; z-index: -2; pointer-events: none; filter: blur(80px); opacity: .9; }
.dl-aurora span { position: absolute; border-radius: 50%; mix-blend-mode: screen; }
.dl-aurora .a1 { width: 620px; height: 620px; left: 8%; top: 4%; background: radial-gradient(circle, rgba(16,185,129,0.55), transparent 65%); animation: dlDrift1 18s ease-in-out infinite; }
.dl-aurora .a2 { width: 520px; height: 520px; right: 6%; top: 0%; background: radial-gradient(circle, rgba(45,212,191,0.35), transparent 65%); animation: dlDrift2 22s ease-in-out infinite; }
.dl-aurora .a3 { width: 420px; height: 420px; left: 45%; top: 38%; background: radial-gradient(circle, rgba(245,198,107,0.14), transparent 65%); animation: dlDrift1 26s ease-in-out infinite reverse; }
.dl-aurora.small { inset: 0; height: auto; }
@keyframes dlDrift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(80px, 60px) scale(1.12); } }
@keyframes dlDrift2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-90px, 80px) scale(0.92); } }
.dl-gridbg { position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 70% 55% at 50% 30%, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 70% 55% at 50% 30%, #000 30%, transparent 75%);
}
.dl-spot { position: absolute; inset: 0; z-index: -1; pointer-events: none; background: radial-gradient(500px circle at var(--mx, 50%) var(--my, 20%), rgba(52,211,153,0.10), transparent 60%); }

.dl-hero-in { display: grid; grid-template-columns: 0.92fr 1.08fr; gap: 56px; align-items: center; }
.dl-chip { display: inline-flex; align-items: center; gap: 10px; padding: 6px 14px 6px 6px; border-radius: 999px; font-size: 13px; font-weight: 600; color: rgba(238,245,241,0.85); background: rgba(255,255,255,0.05); border: 1px solid var(--line-2); transition: border-color .2s, background .2s; animation: dlUp .8s cubic-bezier(.2,.8,.2,1) both; }
.dl-chip:hover { border-color: rgba(110,231,183,0.5); background: rgba(16,185,129,0.08); }
.dl-chip-new { padding: 4px 9px; border-radius: 999px; font-size: 10px; font-weight: 800; letter-spacing: .08em; color: #02170f; background: var(--green-2); }

.dl-h1 { margin: 26px 0 28px; font-size: clamp(48px, 5.7vw, 84px); line-height: 1; letter-spacing: -0.055em; font-weight: 700; animation: dlUp .9s .08s cubic-bezier(.2,.8,.2,1) both; }
.dl-h1 .dl-serif { font-size: 1.08em; }
.dl-nowrap { white-space: nowrap; }
.dl-lead { max-width: 540px; margin: 0 0 34px; font-size: 19px; line-height: 1.6; color: rgba(238,245,241,0.72); animation: dlUp .9s .16s cubic-bezier(.2,.8,.2,1) both; }
.dl-lead b { color: #fff; font-weight: 700; }
.dl-hero-cta { display: flex; gap: 12px; flex-wrap: wrap; animation: dlUp .9s .24s cubic-bezier(.2,.8,.2,1) both; }
.dl-hero-cta.center { justify-content: center; }
.dl-trust { list-style: none; padding: 0; margin: 28px 0 0; display: flex; flex-wrap: wrap; gap: 8px 22px; color: rgba(238,245,241,0.62); font-size: 14px; font-weight: 500; animation: dlUp .9s .32s cubic-bezier(.2,.8,.2,1) both; }
.dl-trust li { display: inline-flex; align-items: center; gap: 7px; }
.dl-trust svg { color: var(--green-2); }
@keyframes dlUp { from { opacity: 0; transform: translateY(22px); filter: blur(6px); } to { opacity: 1; transform: none; filter: none; } }

/* Mockup */
.dl-mock-wrap { position: relative; perspective: 1400px; animation: dlUp 1.1s .2s cubic-bezier(.2,.8,.2,1) both; }
.dl-mock {
  --rx: 0deg; --ry: 0deg;
  position: relative; border-radius: 20px; overflow: hidden;
  background: linear-gradient(180deg, #0c1712, #070e0b);
  border: 1px solid var(--line-2);
  box-shadow: 0 0 0 1px rgba(16,185,129,0.12), 0 60px 140px -20px rgba(0,0,0,0.8), 0 30px 120px -30px rgba(16,185,129,0.45);
  transform: rotateX(calc(6deg + var(--rx))) rotateY(calc(-8deg + var(--ry)));
  transform-style: preserve-3d; transition: transform .5s cubic-bezier(.2,.8,.2,1);
}
.dl-mock::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(120deg, rgba(255,255,255,0.08), transparent 30%); }
.dl-mock-bar { height: 40px; display: grid; grid-template-columns: 80px 1fr 80px; align-items: center; padding: 0 14px; border-bottom: 1px solid var(--line); background: rgba(255,255,255,0.02); }
.dl-dots { display: flex; gap: 6px; }
.dl-dots i { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.14); }
.dl-dots i:first-child { background: #f87171; } .dl-dots i:nth-child(2) { background: #fbbf24; } .dl-dots i:nth-child(3) { background: #34d399; }
.dl-mock-url { justify-self: center; font-size: 11px; color: var(--muted); padding: 4px 14px; border-radius: 8px; background: rgba(255,255,255,0.04); }
.dl-mock-body { display: grid; grid-template-columns: 150px 1fr; min-height: 440px; }
.dl-mock-side { padding: 16px 12px; border-right: 1px solid var(--line); background: rgba(255,255,255,0.015); }
.dl-mock-brand { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 14px; margin: 2px 6px 18px; }
.dl-side-item { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 9px; font-size: 13px; font-weight: 600; color: rgba(238,245,241,0.55); margin-bottom: 2px; }
.dl-side-item span { width: 6px; height: 6px; border-radius: 2px; background: currentColor; opacity: .7; }
.dl-side-item.on { color: var(--green-3); background: rgba(16,185,129,0.12); box-shadow: inset 0 0 0 1px rgba(16,185,129,0.2); }
.dl-mock-main { padding: 20px; }
.dl-mock-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 16px; }
.dl-mock-head small { color: var(--muted); font-size: 12px; }
.dl-mock-head h3 { font-size: 22px; letter-spacing: -0.04em; font-weight: 700; margin-top: 2px; }
.dl-pill-kai { display: inline-flex; align-items: center; gap: 6px; padding: 7px 11px; border-radius: 999px; font-size: 11px; font-weight: 700; color: var(--green-3); background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); white-space: nowrap; }
.dl-pill-kai svg { animation: dlSpin 6s linear infinite; }
@keyframes dlSpin { to { transform: rotate(360deg); } }
.dl-mock-grid { display: grid; grid-template-columns: 1.35fr 0.65fr; grid-template-rows: auto auto; gap: 12px; }
.dl-card { border-radius: 14px; padding: 14px; background: var(--card); border: 1px solid var(--line); }
.dl-card-title { display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: rgba(238,245,241,0.85); margin-bottom: 10px; }
.dl-card-title b { color: var(--green-2); }
.dl-card-plan { grid-row: span 2; }
.dl-task { display: grid; grid-template-columns: 16px 1fr auto auto; align-items: center; gap: 9px; padding: 8px 0; border-bottom: 1px solid var(--line); font-size: 12.5px; }
.dl-task:last-child { border-bottom: 0; }
.dl-box { width: 16px; height: 16px; border-radius: 5px; display: grid; place-items: center; border: 1.5px solid rgba(255,255,255,0.25); color: #02170f; }
.dl-task.done .dl-box { background: var(--green); border-color: var(--green); }
.dl-task.done .dl-task-t { color: rgba(238,245,241,0.45); text-decoration: line-through; text-decoration-color: rgba(238,245,241,0.3); }
.dl-task-t { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dl-task-h { color: var(--muted); font-size: 11px; font-variant-numeric: tabular-nums; }
.dl-tag { font-style: normal; font-size: 9px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; padding: 3px 6px; border-radius: 5px; }
.dl-tag.focus { color: var(--green-3); background: rgba(16,185,129,0.14); }
.dl-tag.zen { color: var(--gold); background: rgba(245,198,107,0.12); }
.dl-card-ring { text-align: center; }
.dl-ring { width: 86px; height: 86px; margin: 2px auto 8px; border-radius: 50%; display: grid; place-items: center;
  background: radial-gradient(closest-side, #0b1511 76%, transparent 78% 100%), conic-gradient(var(--green-2) 0 78%, rgba(255,255,255,0.08) 0);
  animation: dlRing 1.6s .6s cubic-bezier(.2,.8,.2,1) both; }
.dl-ring span { font-size: 15px; font-weight: 800; letter-spacing: -0.03em; }
.dl-card-ring small { color: var(--green-2); font-size: 11px; font-weight: 700; }
@keyframes dlRing { from { transform: rotate(-90deg) scale(.85); opacity: 0; } to { transform: none; opacity: 1; } }
.dl-heat { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.dl-heat i { aspect-ratio: 1; border-radius: 3px; background: rgba(255,255,255,0.06); }
.dl-heat i.h1 { background: rgba(16,185,129,0.25); } .dl-heat i.h2 { background: rgba(16,185,129,0.55); } .dl-heat i.h3 { background: var(--green-2); }
.dl-card-habits { grid-column: 2; }
.dl-card-money { grid-column: 1 / -1; }
.dl-money { font-size: 20px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 8px; }
.dl-money small { font-size: 12px; color: var(--muted); font-weight: 600; }
.dl-bar { height: 7px; border-radius: 99px; background: rgba(255,255,255,0.08); overflow: hidden; }
.dl-bar span { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--green), var(--teal)); }

.dl-float { position: absolute; display: flex; align-items: center; gap: 11px; padding: 11px 15px 11px 11px; border-radius: 16px;
  background: rgba(12,22,18,0.78); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--line-2); box-shadow: 0 20px 50px rgba(0,0,0,0.5); font-size: 13px; }
.dl-float b { display: block; font-weight: 700; } .dl-float small { color: var(--muted); font-size: 12px; }
.dl-float-ic { width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; color: var(--green-3); background: rgba(16,185,129,0.15); }
.dl-float-ic.gold { color: var(--gold); background: rgba(245,198,107,0.14); }
.dl-float-a { left: -34px; bottom: 70px; animation: dlBob 6s ease-in-out infinite; }
.dl-float-b { right: -18px; top: -22px; animation: dlBob 7s 1s ease-in-out infinite; }
@keyframes dlBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

.dl-stats { margin-top: 84px; display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); border-radius: var(--radius); background: rgba(255,255,255,0.02); backdrop-filter: blur(8px); }
.dl-stats > div { padding: 26px 24px; border-right: 1px solid var(--line); }
.dl-stats > div:last-child { border-right: 0; }
.dl-stats strong { display: block; font-size: 34px; font-weight: 700; letter-spacing: -0.05em; }
.dl-stats span { color: var(--muted); font-size: 14px; }

/* Marquee */
.dl-marquee { position: relative; padding: 26px 0; border-block: 1px solid var(--line); overflow: hidden; background: var(--bg-2);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
.dl-marquee-track { display: flex; gap: 40px; width: max-content; animation: dlMarquee 60s linear infinite; }
.dl-marquee span { display: inline-flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 600; color: rgba(238,245,241,0.5); white-space: nowrap; letter-spacing: -0.02em; }
.dl-marquee span svg { color: var(--green); }
@keyframes dlMarquee { to { transform: translateX(-50%); } }

/* Sections */
.dl-sec { position: relative; padding: 130px 0; }
.dl-head { max-width: 760px; margin: 0 auto 64px; text-align: center; }
.dl-head h2, .dl-kai h2, .dl-faq-in h2 { font-size: clamp(38px, 5vw, 66px); line-height: 1; letter-spacing: -0.05em; font-weight: 700; margin-bottom: 20px; }
.dl-head p:not(.dl-eyebrow) { margin: 0 auto; max-width: 600px; color: var(--muted); font-size: 18px; line-height: 1.6; }

[data-reveal] { opacity: 0; transform: translateY(28px); transition: opacity .9s cubic-bezier(.2,.8,.2,1), transform .9s cubic-bezier(.2,.8,.2,1); transition-delay: calc(var(--i, 0) * 90ms); }
[data-reveal].is-in { opacity: 1; transform: none; }

/* Bento */
.dl-bento { display: grid; grid-template-columns: repeat(6, 1fr); grid-auto-rows: minmax(200px, auto); gap: 16px; }
.dl-tile { position: relative; overflow: hidden; padding: 28px; border-radius: var(--radius); background: linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015)); border: 1px solid var(--line); transition: border-color .3s, transform .4s cubic-bezier(.2,.8,.2,1); }
.dl-tile::before { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; background: radial-gradient(400px circle at 0% 0%, rgba(16,185,129,0.12), transparent 50%); opacity: .8; }
.dl-tile:hover { border-color: rgba(110,231,183,0.3); transform: translateY(-4px); }
.dl-tile h3 { position: relative; font-size: 22px; letter-spacing: -0.035em; font-weight: 700; margin-bottom: 8px; }
.dl-tile p { position: relative; margin: 0; color: var(--muted); font-size: 15px; line-height: 1.55; max-width: 420px; }
.dl-tile-ic { position: relative; width: 44px; height: 44px; border-radius: 13px; display: grid; place-items: center; margin-bottom: 22px; color: var(--green-3); background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25); }
.t-kai { grid-column: span 4; grid-row: span 2; }
.t-energy { grid-column: span 2; grid-row: span 2; }
.t-shield, .t-money, .t-zen { grid-column: span 2; }
.t-journal, .t-night { grid-column: span 3; }
.t-kai { background: radial-gradient(120% 120% at 100% 100%, rgba(16,185,129,0.22), transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015)); }
.dl-brief { position: relative; margin-top: 30px; display: grid; gap: 10px; max-width: 460px; }
.dl-brief-row { display: flex; gap: 12px; align-items: center; padding: 14px 16px; border-radius: 14px; font-size: 15px; background: rgba(3,8,6,0.55); border: 1px solid var(--line); color: rgba(238,245,241,0.85); }
.dl-brief-row b { color: var(--green-3); }
.dl-tile.is-in .dl-brief-row { animation: dlUp .7s both; } .dl-tile.is-in .dl-brief-row:nth-child(2) { animation-delay: .15s; } .dl-tile.is-in .dl-brief-row:nth-child(3) { animation-delay: .3s; }
.dl-energy { position: relative; margin-top: 34px; height: 150px; display: flex; align-items: flex-end; gap: 6px; }
.dl-energy i { flex: 1; height: 0; border-radius: 6px 6px 3px 3px; background: linear-gradient(180deg, var(--green-3), rgba(16,185,129,0.25)); transition: height 1.1s cubic-bezier(.2,.8,.2,1); transition-delay: var(--d); }
.dl-tile.is-in .dl-energy i { height: var(--h); }
.dl-energy-l { position: relative; display: flex; justify-content: space-between; margin-top: 10px; font-size: 11px; color: var(--muted); }
.dl-energy-l span:nth-child(2) { color: var(--green-2); font-weight: 700; }
.dl-shield-ui { position: relative; margin-top: 18px; display: flex; align-items: baseline; gap: 12px; }
.dl-timer { font-size: 40px; font-weight: 700; letter-spacing: -0.05em; font-variant-numeric: tabular-nums; }
.dl-shield-ui small { color: var(--green-2); font-weight: 600; }
.dl-goal { position: relative; margin-top: 18px; }
.dl-goal > div:first-child { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: var(--muted); }
.dl-goal b { color: var(--text); }
.dl-breathe { position: relative; height: 70px; display: grid; place-items: center; margin-top: 10px; }
.dl-breathe span { width: 46px; height: 46px; border-radius: 50%; background: radial-gradient(circle, rgba(110,231,183,0.7), rgba(16,185,129,0.1) 70%); box-shadow: 0 0 40px rgba(16,185,129,0.5); animation: dlBreathe 6s ease-in-out infinite; }
@keyframes dlBreathe { 0%,100% { transform: scale(.7); opacity: .6; } 50% { transform: scale(1.35); opacity: 1; } }

/* Kai */
.dl-kai { background: linear-gradient(180deg, var(--bg), var(--bg-2) 50%, var(--bg)); overflow: hidden; }
.dl-kai-glow { position: absolute; width: 900px; height: 900px; right: -250px; top: 50%; transform: translateY(-50%); border-radius: 50%; background: radial-gradient(circle, rgba(16,185,129,0.18), transparent 60%); pointer-events: none; }
.dl-kai-in { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 70px; align-items: center; }
.dl-kai-lead { color: var(--muted); font-size: 18px; line-height: 1.65; margin: 0 0 30px; max-width: 520px; }
.dl-kai-lead em { color: #fff; font-style: italic; font-family: "Instrument Serif", serif; font-size: 1.15em; }
.dl-kai-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
.dl-kai-list li { display: flex; align-items: center; gap: 12px; font-size: 16px; font-weight: 500; color: rgba(238,245,241,0.88); }
.dl-kai-list li span { width: 24px; height: 24px; flex: 0 0 auto; border-radius: 8px; display: grid; place-items: center; color: #02170f; background: var(--green-2); }
.dl-chat { border-radius: 26px; overflow: hidden; background: linear-gradient(180deg, rgba(14,26,21,0.92), rgba(6,12,9,0.95)); border: 1px solid var(--line-2); box-shadow: 0 40px 120px -30px rgba(16,185,129,0.45), 0 30px 80px rgba(0,0,0,0.55); }
.dl-chat-head { display: flex; align-items: center; gap: 12px; padding: 18px 20px; border-bottom: 1px solid var(--line); }
.dl-chat-head b { display: block; font-size: 15px; }
.dl-chat-head small { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); font-size: 12px; }
.dl-live { width: 7px; height: 7px; border-radius: 50%; background: var(--green-2); box-shadow: 0 0 0 0 rgba(52,211,153,.6); animation: dlPing 2s infinite; }
@keyframes dlPing { 0% { box-shadow: 0 0 0 0 rgba(52,211,153,.6); } 100% { box-shadow: 0 0 0 10px rgba(52,211,153,0); } }
.dl-kai-av { width: 40px; height: 40px; border-radius: 13px; display: grid; place-items: center; color: #02170f; background: linear-gradient(145deg, var(--green-3), var(--green)); box-shadow: 0 0 24px rgba(16,185,129,0.5); }
.dl-chat-body { min-height: 400px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
.dl-msg { max-width: 86%; padding: 13px 16px; border-radius: 18px; font-size: 14.5px; line-height: 1.5; animation: dlMsg .45s cubic-bezier(.2,.8,.2,1) both; }
.dl-msg.kai { align-self: flex-start; background: rgba(255,255,255,0.06); border: 1px solid var(--line); border-bottom-left-radius: 6px; color: rgba(238,245,241,0.92); }
.dl-msg.you { align-self: flex-end; background: linear-gradient(180deg, var(--green-2), var(--green)); color: #02170f; font-weight: 600; border-bottom-right-radius: 6px; }
.dl-msg.typing { display: flex; gap: 5px; padding: 16px 18px; }
.dl-msg.typing i { width: 7px; height: 7px; border-radius: 50%; background: var(--green-3); animation: dlDot 1s infinite; }
.dl-msg.typing i:nth-child(2) { animation-delay: .15s; } .dl-msg.typing i:nth-child(3) { animation-delay: .3s; }
@keyframes dlDot { 0%,80%,100% { opacity: .25; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-4px); } }
@keyframes dlMsg { from { opacity: 0; transform: translateY(10px) scale(.97); } to { opacity: 1; transform: none; } }
.dl-chat-input { margin: 0 16px 16px; height: 50px; padding: 0 8px 0 18px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between; color: var(--muted); font-size: 14px; background: rgba(0,0,0,0.3); border: 1px solid var(--line-2); }
.dl-chat-input span { width: 36px; height: 36px; border-radius: 11px; display: grid; place-items: center; color: #02170f; background: var(--green-2); }

/* Timeline */
.dl-timeline { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; position: relative; }
.dl-timeline::before { content: ""; position: absolute; top: 22px; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(52,211,153,0.5), rgba(245,198,107,0.4), transparent); }
.dl-tl-time { position: relative; display: inline-flex; align-items: center; gap: 10px; height: 44px; padding: 0 16px; margin-bottom: 18px; border-radius: 999px; font-weight: 700; font-variant-numeric: tabular-nums; background: var(--bg); border: 1px solid rgba(52,211,153,0.35); color: var(--green-3); }
.dl-tl-time::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--green-2); box-shadow: 0 0 12px var(--green-2); }
.dl-tl-card { padding: 24px; border-radius: var(--radius); background: var(--card); border: 1px solid var(--line); height: calc(100% - 62px); }
.dl-tl-card em { font-style: normal; font-size: 10px; font-weight: 800; letter-spacing: .14em; color: var(--muted); }
.dl-tl-card h3 { font-size: 20px; letter-spacing: -0.03em; margin: 8px 0 8px; }
.dl-tl-card p { margin: 0; color: var(--muted); font-size: 14.5px; line-height: 1.55; }

/* Calculator */
.dl-save { background: radial-gradient(60% 50% at 50% 0%, rgba(16,185,129,0.12), transparent 70%); }
.dl-calc { display: grid; grid-template-columns: 1.15fr 0.85fr; border-radius: 28px; overflow: hidden; border: 1px solid var(--line-2); background: rgba(255,255,255,0.025); box-shadow: 0 40px 120px rgba(0,0,0,0.4); }
.dl-calc-left { padding: 40px; }
.dl-calc-left h3 { font-size: 28px; letter-spacing: -0.04em; margin-bottom: 8px; }
.dl-calc-help { margin: 0 0 24px; color: var(--muted); font-size: 14px; }
.dl-calc-list { display: grid; gap: 8px; }
.dl-calc-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 6px 8px 6px 6px; border-radius: 14px; border: 1px solid var(--line); background: rgba(0,0,0,0.15); transition: border-color .2s, background .2s; }
.dl-calc-row.on { border-color: rgba(16,185,129,0.35); background: rgba(16,185,129,0.07); }
.dl-switch { flex: 1; display: flex; align-items: center; gap: 12px; padding: 8px; border: 0; background: transparent; cursor: pointer; font-size: 15px; font-weight: 600; text-align: left; }
.dl-check { width: 22px; height: 22px; flex: 0 0 auto; border-radius: 7px; display: grid; place-items: center; border: 1.5px solid rgba(255,255,255,0.25); color: #02170f; transition: background .2s, border-color .2s; }
.dl-calc-row.on .dl-check { background: var(--green-2); border-color: var(--green-2); }
.dl-calc-row:not(.on) .dl-switch { color: rgba(238,245,241,0.55); }
.dl-price-in { display: inline-flex; align-items: center; gap: 2px; padding: 0 10px; height: 38px; border-radius: 10px; background: rgba(0,0,0,0.3); border: 1px solid var(--line); color: var(--muted); font-size: 14px; }
.dl-price-in input { width: 42px; border: 0; outline: 0; background: transparent; color: var(--text); font: inherit; font-weight: 700; text-align: right; font-variant-numeric: tabular-nums; }
.dl-price-in small { font-size: 11px; }
.dl-price-in:focus-within { border-color: var(--green-2); }
.dl-calc-right { padding: 40px; display: flex; flex-direction: column; justify-content: space-between; gap: 28px; background: radial-gradient(100% 80% at 50% 0%, rgba(16,185,129,0.22), transparent 70%), #06100c; border-left: 1px solid var(--line); }
.dl-calc-compare { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px; }
.dl-calc-compare small { display: block; color: var(--muted); font-size: 12px; margin-bottom: 4px; }
.dl-calc-compare strong { font-size: 28px; letter-spacing: -0.04em; }
.dl-calc-compare strong em { font-style: normal; font-size: 13px; color: var(--muted); font-weight: 600; }
.dl-calc-compare .strike { color: rgba(238,245,241,0.5); text-decoration: line-through; text-decoration-color: #f87171; text-decoration-thickness: 2px; }
.dl-calc-vs { font-family: "Instrument Serif", serif; font-style: italic; color: var(--muted); font-size: 20px; }
.dl-calc-result small { color: var(--green-2); font-size: 13px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.dl-calc-big { font-size: clamp(64px, 8vw, 96px); font-weight: 700; letter-spacing: -0.06em; line-height: 1; margin: 8px 0 14px; font-variant-numeric: tabular-nums;
  background: linear-gradient(180deg, #fff, var(--green-3)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.dl-calc-result p { margin: 0; color: rgba(238,245,241,0.7); font-size: 15px; line-height: 1.55; }

/* Privacy */
.dl-privacy { padding-top: 40px; }
.dl-privacy-card { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 40px; align-items: center; padding: 48px; border-radius: 28px; border: 1px solid var(--line); background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)); }
.dl-lock { width: 56px; height: 56px; border-radius: 18px; display: grid; place-items: center; margin-bottom: 22px; color: var(--green-3); background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); }
.dl-privacy-copy h2 { font-size: clamp(30px, 3.6vw, 44px); line-height: 1.05; letter-spacing: -0.045em; margin-bottom: 14px; }
.dl-privacy-copy p { margin: 0; color: var(--muted); font-size: 16px; line-height: 1.6; }
.dl-privacy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.dl-privacy-grid > div { padding: 20px; border-radius: 16px; background: rgba(0,0,0,0.2); border: 1px solid var(--line); display: grid; gap: 6px; }
.dl-privacy-grid svg { color: var(--green-2); margin-bottom: 6px; }
.dl-privacy-grid b { font-size: 16px; }
.dl-privacy-grid span { color: var(--muted); font-size: 14px; line-height: 1.5; }

/* Pricing */
.dl-plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: stretch; }
.dl-plan { position: relative; padding: 32px; border-radius: 26px; border: 1px solid var(--line); background: var(--card); display: flex; flex-direction: column; }
.dl-plan.featured { border-color: rgba(52,211,153,0.55); background: radial-gradient(120% 70% at 50% 0%, rgba(16,185,129,0.22), transparent 60%), #08130e; box-shadow: 0 30px 100px -20px rgba(16,185,129,0.45); transform: translateY(-10px); }
.dl-plan.featured.is-in { transform: translateY(-10px); }
.dl-plan-badge { position: absolute; top: -13px; left: 32px; padding: 6px 12px; border-radius: 999px; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #02170f; background: linear-gradient(90deg, var(--green-3), var(--green-2)); }
.dl-plan-name { font-size: 15px; font-weight: 700; color: var(--green-3); margin-bottom: 16px; }
.dl-plan-price { font-size: 54px; font-weight: 700; letter-spacing: -0.06em; line-height: 1; margin-bottom: 12px; }
.dl-plan-price small { font-size: 15px; letter-spacing: 0; color: var(--muted); font-weight: 500; margin-left: 6px; }
.dl-plan-desc { margin: 0 0 24px; color: var(--muted); font-size: 15px; line-height: 1.5; min-height: 45px; }
.dl-plan ul { list-style: none; padding: 0; margin: 26px 0 0; display: grid; gap: 12px; border-top: 1px solid var(--line); padding-top: 24px; }
.dl-plan li { display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: rgba(238,245,241,0.85); }
.dl-plan li svg { color: var(--green-2); flex: 0 0 auto; }
.dl-plans-note { margin: 34px 0 0; text-align: center; color: var(--muted); font-size: 14px; }

/* Founder */
.dl-founder { padding-top: 40px; padding-bottom: 60px; }
.dl-founder-card { position: relative; max-width: 880px; margin: 0 auto; text-align: center; }
.dl-quote-mark { font-family: "Instrument Serif", serif; font-size: 120px; line-height: .6; color: var(--green); opacity: .7; }
.dl-founder-card blockquote { margin: 10px 0 30px; font-family: "Instrument Serif", serif; font-size: clamp(26px, 3.4vw, 40px); line-height: 1.25; letter-spacing: -0.01em; color: rgba(238,245,241,0.92); }
.dl-founder-card figcaption { display: inline-flex; align-items: center; gap: 12px; text-align: left; }
.dl-founder-av { width: 46px; height: 46px; border-radius: 50%; display: grid; place-items: center; font-weight: 800; color: #02170f; background: linear-gradient(145deg, var(--green-3), var(--green)); }
.dl-founder-card b { display: block; } .dl-founder-card small { color: var(--muted); }

/* FAQ */
.dl-faq-in { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; align-items: start; }
.dl-faq-side { color: var(--muted); font-size: 16px; }
.dl-faq-side a { color: var(--green-2); font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
.dl-faq { display: grid; gap: 10px; }
.dl-faq-item { border-radius: 18px; border: 1px solid var(--line); background: var(--card); transition: border-color .25s, background .25s; }
.dl-faq-item.open { border-color: rgba(52,211,153,0.35); background: rgba(16,185,129,0.05); }
.dl-faq-item > button { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 22px 24px; border: 0; background: transparent; cursor: pointer; font-size: 17px; font-weight: 600; text-align: left; letter-spacing: -0.01em; }
.dl-faq-ic { flex: 0 0 auto; width: 32px; height: 32px; border-radius: 10px; display: grid; place-items: center; background: rgba(255,255,255,0.05); transition: transform .3s, background .3s, color .3s; }
.dl-faq-item.open .dl-faq-ic { transform: rotate(45deg); background: var(--green-2); color: #02170f; }
.dl-faq-a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s cubic-bezier(.2,.8,.2,1); }
.dl-faq-item.open .dl-faq-a { grid-template-rows: 1fr; }
.dl-faq-a p { overflow: hidden; margin: 0; padding: 0 24px; color: var(--muted); font-size: 15.5px; line-height: 1.65; }
.dl-faq-item.open .dl-faq-a p { padding-bottom: 22px; }

/* Final */
.dl-final { position: relative; overflow: hidden; isolation: isolate; padding: 140px 0; text-align: center; border-top: 1px solid var(--line); }
.dl-final .dl-aurora { z-index: -1; opacity: .7; }
.dl-final-in { display: flex; flex-direction: column; align-items: center; }
.dl-final h2 { margin: 30px 0 18px; font-size: clamp(46px, 7vw, 96px); line-height: .95; letter-spacing: -0.06em; font-weight: 700; }
.dl-final p { margin: 0 0 34px; max-width: 520px; color: rgba(238,245,241,0.72); font-size: 18px; line-height: 1.6; }
.dl-final-note { display: inline-flex; align-items: center; gap: 8px; margin-top: 24px; color: var(--muted); font-size: 13px; }

/* Footer */
.dl-foot { padding: 70px 0 30px; border-top: 1px solid var(--line); background: #020504; }
.dl-foot-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 50px; }
.dl-foot p { margin: 16px 0 0; max-width: 300px; color: var(--muted); font-size: 14px; line-height: 1.6; }
.dl-foot h4 { margin: 0 0 16px; font-size: 13px; font-weight: 700; color: #fff; }
.dl-foot-grid a:not(.dl-brand), .dl-foot-grid button { display: block; padding: 0; margin: 0 0 11px; border: 0; background: transparent; cursor: pointer; color: var(--muted); font-size: 14px; text-align: left; transition: color .2s; }
.dl-foot-grid a:not(.dl-brand):hover, .dl-foot-grid button:hover { color: var(--green-3); }
.dl-foot-bottom { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding-top: 24px; border-top: 1px solid var(--line); color: rgba(141,163,151,0.8); font-size: 13px; }

/* Focus visibility */
.dl a:focus-visible, .dl button:focus-visible, .dl input:focus-visible { outline: 2px solid var(--green-2); outline-offset: 3px; border-radius: 10px; }

/* Responsive */
@media (max-width: 1100px) {
  .dl-hero-in { grid-template-columns: 1fr; gap: 70px; }
  .dl-hero-copy { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .dl-lead { margin-left: auto; margin-right: auto; }
  .dl-hero-cta, .dl-trust { justify-content: center; }
  .dl-mock-wrap { max-width: 760px; margin: 0 auto; width: 100%; }
  .dl-kai-in, .dl-faq-in, .dl-privacy-card { grid-template-columns: 1fr; gap: 44px; }
  .dl-calc { grid-template-columns: 1fr; }
  .dl-calc-right { border-left: 0; border-top: 1px solid var(--line); }
  .dl-timeline { grid-template-columns: repeat(2, 1fr); row-gap: 28px; }
  .dl-timeline::before { display: none; }
  .dl-bento { grid-template-columns: repeat(2, 1fr); }
  .t-kai { grid-column: span 2; grid-row: auto; }
  .t-energy, .t-shield, .t-money, .t-zen, .t-journal, .t-night { grid-column: span 1; grid-row: auto; }
  .t-zen { grid-column: span 2; }
  .dl-plans { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
  .dl-plan.featured, .dl-plan.featured.is-in { transform: none; }
  .dl-foot-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 860px) {
  .dl-links, .dl-login { display: none; }
  .dl-burger { display: block; }
}
@media (max-width: 640px) {
  .dl-hero { padding-top: 112px; }
  .dl-h1 { font-size: 50px; }
  .dl-lead { font-size: 17px; }
  .dl-hero-cta { flex-direction: column; width: 100%; }
  .dl-hero-cta .dl-btn { width: 100%; }
  .dl-nav-r .dl-btn { display: none; }
  .dl-mock { transform: none; }
  .dl-mock-body { grid-template-columns: 1fr; min-height: 0; }
  .dl-mock-side { display: none; }
  .dl-mock-main { padding: 14px; }
  .dl-mock-head h3 { font-size: 18px; }
  .dl-pill-kai { display: none; }
  .dl-mock-grid { grid-template-columns: 1fr 1fr; }
  .dl-card-plan { grid-column: 1 / -1; grid-row: auto; }
  .dl-card-habits { grid-column: auto; }
  .dl-float-a { left: 8px; bottom: -26px; }
  .dl-float-b { right: 8px; top: -48px; }
  .dl-stats { grid-template-columns: 1fr 1fr; margin-top: 72px; }
  .dl-stats > div:nth-child(2) { border-right: 0; }
  .dl-stats > div:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
  .dl-stats > div { padding: 20px 16px; }
  .dl-stats strong { font-size: 28px; }
  .dl-stats span { font-size: 13px; }
  .dl-sec { padding: 90px 0; }
  .dl-head { margin-bottom: 44px; }
  .dl-head p:not(.dl-eyebrow) { font-size: 16px; }
  .dl-bento { grid-template-columns: 1fr; }
  .t-kai, .t-energy, .t-shield, .t-money, .t-zen, .t-journal, .t-night { grid-column: auto; }
  .dl-tile { padding: 24px; }
  .dl-timeline { grid-template-columns: 1fr; }
  .dl-tl-card { height: auto; }
  .dl-calc-left, .dl-calc-right { padding: 24px 18px; }
  .dl-calc-compare strong { font-size: 22px; }
  .dl-switch { font-size: 14px; }
  .dl-privacy-card { padding: 28px 20px; }
  .dl-privacy-grid { grid-template-columns: 1fr; }
  .dl-chat-body { min-height: 380px; padding: 16px; }
  .dl-faq-item > button { padding: 18px; font-size: 16px; }
  .dl-faq-a p { padding: 0 18px; }
  .dl-final { padding: 100px 0; }
  .dl-foot-grid { grid-template-columns: 1fr; gap: 28px; }
}

@media (prefers-reduced-motion: reduce) {
  .dl *, .dl *::before, .dl *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
  [data-reveal] { opacity: 1; transform: none; }
  .dl-marquee-track { animation: none; }
}
`;
