import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="navInner">
        <Link className="brand" href="/">
          <span className="brandOverline">Portfolio</span>
          <strong>Leela Krishna Koppolu</strong>
          <span>Data Engineer for cloud, ETL, and analytics delivery</span>
        </Link>

        <nav className="links" aria-label="Site navigation">
          {links.map((l) => (
            <Link key={l.href} className="link" href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          className="btn btnPrimary navCta"
          href="/Resume_Data%20Engineer_Leela%20Krishna%20Koppolu_2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Resume
        </a>
      </div>
    </header>
  );
}
