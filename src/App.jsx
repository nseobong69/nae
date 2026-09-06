import { useState, useEffect, useRef } from "react";

const CYAN   = "#00D9FF";
const AMBER  = "#F59E0B";
const CHAR   = "#0F1117";
const CARD   = "#161B22";
const BORDER = "#21262D";
const MUTED  = "#8B949E";
const WHITE  = "#F0F6FF";
const GREEN  = "#16A34A";
const VIOLET = "#7C3AED";

const roles = [
  "Full Stack Developer",
  "Programme & Grant Writer",
  "Ops & Systems Builder",
  "Curriculum Designer",
];

// ── ROLE FILTER CONFIG ──────────────────────────────────────────────────────
const roleFilters = [
  { key: "all",     label: "Everything" },
  { key: "dev",      label: "Dev & Systems" },
  { key: "grants",   label: "Grants & Proposals" },
  { key: "curriculum", label: "Programme & Curriculum Design" },
];

const projects = [
  {
    name: "VIS Portal",
    tag: "LIVE · 948 STUDENTS",
    tagColor: "16A34A",
    desc: "Full multi-tenant school management platform, architected and built solo — admissions, results, CBT testing, ID cards, TOTP 2FA, fee tracking, staff payroll, and an offline-capable PWA. Now running two separate school brands on the same codebase.",
    stack: ["React", "Supabase", "PostgreSQL", "Edge Functions", "PWA", "Multi-tenant"],
    highlight: true,
  },
  {
    name: "Emanicel Stores POS",
    tag: "LIVE · 283 PRODUCTS TRACKED",
    tagColor: "16A34A",
    desc: "Point-of-sale and inventory platform in active commercial use — 53,987 stock units tracked, low-stock alerting, retail/wholesale pricing modes, Paystack payments, accounting, staff and debt management.",
    stack: ["React", "Supabase", "PostgreSQL", "Paystack", "RBAC"],
    highlight: false,
  },
  {
    name: "Career Bridge",
    tag: "LIVE · 23,798 JOBS INDEXED",
    tagColor: VIOLET.replace("#",""),
    desc: "AI-powered career platform: resume-to-job match scoring, AI resume tailoring, job discovery, an application tracker (Applied → Interview → Offer), interview prep with STAR guidance, and a CV bank — plus an admin dashboard tracking usage and revenue.",
    stack: ["React", "Claude API", "AI Matching", "Admin Dashboard"],
    highlight: true,
  },
  {
    name: "TFunds Bot",
    tag: "DEPLOYED · LIVE",
    tagColor: VIOLET.replace("#",""),
    desc: "Multi-exchange crypto trading bot with HMAC-SHA256 signed API calls to Bybit, OKX, KuCoin, and Coinbase. Eight-indicator confluence engine, demo mode for zero-risk testing, and 100% local key signing — nothing is ever transmitted or stored.",
    stack: ["React", "HMAC-SHA256", "8-Indicator Engine", "Security-First"],
    highlight: false,
  },
  {
    name: "Football Prediction Bot",
    tag: "AGENTIC AI",
    tagColor: CYAN.replace("#",""),
    desc: "Two-phase agentic pipeline — Phase 1 discovers live fixtures via web search; Phase 2 runs per-fixture analysis through Claude API with injected real-time context. Results stream progressively to the UI.",
    stack: ["React", "Claude API", "Agentic Pipeline"],
    highlight: false,
  },
  {
    name: "NairaPulse",
    tag: "DEPLOYED",
    tagColor: "16A34A",
    desc: "Fintech concept app with Paystack payment integration, scaffolded and deployed with a production-ready payment flow.",
    stack: ["Paystack", "Vercel", "Fintech"],
    highlight: false,
  },
];

