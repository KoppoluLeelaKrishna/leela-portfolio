export default function ContactPage() {
  return (
    <div>
      <h1 className="h1">Contact</h1>
      <p className="sub">
        Want to discuss a data engineering role, collaboration, or project opportunity? Reach out.
      </p>

      <div className="card">
        <h2>Reach me</h2>
        <div className="ctaRow">
          <a className="btn" href="mailto:leelakrishnakoppolu@gmail.com">
            Email
          </a>

          <a
            className="btn"
            href="https://www.linkedin.com/in/leela-krishna-klk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a
            className="btn"
            href="https://github.com/KoppoluLeelaKrishna"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>

        <p className="sub" style={{ marginTop: 12 }}>
          Dallas, Texas, USA | Open to opportunities and relocation.
        </p>
      </div>
    </div>
  );
}
