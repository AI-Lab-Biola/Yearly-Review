"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import IntroAnimation from "@/components/ui/scroll-morph-hero";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { NewsletterSignup } from "@/components/ui/newsletter-signup";
import PartnerLogos from "@/components/ui/partner-logos";

// ─── Shared UI primitives ────────────────────────────────────────────────────

/** Consistent section heading block used in every section. */
function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <RevealOnScroll className="mb-16">
      <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-[var(--gold)] mb-3">
        {label}
      </span>
      <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-[var(--text)] leading-tight">
        {title}
      </h2>
      <div className="mt-4 w-12 h-1 rounded-full bg-[var(--red)]" />
      {description && (
        <p className="mt-5 text-[var(--muted)] text-base max-w-lg">{description}</p>
      )}
    </RevealOnScroll>
  );
}

/** Parallax dot-grid background — shared across all sections. */
function DotGrid({ y }: { y: import("framer-motion").MotionValue<number> }) {
  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      aria-hidden
    >
      <div
        className="w-full h-[120%]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--text) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </motion.div>
  );
}

/** Gradient divider between sections. */
function SectionFade({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="h-24 w-full pointer-events-none"
      style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
    />
  );
}

/** Scroll-reveal wrapper — used on every content block. */
function RevealOnScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Active nav tracker ──────────────────────────────────────────────────────

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const best = visible.reduce((a, b) =>
            Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b
          );
          setActive(best.target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote: "I got the opportunity to go to the Gloo AI hackathon this fall in Boulder, CO. I was able to build an iOS-based screen time app that used AI to help you think, pray, and get better at using your phone in a healthy flourishing way. This was by far the most exciting time of my first semester at Biola.",
    name: "Benjamin Currie",
    designation: "AI Lab Associate",
    src: "/images/Ben.jpeg",
  },
  {
    quote: "When I joined the AI lab, my goal was to learn about modern tools, grow in community, and stay on top of a fast-changing world. This year, those very hopes that drew me to Biola were realised through the AI Lab. I had the great opportunity to travel to the Philippines with Stefan. Overall, it's an honour to be a part of something so transformational, for both my career and my faith.",
    name: "Mani Ellerington",
    designation: "AI Lab Associate",
    src: "/images/Mani.jpeg",
  },
  {
    quote: "Joining the AI lab this year has been such a great opportunity for me! It has grown me in so many needed areas, including my technical, professional and interpersonal skills. The AI lab has been a place of growth that has given me so many valuable learning opportunities that I could never have gotten in a classroom. I'm grateful I joined.",
    name: "Clara Zhao",
    designation: "AI Lab Apprentice",
    src: "/images/Clara.jpeg",
  },
  {
    quote: "I would definitely say that I grew a lot in character and understanding. As I studied, worked, and learned, my resilience grew, and my appreciation towards people working in the field of business and technology grew. I understood better how business systems and technological systems work, and gained more understanding of this society in general.",
    name: "Joseph Han",
    designation: "AI Lab Apprentice",
    src: "/images/Joseph.jpeg",
  },
  {
    quote: "The AI Lab is such a great opportunity to put your ideas and skills into action. I got to travel to Colorado for the Gloo Hackathon, make incredible connections, and build a project that saved the housing department over 40–50 hours of manual work. The AI Lab has prepared me to create meaningful products and use technology in a God-honoring way.",
    name: "Megan Lai",
    designation: "AI Lab Associate",
    src: "/images/Maggy.jpeg",
  },
  {
    quote: "Learning happens when there is friction — the process of struggling gives you a stronger understanding, and that's one thing AI can't automate. This year I discovered how many different ways people use AI, from rapid prototyping to architecting entire systems. Computer science is cool, and I'm still figuring out the rest.",
    name: "Jefferson Hong",
    designation: "AI Lab Apprentice",
    src: "/images/Jefferson.jpeg",
  },
  {
    quote: "I came in with a strong math background, but this year pushed me to apply those skills in a much more practical, collaborative setting. Working on a real integrated data system taught me how to handle messy datasets and build usable tools — not just analyze. This community showed me how we can all grow with AI together.",
    name: "Maddie Ebright",
    designation: "AI Lab Apprentice",
    src: "/images/Maddie.jpeg",
  },
];

