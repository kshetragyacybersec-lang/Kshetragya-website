import { areasServed } from '../data.js';

export default function Areas() {
  return (
    <section id="areas" aria-labelledby="areas-heading">
      <div className="areas-head">
        <div>
          <div className="eyebrow">Where We Work</div>
          <h2 className="sec-h dark" id="areas-heading">
            Based in Gujarat.<br /><em>Delivering across India.</em>
          </h2>
        </div>
        <p className="areas-note">
          Network infrastructure and CCTV surveillance projects across Gujarat, hands-on and on-site.
          Cybersecurity, GRC, and cloud services delivered remotely to clients anywhere in India.
        </p>
      </div>

      <ul className="areas-grid">
        {areasServed.map(a => (
          <li className="areas-item" key={a.city}>
            <span className="areas-city">{a.city}</span>
            <span className="areas-desc">{a.note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
