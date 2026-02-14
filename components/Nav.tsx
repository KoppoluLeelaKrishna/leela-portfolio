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
        <div className="brand">
          <strong>Leela Krishna Koppolu</strong>
          <span>Data Engineer & Data Analyst</span>
        </div>

        <nav className="links" aria-label="Site navigation">
          {links.map((l) => (
            <Link key={l.href} className="link" href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
