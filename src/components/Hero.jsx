export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-visual">
        <img src="/hero-visual.jpg" alt="Cybersecurity operations" />
      </div>

      <div className="hero-stats">
        <div className="hstat"><span className="hstat-num">9</span><span className="hstat-lbl">Service Lines</span></div>
        <div className="hstat"><span className="hstat-num">72h</span><span className="hstat-lbl">Report Turnaround</span></div>
        <div className="hstat"><span className="hstat-num">Global</span><span className="hstat-lbl">Remote Delivery</span></div>
      </div>

      <div className="hero-content">
        <div className="hero-ch">
          <span className="hero-ch-mark">Bhagavad Gita · Chapter XIII · Verse 2</span>
          <span className="hero-ch-rule"></span>
        </div>
        <div className="hero-sk">यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति</div>
        <h1 className="hero-h1">He who knows the field -<br/>that one is called <em>Kshetragya.</em></h1>
        <p className="hero-p">In cybersecurity, complete knowledge of the terrain wins before the attack begins. We know your network, your vulnerabilities, your field - before threats do.</p>
        <div className="hero-actions">
          <a className="btn-v" href="#contact">Request Free Assessment</a>
          <a className="btn-g" href="#services">View All Services</a>
        </div>
        <div className="hero-scroll">
          <span className="scroll-lbl">Enter the field</span>
          <span className="scroll-line"></span>
        </div>
      </div>
    </section>
  );
}
