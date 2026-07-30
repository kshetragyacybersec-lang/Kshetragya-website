import { services } from '../data.js';

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading">
      <div className="svc-head">
        <div>
          <div className="eyebrow">Our Practice</div>
          <h2 className="sec-h dark" id="services-heading">Nine disciplines.<br/><em>One field known completely.</em></h2>
        </div>
        <p className="svc-note">From network perimeter to cloud infrastructure, from compliance audit to active incident response - specialists who own their domain, not generalists who approximate it.</p>
      </div>

      <ul className="svc-cards">
        {services.map(s => (
          <li className="svc-card" key={s.n} tabIndex={0}>
            <div className="svc-card-hd">
              <span className="td-num" aria-hidden="true">{s.n}</span>
              <div>
                <div className="svc-n">{s.name}</div>
                <div className="svc-cat">{s.cat}</div>
              </div>
            </div>
            <p className="td-desc">{s.desc}</p>
            <div className="tag-list row">
              {s.tags.map(t => <span className="tag-item" key={t}>{t}</span>)}
            </div>
          </li>
        ))}
      </ul>

      <div className="svc-table-wrap">
        <table className="svc-table">
          <caption className="visually-hidden">
            Full list of the nine Kshetragya Cybersec service disciplines, with descriptions and tools used for each.
          </caption>
          <thead className="svc-thead">
            <tr>
              <th scope="col" style={{ width: 44 }}>#</th>
              <th scope="col" style={{ width: 200 }}>Discipline</th>
              <th scope="col">Description</th>
              <th scope="col" style={{ width: 148 }}>Tools</th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr className="svc-tr" key={s.n} tabIndex={0}>
                <td className="td-num" aria-hidden="true">{s.n}</td>
                <td className="td-name">
                  <div className="svc-n">{s.name}</div>
                  <div className="svc-cat">{s.cat}</div>
                </td>
                <td className="td-desc">{s.desc}</td>
                <td className="td-tags">
                  <div className="tag-list">
                    {s.tags.map(t => <span className="tag-item" key={t}>{t}</span>)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
