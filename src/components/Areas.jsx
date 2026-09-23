import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Reveal } from './Reveal.jsx';

const REGIONS = [
  {
    id: 'gujarat',
    badge: 'ON-SITE + REMOTE SUPPORT',
    badgeType: 'local',
    title: 'Gujarat (HQ: Ahmedabad)',
    tagline: 'Rapid physical site visits & ongoing remote engineering',
    dispatch: 'On-Site Visits Scheduled per Project',
    deliveryMode: 'On-Site & Remote Available',
    desc: 'Based in Ahmedabad, we send engineers on-site across Gujarat for structured cabling, server rack installations, firewall deployments, CCTV setups, and internal penetration testing, backed by continuous remote support.',
    locations: [
      { name: 'Ahmedabad (HQ)', detail: 'Local site visits from our HQ' },
      { name: 'Gandhinagar / GIFT City', detail: 'FinTech & enterprise audits' },
      { name: 'Vadodara & Bharuch', detail: 'Industrial network segmentation' },
      { name: 'Surat & South Gujarat', detail: 'Commercial & manufacturing networks' },
      { name: 'Rajkot & Saurashtra', detail: 'Plant infrastructure & firewall setups' },
      { name: 'All Gujarat Industrial Zones', detail: 'Sanand, Dahej, Ankleshwar, Morbi, Vapi' },
    ],
  },
  {
    id: 'panindia',
    badge: 'ON-SITE + REMOTE SUPPORT',
    badgeType: 'national',
    title: 'All Over India (Pan-India)',
    tagline: 'On-site project execution & full remote security services',
    dispatch: 'Scheduled On-Site & Remote',
    deliveryMode: 'On-Site & Remote Available',
    desc: 'We travel for scheduled on-site infrastructure deployments, multi-branch network rollouts, and data center audits across all Indian states, combined with remote SOC monitoring and web VAPT.',
    locations: [
      { name: 'Mumbai & Pune', detail: 'Enterprise financial & tech networks' },
      { name: 'Delhi NCR', detail: 'Corporate HQ infrastructure & firewalls' },
      { name: 'Bengaluru & Hyderabad', detail: 'SaaS, cloud security & API testing' },
      { name: 'Chennai & Kolkata', detail: 'Manufacturing & corporate data centers' },
      { name: 'Multi-Branch Networks', detail: 'SD-WAN, switch trunking & audits across India' },
    ],
  },
  {
    id: 'global',
    badge: 'REMOTE ONLY',
    badgeType: 'global',
    title: 'Global (International)',
    tagline: 'Remote delivery via encrypted channels',
    dispatch: 'Direct Encrypted Remote Access',
    deliveryMode: 'Remote Only (No Overseas On-Site)',
    desc: 'For international clients across North America, Europe, and the Middle East, our services are delivered remotely. This includes web application VAPT, AWS/Azure cloud security reviews, and compliance advisory.',
    locations: [
      { name: 'USA & Canada', detail: 'AWS / Azure cloud IAM & architecture reviews' },
      { name: 'UK & Europe', detail: 'External web app & REST API penetration testing' },
      { name: 'UAE & Middle East', detail: 'ISO 27001 readiness & security audits' },
      { name: 'Encrypted Remote Delivery', detail: 'Bilateral NDA & direct founder consulting' },
    ],
  },
];

export default function Areas() {
  return (
    <section id="areas" aria-labelledby="areas-heading">
      <div className="areas-head">
        <div>
          <div className="eyebrow">Service Delivery &amp; Coverage</div>
          <h2 className="sec-h dark" id="areas-heading">
            On-site across Gujarat &amp; India.
            <br />
            <em>Remote support worldwide.</em>
          </h2>
        </div>
        <p className="areas-note">
          We provide hands-on physical site visits and remote engineering across Gujarat and all over
          India, with secure remote-only security services for international clients in the USA, UK,
          UAE, and worldwide.
        </p>
      </div>

      <Reveal className="areas-cards-grid">
        {REGIONS.map((region) => (
          <Reveal.Item className="area-card-wrapper" key={region.id}>
            <motion.div
              className="area-card"
              whileHover={{ y: -6, boxShadow: '0 20px 40px -15px rgba(11, 12, 15, 0.12)' }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            >
              <div className="area-card-top">
                <span className={`area-card-badge is-${region.badgeType}`}>{region.badge}</span>
                <span className="area-card-sla">{region.dispatch}</span>
              </div>

              <h3 className="area-card-title">{region.title}</h3>
              <div className="area-card-mode">
                <span className="area-mode-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{region.deliveryMode}</span>
              </div>
              <p className="area-card-tagline">{region.tagline}</p>
              <p className="area-card-desc">{region.desc}</p>

              <div className="area-card-locations">
                <span className="area-loc-header">COVERED LOCATIONS &amp; SCOPES:</span>
                <ul className="area-loc-list">
                  {region.locations.map((loc) => (
                    <li className="area-loc-item" key={loc.name}>
                      <span className="area-loc-bullet" style={{ color: 'var(--blue)', fontSize: '0.65rem' }}>✦</span>
                      <div>
                        <strong className="area-loc-name">{loc.name}</strong>
                        <span className="area-loc-detail"> · {loc.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Reveal.Item>
        ))}
      </Reveal>

      {/* Direct Partner Dispatch Strip */}
      <div className="areas-dispatch-banner">
        <div className="areas-dispatch-left">
          <span className="areas-dispatch-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
              <path d="M12 2.5l8 3.5v6c0 5-3.5 9.5-8 10.5-4.5-1-8-5.5-8-10.5V6L12 2.5z" strokeLinejoin="round" />
              <path d="M8.5 12l2.5 2.5 4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <strong>Direct Partner Execution:</strong> Site visits available across Gujarat and all over India. Global engagements delivered remotely under mutual NDA.
          </div>
        </div>
        <Link to="/#contact" className="btn-v areas-dispatch-btn">
          Schedule Site Visit or Assessment ↗
        </Link>
      </div>
    </section>
  );
}
