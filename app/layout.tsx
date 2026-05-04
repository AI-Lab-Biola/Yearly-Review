import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Lab at Biola University — 2025–2026 Yearly Review",
  description:
    "A year of exploration, research, and faith-informed engagement with artificial intelligence at Biola University.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