// ── GRANTS, PROPOSALS & PROGRAMME DESIGN ────────────────────────────────────
const writingWorks = [
  {
    name: "Future Entrepreneurs Accelerator Programme",
    tag: "GOV'T PARTNERSHIP PROPOSAL",
    tagColor: AMBER.replace("#",""),
    desc: "A full strategic partnership proposal to the Edo State Ministry of Youth Affairs, aligned to the Governor's SHINE Agenda — pilot design for 100 youth entrepreneurs, with methodology, M&E framework, sustainability strategy, and a fully itemised financial and logistics annex.",
    stack: ["Government Partnership", "M&E Framework", "Budget Annex"],
    highlight: true,
  },
  {
    name: "Shell Nigeria CSR Scholarship Proposal",
    tag: "₦5,000,000 FUNDING ASK",
    tagColor: GREEN,
    desc: "CSR sponsorship letter and school profile for Victorious International Schools, requesting a ₦5,000,000 scholarship fund to protect 1,000+ students and expand aid to 50 more — with a transparent, quarterly-reported accountability model built on the school's own VIS Portal system.",
    stack: ["CSR Fundraising", "Accountability Framework", "School Profile"],
    highlight: true,
  },
  {
    name: "Communication for Business Growth & Development Masterclass",
    tag: "EXECUTIVE CURRICULUM · 6 MODULES",
    tagColor: CYAN.replace("#",""),
    desc: "A full executive-retreat curriculum on leadership and stakeholder communication — session flows, spotlight case stories, facilitator toolkits, and a stakeholder-mapping framework, built for CEOs and senior leadership teams.",
    stack: ["Curriculum Design", "Facilitator Guide", "Executive Training"],
    highlight: false,
  },
  {
    name: "Retire to Productivity™",
    tag: "CURRICULUM · 10 MODULES",
    tagColor: CYAN.replace("#",""),
    desc: "A pre-retirement transition programme built around a 'Five Capitals' framework (Relevance, Productive Capability, Trust Equity, Access & Influence, Freedom Fuel) — reframing retirement as a designed transition rather than an ending to survive.",
    stack: ["Programme Design", "Career Transition", "Framework Development"],
    highlight: false,
  },
  {
    name: "Teens Business Academy Masterclass",
    tag: "CURRICULUM · AGES 12–19",
    tagColor: AMBER.replace("#",""),
    desc: "A practical entrepreneurship and leadership curriculum for teenagers, delivered through Center-ECD's Teens Business Academy — mindset-building, real Naija-context exercises, and a change-maker spotlight model.",
    stack: ["Youth Entrepreneurship", "Curriculum Design", "Facilitation"],
    highlight: false,
  },
  {
    name: "Public Speaking Masterclass",
    tag: "CURRICULUM · 6 MODULES",
    tagColor: AMBER.replace("#",""),
    desc: "A full public speaking and communication curriculum, from origins of oratory through delivery, persuasion, and graduation — complete with certificates, evaluation forms, and a facilitator preparation checklist.",
    stack: ["Curriculum Design", "Facilitator Toolkit", "Communication Training"],
    highlight: false,
  },
];

const skills = [
  { label: "AI / LLM", items: ["Claude API", "AI Matching", "Agentic Pipelines", "Web Search Tool"], hot: true },
  { label: "Programme Design", items: ["Curriculum Development", "M&E Frameworks", "Facilitator Toolkits", "Grant Proposals", "CSR Fundraising"], hot: true },
  { label: "Frontend", items: ["React", "JavaScript ES6+", "HTML5", "CSS3", "PWA"] },
  { label: "Backend", items: ["Node.js", "Supabase Edge Functions", "REST APIs", "Webhooks"] },
  { label: "Database", items: ["PostgreSQL", "RLS Policies", "Schema Design", "Multi-tenant Architecture"] },
  { label: "Auth & Security", items: ["TOTP 2FA", "HMAC-SHA256", "JWT", "Local Key Signing"] },
  { label: "Integrations", items: ["Paystack", "Cloudinary", "Bybit", "OKX", "KuCoin"] },
  { label: "Research & Analysis", items: ["PPMC & Regression", "Survey Design", "Frequency Analysis"] },
  { label: "Deploy", items: ["Vercel", "Render", "Supabase", "GitHub"] },
];

