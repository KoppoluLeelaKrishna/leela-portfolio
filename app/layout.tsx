import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Leela Krishna Koppolu | Data Scientist",
  description:
    "Portfolio of Leela Krishna Koppolu — Data Scientist specializing in ML, analytics, and cloud data platforms. Explore my projects, experience, and skills in data science, machine learning, and cloud engineering.",
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
