export const serviceGroups = [
  {
    id: 'infrastructure-solutions',
    name: 'Infrastructure Solutions',
    services: [
      {
        id: 'network-infrastructure',
        name: 'Network Infrastructure',
        short: 'End to end design and deployment of reliable, secure network infrastructure, based in Gujarat and delivering across India.',
        full: "We build the network your business runs on, from structured cabling and hardware selection through full deployment and documentation. We're based in Gujarat and work closely with businesses in Ahmedabad, Surat, Vadodara and Rajkot, while also taking on network infrastructure projects across India. This is the right fit if you're setting up a new office, expanding to a new location, or replacing an old network that's become more trouble than it's worth. We start with a site visit and a review of what you actually need, then put together a design, roll it out in stages, and test everything before handover. Every job is documented properly, so you're never stuck depending on one person to know how the network is wired together. What you end up with is infrastructure that's stable, can grow with you, and is secure from the first day, not something patched together and hoped for the best.",
      },
      {
        id: 'switching-routing',
        name: 'Switching & Routing',
        short: 'Configuration and tuning of switches and routers so your network traffic stays stable, fast and secure.',
        full: "Your switches and routers direct all the traffic on your network, and when they're set up wrong, it shows everywhere: dropped connections, slow transfers, gaps a security team would hate. We design, configure and tune your switching and routing layer, including VLAN segmentation, routing protocols, redundancy and QoS. This tends to matter most for businesses with multiple departments, locations or a growing headcount, where a flat, unmanaged network starts to buckle. We begin by reviewing what you have now, flag the bottlenecks and risks, then make changes in a planned way that keeps disruption to a minimum. You're left with a network that's properly segmented, monitored, and built to handle growth without needing a full redesign every year.",
      },
      {
        id: 'cctv-surveillance',
        name: 'CCTV & Surveillance',
        short: 'Design, installation and integration of CCTV and surveillance systems, based in Gujarat and delivering across India.',
        full: "Physical security and cybersecurity overlap more than people expect, so we treat your surveillance system with the same care as your network. We handle site surveys, camera placement, NVR and DVR setup, storage sizing, and remote access configuration, so the system is reliable and properly secured rather than just bolted on and forgotten. We're based in Gujarat and work with local businesses first, but we also take on CCTV projects across India. This suits businesses setting up surveillance for the first time, replacing an old analog system, or needing better remote monitoring across more than one site. We walk the premises, recommend the coverage and hardware that make sense, install and configure everything, and show you how to run it day to day. Because we come from a security background, we also make sure the surveillance system itself doesn't turn into an easy way into your network.",
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
        short: 'Firewall selection, configuration and ongoing management to control what enters and exits your network.',
        full: "A firewall is only as good as the rules behind it, and most breaches trace back to a rule set nobody's touched since day one. We handle firewall selection, deployment, policy configuration and ongoing management, tuned to how your business actually operates rather than left on factory defaults. This is a good fit if you don't have an in-house security team, or you already have a firewall but aren't confident it's set up right. We start by reviewing your current setup and traffic patterns, design a rule set built around least privilege, roll it out with minimal disruption, and keep monitoring and updating it afterward. The result is a firewall that's actively defending your network, not just sitting there as a checkbox.",
      },
      {
        id: 'soc-as-a-service',
        name: 'SOC as a Service',
        short: 'Round the clock monitoring and threat detection for businesses that need real security oversight without building an in-house SOC.',
        full: "Building your own Security Operations Center is expensive and hard to staff. SOC as a Service gives you the same continuous monitoring, threat detection and alerting without carrying that overhead. We watch your network, endpoints and logs for anything suspicious, triage the alerts, and let you know with clear, practical guidance when something actually needs your attention. This fits growing businesses that handle sensitive data or client information and can't afford to learn about a breach after the damage is already done. Onboarding starts with mapping your environment and setting up monitoring, then a baseline period so we know what normal looks like, and after that continuous monitoring and reporting kick in. That gives you visibility into your security posture around the clock, without hiring and managing a security team of your own.",
      },
      {
        id: 'incident-response-dfir',
        name: 'Incident Response & DFIR',
        short: 'Fast incident response and digital forensics to contain, investigate and recover from security incidents with as little disruption as possible.',
        full: "When something goes wrong, speed and method both matter. We help you contain the threat, work out how it happened, and recover, all while preserving evidence properly along the way. That covers containment, root cause investigation, digital forensics, and a clear report afterward with recommendations so it doesn't happen again. This can run standalone if you already have monitoring through another provider, or alongside our SOC as a Service, depending on how your business is currently set up. It's a good fit for businesses that suspect or have confirmed a breach, or simply want a response plan ready before they ever need it. We move fast to work out the scope, isolate what's affected, and get you through recovery with as little business disruption as we can manage.",
      },
      {
        id: 'security-hardening',
        name: 'Security Hardening',
        short: 'Cutting down your attack surface across systems, servers and devices by closing gaps before attackers find them.',
        full: "Most systems ship with more open doors than they need: unused services, default settings, weak configurations that quietly widen your attack surface. We go through your servers, endpoints and network devices against established hardening benchmarks and lock down what doesn't need to be exposed, without breaking anything your team relies on. This suits businesses preparing for a compliance audit, recovering from an incident, or just wanting to close known gaps before someone exploits them. Our process includes a configuration review, a prioritized list of findings, hands-on remediation, and a check afterward to confirm nothing broke. You come away with systems that are genuinely harder to compromise, not just compliant on paper.",
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
        full: "We simulate real attacks against your network infrastructure to find vulnerabilities in firewalls, switches, routers, servers and other connected devices, before someone with worse intentions finds them first. We combine automated scanning with manual, hands-on testing to catch issues automated tools alone tend to miss. It suits businesses going through compliance audits, onboarding enterprise clients who need security assurance, or just wanting an honest picture of where their network stands. Our process covers scoping and reconnaissance, vulnerability scanning, manual exploitation attempts, and a detailed report that ranks findings by severity with clear steps to fix them. You end up with solid proof of where you stand and a prioritized path to fixing it.",
      },
      {
        id: 'web-application-vapt',
        name: 'Web Application VAPT',
        short: "Vulnerability Assessment and Penetration Testing on your web applications to catch security flaws before they're exploited in production.",
        full: "Web applications are one of the most common ways attackers get in, and code that looks fine in a demo can hide serious flaws once it's under real attack conditions. We test your web applications for issues like injection flaws, authentication weaknesses, access control problems and business logic gaps, using a mix of automated scanning and manual testing aligned with OWASP standards. This is a good fit if you're launching a new application, handling sensitive user data, or need to show clients or auditors that you take security seriously. Our process includes scoping, authenticated and unauthenticated testing, manual exploitation of key flows, and a report that lays out each finding with proof of concept and how to fix it. What you get is a clear, evidence backed picture of your application's real security posture.",
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
        short: 'Governance, Risk and Compliance audits that turn regulatory requirements into a security program you can actually use.',
        full: "Compliance frameworks can feel like paperwork for its own sake. We treat GRC as a way to build a genuinely stronger, more usable security program, with the documentation as a side effect rather than the goal. We assess your current policies, controls and processes against the relevant framework, find the gaps, and help you close them in a way that fits how your team actually works. This suits businesses preparing for ISO 27001, SOC 2 or similar certifications, or needing a structured risk management process for clients or investors. Our process includes a gap assessment, a review of policies and controls, a prioritized remediation roadmap, and support through implementation and audit readiness. What you end up with is compliance that holds up under scrutiny and actually gets used day to day.",
      },
      {
        id: 'cloud-security-review',
        name: 'Cloud Security Review',
        short: "Assessment of your cloud environment's configuration, access controls and architecture to close gaps before they're exploited.",
        full: "Cloud platforms put a lot of powerful configuration in your hands, and misconfiguration, not the platform itself, is behind most cloud security incidents. We review your cloud environment across identity and access management, storage and data exposure, network configuration and logging, and benchmark it against cloud security best practices. This suits businesses that moved to the cloud without a proper security review, or are scaling their cloud footprint and want assurance nothing important has been left exposed. Our process starts with an architecture and configuration review, then identifying misconfigurations and excessive permissions, followed by a prioritized remediation plan your team can act on directly. You come out with a cloud environment that's configured the way it should have been from the start.",
      },
    ],
  },
];