const credentials = [
  { title: "BA (Ed) English", body: "University of Uyo — Second Class Upper, CGPA 4.41/5.0", year: "2024" },
  { title: "TRCN Membership", body: "Teachers Registration Council of Nigeria", year: "2021" },
  { title: "TEFL Certified", body: "TEFL Professional Institute", year: "2025" },
  { title: "GBV Certification", body: "IOM, UNHCR, UNFPA & UNICEF", year: "2025" },
];

const awards = [
  { title: "Champion", body: "Peter Benjamin's Poetic World Cup", year: "2018" },
  { title: "Best Poet", body: "World Nation Writers' Union — The Writer of the World", year: "2018" },
  { title: "1st Position", body: "28th Asian Literary Society's International Contest", year: "2018" },
  { title: "Golden Ink Award", body: "World Peace and Harmony Association", year: "2019" },
];

const metrics = [
  { value: "1,900+", label: "Youth & students directly mentored" },
  { value: "1,000+", label: "Farmers empowered via Agropro Hub" },
  { value: "₦5M", label: "CSR grant ask drafted for Shell Nigeria" },
  { value: "23,798", label: "Jobs indexed by Career Bridge" },
  { value: "4", label: "Full training curricula authored" },
  { value: "3", label: "Published books" },
];

// ── TYPING HOOK ────────────────────────────────────────────────────────────────
function useTyping(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx <= word.length) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, speed);
    } else if (!deleting && charIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx));
        setCharIdx(c => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
      setCharIdx(0);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ── NAV ────────────────────────────────────────────────────────────────────────
function Nav({ role, setRole }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Projects", "Writing", "Skills", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,17,23,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
      transition: "all 0.3s ease",
      padding: "0.8rem 2rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <span style={{ fontFamily: "monospace", color: CYAN, fontWeight: 700, fontSize: "1rem", letterSpacing: "0.05em" }}>
          NAE<span style={{ color: AMBER }}>.</span>dev
        </span>
        <div style={{ display: "flex", gap: "1.75rem", alignItems: "center", flexWrap: "wrap" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: MUTED, textDecoration: "none", fontSize: "0.85rem",
              fontFamily: "monospace", letterSpacing: "0.05em",
            }}
            onMouseEnter={e => e.target.style.color = CYAN}
            onMouseLeave={e => e.target.style.color = MUTED}
            >{l}</a>
          ))}
          <a href="https://github.com/nseobong69" target="_blank" rel="noopener noreferrer" style={{
            color: AMBER, textDecoration: "none", fontSize: "0.8rem",
            fontFamily: "monospace", letterSpacing: "0.05em",
            border: `1px solid ${AMBER}`, padding: "2px 12px", borderRadius: "4px",
          }}
          onMouseEnter={e => { e.target.style.background = AMBER; e.target.style.color = CHAR; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = AMBER; }}
          >GitHub</a>
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
        {roleFilters.map(r => (
          <button key={r.key} onClick={() => setRole(r.key)} style={{
            fontFamily: "monospace", fontSize: "0.68rem", letterSpacing: "0.03em",
            padding: "5px 12px", borderRadius: "20px", cursor: "pointer",
            border: `1px solid ${role === r.key ? CYAN : BORDER}`,
            background: role === r.key ? "rgba(0,217,255,0.1)" : "transparent",
            color: role === r.key ? CYAN : MUTED,
            transition: "all 0.2s",
          }}>{r.label}</button>
        ))}
      </div>
    </nav>
  );
}

