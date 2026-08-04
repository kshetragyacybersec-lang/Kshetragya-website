export const services = [
  { n: 1, name: 'Network Infrastructure & CCTV', cat: 'Infrastructure', desc: 'Structured cabling, LAN/WAN design and deployment, switch and routing configuration, wireless access point setup, and CCTV/NVR surveillance system design and installation, with complete network documentation.', tags: ['Structured Cabling', 'LAN/WAN', 'CCTV/NVR', 'Switching · Routing'] },
  { n: 2, name: 'Firewall & Network Security', cat: 'Defence', desc: 'Next-Gen Firewall (NGFW) and UTM deployment on Fortinet, Sophos, and Cisco. Firewall configuration, rule audits, VPN setup, ACL review, and network hardening.', tags: ['Fortinet', 'Sophos', 'Cisco · VPN', 'NGFW/UTM'] },
  { n: 3, name: 'Network VAPT', cat: 'Core · Offensive', desc: 'Internal and external network penetration testing. Attack surface mapping, real vulnerability exploitation, risk-rated compliance-ready report.', tags: ['Nmap', 'Metasploit', 'Nessus', 'Manual Testing'] },
  { n: 4, name: 'Web Application VAPT', cat: 'Offensive', desc: 'OWASP Top 10, API security, authentication bypass, injection testing, and business logic analysis with proof-of-concept evidence.', tags: ['Burp Suite', 'OWASP', 'API Testing'] },
  { n: 5, name: 'GRC & Compliance Audit', cat: 'Governance', desc: 'ISO 27001 gap assessments, risk register development, policy creation, SOC 2, PCI-DSS, HIPAA, and DPDPA readiness.', tags: ['ISO 27001', 'SOC 2', 'PCI-DSS'] },
  { n: 6, name: 'Incident Response & DFIR', cat: 'Response', desc: 'Malware analysis, ransomware investigation, compromised account triage, log analysis, and digital forensics.', tags: ['Malware Analysis', 'Log Forensics', 'Ransomware IR'] },
  { n: 7, name: 'Cloud Security Review', cat: 'Cloud', desc: 'AWS IAM audit, S3 bucket security, cloud misconfiguration assessment, and security posture review.', tags: ['AWS', 'IAM Audit', 'S3 Security'] },
  { n: 8, name: 'SOC as a Service', cat: 'Operations', desc: '24×7 security monitoring, SIEM management, threat detection, and escalation without building an in-house operations centre.', tags: ['SIEM', '24×7 Monitoring', 'Detection'] },
  { n: 9, name: 'Security Hardening', cat: 'Hardening', desc: 'Endpoint hardening, server baseline configuration, network segmentation, and defence-in-depth architecture aligned to CIS and NIST.', tags: ['CIS Benchmarks', 'NIST', 'Segmentation'] },
];

export const processSteps = [
  { d: 1, title: 'Scoping & Discovery', desc: 'We define scope, compliance requirements, environment topology, and what success looks like - before any testing begins.', time: 'Day 1' },
  { d: 2, title: 'NDA & Rules of Engagement', desc: 'Signed NDA and rules of engagement protect your assets before any tool runs or query touches your systems.', time: 'Day 1–2' },
  { d: 3, title: 'Assessment & Testing', desc: 'Manual and tool-assisted testing. Every finding documented with evidence as discovered - not reconstructed after.', time: 'Day 2–5' },
  { d: 4, title: 'Report Delivery', desc: 'Executive summary for leadership. Full technical report with risk ratings, evidence, and step-by-step remediation guidance.', time: 'Day 5–7' },
  { d: 5, title: 'Remediation & Retest', desc: 'We answer questions, support remediation, and retest to confirm fixes hold - included in every engagement.', time: 'Day 14–21' },
];

export const credentials = [
  { name: 'Network & Infrastructure', chips: [
    { label: 'Fortinet NSE 1–4', state: 'active' },
    { label: 'Sophos Certified Engineer', state: 'active' },
    { label: 'CCNA - In Progress', state: 'prog' },
    { label: 'CCNP Security - Planned', state: 'plan' },
  ]},
  { name: 'Offensive Security', chips: [
    { label: 'eJPT', state: 'active' },
    { label: 'PNPT - In Progress', state: 'prog' },
    { label: 'OSCP - In Progress', state: 'prog' },
    { label: 'OSWE - Planned', state: 'plan' },
  ]},
  { name: 'GRC & Compliance', chips: [
    { label: 'CC - ISC2', state: 'active' },
    { label: 'ISO 27001 Lead Implementer', state: 'plan' },
    { label: 'ISO 27001 Lead Auditor', state: 'plan' },
    { label: 'CISA - Planned', state: 'plan' },
  ]},
  { name: 'Cloud & Blue Team', chips: [
    { label: 'AWS Cloud Practitioner', state: 'active' },
    { label: 'BTL1 - In Progress', state: 'prog' },
    { label: 'AWS Security Specialty', state: 'plan' },
    { label: 'CCSP - Planned', state: 'plan' },
  ]},
];

export const testimonials = [];

export const serviceOptions = services.map(s => s.name).concat('Multiple / Not Sure');
