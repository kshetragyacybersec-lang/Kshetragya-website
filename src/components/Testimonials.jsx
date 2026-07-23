import { testimonials } from '../data.js';

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="tm-head">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>Client Feedback</div>
        <h2 className="sec-h dark">What clients say<br/><em>after the engagement.</em></h2>
        <p className="tm-note">Real feedback, added as engagements complete — this section grows with every project we deliver.</p>
      </div>
      <div className="tm-grid">
        {testimonials.map(t => (
          <div className="tm-card" key={t.name}>
            <p className="tm-quote">{t.quote}</p>
            <div className="tm-person">
              <div className="tm-avatar">{t.initials}</div>
              <div>
                <div className="tm-name">{t.name}</div>
                <div className="tm-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
