import { areasServed } from '../data.js';
import { Reveal } from './Reveal.jsx';

export default function Areas() {
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
          Every service we offer is available on-site across Gujarat and anywhere in India, with
          remote delivery for clients further afield, including the USA, UK and UAE.
        </p>
      </div>

      <Reveal as="ul" className="areas-tags" aria-label="Cities we serve across Gujarat">
        {areasServed.map((city) => (
          <Reveal.Item as="li" className="areas-tag" key={city}>
            {city}
          </Reveal.Item>
        ))}
      </Reveal>
    </section>
  );
}
