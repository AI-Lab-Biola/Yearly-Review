"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export interface NewsletterSignupProps {
  className?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-5"
      >
        <div className="flex items-start justify-center gap-2 flex-col">
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-[var(--gold)]">
            Stay Connected
          </span>
          <motion.h2
            className="text-2xl font-bold text-[var(--text)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Subscribe to the AI Lab Newsletter
          </motion.h2>
          <motion.p
            className="text-[var(--muted)] text-sm"
            initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4 }}
          >
            Get the latest on events, workshops, research, and opportunities from the AI Lab at Biola University.
          </motion.p>
        </div>
        <motion.a
          href="https://mailchi.mp/biola/ai-lab"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, filter: "blur(3px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--red)] hover:bg-[var(--gold)] text-white text-sm font-semibold rounded-md transition-colors duration-200 no-underline"
        >
          <Send className="h-4 w-4" />
          Subscribe
        </motion.a>
      </motion.div>
    </div>
  );
};
