import { areasServed } from '../data.js';
import { useScrollReveal } from '../useScrollReveal.js';

export default function Areas() {
  const tagsRef = useScrollReveal('.areas-tag');

  return (
    <section id="areas" aria-labelledby="areas-heading">
      <div className="areas-head">
        <div>
          <div className="eyebrow">Where We Work</div>
          <h2 className="sec-h dark" id="areas-heading">
            Based in Gujarat.
            <br />
            <em>Delivering across India.</em>
          </h2>
        </div>
        <p className="areas-note">
          Every service we offer, from network infrastructure to CCTV surveillance to cybersecurity,
          is available on-site across Gujarat and anywhere in India, with remote delivery too.
        </p>
      </div>

      <ul className="areas-tags" aria-label="Cities we serve across Gujarat" ref={tagsRef}>
        {areasServed.map((city, i) => (
          <li className="areas-tag" key={city} style={{ '--stagger': `${(i % 8) * 35}ms` }}>
            {city}
          </li>
        ))}
      </ul>
    </section>
  );
}
