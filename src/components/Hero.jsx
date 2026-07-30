export default function Hero() {
  return (
    <section className="hero" id="main-content" tabIndex={-1}>
      <div className="hero-overlay" aria-hidden="true"></div>

      <div className="hero-visual">
        <img src="/hero-visual.jpg" alt="Security analyst reviewing network monitoring dashboards" />
      </div>

      <dl className="hero-stats">
        <div className="hstat">
          <dt className="hstat-lbl">Service Lines</dt>
          <dd className="hstat-num">9</dd>
        </div>
        <div className="hstat">
          <dt className="hstat-lbl">Report Turnaround</dt>
          <dd className="hstat-num">72h</dd>
        </div>
        <div className="hstat">
          <dt className="hstat-lbl">Remote Delivery</dt>
          <dd className="hstat-num">Global</dd>
        </div>
      </dl>

      <div className="hero-content">
        <div className="hero-ch">
          <span className="hero-ch-mark">Bhagavad Gita · Chapter XIII · Verse 2</span>
          <span className="hero-ch-rule" aria-hidden="true"></span>
        </div>
        <p className="hero-sk" lang="sa">यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति</p>
        <h1 className="hero-h1">He who knows the field -<br/>that one is called <em>Kshetragya.</em></h1>
        <p className="hero-p">In cybersecurity, complete knowledge of the terrain wins before the attack begins. We know your network, your vulnerabilities, your field - before threats do.</p>
        <div className="hero-actions">
          <a className="btn-v" href="#contact">Request Free Assessment</a>
          <a className="btn-g" href="#services">View All Services</a>
        </div>
        <div className="hero-scroll">
          <span className="scroll-lbl">Enter the field</span>
          <span className="scroll-line" aria-hidden="true"></span>
        </div>
      </div>
    </section>
  );
}
