import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import AnimationProvider from "@/components/AnimationProvider";
import FloatingAssist from "@/components/FloatingAssist";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Leela Krishna Koppolu | AI & Data Engineer Portfolio",
  description:
    "AI engineer portfolio — GenAI applications, LangChain RAG pipelines, vector search, real-time ML feature engineering, and the AWS/Databricks/Snowflake data infrastructure behind them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${cormorant.variable}`}>
        <div className="siteShell">
          <div className="scrollBar" aria-hidden="true" />
          <AnimationProvider />
          <Nav />
          <main className="container">{children}</main>
          <footer className="footer">
            <div className="footerInner">
              <span>&copy; {new Date().getFullYear()} Leela Krishna Koppolu</span>
              <span className="muted">AI &amp; Data Engineer based in Dallas, Texas</span>
            </div>
          </footer>
          <FloatingAssist />
        </div>
      </body>
    </html>
  );
}