// ── HERO ────────────────────────────────────────────────────────────────────────
function Hero() {
  const typed = useTyping(roles);
  return (
    <section style={{
      minHeight: "92vh", display: "flex", alignItems: "center",
      padding: "9rem 2rem 4rem",
      background: `radial-gradient(ellipse 80% 60% at 20% 40%, rgba(0,217,255,0.06) 0%, transparent 60%),
                   radial-gradient(ellipse 60% 40% at 80% 70%, rgba(245,158,11,0.05) 0%, transparent 60%),
                   ${CHAR}`,
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <div style={{ fontFamily: "monospace", color: CYAN, fontSize: "0.9rem", marginBottom: "1.5rem", letterSpacing: "0.1em" }}>
          &gt; Hello, world. I'm Nseobong Akan Edem
        </div>
        <h1 style={{
          fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
          fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
          fontWeight: 800, color: WHITE, lineHeight: 1.1,
          marginBottom: "1.25rem", letterSpacing: "-0.02em",
          minHeight: "clamp(2.4rem, 6vw, 4.2rem)",
        }}>
          {typed}<span style={{ animation: "blink 1s infinite", color: CYAN }}>|</span>
        </h1>
        <p style={{
          color: MUTED, fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "640px",
          marginBottom: "2.5rem", fontFamily: "'Segoe UI', sans-serif",
        }}>
          I build the software, write the proposals that get programmes funded, and design
          the curricula that make training actually stick. Three disciplines, one habit:
          finding the gap between an idea and a working system, and closing it.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="#projects" style={{
            background: CYAN, color: CHAR, padding: "0.8rem 1.8rem", borderRadius: "6px",
            textDecoration: "none", fontWeight: 700, fontSize: "0.85rem",
            fontFamily: "monospace", letterSpacing: "0.03em",
          }}>See the work</a>
          <a href="#contact" style={{
            border: `1px solid ${BORDER}`, color: WHITE, padding: "0.8rem 1.8rem", borderRadius: "6px",
            textDecoration: "none", fontWeight: 700, fontSize: "0.85rem",
            fontFamily: "monospace", letterSpacing: "0.03em",
          }}>Get in touch</a>
        </div>
      </div>
    </section>
  );
}

// ── METRICS STRIP ──────────────────────────────────────────────────────────────
function Metrics() {
  return (
    <section style={{ padding: "3rem 2rem", background: "#0A0D12", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "1.5rem",
      }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", color: CYAN, fontWeight: 800,
              fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "0.4rem",
            }}>{m.value}</div>
            <div style={{ color: MUTED, fontSize: "0.72rem", lineHeight: 1.4, fontFamily: "'Segoe UI', sans-serif" }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── ABOUT / NARRATIVE ───────────────────────────────────────────────────────────
function About() {
  return (
    <section style={{ padding: "5rem 2rem", background: CHAR }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <SectionLabel title="How I got here" />
        <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.9, marginTop: "1.5rem", fontFamily: "'Segoe UI', sans-serif" }}>
          I started in a classroom, teaching English and Civic Education to over 5,000 students
          across seven years — which is where I learned that knowing something and being able to
          transfer it are two different skills. That gap became my career. In government office work,
          I learned how institutions actually run — the correspondence, the records, the reporting lines.
          In community development, I learned how to pitch an idea to people who control budgets, which
          became the foundation for writing government partnership proposals and CSR grant requests that
          organisations act on. And somewhere in the middle of all of it, I taught myself to build software —
          because I got tired of writing specifications for systems I couldn't build myself.
        </p>
        <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.9, marginTop: "1.25rem", fontFamily: "'Segoe UI', sans-serif" }}>
          Today that means I can sit in a room with a ministry, a school, or a founder, and do all three
          things they usually need three different people for: design the programme, write the proposal
          that funds it, and build the system that runs it.
        </p>
      </div>
    </section>
  );
}

// ── SECTION LABEL ──────────────────────────────────────────────────────────────
function SectionLabel({ title, badge }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
      <h2 style={{
        fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
        color: WHITE, fontSize: "clamp(1.4rem, 4vw, 2rem)",
        fontWeight: 800, margin: 0, letterSpacing: "-0.02em",
      }}>{title}</h2>
      {badge && (
        <span style={{
          fontFamily: "monospace", fontSize: "0.65rem", color: AMBER,
          border: `1px solid ${AMBER}66`, padding: "3px 10px", borderRadius: "20px",
        }}>{badge}</span>
      )}
    </div>
  );
}

