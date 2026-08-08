import { Link } from 'react-router-dom';
import { serviceGroups } from '../data.js';
import { useScrollReveal } from '../useScrollReveal.js';

export default function Services() {
  const gridRef = useScrollReveal('.svc-group');

  return (
    <section id="services" aria-labelledby="services-heading">
      <div className="svc-head">
        <div>
          <div className="eyebrow">What We Do</div>
          <h2 className="sec-h dark" id="services-heading">
            Four disciplines.<br /><em>Eleven services.</em>
          </h2>
        </div>
        <p className="svc-note">
          From the network up: infrastructure, defence, testing, and governance. Each service can be scoped and
          delivered on its own, or combined into a full security program.
        </p>
      </div>

      <div className="svc-grid" ref={gridRef}>
        {serviceGroups.map((group, i) => (
          <div className="svc-group" key={group.id} style={{ '--stagger': `${(i % 4) * 60}ms` }}>
            <span className="svc-group-idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div className="svc-group-hd">
              <h3 className="svc-group-name">{group.name}</h3>
              <span className="svc-group-count">{group.services.length} services</span>
            </div>
            <ul className="svc-group-list">
              {group.services.map(s => (
                <li className="svc-group-item" key={s.id}>
                  <Link to={`/services/${s.id}`} className="svc-group-link">
                    <span className="svc-group-link-name">{s.name}</span>
                    <span className="svc-group-link-short">{s.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
