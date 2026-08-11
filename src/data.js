export const serviceGroups = [
  {
    id: 'infrastructure-solutions',
    name: 'Infrastructure Solutions',
    services: [
      {
        id: 'network-infrastructure',
        name: 'Network Infrastructure',
        short:
          'End to end design and deployment of reliable, secure network infrastructure, based in Gujarat and delivering across India.',
        full: "New office, new location, or an old network that's become more trouble than it's worth, this is where we come in. We build the network your business runs on, from structured cabling and hardware selection through full deployment and documentation. We're based in Gujarat and work closely with businesses in Ahmedabad, Surat, Vadodara and Rajkot, while also taking on projects across India. A site visit comes first, then a proper look at what you actually need, a design, a staged rollout, and testing before we hand it over. Every job gets documented, so you're never stuck depending on one person to know how the network is wired together. Stable, secure from day one, and built to grow with you, that's the goal here.",
        deliverables: [
          'Site visit and needs assessment',
          'Design and staged rollout',
          'Full documentation of the setup',
          'Support through handover',
        ],
      },
      {
        id: 'switching-routing',
        name: 'Switching & Routing',
        short:
          'Configuration and tuning of switches and routers so your network traffic stays stable, fast and secure.',
        full: "Dropped connections. Slow file transfers. Gaps that make a security review painful. Nine times out of ten, that traces back to switches and routers that were never configured properly in the first place. We design, configure and tune your switching and routing layer, including VLAN segmentation, routing protocols, redundancy and QoS. If you've got multiple departments, multiple locations, or a headcount that keeps growing, a flat unmanaged network starts showing its limits fast, and that's usually when businesses call us. We review what's there now, flag the bottlenecks and risks, and roll out changes in a planned way rather than all at once. What you're left with is a network that's segmented, monitored, and won't need a full redesign every time you add a team.",
        deliverables: [
          'Review of current network setup',
          'VLAN segmentation and routing plan',
          'Configuration of switches/routers',
          'Rollout done in planned stages, not all at once',
        ],
      },
      {
        id: 'cctv-surveillance',
        name: 'CCTV & Surveillance',
        short:
          'Design, installation and integration of CCTV and surveillance systems, based in Gujarat and delivering across India.',
        full: "We come from a network security background, and it shows in how we approach cameras. Site surveys, camera placement, NVR and DVR setup, storage sizing, remote access configuration, all handled so the system is reliable and properly secured rather than installed once and forgotten. First-time surveillance setup, an aging analog system that needs replacing, or better remote monitoring across more than one site, we handle all three. Gujarat businesses come first for us, but we take on CCTV projects across India too. We walk the premises ourselves, recommend hardware that actually fits your space, install and configure it, and show your team how to run it day to day. And because security is our background, we also make sure the surveillance system itself doesn't become an easy way into your network.",
        deliverables: [
          'On-site survey and camera placement plan',
          'Installation and NVR/DVR setup',
          'Secure remote access configuration',
          'Team walkthrough on daily use',
        ],
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
        short:
          'Firewall selection, configuration and ongoing management to control what enters and exits your network.',
        full: "Most breaches trace back to a firewall rule set nobody's touched since the day it was installed. That's the honest truth of it. We handle selection, deployment, policy configuration and ongoing management, tuned to how your business actually operates rather than left sitting on factory defaults. No in-house security team, or a firewall already in place that you're just not confident is set up right, either way this is built for you. We review your current setup and traffic patterns, build a rule set around least privilege, roll it out with minimal disruption, and keep monitoring it afterward. A firewall that's actively defending your network instead of sitting there as a checkbox, that's the difference.",
        deliverables: [
          'Review of current setup and traffic',
          'Rule set built on least privilege',
          'Deployment with minimal disruption',
          'Ongoing monitoring afterward',
        ],
      },
      {
        id: 'soc-as-a-service',
        name: 'SOC as a Service',
        short:
          'Round the clock monitoring and threat detection for businesses that need real security oversight without building an in-house SOC.',
        full: "Building your own Security Operations Center is expensive and hard to staff, so most businesses never get around to it. SOC as a Service gives you the same continuous monitoring, threat detection and alerting, minus that overhead. Your network, endpoints and logs get watched for anything suspicious, alerts get triaged, and you hear from us with clear, practical guidance only when something actually needs your attention. Growing businesses handling sensitive data or client information are usually the ones who need this most, especially ones that can't afford to find out about a breach after the damage is already done. We map your environment, set up monitoring, run a baseline period to learn what normal looks like for you, and then continuous monitoring and reporting take over. Visibility into your security posture, around the clock, without hiring a security team of your own.",
        deliverables: [
          'Mapping of your environment',
          "Baseline period to learn what's normal",
          '24/7 monitoring and alert triage',
          'Clear guidance only when action is needed',
        ],
      },
      {
        id: 'incident-response-dfir',
        name: 'Incident Response & DFIR',
        short:
          'Fast incident response and digital forensics to contain, investigate and recover from security incidents with as little disruption as possible.',
        full: "Speed matters when something's gone wrong, but so does method, and getting either one wrong can cost you evidence you'll need later. We contain the threat, work out how it happened, and get you through recovery, all while preserving evidence properly along the way. Containment, root cause investigation, digital forensics, and a clear report afterward with recommendations so it doesn't happen twice, that's the full scope. This can run on its own if you already have monitoring through another provider, or sit alongside our SOC as a Service, whichever fits how you're currently set up. Whether you suspect a breach, have already confirmed one, or just want a response plan ready before you ever need it, we move fast to work out the scope, isolate what's affected, and get you back to normal with as little disruption as we can manage.",
        deliverables: [
          'Fast containment of the threat',
          'Root cause investigation',
          'Evidence preserved for forensics',
          'Report with recommendations to prevent repeat',
        ],
      },
      {
        id: 'security-hardening',
        name: 'Security Hardening',
        short:
          'Cutting down your attack surface across systems, servers and devices by closing gaps before attackers find them.',
        full: "Unused services. Default settings left untouched. Weak configurations nobody ever went back to fix. That's how most systems ship, and it quietly widens your attack surface without anyone noticing. We go through your servers, endpoints and network devices against established hardening benchmarks and lock down what doesn't need to be exposed, without breaking anything your team actually relies on. Preparing for a compliance audit, recovering from an incident, or just wanting to close known gaps before someone finds them, this fits any of those situations. A configuration review, a prioritized list of findings, hands-on remediation, and a check afterward to confirm nothing broke, that's how we run it. Systems that are genuinely harder to compromise, not just compliant on paper, is what you walk away with.",
        deliverables: [
          'Review against hardening benchmarks',
          'Prioritized list of findings',
          'Hands-on remediation',
          'Check afterward to confirm nothing broke',
        ],
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
        short:
          'Vulnerability Assessment and Penetration Testing on your network infrastructure to find and fix exploitable weaknesses before attackers do.',
        full: "Somebody's going to find the weak points in your network eventually. The only question is whether it's us or someone with worse intentions. We simulate real attacks against your firewalls, switches, routers, servers and other connected devices, combining automated scanning with manual, hands-on testing that catches what automated tools alone tend to miss. Compliance audits, onboarding enterprise clients who need security assurance, or simply wanting an honest picture of where your network stands, all good reasons to run this. Scoping and reconnaissance first, then vulnerability scanning, manual exploitation attempts, and finally a detailed report that ranks findings by severity with clear steps to fix each one. Solid proof of where you stand, and a prioritized path to fixing it, that's what you end up holding.",
        deliverables: [
          'Scoping and reconnaissance',
          'Automated scan + manual testing',
          'Report ranked by severity',
          'Free retest after fixes',
        ],
      },
      {
        id: 'web-application-vapt',
        name: 'Web Application VAPT',
        short:
          "Vulnerability Assessment and Penetration Testing on your web applications to catch security flaws before they're exploited in production.",
        full: "Code that looks perfectly fine in a demo can hide serious flaws the moment it's under real attack conditions. Web applications remain one of the most common ways attackers get in, and we test yours for injection flaws, authentication weaknesses, access control problems and business logic gaps, using a mix of automated scanning and manual testing aligned with OWASP standards. Launching a new application, handling sensitive user data, or needing to show clients and auditors you take security seriously, any of those is reason enough to bring us in. Scoping, authenticated and unauthenticated testing, manual exploitation of key flows, and a report that lays out each finding with proof of concept and a fix, that's the full run. A clear, evidence backed picture of your application's real security posture is the end result.",
        deliverables: [
          'Authenticated + unauthenticated testing',
          'Manual exploitation of key flows',
          'Findings with proof of concept',
          'Fix guidance for each issue',
        ],
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
        short:
          'Governance, Risk and Compliance audits that turn regulatory requirements into a security program you can actually use.',
        full: "Paperwork for its own sake is how most people think of compliance, and honestly, that's fair given how it's usually done. We treat GRC differently, as a way to build a genuinely stronger, more usable security program, with the documentation coming out as a side effect rather than being the whole point. Your current policies, controls and processes get assessed against the relevant framework, gaps get found, and we help close them in a way that actually fits how your team works day to day. ISO 27001, SOC 2, similar certifications, or just needing a structured risk management process for clients or investors, this is built for exactly that. A gap assessment, a review of policies and controls, a prioritized remediation roadmap, and support all the way through implementation and audit readiness. Compliance that holds up under scrutiny and actually gets used, not just filed away, is what you end up with.",
        deliverables: [
          'Gap assessment against framework',
          'Review of policies and controls',
          'Prioritized remediation roadmap',
          'Support through audit readiness',
        ],
      },
      {
        id: 'cloud-security-review',
        name: 'Cloud Security Review',
        short:
          "Assessment of your cloud environment's configuration, access controls and architecture to close gaps before they're exploited.",
        full: "Misconfiguration, not the platform itself, is behind most cloud security incidents, and cloud platforms hand you a lot of powerful configuration to get wrong. We review your environment across identity and access management, storage and data exposure, network configuration and logging, benchmarked against cloud security best practices. Moved to the cloud without a proper security review, or scaling your footprint and want assurance nothing important's been left exposed, either situation is what this is for. An architecture and configuration review comes first, then identifying misconfigurations and excessive permissions, followed by a prioritized remediation plan your team can act on directly. A cloud environment configured the way it should have been from the start, that's the outcome.",
        deliverables: [
          'Review of IAM, storage & network config',
          'Benchmarked against cloud security best practices',
          'Prioritized list of misconfigurations found',
          'Remediation plan your team can act on',
        ],
      },
    ],
  },
];

