import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const NAV_LINKS = [
  { label: "About", id: "home" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

const SERVICES = [
  { icon: "📊", title: "Frontend Development", color: "#6C63FF", items: ["React.js Development", "Next.js Applications", "TypeScript Solutions", "JavaScript / ES6+", "API Integration"] },
  { icon: "🔵", title: "WordPress Development", color: "#21759B", items: ["Custom Theme Development", "Elementor / Gutenberg", "Plugin Customization", "Speed Optimization", "Landing Pages"] },
  { icon: "🟢", title: "Shopify Development", color: "#96BF48", items: ["Theme Customization", "Store Frontend", "Liquid Development", "App Integration", "Performance Optimization"] },
  { icon: "🔴", title: "Performance Optimization", color: "#FF4B4B", items: ["Core Web Vitals", "SEO Optimization", "Speed Optimization", "Accessibility (A11y)", "Website Audit"] },
];

const PROJECTS = [
  { title: "30 Day Success Formula", tags: "HTML5 • CSS3 • JavaScript", img: "/images/project1.jpg", link: "#" },
  { title: "Childcare Business", tags: "HTML5 • CSS3 • JavaScript", img: "/images/project2.jpg", link: "#" },
  { title: "Studio 7", tags: "Wordpress • HTML5 • CSS3 • JavaScript", img: "/images/studio-7.jpg", link: null },
  { title: "ranknudge", tags: "WordPress • HTML5 • CSS3 • JavaScript", img: "/images/ranknudge.jpg", link: null },
];

const TECH_STACK = [
  { name: "HTML", color: "#E34F26", symbol: "5" },
  { name: "CSS", color: "#1572B6", symbol: "3" },
  { name: "JavaScript", color: "#F7DF1E", symbol: "JS" },
  { name: "TypeScript", color: "#3178C6", symbol: "TS" },
  { name: "React", color: "#61DAFB", symbol: "⚛" },
  { name: "Next.js", color: "#ffffff", symbol: "N" },
  { name: "Redux", color: "#764ABC", symbol: "⬡" },
  { name: "Tailwind", color: "#06B6D4", symbol: "~" },
  { name: "WordPress", color: "#21759B", symbol: "W" },
  { name: "Shopify", color: "#96BF48", symbol: "S" },
  { name: "Git", color: "#F05032", symbol: "⎇" },
  { name: "Figma", color: "#F24E1E", symbol: "▣" },
];

const WHY_ME = [
  { icon: "⏱", title: "13+ Years Experience", desc: "Extensive experience in frontend development and delivering successful projects." },
  { icon: "🎯", title: "Pixel Perfect Design", desc: "I build clean, modern and pixel perfect interfaces that match your brand." },
  { icon: "🚀", title: "Fast Delivery", desc: "I respect deadlines and deliver high-quality work on time, every time." },
  { icon: "📱", title: "Responsive & Modern", desc: "Mobile-first approach with responsive and modern design principles." },
  { icon: "💻", title: "Clean Code", desc: "I follow best practices and write clean, maintainable and scalable code." },
  { icon: "🔍", title: "SEO Friendly", desc: "All projects are built with SEO best practices to rank better on search engines." },
  { icon: "⚡", title: "Performance Focused", desc: "I optimize websites for speed and ensure top performance scores." },
  { icon: "🛡", title: "Ongoing Support", desc: "I provide ongoing support and maintenance after project delivery." },
];

const TESTIMONIALS = [
  { text: "Nikul is an exceptional developer. His attention to detail and code quality is outstanding. Highly recommended!", name: "James Anderson", role: "", stars: 5, initials: "JA", color: "#6C63FF" },
  { text: "Great communication and delivered the project on time. The website is fast, responsive and looks amazing!", name: "Sarah Johnson", role: "", stars: 5, initials: "SJ", color: "#FF6B9D" },
  { text: "Working with Nikul was a fantastic experience. He goes above and beyond to ensure client satisfaction.", name: "David Brown", role: "", stars: 5, initials: "DB", color: "#00D4AA" },
];

// ── Scroll reveal ──
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useReveal();
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(-40px)", right: "translateX(40px)" };
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : transforms[direction], transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ── Favicon ──
function useFavicon() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, 64, 64);
    grad.addColorStop(0, "#6C63FF"); grad.addColorStop(1, "#8B5CF6");
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(32, 32, 32, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 22px Inter, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("NP", 32, 33);
    const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.type = "image/x-icon"; link.rel = "shortcut icon";
    link.href = canvas.toDataURL();
    document.head.appendChild(link);
    document.title = "Nikul Prajapati | Frontend Developer";
  }, []);
}