// ── PROJECT CARD (shared by Projects + Writing) ────────────────────────────────
function WorkCard({ p }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: CARD, border: `1px solid ${hovered ? CYAN + "55" : BORDER}`,
        borderRadius: "10px", padding: "1.5rem",
        transition: "border-color 0.25s",
        gridColumn: p.highlight ? "span 2" : "span 1",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", gap: "0.5rem", flexWrap: "wrap" }}>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: WHITE, fontSize: "1.1rem", fontWeight: 700 }}>
          {p.name}
        </h3>
        <span style={{
          fontFamily: "monospace", fontSize: "0.65rem", fontWeight: 700,
          color: `#${p.tagColor}`,
          border: `1px solid #${p.tagColor}44`,
          padding: "2px 8px", borderRadius: "20px", whiteSpace: "nowrap",
        }}>{p.tag}</span>
      </div>
      <p style={{
        color: MUTED, fontSize: "0.85rem", lineHeight: 1.65,
        fontFamily: "'Segoe UI', sans-serif", marginBottom: "1.25rem",
      }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {p.stack.map(s => (
          <span key={s} style={{
            fontFamily: "monospace", fontSize: "0.7rem", color: hovered ? CYAN : "#6B7280",
            background: hovered ? "rgba(0,217,255,0.08)" : "#21262D",
            padding: "2px 8px", borderRadius: "4px", transition: "all 0.25s",
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

// ── PROJECTS ────────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" style={{ padding: "5rem 2rem", background: "#0A0D12" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel title="Software I've built" />
        <div data-grid style={{
          marginTop: "2.5rem", display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem",
        }}>
          {projects.map((p, i) => <WorkCard key={i} p={p} />)}
        </div>
      </div>
    </section>
  );
}

// ── WRITING / GRANTS / CURRICULUM ───────────────────────────────────────────────
function Writing({ role }) {
  const emphasize = role === "grants" || role === "curriculum";
  return (
    <section id="writing" style={{ padding: "5rem 2rem", background: CHAR }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel
          title="Proposals, grants & programme design"
          badge={emphasize ? "Matches your view" : null}
        />
        <p style={{
          color: MUTED, fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "680px",
          marginTop: "1.25rem", marginBottom: "2.5rem",
          fontFamily: "'Segoe UI', sans-serif",
        }}>
          I've written government partnership proposals, CSR grant requests, and full multi-module
          training curricula — the kind of documents that need to survive a budget committee, not
          just read well. Three published books and four literary awards are the reason the prose
          holds up; the ministry and NGO experience is the reason the structure does too.
        </p>
        <div data-grid style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem",
        }}>
          {writingWorks.map((p, i) => <WorkCard key={i} p={p} />)}
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ─────────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" style={{ padding: "5rem 2rem", background: "#0A0D12" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel title="Tools & capabilities" />
        <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {skills.map((s, i) => (
            <div key={i} style={{
              display: "flex", gap: "1.5rem", alignItems: "flex-start",
              flexWrap: "wrap",
            }}>
              <div style={{
                fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 700,
                color: s.hot ? CYAN : AMBER,
                minWidth: "160px", paddingTop: "4px",
                letterSpacing: "0.05em",
              }}>{s.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", flex: 1 }}>
                {s.items.map(item => (
                  <span key={item} style={{
                    fontFamily: "monospace", fontSize: "0.78rem",
                    color: s.hot ? WHITE : MUTED,
                    background: s.hot ? "rgba(0,217,255,0.1)" : CARD,
                    border: `1px solid ${s.hot ? CYAN + "44" : BORDER}`,
                    padding: "3px 10px", borderRadius: "4px",
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CREDENTIALS + AWARDS ─────────────────────────────────────────────────────────
function Credentials() {
  return (
    <section style={{ padding: "5rem 2rem", background: CHAR }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionLabel title="Credentials & recognition" />
        <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
          {credentials.map((a, i) => (
            <div key={i} style={{
              background: CARD, border: `1px solid ${BORDER}`,
              borderLeft: `3px solid ${CYAN}`,
              borderRadius: "8px", padding: "1.1rem 1.25rem",
            }}>
              <div style={{ fontFamily: "monospace", color: CYAN, fontSize: "0.68rem", marginBottom: "0.4rem" }}>
                {a.year}
              </div>
              <div style={{ color: WHITE, fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>
                {a.title}
              </div>
              <div style={{ color: MUTED, fontSize: "0.78rem", lineHeight: 1.5 }}>{a.body}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem" }}>
          <div style={{ fontFamily: "monospace", color: AMBER, fontSize: "0.78rem", marginBottom: "1rem", letterSpacing: "0.05em" }}>
            Literary awards & published works
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
            {awards.map((a, i) => (
              <div key={i} style={{
                background: CARD, border: `1px solid ${BORDER}`,
                borderLeft: `3px solid ${AMBER}`,
                borderRadius: "8px", padding: "1.1rem 1.25rem",
              }}>
                <div style={{ fontFamily: "monospace", color: AMBER, fontSize: "0.68rem", marginBottom: "0.4rem" }}>
                  {a.year}
                </div>
                <div style={{ color: WHITE, fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.2rem" }}>
                  {a.title}
                </div>
                <div style={{ color: MUTED, fontSize: "0.78rem", lineHeight: 1.5 }}>{a.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ────────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{
      padding: "5rem 2rem",
      background: `linear-gradient(135deg, #0A0D12 0%, #0F1117 100%)`,
      borderTop: `1px solid ${BORDER}`,
    }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "monospace", color: CYAN, fontSize: "0.85rem", marginBottom: "1rem", letterSpacing: "0.1em" }}>
          &gt; let's build something
        </div>
        <h2 style={{
          fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
          color: WHITE, fontSize: "clamp(1.8rem, 5vw, 3rem)",
          fontWeight: 800, margin: "0 0 1.5rem", letterSpacing: "-0.02em",
        }}>Get in touch</h2>
        <p style={{ color: MUTED, lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "3rem", fontFamily: "'Segoe UI', sans-serif" }}>
          Open to development work, programme design contracts, and grant or proposal writing —
          remote, full-time, or project-based.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          <a href="mailto:nseobongedem@gmail.com" style={{
            display: "inline-block", background: CYAN, color: CHAR,
            padding: "0.9rem 2.5rem", borderRadius: "6px",
            textDecoration: "none", fontWeight: 700,
            fontSize: "0.9rem", fontFamily: "monospace", letterSpacing: "0.05em",
            width: "fit-content",
          }}>nseobongedem@gmail.com</a>
          <div style={{ color: MUTED, fontFamily: "monospace", fontSize: "0.85rem" }}>
            or call: <span style={{ color: WHITE }}>+234 916-533-2211</span>
          </div>
          <a href="https://github.com/nseobong69" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "monospace", color: AMBER, fontSize: "0.85rem",
            textDecoration: "none", letterSpacing: "0.05em",
          }}>github.com/nseobong69 →</a>
        </div>
      </div>
    </section>
  );
}

// ── APP ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [role, setRole] = useState("all");

  // Reorders which major section comes first based on the selected role.
  const order = (() => {
    if (role === "grants" || role === "curriculum") {
      return ["writing", "projects", "skills"];
    }
    if (role === "dev") {
      return ["projects", "writing", "skills"];
    }
    return ["projects", "writing", "skills"];
  })();

  const sectionMap = {
    projects: <Projects key="projects" />,
    writing: <Writing key="writing" role={role} />,
    skills: <Skills key="skills" />,
  };

  return (
    <div style={{ background: CHAR, minHeight: "100vh", color: WHITE }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;800&display=swap');
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0D12; }
        ::-webkit-scrollbar-thumb { background: #21262D; border-radius: 3px; }
        a { transition: all 0.2s ease; }
        @media (max-width: 720px) {
          [data-grid] { grid-template-columns: 1fr !important; }
          [data-grid] > * { grid-column: span 1 !important; }
        }
      `}</style>
      <Nav role={role} setRole={setRole} />
      <Hero />
      <Metrics />
      <About />
      {order.map(key => sectionMap[key])}
      <Credentials />
      <Contact />
      <footer style={{
        textAlign: "center", padding: "2rem",
        borderTop: `1px solid ${BORDER}`,
        fontFamily: "monospace", color: MUTED, fontSize: "0.75rem",
      }}>
        © 2026 Nseobong Akan Edem — Built with React
      </footer>
    </div>
  );
}
