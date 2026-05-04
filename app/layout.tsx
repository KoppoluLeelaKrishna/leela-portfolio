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
  title: "Leela Krishna Koppolu | Data + AI Engineer Portfolio",
  description:
    "Data and AI engineer portfolio — AWS and Azure pipelines, PySpark ETL, LangChain RAG systems, real-time ML feature engineering, LLM integrations, and enterprise analytics delivery.",
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
              <span className="muted">Data Engineer based in Dallas, Texas</span>
            </div>
          </footer>
          <FloatingAssist />
        </div>
      </body>
    </html>
  );
}