export const processSteps = [
  {
    d: 1,
    title: 'Scoping & Discovery',
    desc: 'We define scope, compliance requirements, environment topology and what success looks like, before any testing begins.',
    time: 'Day 1',
  },
  {
    d: 2,
    title: 'NDA & Rules of Engagement',
    desc: 'A signed NDA and rules of engagement protect your assets before any tool runs or query touches your systems.',
    time: 'Day 1 to 2',
  },
  {
    d: 3,
    title: 'Assessment & Testing',
    desc: 'Manual and tool assisted testing. Every finding is documented with evidence as it is discovered, not reconstructed afterward.',
    time: 'Day 2 to 5',
  },
  {
    d: 4,
    title: 'Report Delivery',
    desc: 'An executive summary for leadership, plus a full technical report with risk ratings, evidence and step by step remediation guidance.',
    time: 'Day 5 to 7',
  },
  {
    d: 5,
    title: 'Remediation & Retest',
    desc: 'We answer questions, support remediation, and retest to confirm the fixes hold. This is included in every engagement.',
    time: 'Day 14 to 21',
  },
];

// Built from the current 4-category/11-service structure (serviceGroups above),
// so it always reflects the real services without needing to be updated separately.
export const serviceOptions = serviceGroups
  .flatMap((g) => g.services.map((s) => s.name))
  .concat('Multiple / Not Sure');

export const areasServed = [
  'Ahmedabad',
  'Surat',
  'Vadodara',
  'Rajkot',
  'Gandhinagar',
  'Rest of Gujarat',
];
