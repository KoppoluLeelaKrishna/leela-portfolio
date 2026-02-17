export default function ResumePage() {
  return (
    <div>
      <h1 className="h1">Resume</h1>
      <p className="sub">Download or view my resume PDF.</p>

      <div className="card">
        <div className="ctaRow">
          <a className="btn" href="/Resume_DS_2026.pdf" download>
            Download Resume
          </a>
          <a
            className="btn"
            href="/Resume_DS_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View in Browser ↗
          </a>
        </div>
      </div>
    </div>
  );
}
