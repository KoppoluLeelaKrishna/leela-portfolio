export default function ContactPage() {
  return (
    <div>
      <h1 className="h1">Contact</h1>
      <p className="sub">
        Want to collaborate or discuss a role? Reach out — I reply quickly.
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
            LinkedIn ↗
          </a>

          <a
            className="btn"
            href="https://github.com/KoppoluLeelaKrishna"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>

        <p className="sub" style={{ marginTop: 12 }}>
          Update the LinkedIn URL to your real profile.
        </p>
      </div>
    </div>
  );
}