const fallTimeline = [
  { date: "Fall 2025", title: "Spoke at Christians for Impact Conference", desc: "Traveled to Washington DC for the Christians for Impact Conference, presenting a live showcase of the most influential AI tools alongside an ethical discussion grounded in Christian values. We also attended the AI & Religion conference, connecting with faith leaders on how to steward AI responsibly. Thank you to Shon Pan, JD Bauman, William Jones, and Vesa Hautala for the opportunity.", img: "/images/Christians for Impact Conference.jpeg" },
  { date: "Fall 2025", title: "Spoke at CUPA HR Conference", desc: "The AI Lab was invited for the first time to speak at CUPA HR, the premier conference for human resources professionals in higher education, bringing a conversation about AI to over 1,400 HR leaders from colleges and universities across the country.", img: "/images/Cupa HR Fall 2025.jpeg" },
  { date: "Oct 2025", title: "Gloo AI Hackathon", desc: "A team of 13 students and staff traveled to Boulder, CO to compete among nearly 700 innovators from 48 states and 27 countries. We built three projects — two made the finals. Flora won 1st place ($10K) in Vibe Coding, and Ephphatha, an ASL church interpreter app, won the Hacker's Choice Award ($5K). Two awards. $15,000. Out of 98 teams.", img: "/images/Gloo Hackathon.jpeg", links: [{ label: "Read the Article", href: "https://www.biola.edu/blogs/biola-news/2025/biola-ai-lab-wins-two-awards-at-gloo-ai-hackathon" }] },
  { date: "Dec 2025", title: "Spoke at the Christian Camp & Conference Association", desc: "Stefan Jungmichel and Joseph Hartono traveled to New Orleans for the Go With Me Conference, speaking to ministry leaders on how to use AI to increase administrative efficiency, apply it safely and responsibly across various use cases, and navigate the ethical risks AI presents specifically for kids ministries. Thank you to Jen Howver for the wonderful opportunity.", img: "/images/go with me.jpg" },
  { date: "Dec 2025", title: "AI Lab Video Series", desc: "Launched our first video series exploring the heart behind the AI Lab — why it exists, what we believe about technology and faith, and what we're building toward.", img: "/images/Why ai lab exists.png", links: [{ label: "Why the AI Lab Exists", href: "https://youtu.be/frBXk0TVc2o" }] },
  { date: "Dec 2025", title: "AI Lab Christmas Special", desc: "To close out the semester, the AI Lab team went all out — producing two videos, launching a new landing page, building a holiday video game, recording a podcast episode, and publishing an article on AI and critical thinking. A creative sprint that showed what this team is capable of.", img: "/images/Christmas Special.png", links: [{ label: "Play the Game", href: "https://snow-blizzard-blast.lovable.app/" }, { label: "AI & Critical Thinking", href: "https://aiandcriticalthinking.lovable.app/" }] },
];

