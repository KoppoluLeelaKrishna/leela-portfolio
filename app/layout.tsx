import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Nav from "@/components/Nav";

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
  title: "Leela Krishna Koppolu | Data Engineer Portfolio",
  description:
    "Recruiter-focused data engineer portfolio featuring AWS and Azure pipelines, PySpark ETL delivery, workflow orchestration, analytics-ready data products, and enterprise reporting support.",
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
          <Nav />
          <main className="container">{children}</main>
          <footer className="footer">
            <div className="footerInner">
              <span>&copy; {new Date().getFullYear()} Leela Krishna Koppolu</span>
              <span className="muted">Data Engineer based in Dallas, Texas</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