export const processSteps = [
  { d: 1, title: 'Scoping & Discovery', desc: 'We define scope, compliance requirements, environment topology and what success looks like, before any testing begins.', time: 'Day 1' },
  { d: 2, title: 'NDA & Rules of Engagement', desc: 'A signed NDA and rules of engagement protect your assets before any tool runs or query touches your systems.', time: 'Day 1 to 2' },
  { d: 3, title: 'Assessment & Testing', desc: 'Manual and tool assisted testing. Every finding is documented with evidence as it is discovered, not reconstructed afterward.', time: 'Day 2 to 5' },
  { d: 4, title: 'Report Delivery', desc: 'An executive summary for leadership, plus a full technical report with risk ratings, evidence and step by step remediation guidance.', time: 'Day 5 to 7' },
  { d: 5, title: 'Remediation & Retest', desc: 'We answer questions, support remediation, and retest to confirm the fixes hold. This is included in every engagement.', time: 'Day 14 to 21' },
];

// Built from the current 4-category/11-service structure (serviceGroups above),
// so it always reflects the real services without needing to be updated separately.
export const serviceOptions = serviceGroups
  .flatMap(g => g.services.map(s => s.name))
  .concat('Multiple / Not Sure');

export const areasServed = [
  'Ahmedabad',
  'Surat',
  'Vadodara',
  'Rajkot',
  'Gandhinagar',
  'Rest of Gujarat',
];
