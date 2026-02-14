import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Leela Krishna Koppolu | Data Engineer & Data Analyst",
  description:
    "Portfolio of Leela Krishna Koppolu — Cloud Data Engineer & Data Analyst specializing in AWS, Azure, Spark, SQL, Python, ETL, and dashboards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="footerInner">
            <span>© {new Date().getFullYear()} Leela Krishna Koppolu</span>
            <span className="muted">Built with Next.js</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
