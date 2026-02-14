export default function ResumePage() {
  return (
    <div>
      <h1 className="h1">Resume</h1>
      <p className="sub">
        Download my resume as PDF or open it in a new tab.
      </p>

      <div className="card">
        <div className="ctaRow">
          <a className="btn" href="/Leela_Krishna_Koppolu_Resume.pdf" download>
            Download Resume
          </a>

          <a
            className="btn"
            href="/Leela_Krishna_Koppolu_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View in Browser ↗
          </a>
        </div>

        <p className="sub" style={{ marginTop: 12 }}>
          If the PDF doesn’t open, confirm the file exists at{" "}
          <code>public/Leela_Krishna_Koppolu_Resume.pdf</code>
        </p>
      </div>
    </div>
  );
}