// ── Corner accents ──
function CornerAccents({ color = "#6C63FF55", size = 20 }) {
  const corners = [
    { top: 0, left: 0, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
    { top: 0, right: 0, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
    { bottom: 0, left: 0, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
    { bottom: 0, right: 0, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <div key={i} style={{ position: "absolute", width: size, height: size, ...c, borderRadius: 2, pointerEvents: "none", zIndex: 1, animation: "cornerGlow 3s ease-in-out infinite" }} />
      ))}
    </>
  );
}

// ── Sparkles ──
function Sparkles({ count = 6, color = "#6C63FF" }) {
  const dots = useRef(
    Array.from({ length: count }, (_, i) => ({
      x: `${8 + (i / count) * 84}%`,
      y: `${10 + Math.floor(i % 3) * 30}%`,
      size: 2 + (i % 3),
      delay: i * 0.9,
      duration: 3 + (i % 3),
    }))
  ).current;
  return (
    <>
      {dots.map((d, i) => (
        <div key={i} style={{
          position: "absolute", left: d.x, top: d.y,
          width: d.size, height: d.size, borderRadius: "50%",
          background: color, opacity: 0,
          animation: `sparklePop ${d.duration}s ease-in-out ${d.delay}s infinite`,
          pointerEvents: "none", zIndex: 0,
          boxShadow: `0 0 ${d.size * 3}px ${color}`,
        }} />
      ))}
    </>
  );
}

// ── Light orb ──
function LightOrb({ x, y, size, color, delay, duration }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle, ${color}14 0%, transparent 70%)`,
      animation: `orbFloat ${duration}s ease-in-out ${delay}s infinite`,
      pointerEvents: "none", zIndex: 0,
    }} />
  );
}

// ── Project Card ──
  function ProjectCard({ p }) {
    return (
      <div className="project-card shine" style={{ height: "100%" }}>
        <CornerAccents color="#6C63FF44" size={14} />
        <div style={{ height: 220, background: p.img ? "#0a0a1a" : "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          {p.img ? (
            <img
              src={p.img}
              alt={p.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", transition: "transform .4s ease" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
          ) : (
            <div style={{ textAlign: "center", padding: 20, position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🖥</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#aaa" }}>{p.title}</div>
            </div>
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#00000066 0%,transparent 50%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 36, height: 36, borderRadius: "50%", background: "#6C63FF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", animation: "glowPulse 3s ease-in-out infinite", zIndex: 2 }}>→</div>
        </div>
        <div style={{ padding: "16px 20px" }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{p.title}</h3>
          <p style={{ color: "#666", fontSize: 12 }}>{p.tags}</p>
        </div>
      </div>
    );
  }

// ── Project Slider ──
function ProjectSlider({ projects }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 640) setPerPage(1);
      else if (window.innerWidth <= 991) setPerPage(2);
      else setPerPage(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = projects.length;
  const maxIndex = Math.max(0, total - perPage);

  useEffect(() => {
    if (current > maxIndex) {
        setCurrent(maxIndex);
    }
}, [current, maxIndex]);

  const go = (dir) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(prev => {
      const next = prev + dir;
      if (next < 0) return 0;
      if (next > maxIndex) return maxIndex;
      return next;
    });
    setTimeout(() => setAnimating(false), 400);
  };

  const canPrev = current > 0;
  const canNext = current < maxIndex;

  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const gapPx = 24;
  const slideWidth = `calc(${100 / perPage}% - ${(gapPx * (perPage - 1)) / perPage}px)`;
  const offset = `calc(-${current * (100 / perPage)}% - ${current * gapPx / perPage}px)`;

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div style={{ overflow: "hidden", borderRadius: 18 }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div style={{ display: "flex", gap: gapPx, transition: "transform 0.45s cubic-bezier(.4,0,.2,1)", transform: `translateX(${offset})`, willChange: "transform", alignItems: "stretch" }}>
          {projects.map((p, i) => (
            <div key={i} style={{ minWidth: slideWidth, maxWidth: slideWidth, flexShrink: 0 }}>
              <ProjectCard p={p} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 32 }}>
        <button
          onClick={() => go(-1)} disabled={!canPrev}
          style={{ width: 44, height: 44, borderRadius: "50%", background: canPrev ? "linear-gradient(135deg,#6C63FF,#8B5CF6)" : "#1a1a2e", border: canPrev ? "none" : "1px solid #2a2a40", color: canPrev ? "#fff" : "#444", fontSize: 18, cursor: canPrev ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .25s", flexShrink: 0, boxShadow: canPrev ? "0 4px 20px #6C63FF55" : "none" }}
          onMouseEnter={e => { if (canPrev) e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >←</button>

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <div key={i} onClick={() => { if (!animating) { setAnimating(true); setCurrent(i); setTimeout(() => setAnimating(false), 400); } }}
              style={{ width: current === i ? 24 : 9, height: 9, borderRadius: 5, background: current === i ? "#6C63FF" : "#2a2a40", cursor: "pointer", transition: "all .3s ease", boxShadow: current === i ? "0 0 10px #6C63FF88" : "none" }}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)} disabled={!canNext}
          style={{ width: 44, height: 44, borderRadius: "50%", background: canNext ? "linear-gradient(135deg,#6C63FF,#8B5CF6)" : "#1a1a2e", border: canNext ? "none" : "1px solid #2a2a40", color: canNext ? "#fff" : "#444", fontSize: 18, cursor: canNext ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .25s", flexShrink: 0, boxShadow: canNext ? "0 4px 20px #6C63FF55" : "none" }}
          onMouseEnter={e => { if (canNext) e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >→</button>
      </div>

      <div style={{ textAlign: "center", marginTop: 12, color: "#555", fontSize: 12 }}>
        {current + 1} – {Math.min(current + perPage, total)} of {total} projects
      </div>
    </div>
  );
}

// ── Main component ──
export default function NikulPortfolio() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeNav, setActiveNav] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", budget: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error
  const [heroVisible, setHeroVisible] = useState(false);

  useFavicon();

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id);
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveNav(id); },
        { rootMargin: "-80px 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id) => {
    setActiveNav(id);
    setMenuOpen(false);
    if (id === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 72; window.scrollTo({ top, behavior: "smooth" }); }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in Name, Email and Message.");
      return;
    }
    setFormStatus("sending");
    try {
      await emailjs.send(
        "YOUR_SERVICE_ID",    // ← Replace with your EmailJS Service ID
        "YOUR_TEMPLATE_ID",   // ← Replace with your EmailJS Template ID
        {
          from_name:  formData.name,
          from_email: formData.email,
          budget:     formData.budget || "Not specified",
          message:    formData.message,
          to_email:   "prajapatinikulbhai91@gmail.com",
        },
        "YOUR_PUBLIC_KEY"     // ← Replace with your EmailJS Public Key
      );
      setFormStatus("success");
      setFormData({ name: "", email: "", budget: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#0a0a14", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #6C63FF33; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0a0a14; }
        ::-webkit-scrollbar-thumb { background: #6C63FF; border-radius: 3px; }

        .fixed-dot-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(circle, #6C63FF28 1px, transparent 1px);
          background-size: 30px 30px; background-attachment: fixed;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 100%);
          opacity: 0.55;
        }

        @keyframes navLineSweep {
          0%   { left: -40%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 140%; opacity: 0; }
        }
        @keyframes navLinePulse { 0%,100%{opacity:.3} 50%{opacity:.9} }
        .nav-line-track { position:absolute; bottom:0; left:0; right:0; height:1px; background:#1e1e3a; overflow:hidden; }
        .nav-line-sweep { position:absolute; top:0; left:-40%; width:40%; height:100%; background:linear-gradient(90deg,transparent,#6C63FFcc,#a78bfaff,#6C63FFcc,transparent); animation:navLineSweep 7s linear infinite; border-radius:1px; }
        .nav-line-glow { position:absolute; top:-1px; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,#6C63FF44,transparent); animation:navLinePulse 3.5s ease-in-out infinite; filter:blur(2px); }

        @keyframes orbFloat  { 0%,100%{transform:translateY(0) scale(1);opacity:.5} 50%{transform:translateY(-28px) scale(1.06);opacity:.9} }
        @keyframes sparklePop{ 0%,100%{opacity:0;transform:scale(.5)} 50%{opacity:.9;transform:scale(1.2)} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 16px #6C63FF33,0 0 32px #6C63FF11} 50%{box-shadow:0 0 32px #6C63FF66,0 0 64px #6C63FF22} }
        @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes pulse     { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes shimmer   { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ringPing  { 0%{transform:scale(.8);opacity:.8} 100%{transform:scale(2.2);opacity:0} }
        @keyframes cornerGlow{ 0%,100%{opacity:.35} 50%{opacity:.85} }
        @keyframes badgeFloat{ 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(2deg)} }

        .shine { position:relative; overflow:hidden; }
        .shine::before { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,#ffffff06,transparent); transform:skewX(-20deg); transition:left .6s ease; pointer-events:none; z-index:1; }
        .shine:hover::before { left:160%; }

        .nav-link { color:#888; font-size:14px; font-weight:500; cursor:pointer; background:none; border:none; font-family:inherit; padding:4px 0; border-bottom:2px solid transparent; transition:color .25s,border-color .25s; white-space:nowrap; }
        .nav-link:hover { color:#fff; }
        .nav-link.active { color:#fff; border-bottom-color:#6C63FF; }

        .btn-primary { background:linear-gradient(135deg,#6C63FF,#8B5CF6); color:#fff; border:none; padding:12px 24px; border-radius:50px; font-size:14px; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:8px; transition:transform .2s,box-shadow .2s; font-family:inherit; text-decoration:none; position:relative; overflow:hidden; }
        .btn-primary::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,#ffffff22,transparent); transform:translateX(-100%); transition:transform .5s ease; border-radius:50px; pointer-events:none; }
        .btn-primary:hover::after { transform:translateX(100%); }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px #6C63FF55; }
        .btn-outline { background:transparent; color:#fff; border:1.5px solid #2a2a40; padding:12px 24px; border-radius:50px; font-size:14px; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:8px; transition:border-color .25s,background .25s,box-shadow .25s; font-family:inherit; }
        .btn-outline:hover { border-color:#6C63FF; background:#6C63FF11; box-shadow:0 0 20px #6C63FF22; }

        .section-label { color:#6C63FF; font-size:11px; font-weight:700; letter-spacing:3px; text-transform:uppercase; display:block; margin-bottom:12px; }
        .section-title { font-size:clamp(22px,4vw,36px); font-weight:800; color:#fff; margin-bottom:48px; text-align:center; }

        .service-card { background:#12121e; border:1px solid #1e1e30; border-radius:18px; padding:28px; height:100%; transition:border-color .3s,transform .3s,box-shadow .3s; cursor:pointer; position:relative; overflow:hidden; }
        .service-card:hover { border-color:#6C63FF55; transform:translateY(-6px); box-shadow:0 20px 48px #6C63FF1a,0 0 0 1px #6C63FF11; }

        .project-card { background:#12121e; border:1px solid #1e1e30; border-radius:18px; overflow:hidden; transition:transform .3s,box-shadow .3s,border-color .3s; cursor:pointer; position:relative; }
        .project-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px #6C63FF1a; border-color:#6C63FF33; }

        .tech-badge { background:#12121e; border:1px solid #1e1e30; border-radius:14px; padding:18px 12px; display:flex; flex-direction:column; align-items:center; gap:10px; transition:border-color .3s,transform .3s,box-shadow .3s; cursor:default; width:88px; position:relative; overflow:hidden; }
        .tech-badge:hover { border-color:#6C63FF66; transform:translateY(-5px) scale(1.05); box-shadow:0 12px 32px #6C63FF22; }
        .tech-grid { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; }

        .why-card { background:#12121e; border:1px solid #1e1e30; border-radius:18px; padding:24px; height:100%; transition:border-color .3s,transform .3s,box-shadow .3s; position:relative; overflow:hidden; }
        .why-card:hover { border-color:#6C63FF55; transform:translateY(-4px); box-shadow:0 12px 32px #6C63FF15; }

        .testi-card { background:#12121e; border:1px solid #1e1e30; border-radius:18px; padding:28px; height:100%; transition:border-color .3s,transform .3s,opacity .3s,box-shadow .3s; position:relative; overflow:hidden; }
        .testi-card:hover { border-color:#6C63FF44; transform:translateY(-4px); box-shadow:0 12px 32px #6C63FF15; }

        .input-field { background:#12121e; border:1px solid #1e1e30; border-radius:12px; padding:14px 18px; color:#fff; font-size:14px; width:100%; outline:none; font-family:inherit; transition:border-color .25s,box-shadow .25s; }
        .input-field:focus { border-color:#6C63FF; box-shadow:0 0 0 3px #6C63FF22; }
        .input-field::placeholder { color:#444; }
        .input-field:disabled { opacity: 0.6; cursor: not-allowed; }

        .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; padding:6px; }
        .hamburger span { display:block; width:22px; height:2px; background:#fff; border-radius:2px; transition:transform .3s,opacity .3s; }
        .mobile-menu { display:none; position:fixed; top:64px; left:0; right:0; background:#0d0d1af2; backdrop-filter:blur(24px); border-bottom:1px solid #1e1e30; padding:16px; flex-direction:column; gap:4px; z-index:98; animation:slideDown .25s ease; }
        .mobile-menu.open { display:flex; }
        .mobile-nav-btn { background:none; border:none; color:#aaa; font-size:15px; font-weight:500; font-family:inherit; padding:13px 16px; text-align:left; cursor:pointer; border-radius:12px; transition:background .2s,color .2s; }
        .mobile-nav-btn:hover,.mobile-nav-btn.active { background:#6C63FF22; color:#fff; }

        .stat-num { font-size:clamp(22px,4vw,32px); font-weight:800; }
        .star { color:#FFD700; font-size:14px; }
        .dot { width:9px; height:9px; border-radius:50%; background:#2a2a40; cursor:pointer; transition:background .2s,transform .2s; }
        .dot.active { background:#6C63FF; transform:scale(1.4); }
        .dot:hover { background:#6C63FF88; }
        .float { animation:float 4s ease-in-out infinite; }
        .glow { box-shadow:0 0 80px #6C63FF44; }
        .gradient-text { background:linear-gradient(90deg,#6C63FF,#FF6B9D,#6C63FF); background-size:200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 3s linear infinite; }

        @media(max-width:1024px){
          .services-grid{grid-template-columns:repeat(2,1fr)!important}
          .why-grid{grid-template-columns:repeat(2,1fr)!important}
          .testi-grid{grid-template-columns:1fr!important}
          .contact-grid{grid-template-columns:1fr!important}
          .contact-box{padding:48px 40px!important}
          .hero-avatar{transform:scale(0.82);transform-origin:center right}
          .hero-grid{gap:24px!important}
        }
        @media(max-width:991px){
          .desktop-nav{display:none!important}
          .hamburger{display:flex!important}
          .nav-cta{display:none!important}
          .hero-grid{grid-template-columns:1fr!important;text-align:center}
          .hero-avatar{display:flex!important;justify-content:center!important;margin-top:40px!important;transform:none!important}
          .hero-btns{justify-content:center!important}
          .hero-stats{justify-content:center!important;flex-wrap:wrap;gap:20px!important}
          .hero-available{justify-content:center!important}
          .services-grid{grid-template-columns:repeat(2,1fr)!important}
          .projects-grid{grid-template-columns:1fr!important}
          .why-grid{grid-template-columns:repeat(2,1fr)!important}
          .testi-grid{grid-template-columns:1fr!important}
          .contact-box{padding:32px 20px!important}
          .contact-grid{grid-template-columns:1fr!important}
          .contact-form-row{grid-template-columns:1fr!important}
          .footer-inner{flex-direction:column!important;gap:8px;text-align:center}
          .section-title{margin-bottom:32px!important}
        }
        @media(max-width:768px){
          .desktop-nav{display:none!important}
          .hamburger{display:flex!important}
          .nav-cta{display:none!important}
          .hero-grid{grid-template-columns:1fr!important;text-align:center}
          .hero-avatar{display:flex!important;justify-content:center!important;margin-top:32px!important;transform:none!important}
          .hero-btns{justify-content:center!important}
          .hero-stats{justify-content:center!important;flex-wrap:wrap;gap:20px!important}
          .hero-available{justify-content:center!important}
          .services-grid{grid-template-columns:1fr!important}
          .projects-grid{grid-template-columns:1fr!important}
          .why-grid{grid-template-columns:repeat(2,1fr)!important}
          .testi-grid{grid-template-columns:1fr!important}
          .contact-box{padding:32px 20px!important}
          .contact-grid{grid-template-columns:1fr!important}
          .contact-form-row{grid-template-columns:1fr!important}
          .footer-inner{flex-direction:column!important;gap:8px;text-align:center}
          .section-title{margin-bottom:32px!important}
        }
        @media(max-width:480px){
          .why-grid{grid-template-columns:1fr!important}
          .tech-badge{width:76px!important;padding:14px 8px!important}
        }
      `}</style>

      {/* ── FIXED DOT GRID ── */}
      <div className="fixed-dot-grid" />

      {/* ── FIXED AMBIENT ORBS ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <LightOrb x="-5%"  y="5%"   size={500} color="#6C63FF" delay={0}   duration={9}  />
        <LightOrb x="75%"  y="15%"  size={380} color="#FF6B9D" delay={2}   duration={11} />
        <LightOrb x="40%"  y="45%"  size={420} color="#6C63FF" delay={4}   duration={8}  />
        <LightOrb x="85%"  y="60%"  size={300} color="#00D4AA" delay={1}   duration={12} />
        <LightOrb x="-8%"  y="70%"  size={360} color="#8B5CF6" delay={3}   duration={10} />
        <LightOrb x="60%"  y="85%"  size={340} color="#6C63FF" delay={5}   duration={13} />
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "#0a0a14f2" : "#0a0a14aa", backdropFilter: "blur(20px)", transition: "background .3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }} onClick={() => scrollToSection("home")}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#6C63FF,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, letterSpacing: 0.5, animation: "glowPulse 3s ease-in-out infinite" }}>NP</div>
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: 0.5, whiteSpace: "nowrap" }}>NIKUL PRAJAPATI</span>
          </div>
          <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <button key={l.id} className={`nav-link${activeNav === l.id ? " active" : ""}`} onClick={() => scrollToSection(l.id)}>{l.label}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <a href="mailto:prajapatinikulbhai91@gmail.com" className="btn-primary nav-cta" style={{ padding: "10px 20px", fontSize: 13 }}>Let's Talk 💬</a>
            <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </button>
          </div>
        </div>
        <div className="nav-line-track">
          <div className="nav-line-glow" />
          <div className="nav-line-sweep" />
        </div>
      </nav>

      <div style={{ height: 64 }} />

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <button key={l.id} className={`mobile-nav-btn${activeNav === l.id ? " active" : ""}`} onClick={() => scrollToSection(l.id)}>{l.label}</button>
        ))}
        <a href="mailto:prajapatinikulbhai91@gmail.com" className="btn-primary" style={{ marginTop: 8, justifyContent: "center" }}>Let's Talk 💬</a>
      </div>

      {/* ── HERO ── */}
      <section id="home" style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 40px", position: "relative", zIndex: 1, overflow: "hidden" }}>
        <Sparkles count={8} color="#6C63FF" />
        <Sparkles count={4} color="#FF6B9D" />
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,#6C63FF14,transparent 70%)", pointerEvents: "none", animation: "orbFloat 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "2%", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,#FF6B9D0e,transparent 70%)", pointerEvents: "none", animation: "orbFloat 9s ease-in-out 2s infinite" }} />

        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="hero-available" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)", transition: "opacity .6s .1s,transform .6s .1s" }}>
              <div style={{ position: "relative", width: 12, height: 12 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#00D4AA", animation: "pulse 2s infinite" }} />
                <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "1.5px solid #00D4AA66", animation: "ringPing 2s ease-out infinite" }} />
              </div>
              <span style={{ color: "#aaa", fontSize: 13 }}>Available for Freelance Projects</span>
            </div>
            <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 20, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(30px)", transition: "opacity .7s .2s,transform .7s .2s" }}>
              I Build Fast, Modern &<br />
              <span className="gradient-text">High-Performing</span>
              <br />Web Experiences
            </h1>
            <p style={{ color: "#999", fontSize: "clamp(13px,2vw,15px)", lineHeight: 1.8, marginBottom: 32, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)", transition: "opacity .7s .35s,transform .7s .35s" }}>
              Senior Frontend Developer with 13+ years of experience building responsive, user-friendly websites and web applications that drive results.
            </p>
            <div className="hero-btns" style={{ display: "flex", gap: 16, marginBottom: 48, flexWrap: "wrap", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)", transition: "opacity .7s .5s,transform .7s .5s" }}>
              <a href="https://www.upwork.com/freelancers/~0148f4f45f9d606870?mp_source=share" target="_blank" rel="noopener noreferrer" className="btn-primary">Hire Me →</a>
              <button className="btn-outline" onClick={() => scrollToSection("portfolio")}>View My Work →</button>
            </div>
            <div className="hero-stats" style={{ display: "none", gap: 36, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)", transition: "opacity .7s .65s,transform .7s .65s" }}>
              {[["13+","Years Experience"],["100+","Projects Completed"],["90+","Happy Clients"],["24/7","Support Available"]].map(([n,l]) => (
                <div key={l}>
                  <div className="stat-num" style={{ background: "linear-gradient(135deg,#fff,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                  <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-avatar" style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 1, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateX(40px) scale(0.95)", transition: "opacity .8s .3s,transform .8s .3s", minWidth: 0 }}>
            {[
              { label: "TS", color: "#3178C6", top: "5%",  right: "8%" },
              { label: "⚛", color: "#61DAFB", top: "20%", left: "0%" },
              { label: "N",  color: "#fff",    top: "52%", left: "-4%" },
              { label: "JS", color: "#F7DF1E", bottom: "12%", right: "4%" },
            ].map((b, i) => (
              <div key={i} style={{ position: "absolute", top: b.top, right: b.right, bottom: b.bottom, left: b.left, width: 50, height: 50, borderRadius: 13, background: "#12121e", border: `1px solid ${b.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: b.color, zIndex: 2, boxShadow: `0 4px 20px ${b.color}33`, animation: `badgeFloat ${4 + i}s ease-in-out ${i * 0.8}s infinite` }}>{b.label}</div>
            ))}
            <div className="glow" style={{ width: "min(280px,72vw)", height: 320, borderRadius: 24, background: "linear-gradient(160deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", animation: "glowPulse 4s ease-in-out infinite" }}>
              <CornerAccents color="#6C63FF55" size={18} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 100%,#6C63FF2a,transparent 70%)" }} />
              <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
                <div style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg,#6C63FF,#8B5CF6)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, animation: "glowPulse 3s ease-in-out infinite" }}>NP</div>
                <div style={{ color: "#ccc", fontSize: 14, fontWeight: 500 }}>Frontend Developer</div>
                <div style={{ marginTop: 12, gap: 8, justifyContent: "center", display: "none" }}>
                  <div style={{ background: "#FFD70022", border: "1px solid #FFD70055", borderRadius: 8, padding: "4px 12px", fontSize: 11, color: "#FFD700" }}>⭐ Top Rated on Upwork</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <Sparkles count={5} color="#6C63FF" />
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 12 }}><span className="section-label">WHAT I DO</span></div>
          <h2 className="section-title">Services That I Provide</h2>
        </Reveal>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, position: "relative", zIndex: 1 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="service-card shine">
                <CornerAccents color={`${s.color}44`} size={14} />
                <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at top right,${s.color}14,transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${s.color}1a`, border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16, boxShadow: `0 0 16px ${s.color}22`, position: "relative", zIndex: 1 }}>{s.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, color: "#fff", position: "relative", zIndex: 1 }}>{s.title}</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, position: "relative", zIndex: 1 }}>
                  {s.items.map(it => (
                    <li key={it} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#999" }}>
                      <span style={{ color: s.color, fontSize: 10, flexShrink: 0 }}>●</span>{it}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 20, width: 32, height: 32, borderRadius: "50%", border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: s.color, position: "relative", zIndex: 1 }}>→</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="portfolio" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px", position: "relative", zIndex: 1 }}>
        <Sparkles count={4} color="#8B5CF6" />
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 12 }}><span className="section-label">MY WORK</span></div>
          <h2 className="section-title">Featured Projects</h2>
        </Reveal>
        {PROJECTS.length <= 3 ? (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${PROJECTS.length},1fr)`, gap: 24, position: "relative", zIndex: 1, maxWidth: PROJECTS.length < 3 ? 800 : "100%", margin: "0 auto" }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.15}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <ProjectSlider projects={PROJECTS} />
        )}
      </section>

      {/* ── TECH STACK ── */}
      <section id="about" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 12 }}><span className="section-label">TECH STACK</span></div>
          <h2 className="section-title">Technologies I Work With</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ background: "#0d0d1a", border: "1px solid #1e1e30", borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden" }}>
            <CornerAccents color="#6C63FF44" size={20} />
            <div style={{ position: "absolute", top: 0, left: 0, width: 140, height: 140, background: "radial-gradient(circle at top left,#6C63FF14,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 140, height: 140, background: "radial-gradient(circle at bottom right,#8B5CF614,transparent 70%)", pointerEvents: "none" }} />
            <Sparkles count={6} color="#6C63FF" />
            <div className="tech-grid" style={{ position: "relative", zIndex: 1 }}>
              {TECH_STACK.map((t) => (
                <div key={t.name} className="tech-badge">
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `${t.color}1a`, border: `1.5px solid ${t.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: t.color, boxShadow: `0 0 12px ${t.color}22` }}>{t.symbol}</div>
                  <span style={{ color: "#999", fontSize: 11, fontWeight: 600, textAlign: "center", letterSpacing: 0.3 }}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── WHY ME ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px", position: "relative", zIndex: 1 }}>
        <Sparkles count={5} color="#00D4AA" />
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 12 }}><span className="section-label">WHY CHOOSE ME</span></div>
          <h2 className="section-title">Why Clients Hire Me</h2>
        </Reveal>
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, position: "relative", zIndex: 1 }}>
          {WHY_ME.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="why-card shine">
                <CornerAccents color="#6C63FF2a" size={12} />
                <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, background: "radial-gradient(circle at top right,#6C63FF0e,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ fontSize: 28, marginBottom: 12, position: "relative", zIndex: 1 }}>{w.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: "#fff", position: "relative", zIndex: 1 }}>{w.title}</h3>
                <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6, position: "relative", zIndex: 1 }}>{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px", position: "relative", zIndex: 1 }}>
        <Sparkles count={4} color="#FF6B9D" />
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 12 }}><span className="section-label">TESTIMONIALS</span></div>
          <h2 className="section-title">What Clients Say About Me</h2>
        </Reveal>
        <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 32, position: "relative", zIndex: 1 }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.15}>
              <div className="testi-card" style={{ opacity: activeTestimonial === i ? 1 : 0.55 }} onMouseEnter={() => setActiveTestimonial(i)}>
                <CornerAccents color={activeTestimonial === i ? `${t.color}55` : "#1e1e3022"} size={14} />
                {activeTestimonial === i && (
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18, background: `radial-gradient(ellipse at top,${t.color}0a,transparent 60%)`, pointerEvents: "none" }} />
                )}
                <div style={{ display: "flex", gap: 2, marginBottom: 16, position: "relative", zIndex: 1 }}>
                  {[...Array(t.stars)].map((_,j) => <span key={j} className="star">★</span>)}
                </div>
                <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.75, marginBottom: 20, position: "relative", zIndex: 1 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 1 }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: `${t.color}33`, border: `2px solid ${t.color}66`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: t.color, flexShrink: 0, boxShadow: activeTestimonial === i ? `0 0 16px ${t.color}44` : "none" }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: "#666", fontSize: 12 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {TESTIMONIALS.map((_,i) => <div key={i} className={`dot${activeTestimonial===i?" active":""}`} onClick={() => setActiveTestimonial(i)} />)}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div className="contact-box" style={{ background: "#0d0d1a", border: "1px solid #1e1e30", borderRadius: 24, padding: "64px 72px", position: "relative", overflow: "hidden" }}>
            <CornerAccents color="#6C63FF55" size={22} />
            <Sparkles count={6} color="#6C63FF" />
            <div style={{ position: "absolute", top: 0, left: 0, width: 240, height: 240, background: "radial-gradient(circle at top left,#6C63FF0f,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle at bottom right,#FF6B9D0a,transparent 70%)", pointerEvents: "none" }} />
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 60, alignItems: "start", position: "relative", zIndex: 1 }}>
              <div>
                <span className="section-label">GET IN TOUCH</span>
                <h2 style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: 800, lineHeight: 1.25, marginBottom: 14 }}>Let's Work Together</h2>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.75, marginBottom: 32 }}>Have a project in mind? Let's discuss how I can help you bring your ideas to life.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { icon: "✉", label: "Email", value: "prajapatinikulbhai91@gmail.com" },
                    { icon: "📞", label: "Phone", value: "+91 7202012444" },
                    { icon: "📍", label: "Location", value: "Ahmedabad, India" },
                  ].map(c => (
                    <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 42, height: 42, borderRadius: 11, background: "#6C63FF1a", border: "1px solid #6C63FF44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{c.icon}</div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ color: "#555", fontSize: 11, marginBottom: 2 }}>{c.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 500, wordBreak: "break-all" }}>{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── FORM ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <input
                    className="input-field"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData(p => ({...p, name: e.target.value}))}
                    disabled={formStatus === "sending"}
                  />
                  <input
                    className="input-field"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={e => setFormData(p => ({...p, email: e.target.value}))}
                    disabled={formStatus === "sending"}
                  />
                </div>
                <input
                  className="input-field"
                  placeholder="Project Budget"
                  value={formData.budget}
                  onChange={e => setFormData(p => ({...p, budget: e.target.value}))}
                  disabled={formStatus === "sending"}
                />
                <textarea
                  className="input-field"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData(p => ({...p, message: e.target.value}))}
                  style={{ resize: "vertical" }}
                  disabled={formStatus === "sending"}
                />

                {/* Success message */}
                {formStatus === "success" && (
                  <div style={{ background: "#00D4AA18", border: "1px solid #00D4AA44", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>✅</span>
                    <div>
                      <div style={{ color: "#00D4AA", fontWeight: 600, fontSize: 14 }}>Message sent successfully!</div>
                      <div style={{ color: "#666", fontSize: 12, marginTop: 2 }}>I'll get back to you within 24 hours.</div>
                    </div>
                  </div>
                )}

                {/* Error message */}
                {formStatus === "error" && (
                  <div style={{ background: "#FF4B4B18", border: "1px solid #FF4B4B44", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>❌</span>
                    <div>
                      <div style={{ color: "#FF4B4B", fontWeight: 600, fontSize: 14 }}>Something went wrong.</div>
                      <div style={{ color: "#666", fontSize: 12, marginTop: 2 }}>Please try again or email directly.</div>
                    </div>
                  </div>
                )}

                <button
                  className="btn-primary"
                  style={{ alignSelf: "flex-end", padding: "14px 32px", opacity: formStatus === "sending" ? 0.7 : 1, cursor: formStatus === "sending" ? "not-allowed" : "pointer" }}
                  onClick={handleSubmit}
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending" ? "Sending... ⏳" : "Send Message →"}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #1e1e30", padding: "24px", position: "relative", zIndex: 1 }}>
        <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#444", fontSize: 13 }}>© 2024 Nikul Prajapati. All rights reserved.</span>
          <span style={{ color: "#444", fontSize: 13 }}>Designed & Built with ❤️ by Nikul Prajapati</span>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ── */}
      <div
        style={{ position: "fixed", bottom: 24, right: 24, width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#6C63FF,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, zIndex: 50, transition: "transform .2s,box-shadow .2s", animation: "glowPulse 3s ease-in-out infinite" }}
        onClick={() => scrollToSection("home")}
        onMouseEnter={e => { e.currentTarget.style.transform="scale(1.12) translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 28px #6C63FF88"; }}
        onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow=""; }}
      >↑</div>
    </div>
  );
}