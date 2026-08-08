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
          Every service we offer - network infrastructure, CCTV surveillance, and cybersecurity -
          is available on-site across Gujarat and remotely anywhere in India.
        </p>
      </div>

      <ul className="areas-tags" aria-label="Cities we serve across Gujarat">
        {areasServed.map(city => (
          <li className="areas-tag" key={city}>{city}</li>
        ))}
      </ul>
    </section>
  );
}
