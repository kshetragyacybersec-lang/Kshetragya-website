export const serviceGroups = [
  {
    id: 'infrastructure-solutions',
    name: 'Infrastructure Solutions',
    services: [
      {
        id: 'network-infrastructure',
        name: 'Network Infrastructure',
        short: 'End-to-end design and deployment of reliable, secure network infrastructure built to support your business as it grows.',
        full: "We design and build the network foundation your business runs on — from structured cabling and hardware selection to full deployment and documentation. Best suited for businesses setting up a new office, expanding to a new location, or replacing an outdated network that's become a liability. Our process starts with a site assessment and requirements review, followed by a design proposal, staged implementation, and thorough testing before handover. Every deployment is documented, so you're never dependent on a single person to understand how your network is built. The payoff is infrastructure that's stable, scalable, and secure from day one — not something bolted together and hoped for the best.",
      },
      {
        id: 'switching-routing',
        name: 'Switching & Routing',
        short: 'Configuration and optimization of switches and routers for stable, high-performing, and secure network traffic flow.',
        full: "Your switches and routers are the traffic controllers of your network — when they're misconfigured, everything downstream feels it: dropped connections, slow file transfers, security gaps. We handle design, configuration, and optimization of your switching and routing layer, including VLAN segmentation, routing protocols, redundancy, and QoS. This service is best suited for businesses with multiple departments, locations, or growing headcount, where a flat, unmanaged network is starting to show its limits. We start with a review of your current setup, identify bottlenecks and risks, then implement changes in a planned, low-disruption manner. That leaves you with a network that's segmented, monitored, and built to handle growth without needing a redesign every year.",
      },
      {
        id: 'cctv-surveillance',
        name: 'CCTV & Surveillance',
        short: 'Design, installation, and integration of CCTV and surveillance systems for physical security you can actually rely on.',
        full: "Physical security and cybersecurity increasingly overlap, and we treat your surveillance system with the same rigor as your network. We handle site surveys, camera placement planning, NVR/DVR setup, storage sizing, and remote access configuration for CCTV systems that are reliable and properly secured — not just installed and forgotten. This service suits businesses setting up surveillance for the first time, upgrading an aging analog system, or needing better remote monitoring across multiple sites. We assess your premises, recommend appropriate coverage and hardware, install and configure the system, and walk you through day-to-day operation. Because we come from a security background, we also make sure your surveillance system itself isn't left as an easy entry point into your network.",
      },
    ],
  },
  {
    id: 'cyber-defence',
    name: 'Cyber Defence',
    services: [
      {
        id: 'firewall-network-security',
        name: 'Firewall & Network Security',
        short: 'Firewall selection, configuration, and ongoing management to control what enters and exits your network.',
        full: "A firewall is only as good as its configuration, and most breaches trace back to rules that were never reviewed after day one. We handle firewall selection, deployment, policy configuration, and ongoing management, tuned to how your business actually operates rather than left on factory defaults. This service is best suited for businesses without a dedicated in-house security team, or those who have a firewall in place but aren't confident it's configured correctly. We start with a review of your current setup and traffic patterns, design a rule set aligned with least-privilege principles, deploy it with minimal disruption, and provide ongoing monitoring and updates. The outcome is a firewall that actively defends your network, instead of sitting there as a checkbox.",
      },
      {
        id: 'soc-as-a-service',
        name: 'SOC as a Service',
        short: 'Round-the-clock monitoring and threat detection for businesses that need enterprise-grade security oversight without an in-house SOC.',
        full: "Building an in-house Security Operations Center is expensive and hard to staff — SOC as a Service gives you the same continuous monitoring, threat detection, and alerting without that overhead. We monitor your network, endpoints, and logs for suspicious activity, triage alerts, and notify you with clear, actionable guidance when something needs attention. This service is best suited for growing businesses that handle sensitive data or client information and can't afford to find out about a breach after the damage is done. Onboarding starts with mapping your environment and setting up monitoring tools, followed by a baseline period to understand normal activity, after which continuous monitoring and reporting begin. That gives you visibility into your security posture around the clock, without hiring and managing a security team yourself.",
      },
      {
        id: 'incident-response-dfir',
        name: 'Incident Response & DFIR',
        short: 'Rapid incident response and digital forensics to contain, investigate, and recover from security incidents with minimal disruption.',
        full: "When a security incident happens, speed and method matter — we help you contain the threat, investigate how it happened, and recover, while preserving evidence properly along the way. This covers incident containment, root-cause investigation, digital forensics, and a clear post-incident report with recommendations to prevent recurrence. This service can be taken standalone, if you already have monitoring in place through another provider, or bundled with our SOC as a Service, depending on your current setup — whichever fits how your business is currently monitored. Best suited for businesses that suspect or have confirmed a breach, or simply want a trusted response plan ready before they need it. We move quickly to assess scope, isolate affected systems, and guide you through recovery with minimal business disruption.",
      },
      {
        id: 'security-hardening',
        name: 'Security Hardening',
        short: 'Systematic reduction of your attack surface across systems, servers, and devices by closing gaps before attackers find them.',
        full: "Most systems ship with more open doors than they need — unused services, default settings, and weak configurations that quietly expand your attack surface. We review your servers, endpoints, and network devices against established hardening benchmarks and lock down what doesn't need to be exposed, without breaking the functionality your team depends on. This service is best suited for businesses preparing for a compliance audit, recovering from an incident, or simply wanting to close known gaps proactively before they're exploited. Our process includes a configuration review, a prioritized list of findings, and hands-on remediation, followed by verification that changes haven't disrupted normal operations. You come away with systems that are meaningfully harder to compromise, not just technically compliant on paper.",
      },
    ],
  },
  {
    id: 'security-testing',
    name: 'Security Testing',
    services: [
      {
        id: 'network-vapt',
        name: 'Network VAPT',
        short: 'Vulnerability Assessment and Penetration Testing on your network infrastructure to find and fix exploitable weaknesses before attackers do.',
        full: "We simulate real-world attacks against your network infrastructure to identify vulnerabilities in firewalls, switches, routers, servers, and other network-connected devices, before someone with worse intentions finds them first. This service combines automated scanning with manual, hands-on testing to uncover issues that automated tools alone tend to miss. It's best suited for businesses undergoing compliance audits, onboarding enterprise clients who require security assurance, or simply wanting an honest picture of their network's risk exposure. Our process covers scoping and reconnaissance, vulnerability scanning, manual exploitation attempts, and a detailed report ranking findings by severity with clear remediation steps. It leaves you with concrete proof of where you stand, and a prioritized path to fixing it.",
      },
      {
        id: 'web-application-vapt',
        name: 'Web Application VAPT',
        short: 'Vulnerability Assessment and Penetration Testing on your web applications to catch security flaws before they\u2019re exploited in production.',
        full: "Web applications are one of the most common entry points for attackers, and code that looks fine in a demo can hide serious flaws under real-world attack conditions. We test your web applications for vulnerabilities such as injection flaws, authentication weaknesses, access control issues, and business logic gaps, using a mix of automated scanning and manual testing aligned with OWASP standards. This service is best suited for businesses launching a new application, handling sensitive user data, or needing to demonstrate security due diligence to clients or auditors. Our process includes scoping, authenticated and unauthenticated testing, manual exploitation of key flows, and a report detailing each finding with proof-of-concept and remediation guidance. What you get is a clear, evidence-backed view of your application's real security posture.",
      },
    ],
  },
  {
    id: 'governance-cloud',
    name: 'Governance & Cloud',
    services: [
      {
        id: 'grc-compliance-audit',
        name: 'GRC & Compliance Audit',
        short: 'Governance, Risk, and Compliance audits that turn regulatory requirements into a practical, usable security program.',
        full: "Compliance frameworks can feel like paperwork for its own sake — we approach GRC as a way to build a genuinely stronger, more usable security program, with the documentation as a byproduct rather than the goal. We assess your current policies, controls, and processes against the relevant framework, identify gaps, and help you close them in a way that fits how your team actually works. This service is best suited for businesses preparing for ISO 27001, SOC 2, or similar certifications, or needing a structured risk management process for client or investor requirements. Our process includes a gap assessment, policy and control review, a prioritized remediation roadmap, and support through implementation and audit readiness. The outcome is compliance that holds up to scrutiny and actually gets used day to day.",
      },
      {
        id: 'cloud-security-review',
        name: 'Cloud Security Review',
        short: "Assessment of your cloud environment's configuration, access controls, and architecture to close gaps before they're exploited.",
        full: "Cloud platforms put a lot of powerful configuration in your hands, and misconfiguration — not the platform itself — is behind most cloud security incidents. We review your cloud environment across identity and access management, storage and data exposure, network configuration, and logging, benchmarked against cloud security best practices. This service is best suited for businesses that have migrated to the cloud without a dedicated security review, or are scaling their cloud footprint and want assurance nothing critical has been left exposed. Our process starts with an architecture and configuration review, followed by identification of misconfigurations and excessive permissions, and a prioritized remediation plan your team can implement directly. You come out with a cloud environment that's configured the way it should have been from the start.",
      },
    ],
  },
];

export const processSteps = [
  { d: 1, title: 'Scoping & Discovery', desc: 'We define scope, compliance requirements, environment topology, and what success looks like - before any testing begins.', time: 'Day 1' },
  { d: 2, title: 'NDA & Rules of Engagement', desc: 'Signed NDA and rules of engagement protect your assets before any tool runs or query touches your systems.', time: 'Day 1–2' },
  { d: 3, title: 'Assessment & Testing', desc: 'Manual and tool-assisted testing. Every finding documented with evidence as discovered - not reconstructed after.', time: 'Day 2–5' },
  { d: 4, title: 'Report Delivery', desc: 'Executive summary for leadership. Full technical report with risk ratings, evidence, and step-by-step remediation guidance.', time: 'Day 5–7' },
  { d: 5, title: 'Remediation & Retest', desc: 'We answer questions, support remediation, and retest to confirm fixes hold - included in every engagement.', time: 'Day 14–21' },
];

// Built from the current 4-category/11-service structure (serviceGroups above),
// so it always reflects the real services without needing to be updated separately.
export const serviceOptions = serviceGroups
  .flatMap(g => g.services.map(s => s.name))
  .concat('Multiple / Not Sure');
