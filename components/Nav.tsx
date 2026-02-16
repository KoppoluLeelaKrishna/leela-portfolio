import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/resume", label: "resume" },
  { href: "/contact", label: "contact" },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="navInner">
        <div className="brand">
          <div className="logo">
            <strong>Leela Krishna Koppolu</strong>
            <span className="role">Data Scientist specializing in Data Engineering & Analytics</span>
         </div>

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
