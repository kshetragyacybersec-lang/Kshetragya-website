import { testimonials } from '../data.js';

export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading">
      <div className="tm-head">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>Client Feedback</div>
        <h2 className="sec-h dark" id="testimonials-heading">What clients say<br/><em>after the engagement.</em></h2>
        <p className="tm-note">Real feedback, added as engagements complete — this section grows with every project we deliver.</p>
      </div>
      <div className="tm-grid">
        {testimonials.map(t => (
          <blockquote className="tm-card" key={t.name}>
            <p className="tm-quote">{t.quote}</p>
            <footer className="tm-person">
              <div className="tm-avatar" aria-hidden="true">{t.initials}</div>
              <div>
                <cite className="tm-name">{t.name}</cite>
                <div className="tm-role">{t.role}</div>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
