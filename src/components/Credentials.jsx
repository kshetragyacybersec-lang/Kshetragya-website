import { credentials } from '../data.js';

export default function Credentials() {
  return (
    <section id="credentials">
      <div style={{ maxWidth: 640, margin: '0 auto 3rem', textAlign: 'center' }}>
        <div className="eyebrow on-dark" style={{ justifyContent: 'center' }}>Our Qualifications</div>
        <h2 className="sec-h light">Certifications &<br/><em>active expertise.</em></h2>
        <p className="cred-note" style={{ marginTop: '1rem' }}>Each partner specializes in their domain with certifications matched precisely to their service ownership. Depth over breadth - always.</p>
      </div>
      <div className="cred-grid">
        {credentials.map(block => (
          <div className="cred-block" key={block.name}>
            <div className="cb-hd"><span className="cb-n">{block.name}</span></div>
            <div className="cb-chips">
              {block.chips.map(chip => (
                <span className={`cc ${chip.state}`} key={chip.label}>
                  <span className="cd"></span>{chip.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
