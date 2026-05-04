"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── Partner data ────────────────────────────────────────────────────────────

interface Partner {
  id: string;
  name: string;
  url: string;
  logo: React.ReactNode;
}

function TextLogo({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`text-current whitespace-nowrap select-none leading-none ${className}`}
      style={style}
    >
      {text}
    </span>
  );
}

const partners: Partner[] = [
  {
    id: "ani-fund",
    name: "Ani Fund",
    url: "https://www.ani.fund",
    logo: <TextLogo text="ani fund" className="text-[15px] sm:text-[17px] tracking-wide" style={{ fontWeight: 800 }} />,
  },
  {
    id: "clearly-filtered",
    name: "ClearlyFiltered",
    url: "https://www.clearlyfiltered.com",
    logo: <TextLogo text="ClearlyFiltered" className="text-[13px] sm:text-[15px] tracking-tight" style={{ fontWeight: 700 }} />,
  },
  {
    id: "exit-hours",
    name: "Exit Hours",
    url: "https://www.exithours.com",
    logo: <TextLogo text="EXIT HOURS" className="text-[13px] sm:text-[15px] tracking-[0.15em]" style={{ fontWeight: 900 }} />,
  },
  {
    id: "indigitous",
    name: "Indigitous",
    url: "https://indigitous.org",
    logo: <TextLogo text="INDIGITOUS" className="text-[12px] sm:text-[14px] tracking-[0.2em]" style={{ fontWeight: 600 }} />,
  },
  {
    id: "seid",
    name: "SEID",
    url: "https://www.biola.edu/seid",
    logo: <TextLogo text="SEID" className="text-[16px] sm:text-[18px] tracking-[0.08em]" style={{ fontWeight: 700, fontVariant: "small-caps" }} />,
  },
  {
    id: "samaritans-purse",
    name: "Samaritan's Purse",
    url: "https://www.samaritanspurse.org",
    logo: <TextLogo text="Samaritan's Purse" className="text-[12px] sm:text-[14px] tracking-wide" style={{ fontWeight: 700 }} />,
  },
  {
    id: "global-media-outreach",
    name: "Global Media Outreach",
    url: "https://www.globalmediaoutreach.com",
    logo: <TextLogo text="Global Media Outreach" className="text-[11px] sm:text-[13px] tracking-wide" style={{ fontWeight: 700 }} />,
  },
  {
    id: "gloo-ai",
    name: "Gloo AI",
    url: "https://gloo.com",
    logo: <TextLogo text="gloo ai" className="text-[16px] sm:text-[18px] tracking-tight" style={{ fontWeight: 800 }} />,
  },
  {
    id: "the-gen-ai",
    name: "The Gen AI",
    url: "https://thegenai.ai/",
    logo: <TextLogo text="THE GEN AI" className="text-[12px] sm:text-[14px] tracking-[0.18em]" style={{ fontWeight: 800 }} />,
  },
  {
    id: "grace-adventures",
    name: "Grace Adventures",
    url: "https://graceadventures.org/",
    logo: (
      <img
        src="/images/Grace_Adventures-removebg-preview.png"
        alt="Grace Adventures"
        className="h-7 sm:h-8 w-auto object-contain opacity-30 group-hover:opacity-90 transition-opacity duration-200"
      />
    ),
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function PartnerLogos() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activePartner = partners.find((p) => p.id === hoveredId);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-16 w-full max-w-6xl mx-auto py-8 sm:py-12">
      {/* Left: text */}
      <div className="flex-shrink-0 w-full sm:w-auto text-center sm:text-left">
        <p className="text-sm sm:text-base text-[var(--muted)] font-medium mb-0 tracking-tight">
          Partnered with
        </p>
        <div className="relative">
          <p
            aria-hidden
            className="text-2xl sm:text-3xl font-bold tracking-tight whitespace-nowrap opacity-0 pointer-events-none select-none leading-none sm:leading-tight"
          >
            leading organizations
          </p>
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={hoveredId ?? "default"}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--text)] leading-none sm:leading-tight tracking-tight whitespace-nowrap"
              >
                {activePartner?.name ?? "leading organizations"}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right: logo grid */}
      <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto md:mt-6 sm:mt-0">
        {partners.map(({ id, name, url, logo }) => {
          const isActive = hoveredId === id;
          const isDimmed = hoveredId !== null && !isActive;
          return (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className={[
                "group flex items-center justify-center p-2.5 sm:p-3 lg:p-3.5 rounded-lg border transition-all duration-200 no-underline",
                isActive
                  ? "border-[var(--gold)]/40 text-[var(--text)] bg-[var(--text)]/5"
                  : "border-transparent text-[var(--text)]/30 hover:text-[var(--text)]/50",
                isDimmed ? "opacity-40" : "",
              ].join(" ")}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {logo}
            </a>
          );
        })}
      </div>
    </div>
  );
}