const springTimeline = [
  { date: "Mar 2026", title: "AI Summit at Oklahoma Baptist University", desc: "Represented the AI Lab at the Oklahoma Baptist University AI Summit as keynote speaker and breakout session leader. Sessions covered the current capabilities of AI and their implications for higher education, applying AI responsibly within a Christian ethical framework, structuring assignments effectively in the age of AI, and thinking critically about AI implementation in the classroom. Thank you to Joshua Shoffner and OBU for the wonderful hospitality.", img: ["/images/Oklahoma.jpeg", "/images/Oklahoma 2.jpeg"] },
  { date: "Mar 2026", title: "AI Lab High School Camp", desc: "In collaboration with Biola's School of Science and Technology, we hosted an AI hackathon for high school students from across the Los Angeles area. Teams competed by building software projects from scratch — a hands-on introduction to AI, problem-solving, and technology with purpose.", img: ["/images/Highschool AI.png", "/images/Highschool AI 1.png"], imgPosition: "center 30%" },
  { date: "Apr 2026", title: "CUPA HR Conference", desc: "Returned to the CUPA HR Conference to go deeper on AI in human resources — covering data visualization, workforce analytics, ethical AI, deepfake policy, and the future outlook for HR leaders navigating a rapidly shifting landscape.", img: ["/images/Cupa HR Spring.jpg", "/images/Cupa Hr Spring 1.jpg"] },
  { date: "Apr 2026", title: "Missional AI Conference", desc: "Represented Biola at the Missional AI Conference alongside Kingdom-minded technologists.", img: "/images/Missional AI.png", imgPosition: "center 30%" },
  { date: "Spring 2026", title: "Biola Health Center Inventory System", desc: "AI Lab student Felicity Zhang built a smart inventory tracking system for Biola's Health Center. The software uses a scanner to automatically add and subtract inventory in real time, and includes an automated alert system that notifies staff when items are running low or approaching expiration. The prototype is currently in testing and nearing deployment.", img: "/images/Healthcare.png" },
  { date: "Spring 2026", title: "Grace Adventures Database Integration", desc: "Biola student Maddie Ebright partnered with the AI Lab to build a custom software solution for Grace Adventures, a Christian camp and outdoor ministry. Grace Adventures had three separate databases with no unified way to access or query them together. Maddie leveraged AI tools to develop an integrated system that pulls from all three databases in one place — giving the Grace Adventures team a single interface to find information, surface insights, and streamline operations. The project is still in active development.", img: "/images/Grace Adventures Medi.png" },
  { date: "Apr 2026", title: "Mission Trip to the Philippines", desc: "From April 10–19, the AI Lab traveled to the Philippines alongside Ani Fund and Sacred Harvest Foundation to train tribal communities, churches, and ministries on effective and responsible AI use. We taught handwritten form digitization (converting stacks of paper records into structured Excel dashboards instantly), automation workflows to eliminate manual data re-entry, Claude + Canva integration for professional on-brand design at minimal cost, and hands-on one-on-one sessions walking through real use cases from their actual work. A full documentary of the journey is coming soon.", img: ["/images/Philippines Trip.png", "/images/Philippines.jpeg", "/images/Philippines 2.jpeg", "/images/Philippines 3.jpeg", "/images/Phillippes 4.jpeg", "/images/Philippines 5.jpeg"] },
  { date: "Spring 2026", title: "Launched a Course for Fall 2026", desc: "Developed and will teach a new 15-week course at Biola's Crowell School of Business: BUSN 450 — \"How to Build a Business with AI.\" Students build an entire business from scratch using AI responsibly across research, data analysis and visualization, marketing and content generation, website development and automation, and ethical AI grounded in human dignity, flourishing, and Imago Dei. All materials are built from real-world AI Lab client work.", img: ["/images/Class 2026.jpeg", "/images/Class.png"] },
];

// ─── Timeline card ───────────────────────────────────────────────────────────

type TimelineItem = {
  date: string;
  title: string;
  desc: string;
  img: string | string[];
  imgPosition?: string;
  links?: { label: string; href: string }[];
};

