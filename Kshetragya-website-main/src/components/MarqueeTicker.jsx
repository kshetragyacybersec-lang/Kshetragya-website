const CAPABILITIES = [
  'Cat6A / 10G Structured Cabling',
  'FortiGate & Sophos Next-Gen Firewalls',
  '24/7 Wazuh SOC & SIEM Log Triage',
  'Offensive Web & API VAPT',
  'Network Vulnerability Assessment (VA)',
  'Incident Response & DFIR Forensics',
  'DPDP Act 2023 & ISO 27001 Readiness',
  'CIS Benchmark Security Hardening',
  'Direct Founding Partners · Zero Subcontracting',
  'Ahmedabad HQ · Pan-India & Remote Global',
];

export default function MarqueeTicker() {
  return (
    <div className="tech-marquee-wrapper" aria-label="Technical capabilities ticker">
      <div className="tech-marquee-fade left" aria-hidden="true" />
      <div className="tech-marquee-fade right" aria-hidden="true" />
      <div className="tech-marquee-track">
        {/* First set */}
        <div className="tech-marquee-group">
          {CAPABILITIES.map((text, i) => (
            <div className="tech-marquee-item" key={`cap-1-${i}`}>
              <span className="tech-marquee-label">{text}</span>
              <span className="tech-marquee-dot" aria-hidden="true">✦</span>
            </div>
          ))}
        </div>
        {/* Duplicate set for infinite loop */}
        <div className="tech-marquee-group" aria-hidden="true">
          {CAPABILITIES.map((text, i) => (
            <div className="tech-marquee-item" key={`cap-2-${i}`}>
              <span className="tech-marquee-label">{text}</span>
              <span className="tech-marquee-dot" aria-hidden="true">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