function SeasonDivider({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-2 py-6 md:py-10">
      <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--gold)]/60">Academic Year</span>
      <span className="text-2xl md:text-3xl font-bold text-[var(--text)] tracking-tight">{label}</span>
      <div className="w-10 h-0.5 rounded-full bg-[var(--red)]" />
    </div>
  );
}

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;
  const images = Array.isArray(item.img) ? item.img : [item.img];
  const [imgIdx, setImgIdx] = useState(0);

  const card = (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col group-hover:border-[var(--gold)]/40 transition-colors duration-300">
      <div className="h-44 flex-shrink-0 overflow-hidden relative">
        <img
          src={images[imgIdx]}
          alt={item.title}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
          style={{ objectPosition: item.imgPosition ?? "center" }}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + images.length) % images.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % images.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setImgIdx(i); }} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIdx ? "bg-white" : "bg-white/40"}`} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex flex-col gap-2">
        <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--gold)]">
          {item.date}
        </span>
        <h3 className="text-lg font-bold text-[var(--text)] leading-snug">{item.title}</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed">{item.desc}</p>
        {item.links && item.links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {item.links.map((link) => {
              const isYouTube = link.href.includes("youtu");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--red)] text-white hover:bg-[var(--red)]/80 transition-colors duration-200"
                >
                  {isYouTube ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 flex gap-4 items-start group"
    >
      {/* Left slot */}
      <div className={`hidden md:block ${isLeft ? "" : "pointer-events-none"}`}>
        {isLeft && card}
      </div>

      {/* Center dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
          className="w-3.5 h-3.5 rounded-full bg-[var(--red)] ring-4 ring-[var(--red)]/20 mt-2 relative z-10 group-hover:bg-[var(--gold)] group-hover:ring-[var(--gold)]/20 transition-colors"
        />
      </div>

      {/* Right slot + mobile fallback */}
      <div className={`md:block ${!isLeft ? "" : "md:pointer-events-none"}`}>
        <div className={`md:hidden ${isLeft ? "block" : "hidden"}`}>{card}</div>
        {!isLeft && card}
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const navLinks = [
    { label: "Home",         href: "#home",         id: "home" },
    { label: "Testimonials", href: "#testimonials",  id: "testimonials" },
    { label: "Partners",     href: "#partners",      id: "partners" },
    { label: "Timeline",     href: "#timeline",      id: "timeline" },
    { label: "Newsletter",   href: "#newsletter",    id: "newsletter" },
  ];
  const activeSection = useActiveSection(navLinks.map((l) => l.id));

  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const gridY = useTransform(smoothProgress, [0, 1], [0, -120]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <div ref={pageRef} className="bg-[var(--bg)] text-[var(--text)] min-h-screen">

      {/* ── Nav ───────────────────────────────────────────────────────────────── */}
      <motion.nav
        style={{ backgroundColor: `rgba(11, 17, 32, ${navOpacity})` }}
        className="fixed top-0 left-0 right-0 z-50 h-[64px] backdrop-blur-xl border-b border-[var(--border)]/60"
      >
        <div className="max-w-[1200px] mx-auto px-7 h-full flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img src="/images/AI Lab Logo White.png" alt="AI Lab at Biola University" className="h-10" />
          </a>
          <ul className="hidden md:flex gap-7 list-none items-center">
            {navLinks.map(({ label, href, id }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-300 no-underline ${
                    activeSection === id
                      ? "text-[var(--gold)]"
                      : "text-[var(--text)]/60 hover:text-[var(--gold)]"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://www.biola.edu/ai-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold px-4 py-1.5 rounded-full border border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white transition-all no-underline"
              >
                AI Lab ↗
              </a>
            </li>
          </ul>
        </div>
      </motion.nav>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section id="home" className="h-screen w-full">
        <IntroAnimation />
      </section>

      <SectionFade from="var(--bg)" to="var(--bg)" />

      {/* ── Testimonials ──────────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-28 bg-[var(--bg)] relative overflow-hidden">
        <DotGrid y={gridY} />
        <div className="max-w-[1200px] mx-auto px-7 relative">
          <SectionHeading label="Student Voices" title="What Our Students Say" />
          <RevealOnScroll delay={0.15}>
            <div className="flex items-center justify-center relative" style={{ maxWidth: "1456px" }}>
              <CircularTestimonials
                testimonials={testimonials}
                autoplay={true}
                colors={{
                  name: "#f7f7ff",
                  designation: "#e1e1e1",
                  testimony: "#f1f1f7",
                  arrowBackground: "#CC1122",
                  arrowForeground: "#f1f1f7",
                  arrowHoverBackground: "#EDA72B",
                }}
                fontSizes={{
                  name: "28px",
                  designation: "20px",
                  quote: "20px",
                }}
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <SectionFade from="var(--bg)" to="var(--bg)" />

      {/* ── Team Photo ────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[var(--bg)] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-7">
          <RevealOnScroll>
            <div className="flex flex-col items-center gap-6 text-center">
              <SectionHeading label="Our People" title="AI Lab Team 2025–2026" />
              <div className="rounded-2xl overflow-hidden border border-[var(--border)] w-[70%]">
                <img
                  src="/images/AI Lab Team.jpg"
                  alt="AI Lab Team 2025–2026"
                  className="w-full object-cover"
                />
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed max-w-3xl">
                Pictured here is the AI Lab team for 2026. From right to left in the back row: Dr. David Bourgeois, Stefan Jungmichel, Mani Ellerington, Jefferson Hong, Joseph Han, Miracle Toluwalase, Phinehas Milton, and Dr. Arena. In the second row: Ruth Demissie, Felicity Zhang, Megan Lai, Clara Zhao, Maddie Ebright, Ben Currie, and Natasha Warner. A sincere thank you to Amber Nakamoto from Biola Admissions, with the support of Joseph Rubio, for generously equipping the AI Lab with new gear this year. We are deeply grateful for this team and excited to serve Biola faculty, students, and staff as well as Christian organizations in the years to come.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <SectionFade from="var(--bg)" to="var(--bg)" />

      {/* ── Partners ──────────────────────────────────────────────────────────── */}
      <section id="partners" className="py-28 bg-[var(--bg)] relative overflow-hidden">
        <DotGrid y={gridY} />
        <div className="max-w-[1200px] mx-auto px-7 relative">
          <SectionHeading
            label="Collaborations"
            title="Our Partners"
            description="We collaborate with leading organizations to advance AI opportunities for Biola students, further AI research, and help advance Kingdom work through technology."
          />
          <RevealOnScroll delay={0.15}>
            <PartnerLogos />
          </RevealOnScroll>
        </div>
      </section>

      <SectionFade from="var(--bg)" to="var(--surface)" />

      {/* ── Timeline ──────────────────────────────────────────────────────────── */}
      <section id="timeline" className="py-28 bg-[var(--surface)] relative overflow-hidden">
        <DotGrid y={gridY} />
        <div className="max-w-[1200px] mx-auto px-7 relative">
          <SectionHeading
            label="Academic Year"
            title="2025–2026 Timeline"
            description="Key moments from the year — from campus workshops to global mission."
          />

          {/* Vertical track */}
          <div className="relative">
            <div className="absolute left-[6px] md:left-1/2 md:-translate-x-px top-2 bottom-2 w-px bg-gradient-to-b from-[var(--red)] via-[var(--border)] to-transparent" />
            <div className="flex flex-col gap-10">
              <SeasonDivider label="Fall 2025" />
              {fallTimeline.map((item, i) => (
                <TimelineCard key={i} item={item} index={i} />
              ))}
              <SeasonDivider label="Spring 2026" />
              {springTimeline.map((item, i) => (
                <TimelineCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionFade from="var(--surface)" to="var(--bg)" />

      {/* ── Newsletter ─────────────────────────────────────────────────────── */}
      <section id="newsletter" className="py-28 bg-[var(--bg)] relative overflow-hidden">
        <DotGrid y={gridY} />
        <RevealOnScroll className="max-w-[640px] mx-auto px-7 relative">
          <NewsletterSignup />
        </RevealOnScroll>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer className="py-10 bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="max-w-[1200px] mx-auto px-7 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <img src="/images/White Biola Logo.png" alt="Biola University" className="h-6 opacity-50" />
            <div className="w-px h-5 bg-[var(--border)]" />
            <img src="/images/AI Lab Logo White.png" alt="AI Lab" className="h-6 opacity-50" />
          </div>
          <p className="text-[0.78rem] text-[var(--muted)]">
            © 2026 AI Lab at Biola University · 13800 Biola Ave, La Mirada, CA
          </p>
        </div>
      </footer>
    </div>
  );
}
