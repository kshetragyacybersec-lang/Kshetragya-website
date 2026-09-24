export const serviceGroups = [
  {
    id: 'infrastructure-solutions',
    name: 'Infrastructure Solutions',
    services: [
      {
        id: 'network-infrastructure',
        name: 'Network Infrastructure',
        short:
          'Structured cabling, server rack setup, and hardware deployment for office and enterprise networks across Gujarat and India.',
        full: 'A reliable business network starts with proper physical cabling and structured hardware deployment. We design and install Cat6/Cat6A structured cabling, server racks, patch panels, power backup integration, and wireless access points for new offices, manufacturing units, and corporate facility expansions. We conduct an initial site survey to calculate cable runs and load requirements, install and test every drop, label all endpoints, and provide an accurate network diagram upon completion.',
        standards: ['ANSI/TIA-568', 'ISO/IEC 11801', 'IEEE 802.3', 'BICSI Standards'],
        deliverables: [
          'On-site physical survey and floor plan CAD cable pathway mapping',
          'Cat6 / Cat6A structured cabling and modular patch panel termination',
          'Server rack installation, cable dressing, and redundant PDU power setup',
          'Fluke test reports for every tested copper & fiber drop',
          'Enterprise Wi-Fi access point deployment and RF heatmap validation',
          'Complete TIA-606-C port labeling and as-built network topology documentation',
        ],
        vectors: [
          {
            title: 'Structured Cat6/Cat6A & Fiber Cabling',
            badge: 'STRUCTURED CABLING & RUNS',
            desc: 'Physical cable pathway design, conduit installation, high-grade Cat6/Cat6A copper and single/multi-mode fiber backbones built to keep cross-talk within the rated standard.',
            checks: [
              'Cable pathway routing and electromagnetic interference (EMI) avoidance',
              '10Gbps+ Cat6A copper termination and Fluke cable-analyzer testing',
              'Single-mode and multi-mode fiber optic backbone deployment',
              'Bend-radius compliance and fire-retardant LSZH jacket standards',
            ],
          },
          {
            title: 'Server Rack Setup & Cable Management',
            badge: 'SERVER RACKS & PATCH PANELS',
            desc: 'Enterprise 42U/24U server rack assembly, patch panel dressing, vertical and horizontal cable organizers, and clean airflow optimization.',
            checks: [
              '42U / 24U rack footprint allocation and weight distribution planning',
              'High-density modular patch panel punch-down and neat color-coding',
              'Horizontal and vertical cable management for good airflow and cooling',
              'Front-to-back hot/cold aisle airflow arrangement',
            ],
          },
          {
            title: 'Power Backup, UPS & PDU Integration',
            badge: 'POWER & ELECTRICAL REDUNDANCY',
            desc: 'Uninterrupted Power Supply (UPS) sizing, dual-feed Rack Power Distribution Units (PDUs), and automated surge protection for critical hardware.',
            checks: [
              'Total wattage load calculation and runtime battery backup sizing',
              'Dual-circuit A/B redundant PDU integration for dual-PSU servers',
              'Dedicated equipment grounding and electrical surge suppression',
              'Environmental monitoring (temperature, humidity, water leak sensors)',
            ],
          },
          {
            title: 'Enterprise Wi-Fi & Heatmap Planning',
            badge: 'WIRELESS INFRASTRUCTURE',
            desc: 'RF site surveys, predictive heatmap modeling, enterprise Access Point (AP) mounting, and planned roaming coverage across your facility.',
            checks: [
              'RF spectrum analysis and 2.4GHz / 5GHz / 6GHz interference mapping',
              'Optimal Access Point density and ceiling mounting placement',
              'Fast BSS Transition (802.11r/k/v) roaming without packet drops',
              'PoE+ / PoE++ switch power budgeting for high-throughput Wi-Fi 6/6E/7',
            ],
          },
          {
            title: 'Fluke Cable Testing & Drop Reports',
            badge: 'TESTING & QUALITY ASSURANCE',
            desc: 'End-to-end channel testing using industry-standard Fluke cable analyzers to check performance against the rated standard on every tested link.',
            checks: [
              'Wiremap, cable length, propagation delay, and skew testing',
              'Near-End Crosstalk (NEXT) and Return Loss channel verification',
              'Optical time-domain reflectometer (OTDR) fiber loss attenuation tests',
              'A Fluke test report for every tested drop',
            ],
          },
          {
            title: 'As-Built Topology & Asset Labeling',
            badge: 'DOCUMENTATION & HANDOFF',
            desc: 'Standardized alphanumeric labeling for every port, faceplate, and patch panel, paired with CAD network topology diagrams.',
            checks: [
              'Standardized TIA-606-C alphanumeric port and faceplate labeling',
              'As-built Layer 1 physical layout and rack elevation CAD drawings',
              'Endpoint port-to-desk cross-reference patch mapping sheet',
              'Direct partner handover and IT administration walkthrough',
            ],
          },
        ],
        faqs: [
          {
            q: 'What type of cabling do you recommend for new office or factory setups?',
            a: 'We recommend Cat6A for all standard corporate workstations and high-throughput PoE endpoints (supporting 10Gbps up to 100 meters), combined with single-mode or multi-mode fiber optic backbones between server racks, floors, or separate buildings.',
          },
          {
            q: 'How do you verify and test the quality of installed network cables?',
            a: 'Every copper and fiber drop is tested using professional Fluke cable analyzers. We test for wiremap correctness, attenuation, return loss, and crosstalk, and deliver the Fluke test report for each tested run for your records.',
          },
          {
            q: 'Can you organize and clean up existing tangled server racks and cabling?',
            a: 'Yes. We perform rack revitalization and cable cleanup: tracing and auditing unorganized lines, installing horizontal/vertical wire managers, re-terminating messy patch panels, and labeling all connections with as little scheduled downtime as possible.',
          },
          {
            q: 'Do you provide power backup and environmental monitoring for server rooms?',
            a: 'Yes. We calculate total power draw and configure online double-conversion UPS systems, metered rack PDUs, and environmental monitoring sensors (temperature, humidity, and airflow alerts) to safeguard your hardware.',
          },
        ],
        quickAnswer:
          'Structured cabling, server rack assembly, and hardware deployment engineered by network specialists across Gujarat and India. Every run tested with Fluke cable analyzers, TIA-606-C port labeling, and as-built topology diagrams.',
        related: ['switching-routing', 'cctv-surveillance', 'firewall-network-security'],
      },
      {
        id: 'switching-routing',
        name: 'Switching & Routing',
        short:
          'L2/L3 switch configuration, VLAN segmentation, core routing, and traffic management for business networks.',
        full: 'Unmanaged and default-configured network switches often lead to broadcast storms, network congestion, and security blind spots. We configure managed Layer 2 and Layer 3 switches, core routers, and inter-VLAN routing to separate corporate workstations, server subnets, IoT devices, and guest Wi-Fi. Our team configures Spanning Tree Protocol (STP) to prevent switching loops, sets up link aggregation (LACP) for high throughput, and establishes Quality of Service (QoS) rules to prioritize critical business applications.',
        standards: ['IEEE 802.1Q (VLAN)', 'IEEE 802.1w (RSTP)', 'IEEE 802.3ad (LACP)', 'RFC 2328 (OSPF)'],
        deliverables: [
          'L2/L3 topology mapping and subnet allocation architecture',
          'VLAN segmentation and inter-VLAN routing access control lists (ACLs)',
          'Rapid Spanning Tree (RSTP/MSTP) and broadcast storm suppression setup',
          'LACP port-channel configuration across core and distribution switches',
          '802.1X network access control and MAC sticky port security hardening',
          'As-built switch configuration backups and Layer 2/3 network diagram',
        ],
        vectors: [
          {
            title: 'VLAN Segmentation & Subnet Isolation',
            badge: 'TRAFFIC SEGREGATION',
            desc: 'Designing logical Layer 2/3 broadcast boundaries to isolate management interfaces, corporate workstations, servers, IoT, and guest traffic.',
            checks: [
              '802.1Q VLAN tagging and trunk port pruning configuration',
              'Inter-VLAN routing access control lists (ACLs) to prevent unauthorized lateral hops',
              'Dedicated management VLAN with restricted out-of-band administration',
              'Guest network kept separate from internal corporate subnets',
            ],
          },
          {
            title: 'Spanning Tree & Loop Prevention',
            badge: 'RESILIENCE & LOOP PREVENTION',
            desc: 'Enforcing Rapid Spanning Tree Protocol (RSTP) or Multiple Spanning Tree Protocol (MSTP) to prevent catastrophic Layer 2 switching loops.',
            checks: [
              'Root bridge priority placement and deterministic path election',
              'BPDU Guard and Root Guard enablement on all edge access ports',
              'Broadcast, multicast, and unknown unicast storm control rate limiting',
              'Fast link convergence tuning to minimize failover interruption under 1 second',
            ],
          },
          {
            title: 'Link Aggregation & LACP Trunking',
            badge: 'THROUGHPUT & REDUNDANCY',
            desc: 'Bundling multiple physical Ethernet and fiber links into high-bandwidth logical port-channels between core, distribution, and access switches.',
            checks: [
              '802.3ad Link Aggregation Control Protocol (LACP) trunk creation',
              'Cross-switch multi-chassis link aggregation (MLAG / vPC / Stacking)',
              'Bandwidth bottleneck elimination for high-traffic server uplinks',
              'Automatic sub-second failover in the event of individual cable or port failure',
            ],
          },
          {
            title: 'Core Layer 3 Routing & Redundant Gateways',
            badge: 'CORE ROUTING & GATEWAYS',
            desc: 'Configuring enterprise routing protocols (OSPF, BGP, Static) and First Hop Redundancy Protocols (HSRP/VRRP) for automatic gateway failover.',
            checks: [
              'Layer 3 switch routing engine configuration with wire-speed packet forwarding',
              'VRRP / HSRP virtual router gateway pairing for default gateway resilience',
              'Dynamic routing metric tuning and route summarization',
              'Equal-Cost Multi-Path (ECMP) load balancing across redundant uplinks',
            ],
          },
          {
            title: 'Port Security & 802.1X NAC Enforcement',
            badge: 'ACCESS CONTROL & PORT SECURITY',
            desc: 'Locking down physical switch wall jacks and patch panels to prevent unauthorized rogue laptops or devices from connecting to your internal LAN.',
            checks: [
              'MAC address sticky port security with automated violation shutdown',
              '802.1X RADIUS authentication integration for corporate endpoints',
              'DHCP Snooping and Dynamic ARP Inspection (DAI) against MITM spoofing',
              'Unused access port administrative shutdown and blackhole VLAN assignment',
            ],
          },
          {
            title: 'Quality of Service (QoS) & Traffic Shaping',
            badge: 'TRAFFIC SHAPING & PRIORITY',
            desc: 'Classifying and prioritizing latency-sensitive VoIP voice calls, ERP database queries, and video conferences over non-critical bulk downloads.',
            checks: [
              'Differentiated Services Code Point (DSCP) and CoS Layer 2 priority mapping',
              'Strict priority queuing (SPQ) for VoIP SIP and RTP voice packets',
              'Bandwidth rate limiting and policing on high-volume background streams',
              'Buffer allocation tuning to reduce switch packet drops during traffic bursts',
            ],
          },
        ],
        faqs: [
          {
            q: 'How does VLAN segmentation protect our business from ransomware and breaches?',
            a: 'VLAN segmentation divides your local network into isolated security zones. If an office workstation is infected with ransomware, strict inter-VLAN access control lists (ACLs) prevent the malware from spreading laterally to your critical accounting servers, ERP databases, or backup storage repositories.',
          },
          {
            q: 'What brand of network switches and routers do you support and configure?',
            a: 'We work across common enterprise networking hardware, including Cisco Catalyst/CBS, Aruba/HP Enterprise, Ubiquiti UniFi/EdgeSwitch, Fortinet FortiSwitch, MikroTik, and TP-Link Omada managed switches.',
          },
          {
            q: 'Can you configure high availability so our network stays up if a switch or link fails?',
            a: 'Yes. We deploy switch stacking, MLAG (Multi-Chassis Link Aggregation), LACP port-channels, and First Hop Redundancy Protocols (VRRP/HSRP). If any single switch port, uplink cable, or distribution switch fails, traffic fails over automatically within milliseconds, so users rarely notice.',
          },
          {
            q: 'Will reconfiguring our switches and routing cause downtime for our office or plant?',
            a: 'We design the new topology offline, stage the configuration scripts, and execute switch cutovers during pre-approved off-peak maintenance windows (such as evenings or weekends) so normal business hours are not interrupted.',
          },
        ],
        quickAnswer:
          'Enterprise Layer 2/3 switch configuration, VLAN segmentation, Spanning Tree loop prevention, LACP link bundling, and OSPF/VRRP routing engineered by our founding technical partners across Gujarat and Pan-India.',
        related: ['network-infrastructure', 'firewall-network-security', 'network-va'],
      },
      {
        id: 'cctv-surveillance',
        name: 'CCTV & Surveillance',
        short:
          'Commercial surveillance engineered by network and cybersecurity engineers with low network lag, isolated VLANs, and secure remote viewing.',
        full: 'Commercial surveillance systems require proper camera optics selection, RAID storage calculations, and network isolation to operate reliably without choking internal corporate bandwidth or creating cybersecurity vulnerabilities. We assess physical premises to reduce blind spots, install high-definition IP cameras with appropriate focal lengths, configure Network Video Recorders (NVRs) with RAID 5/10 storage, and isolate all camera traffic on a dedicated Layer 2/3 VLAN. We harden camera firmware against CVE exploits, set up encrypted SSL-VPN remote access for authorized personnel, and align data storage with DPDP Act 2023 video privacy standards.',
        standards: ['CIS Benchmarks', 'ISO 27001 ISMS', 'DPDP Act 2023', 'IEEE 802.3at/bt PoE'],
        deliverables: [
          'On-site premises survey and CAD camera coverage floor plan',
          'Cat6A PoE cabling, patch panel termination, and focus alignment',
          'NVR storage sizing, RAID 5/10 redundancy, and retention policy setup',
          'Dedicated surveillance VLAN segregation with strict QoS bandwidth throttling',
          'Camera firmware cyber-hardening and encrypted remote SSL-VPN gateway setup',
          'As-built documentation, IP camera mapping, and staff training',
        ],
        vectors: [
          {
            title: 'Optical Coverage & Blind Spot Audit',
            badge: 'PHYSICAL VISIBILITY',
            desc: 'Physical site surveys, focal length calculations, Lux-level lighting analysis, and CAD camera placement plans for factories, warehouses, and offices.',
            checks: [
              'Premises perimeter and entry/exit viewing angle mapping',
              'Lux lighting evaluation for low-light & infrared performance',
              'Focal length and sensor sizing for face/license plate recognition',
              'High-traffic corridor and blind-spot reduction plan',
            ],
          },
          {
            title: 'Network Isolation & Traffic Control',
            badge: 'TRAFFIC SEGREGATION',
            desc: 'Video traffic is segregated onto dedicated Layer 2/Layer 3 VLANs with strict QoS rules so high-bitrate 4K streaming is far less likely to affect office ERP or Wi-Fi traffic.',
            checks: [
              'Dedicated surveillance VLAN design and isolated subnet routing',
              'Quality of Service (QoS) bandwidth shaping and throttling',
              'Broadcast storm prevention and STP switching loop protection',
              'PoE switch power budget calculations with 30%+ expansion headroom',
            ],
          },
          {
            title: 'Cyber-Hardening & Botnet Prevention',
            badge: 'CYBERSECURITY DEFENSE',
            desc: 'Closing insecure telnet and HTTP management ports, enforcing strong credentials, patching firmware vulnerabilities, and preventing cameras from becoming botnets.',
            checks: [
              'Disabling default factory logins and unencrypted RTSP streams',
              'Camera and NVR firmware audit and latest CVE patch installation',
              'Blocking UPnP auto port-forwarding and inbound internet exposure',
              'Host-level firewall rules restricting camera communication to NVR only',
            ],
          },
          {
            title: 'RAID Storage Sizing & Retention Policies',
            badge: 'RELIABILITY & BACKUP',
            desc: 'Exact bitrate and retention calculations (30/60/90 days), RAID 5/10 NVR drive arrays with hot-spare failover to minimize the risk of lost footage.',
            checks: [
              'H.265+ smart compression and bitrate storage sizing calculations',
              'RAID 5 / RAID 10 disk redundancy configuration with hot-spare',
              'Automated disk health monitoring (S.M.A.R.T.) and failure alerts',
              'Scheduled archival and regulatory retention policy enforcement',
            ],
          },
          {
            title: 'Encrypted Remote & Mobile Access',
            badge: 'SECURE ACCESS CONTROL',
            desc: 'Multi-Factor Authenticated mobile and desktop viewing via encrypted SSL-VPN gateways without exposing dangerous open ports to the public internet.',
            checks: [
              'SSL-VPN tunnel configuration for remote mobile and desktop clients',
              'Multi-Factor Authentication (MFA) enforcement for video streams',
              'Role-based access control (Admin, Security Guard, Management)',
              'No inbound firewall ports opened to the public internet unless required',
            ],
          },
          {
            title: 'DPDP Act 2023 & Video Privacy Readiness',
            badge: 'REGULATORY ASSURANCE',
            desc: 'Helping commercial surveillance meet Indian data protection requirements with role-based viewing access, audit logs, and data retention policies.',
            checks: [
              'Access audit logging (tracking who viewed, exported, or deleted footage)',
              'Data principal privacy notice placement and perimeter signage alignment',
              'Encrypted storage at rest for sensitive management camera feeds',
              'Video retention schedules and automated purging cycles aligned to your policy',
            ],
          },
        ],
        faqs: [
          {
            q: 'How do you prevent CCTV cameras from slowing down our office internet and network?',
            a: 'We isolate all camera and NVR traffic onto a dedicated Layer 2/3 VLAN with strict Quality of Service (QoS) rules. Camera streams travel exclusively within their isolated subnet directly to the NVR, completely eliminating broadcast storms and preserving full network bandwidth for your business operations.',
          },
          {
            q: 'How do you secure IP cameras from being hacked or accessed by unauthorized third parties?',
            a: 'We enforce cybersecurity hardening: changing all default credentials, closing unencrypted RTSP and telnet ports, disabling UPnP auto port-forwarding, and applying the latest firmware patches. All external remote viewing is routed through encrypted SSL-VPN tunnels with Multi-Factor Authentication (MFA), leaving no unnecessary ports exposed to the public internet.',
          },
          {
            q: 'How do you calculate storage requirements for 30 to 100+ IP cameras?',
            a: 'We use precise bitrate sizing based on camera resolution (2MP/4MP/4K), H.265+ smart encoding compression, target frame rates (FPS), and scene activity levels. We configure enterprise NVRs in RAID 5 or RAID 10 configurations with hot-spare disk failover to meet your exact retention requirements (30, 60, or 90 days).',
          },
          {
            q: 'Can we view camera feeds remotely on mobile and desktop without exposing firewall ports?',
            a: 'Yes. Rather than configuring dangerous port-forwarding rules on your perimeter firewall, we deploy secure SSL-VPN gateway tunnels. Authorized personnel connect securely using Multi-Factor Authentication before accessing live or recorded streams.',
          },
        ],
        quickAnswer:
          'Commercial surveillance engineered by network and security engineers: low network lag, dedicated VLAN isolation, RAID 5/10 storage redundancy, and DPDP Act 2023 privacy-readiness guidance. Deployed on-site in Gujarat and across India.',
        related: ['network-infrastructure', 'switching-routing', 'security-hardening'],
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
          'Deployment, rule-base hardening, IPS configuration, and secure VPN gateway setup on FortiGate, Sophos, SonicWall, and Palo Alto appliances.',
        full: 'Firewalls left on factory defaults or overly permissive rules fail to protect corporate networks against unauthorized inbound and outbound traffic. We deploy, configure, and audit next-generation firewalls (FortiGate, Sophos, SonicWall, Palo Alto) configured for your traffic. We audit existing access control lists (ACLs), enforce least-privilege egress filtering, configure Intrusion Prevention System (IPS) profiles, enable SSL inspection where required, and establish secure site-to-site IPsec and client SSL VPN tunnels with Multi-Factor Authentication.',
        standards: ['NIST SP 800-41', 'CIS Firewall Benchmark', 'PCI-DSS 4.0 Req 1', 'ISO 27001 Control A.8.20'],
        deliverables: [
          'Firewall rule-base matrix audit and insecure legacy rule purge',
          'Next-Gen IPS, Antivirus, and App-Control policy activation',
          'Strict egress filtering and DNS sinkholing configuration',
          'SSL-VPN client deployment with mandatory TOTP/MFA authentication',
          'Active-Passive / Active-Active High Availability (HA) cluster pairing',
          'Full firewall configuration export, baseline checklist, and admin runbook',
        ],
        vectors: [
          {
            title: 'Rule-Base Audit & Shadow Policy Cleanup',
            badge: 'ACCESS CONTROL LISTS',
            desc: "Auditing complex rule bases, removing obsolete 'any-any' allow rules, resolving rule shadow conflicts, and enforcing strict least-privilege policies.",
            checks: [
              'Identification and removal of overly permissive ANY service rules',
              'Shadow rule and duplicate policy reconciliation',
              'Object group structuring and standardized policy naming conventions',
              'Hit-count analysis to prune inactive and legacy access rules',
            ],
          },
          {
            title: 'Next-Gen Deep Packet & SSL/TLS Inspection',
            badge: 'ENCRYPTED THREAT INSPECTION',
            desc: 'Decrypting and inspecting inbound and outbound SSL/TLS traffic to detect hidden malware payloads, command-and-control beacons, and data leakage.',
            checks: [
              'Deep SSL/TLS packet inspection certificate installation and distribution',
              'Application Control policies to identify and block unauthorized shadow IT tools',
              'Exemptions and privacy filtering for financial and sensitive banking traffic',
              'Web filtering categorization and malicious domain reputation blocking',
            ],
          },
          {
            title: 'Intrusion Prevention System (IPS) Tuning',
            badge: 'REAL-TIME EXPLOIT DEFENSE',
            desc: 'Configuring signature and anomaly-based IPS sensors tuned specifically to your exposed web servers, email gateways, and internal services.',
            checks: [
              'Activation of vendor CVE signature feeds targeting perimeter vulnerabilities',
              'Protocol anomaly detection for TCP, UDP, ICMP, and HTTP malformed packets',
              'DDoS threshold rate limiting and SYN flood defense profiles',
              'Custom sensor tuning to reduce false-positive operational alerts',
            ],
          },
          {
            title: 'Zero-Trust Egress Filtering & DNS Security',
            badge: 'OUTBOUND LEAK PREVENTION',
            desc: 'Restricting outbound traffic from internal servers and endpoints to prevent malware callbacks, unauthorized reverse shells, and data exfiltration.',
            checks: [
              'Strict outbound port restrictions (closing all non-essential egress ports)',
              'DNS inspection and malicious domain sinkholing',
              'Quarantine policies for unauthorized internal DNS resolver bypassing',
              'Data Loss Prevention (DLP) pattern matching for sensitive data formats',
            ],
          },
          {
            title: 'Multi-Factor Site-to-Site & SSL-VPN',
            badge: 'SECURE REMOTE GATEWAY',
            desc: 'Deploying high-performance IPsec tunnels between branches and secure SSL-VPN access for remote staff with mandatory Multi-Factor Authentication.',
            checks: [
              'IKEv2 / IPsec site-to-site tunnels with AES-256-GCM encryption',
              'SSL-VPN portal deployment with TOTP Authenticator / SMS MFA enforcement',
              'Endpoint host compliance posture checking before granting network access',
              'Granular user-group subnet routing permissions (no broad LAN bridging)',
            ],
          },
          {
            title: 'High Availability (HA) & Redundancy Setup',
            badge: 'REDUNDANCY & HIGH AVAILABILITY',
            desc: 'Configuring dual firewall appliances in Active-Passive or Active-Active clusters with dedicated heartbeat links for sub-second failover.',
            checks: [
              'Active-Passive state synchronization over dedicated heartbeat links',
              'Dual WAN link failover, SD-WAN route steering, and SLA health checks',
              'Automated configuration synchronization and backup automation',
              'Live physical cable unplug failover testing while checking that active sessions continue',
            ],
          },
        ],
        faqs: [
          {
            q: 'Which firewall brands do you configure, harden, and manage?',
            a: 'We specialize in Fortinet FortiGate, Sophos XGS/XG, SonicWall, and Palo Alto Networks enterprise appliances.',
          },
          {
            q: 'How do you conduct a firewall audit without breaking existing business traffic?',
            a: 'We export your active configuration to a staging environment, perform rule-hit analysis, and map every rule against business requirements. Any modifications are implemented incrementally during pre-scheduled maintenance windows with instant rollback safeguards.',
          },
          {
            q: 'Can you set up secure remote work access with Multi-Factor Authentication (MFA)?',
            a: 'Yes. We deploy SSL-VPN or IPsec remote client solutions integrated with MFA (such as Google Authenticator, Microsoft Authenticator, or FortiToken). Users must pass MFA verification before accessing authorized corporate resources.',
          },
          {
            q: 'How does egress filtering protect our company from data breaches?',
            a: 'Standard firewalls often allow all internal devices to connect outward to any internet port. Egress filtering blocks all unauthorized outbound ports, immediately preventing compromised endpoints from contacting attacker command-and-control servers or exfiltrating stolen databases.',
          },
        ],
        quickAnswer:
          'Next-Generation Firewall deployment, rule-base cleanup, IPS sensor tuning, zero-trust egress filtering, and MFA-secured VPN gateways engineered by technical specialists in Ahmedabad, Gujarat, and across India.',
        related: ['switching-routing', 'network-va', 'security-hardening'],
      },
      {
        id: 'soc-as-a-service',
        name: 'SOC as a Service',
        short:
          'Security event monitoring, log collection, SIEM alert review, and direct escalation of real issues, without building your own security team.',
        full: 'Many companies want SOC-level security monitoring but cannot justify building their own security operations team. We collect logs from your firewalls, switches, Active Directory domain controllers, servers, and cloud accounts into a central SIEM. During the agreed monitoring hours, we review alerts, filter out false positives, and tell you about real issues with clear steps to fix them. Monitoring hours are agreed in your service contract. Alerts that arrive outside those hours are reviewed at the start of the next monitoring window, and extended coverage can be discussed for specific clients.',
        standards: ['MITRE ATT&CK Framework', 'NIST SP 800-61', 'ISO 27001 ISMS', 'DPDP Act 2023'],
        deliverables: [
          'Ingestion agent deployment across firewalls, domain controllers, and cloud',
          'Baseline behavioral modeling and custom SIEM rule calibration',
          'Alert review and anomaly detection during agreed monitoring hours',
          'Weekly and monthly executive risk and security posture reports',
          'Dedicated emergency escalation channel, with response times defined in your service agreement',
          'Actionable step-by-step containment instructions for validated threats',
        ],
        vectors: [
          {
            title: 'Universal Log Ingestion & Normalization',
            badge: 'TELEMETRY & LOG PIPELINE',
            desc: 'Deploying lightweight collectors to stream event telemetry from firewalls, Windows event logs, Linux syslog, cloud platforms, and network appliances.',
            checks: [
              'Firewall traffic, IPS event, and VPN authentication log streaming',
              'Active Directory Kerberos, NTLM, and logon event audit forwarding',
              'Linux auth.log, auditd, and Windows Security Event Log capture',
              'Secure TLS-encrypted log shipping to dedicated SIEM data stores',
            ],
          },
          {
            title: 'SIEM Correlation & Custom Detection Rules',
            badge: 'DETECTION ANALYTICS',
            desc: 'Mapping ingested security events against MITRE ATT&CK techniques to detect brute-force attacks, privilege escalation, and lateral movement.',
            checks: [
              'Correlation rule authoring for suspicious logon anomalies and off-hours activity',
              'Detecting credential dumping attempts (LSASS access, Mimikatz patterns)',
              'Monitoring unauthorized group membership additions in Domain Admins',
              'Suspicious PowerShell and command execution telemetry triggers',
            ],
          },
          {
            title: 'Human Alert Triage & Validation',
            badge: 'ANALYST VERIFICATION',
            desc: 'Alerts are reviewed and validated by our engineers to reduce noise and false positives before we notify your team.',
            checks: [
              'Security event review and triage during agreed monitoring hours',
              'Contextual analysis separating benign admin actions from genuine attacks',
              'Less alert noise: you only receive validated, high-severity alerts',
              'Documented investigation notes and supporting evidence for each escalated case',
            ],
          },
          {
            title: 'Endpoint Detection & Response (EDR) Telemetry',
            badge: 'HOST-LEVEL MONITORING',
            desc: 'Integrating host-level process trees, memory injection detection, and behavioral heuristics across corporate servers and workstations.',
            checks: [
              'Process creation, network socket binding, and parent-child tree tracking',
              'Ransomware behavioral detection and unauthorized mass file encryption alerts',
              'Detection of unquoted service paths and persistence registry modifications',
              'Remote host isolation capabilities during active security emergencies',
            ],
          },
          {
            title: 'Threat Intelligence & IoC Matching',
            badge: 'GLOBAL THREAT FEEDS',
            desc: 'Cross-referencing your internal traffic against real-time global threat intelligence feeds containing malicious IPs, C2 servers, and malware hashes.',
            checks: [
              'Automated matching against commercial and open-source Threat Intel feeds',
              'Flagging outbound connections to known bulletproof hosting and botnets',
              'Tor exit node, malicious proxy, and VPN anonymizer connection alerts',
              'Dynamic IP reputation scoring on all inbound perimeter scans',
            ],
          },
          {
            title: 'Direct Partner Escalation & Runbooks',
            badge: 'ACTIONABLE RESPONSE',
            desc: 'When a critical incident occurs, our founding partners escalate directly to your leadership with concrete, step-by-step containment instructions.',
            checks: [
              'Direct phone and secure messaging escalation for critical alerts, per your agreed escalation plan',
              'Actionable containment guidance (exact firewall blocks, account lockouts)',
              'Assistance during emergency remediation and host isolation',
              'Monthly operational reviews highlighting security posture improvements',
            ],
          },
        ],
        faqs: [
          {
            q: 'How does SOC as a Service differ from having a basic firewall or antivirus?',
            a: 'A firewall or antivirus only flags isolated events on a single device. Our SOC as a Service correlates logs across your network (firewalls, Active Directory, servers, endpoints, and cloud), which helps spot multi-stage attacks and lateral movement that a single tool can miss.',
          },
          {
            q: 'Will SOC monitoring slow down our network or use a lot of server resources?',
            a: 'It should not. Log forwarders are lightweight collectors that typically use very little CPU and bandwidth, and log processing happens on dedicated SIEM servers rather than your production systems. We check resource use on your own machines during setup.',
          },
          {
            q: 'What SIEM platform do you deploy and monitor?',
            a: 'We deploy and manage Wazuh SIEM, configured and tuned for your infrastructure. If you already use another SIEM, ask us whether we can work with it.',
          },
          {
            q: 'What happens when a high-severity threat is detected in our environment?',
            a: 'Our team verifies the alert, contacts your designated IT person using the escalation method agreed in your contract, and provides specific containment steps (e.g., isolating the host, revoking credentials, or blocking the external IP).',
          },
        ],
        quickAnswer:
          'Security Operations Center monitoring, SIEM log correlation, threat intelligence matching, and direct escalation to our founding partners, with monitoring hours agreed in your contract. Security visibility without building an internal SOC team.',
        related: ['incident-response-dfir', 'firewall-network-security', 'security-hardening'],
      },
      {
        id: 'incident-response-dfir',
        name: 'Incident Response & DFIR',
        short:
          'Incident containment, digital forensics investigation, malware analysis, and evidence-grade root cause reporting.',
        full: 'When a security incident or suspected breach occurs, fast containment and forensically sound evidence preservation are critical. Our incident response team steps in as soon as you contact us to isolate compromised hosts, identify the attack vector, analyze malicious artifacts, and contain lateral movement. We reconstruct the attacker timeline, determine whether sensitive data was accessed or exfiltrated, assist your team through safe system recovery, and provide a detailed post-incident technical report.',
        standards: ['NIST SP 800-61r2', 'ISO/IEC 27037 (Evidence Handling)', 'SANS PICERL', 'RFC 3227'],
        deliverables: [
          'Emergency containment to isolate compromised hosts',
          'Disk and memory forensic images acquired with documented chain-of-custody',
          'Root-cause technical investigation report with attacker timeline',
          'Malware IOC list, hashes, and network indicator breakdown',
          'Executive breach summary suitable for board and legal disclosures',
          'Complete remediation roadmap and hardening checklist to prevent re-entry',
        ],
        vectors: [
          {
            title: 'Isolation & Lateral Movement Containment',
            badge: 'EMERGENCY TRIAGE',
            desc: 'Fast intervention to sever active attacker sessions, isolate affected endpoints from the network, and stop ransomware spreading.',
            checks: [
              'Network isolation of suspected compromised hosts while preserving RAM state',
              'Perimeter firewall IP blocking of active command-and-control (C2) servers',
              'Domain-wide credential resets and compromised service account revocation',
              'Identification and neutralization of active lateral movement channels',
            ],
          },
          {
            title: 'Forensic Disk & RAM Evidence Preservation',
            badge: 'EVIDENCE PRESERVATION',
            desc: 'Acquiring forensically sound, bit-stream raw disk images and volatile RAM captures adhering strictly to ISO/IEC 27037 legal standards.',
            checks: [
              'Volatile memory (RAM) acquisition before system reboot or shutdown',
              'Write-blocked physical disk bit-stream imaging and cryptographic hashing (SHA-256)',
              'Chain-of-custody documentation that supports evidentiary integrity. Whether evidence is accepted is decided by the court.',
              'Capture of volatile network connections and running process states',
            ],
          },
          {
            title: 'Malware Reverse Engineering & Artifact Analysis',
            badge: 'THREAT RECONSTRUCTION',
            desc: 'Analyzing dropped payloads, web shells, ransomware binaries, and obfuscated PowerShell scripts in isolated sandbox environments.',
            checks: [
              'Static and dynamic malware analysis in isolated laboratory sandboxes',
              'De-obfuscation of malicious scripts, macros, and scheduled tasks',
              'Extraction of Indicators of Compromise (IoCs), C2 IP addresses, and encryption keys',
              'Determining malware persistence mechanisms and auto-start entry points',
            ],
          },
          {
            title: 'Attacker Timeline & Root-Cause Analysis',
            badge: 'ROOT-CAUSE INVESTIGATION',
            desc: 'Correlating event logs, MFT filesystem records, shellbags, and registry keys into an exact chronological narrative of the intrusion.',
            checks: [
              'Identification of patient-zero and the initial access vector (phishing, RDP, exploit)',
              'Reconstruction of attacker actions minute-by-minute across the entire incident',
              'Windows Event Log, USN Journal, and Prefetch execution analysis',
              'Root-cause determination explaining exactly how defenses were bypassed',
            ],
          },
          {
            title: 'Data Exfiltration & Blast Radius Assessment',
            badge: 'IMPACT QUANTIFICATION',
            desc: 'Determining whether sensitive corporate intellectual property, employee records, or customer data was accessed or transferred offsite.',
            checks: [
              'Firewall netflow and web proxy egress bandwidth volume analysis',
              'Staging archive identification (e.g., unauthorized RAR/ZIP files created by attackers)',
              'Audit log inspection on compromised databases and file shares',
              'Clear findings to support DPDP Act 2023 and CERT-In regulatory notifications',
            ],
          },
          {
            title: 'Safe Remediation & System Restoration',
            badge: 'RESTORATION & POST-MORTEM',
            desc: 'Guiding your engineering team through clean operating system rebuilds, secure backup restoration, and vulnerability remediation.',
            checks: [
              'Verification of clean backups before restoring production services',
              'Patching of initial exploit vectors to reduce reinfection risk',
              'Domain controller hardening and Golden Ticket / Kerberos reset procedures',
              'Post-incident executive debrief and long-term security roadmap delivery',
            ],
          },
        ],
        faqs: [
          {
            q: 'What should our IT team do immediately if we suspect an active ransomware attack or breach?',
            a: 'Immediately disconnect affected systems from the local network and internet by unplugging the Ethernet cable or disabling Wi-Fi. DO NOT power off or reboot the machine, as critical forensic evidence stored in volatile memory (RAM) will be permanently lost. Contact our incident response team immediately.',
          },
          {
            q: 'How fast can Kshetragya respond to an emergency security incident?',
            a: 'We start emergency remote containment as soon as you engage us. For on-site forensics and physical incident handling in Gujarat, our founding partners travel to you as quickly as they can. Urgent incident calls, including outside working hours, are handled on a best-effort basis.',
          },
          {
            q: 'Will the digital forensics report be admissible in court or for regulatory reporting?',
            a: 'Yes. All digital evidence collection follows strict ISO/IEC 27037 standards with cryptographic hash verification (SHA-256) and complete chain-of-custody logging. Our reports satisfy CERT-In 6-hour reporting requirements and Indian legal standards.',
          },
          {
            q: 'How do you reduce the chance of attackers regaining access after remediation?',
            a: 'We conduct a full root-cause investigation to uncover all backdoors, web shells, rogue scheduled tasks, and shadow administrative accounts created by the attacker. We oversee domain-wide credential resets and patch the initial entry vector before systems return online.',
          },
        ],
        quickAnswer:
          'Emergency cyber incident response, forensic evidence collection, malware artifact analysis, root-cause investigation, and secure recovery led by our founding partners across Gujarat and Pan-India.',
        related: ['soc-as-a-service', 'firewall-network-security', 'network-va'],
      },
      {
        id: 'security-hardening',
        name: 'Security Hardening',
        short:
          'Systematic baseline configuration, disabling unnecessary services, and closing exploitable attack surfaces across servers and endpoints.',
        full: 'Operating systems and network appliances ship with default services, legacy protocols, and permissive settings enabled out of the box. We audit and harden your Windows/Linux servers, workstations, and network equipment against proven benchmarks (CIS Benchmarks, NIST). We disable insecure legacy protocols (such as SMBv1, NTLMv1, TLS 1.0/1.1), configure secure SSH and RDP access, enforce host-level firewalls, and apply system group policies without disrupting business operations.',
        standards: ['CIS Benchmarks Level 1 & 2', 'NIST SP 800-123', 'DISA STIGs', 'ISO 27001 A.8.9'],
        deliverables: [
          'CIS Benchmark compliance baseline audit',
          'Custom Group Policy Objects (GPOs) and Linux configuration scripts',
          'Purge of insecure legacy ciphers, LLMNR, NetBIOS, and SMBv1',
          'Host firewall rules and SSH public-key authentication enforcement',
          'Post-hardening application stability testing and rollback verification',
          'Hardening documentation, deviation registry, and maintenance guide',
        ],
        vectors: [
          {
            title: 'Windows Server & Active Directory Hardening',
            badge: 'DIRECTORY & OS BASELINES',
            desc: 'Enforcing CIS Benchmark Level 1/2 policies via custom Active Directory Group Policy Objects (GPOs) across domain controllers, servers, and workstations.',
            checks: [
              'Enforcing strict password complexity, account lockout, and Kerberos ticket lifetimes',
              'Auditing and restricting User Account Control (UAC) and PowerShell execution policies',
              'Restricting LSASS memory protection against credential dumping (Mimikatz)',
              'Hardening Domain Controller security baselines and secure channel signing',
            ],
          },
          {
            title: 'Linux Enterprise Kernel & SSH Lockdown',
            badge: 'LINUX / UNIX HARDENING',
            desc: 'Hardening Ubuntu, RHEL, Debian, and CentOS production servers by configuring sysctl kernel parameters, disabling root SSH, and enforcing public keys.',
            checks: [
              'Disabling direct root login and password-based SSH authentication',
              'Configuring SSH key exchange ciphers (ChaCha20, Ed25519) and idle timeouts',
              'Kernel network stack hardening (disabling IP forwarding, ICMP redirects, source routing)',
              'Enforcing restrictive file permissions (umask 027, /etc/shadow permissions)',
            ],
          },
          {
            title: 'Legacy Protocol & Weak Cipher Removal',
            badge: 'PROTOCOL HYGIENE',
            desc: 'Deactivating unencrypted legacy protocols that expose networks to eavesdropping, pass-the-hash, and man-in-the-middle poisoning attacks.',
            checks: [
              'Deactivating SMBv1, NetBIOS over TCP/IP, and LLMNR broadcast name resolution',
              'Disabling NTLMv1 and enforcing NTLMv2 session security and SMB signing',
              'Purging deprecated TLS 1.0/1.1 protocols and weak CBC/RC4/3DES ciphers',
              'Enforcing TLS 1.2 / TLS 1.3 with Perfect Forward Secrecy across all web endpoints',
            ],
          },
          {
            title: 'Host-Level Firewall & Service Pruning',
            badge: 'LOCAL ATTACK SURFACE',
            desc: 'Stopping unnecessary background services, closing unneeded local ports, and configuring host-level firewalls (Windows Defender Firewall, UFW, iptables).',
            checks: [
              'Auditing and stopping unneeded services (Print Spooler on servers, Remote Registry)',
              'Enforcing host-level firewall rules blocking inbound connections by default',
              'Restricting Remote Desktop Protocol (RDP) access to dedicated management jump-hosts',
              'Configuring automated host-level security audit logging and log retention',
            ],
          },
          {
            title: 'Privilege Minimization & Local Admin Elimination',
            badge: 'IDENTITY & PRIVILEGE',
            desc: 'Eliminating standard user local administrative rights and implementing Just-in-Time (JIT) or tiered administrative access models.',
            checks: [
              'Deploying Windows LAPS (Local Administrator Password Solution) for randomized local passwords',
              'Removing corporate workstation users from local Administrators groups',
              'Enforcing sudoers least-privilege command restrictions on Linux production servers',
              'Restricting administrative credential caching on non-essential endpoints',
            ],
          },
          {
            title: 'Non-Disruptive Functional Verification',
            badge: 'OPERATIONAL STABILITY',
            desc: 'Staging hardening policies in test environments to ensure ERP systems, accounting software, and business applications function smoothly without downtime.',
            checks: [
              'Pilot group deployment to validate custom ERP and database compatibility',
              'Event log monitoring for policy conflict identification',
              'Documented policy deviation registry for legacy business software exceptions',
              'Rollback scripts prepared for every configuration change',
            ],
          },
        ],
        faqs: [
          {
            q: 'Will applying CIS hardening break our existing accounting or ERP software?',
            a: 'No. We use a structured, 3-phase staging methodology: we evaluate your business applications first, test baseline policies on pilot machines, and document necessary exceptions before rolling out changes company-wide. All changes have tested rollback mechanisms.',
          },
          {
            q: 'Why is eliminating SMBv1, LLMNR, and NTLMv1 so important for network security?',
            a: 'Legacy protocols like LLMNR, NetBIOS, and SMBv1 are primary vectors for internal network compromises. Attackers use LLMNR poisoning to capture user password hashes over the local network and use SMBv1 exploits (like EternalBlue) for rapid ransomware propagation. Disabling them removes these attack vectors for as long as they stay disabled.',
          },
          {
            q: 'How do you handle local administrator passwords across multiple workstations?',
            a: 'We deploy Microsoft LAPS (Local Administrator Password Solution) or centralized key management. This gives every workstation a unique, randomized local administrator password stored securely in Active Directory, preventing attackers from using a single stolen password to compromise all company PCs.',
          },
          {
            q: 'Can hardening be applied across mixed Windows and Linux server fleets?',
            a: 'Yes. We provide automated Ansible playbooks and shell scripts for Linux environments (Ubuntu, RHEL, Rocky Linux, Debian) and centralized GPOs for Windows environments.',
          },
        ],
        quickAnswer:
          'Systematic OS and network hardening aligned with CIS Benchmarks Level 1/2. We disable unnecessary legacy protocols, secure Active Directory, and enforce least privilege without disrupting business operations.',
        related: ['firewall-network-security', 'network-va', 'grc-compliance-audit'],
      },
    ],
  },
  {
    id: 'security-testing',
    name: 'Security Testing',
    services: [
      {
        id: 'network-va',
        name: 'Network Vulnerability Assessment (VA)',
        short:
          'Systematic vulnerability scanning, port enumeration, configuration review, and security gap identification across external perimeters and internal networks.',
        full: 'Automated and systematic vulnerability assessments provide full visibility into security weaknesses across perimeter firewalls, switches, routers, servers, endpoints, and Active Directory domains without intrusive exploitation. We perform deep port and service enumeration, CVE vulnerability identification, weak cipher audits, missing patch detection, default credential checks, and network segmentation reviews. Every finding is manually verified to reduce false positives and categorized by CVSS severity with actionable remediation steps.',
        standards: ['NIST SP 800-115', 'CIS Benchmarks', 'OSSTMM 3.0', 'CVSS v3.1'],
        deliverables: [
          'Pre-assessment scope definition and host inventory validation',
          'Automated vulnerability scanning combined with manual false-positive verification',
          'Active Directory, VLAN segmentation, and enterprise Wi-Fi security review',
          'Executive Summary with overall infrastructure risk posture and high-level findings',
          'Technical Report with verified findings, CVSS 3.1 scores, and fix instructions',
          'Letter of Attestation + one free verification re-scan (within 30 days)',
        ],
        vectors: [
          {
            title: 'External Perimeter & Attack Surface',
            badge: 'INTERNET-FACING HOSTS',
            desc: 'Scanning and analyzing external IP ranges, firewall WAN interfaces, SSL-VPN gateways, mail servers, and exposed services for misconfigurations and CVE vulnerabilities.',
            checks: [
              'External port discovery and service enumeration',
              'SSL-VPN gateway configuration and cipher strength audit',
              'Exposed management interface detection (SSH, RDP, Web UI)',
              'Outdated service versions and known CVE identification',
            ],
          },
          {
            title: 'Internal Network & LAN Segmentation',
            badge: 'LAN, SWITCHES & ENDPOINTS',
            desc: 'Evaluating internal network subnets, managed switch security, VLAN isolation, and workstation patch levels from inside the corporate perimeter.',
            checks: [
              'Internal host discovery and service vulnerability mapping',
              'VLAN isolation and lateral movement resistance review',
              'Managed switch port security and trunking evaluation',
              'Internal subnet boundary and routing policy audit',
            ],
          },
          {
            title: 'Active Directory & Identity Infrastructure',
            badge: 'DOMAIN CONTROLLERS & ACCESS',
            desc: 'Auditing Active Directory domain controllers, Kerberos/NTLM configuration baselines, legacy protocol exposure, and service account privileges.',
            checks: [
              'Legacy authentication protocol audits (SMBv1, NTLMv1, LLMNR)',
              'Domain controller policy and password baseline audit',
              'Overly permissive service accounts and SPN delegation checks',
              'Default and weak credential enumeration across domain hosts',
            ],
          },
          {
            title: 'Enterprise Wi-Fi & IoT Network Isolation',
            badge: 'ENTERPRISE WI-FI & IOT',
            desc: 'Auditing on-site enterprise Wi-Fi encryption (WPA2/WPA3), guest Wi-Fi isolation, and CCTV/IoT device subnet segregation to prevent pivot attacks.',
            checks: [
              'WPA2/WPA3 Enterprise encryption and authentication review',
              'Guest Wi-Fi network isolation and corporate LAN separation',
              'Rogue access point and unmanaged wireless device detection',
              'CCTV, NVR, and IoT device subnet segregation verification',
            ],
          },
          {
            title: 'Vulnerability Prioritization & CVSS 3.1 Scoring',
            badge: 'RISK SCORING & VERIFICATION',
            desc: 'Manual verification of every automated scanner finding to reduce false positives and score risks by realistic exploitability and business impact.',
            checks: [
              'Manual false-positive filtering on all scanner findings',
              'CVSS v3.1 base, temporal, and environmental risk scoring',
              'Evidence validation with non-destructive verification steps',
              'Prioritized remediation sequencing for engineering teams',
            ],
          },
          {
            title: 'Executive Attestation & Free Verification Rescan',
            badge: 'AUDIT ASSURANCE & RE-TEST',
            desc: 'Letter of Attestation summarizing the tested scope and results as of the test date, for ISO 27001 readiness, DPDP Act readiness, or vendor risk reviews, plus one free verification re-scan within 30 days of report delivery, limited to the originally reported findings.',
            checks: [
              'Executive summary with overall infrastructure risk score',
              'Detailed technical fix instructions with CLI / GUI guidance',
              'Letter of Attestation signed by founding partners (point-in-time, scope-limited)',
              'One free verification re-scan within 30 days of report delivery',
            ],
          },
        ],
        faqs: [
          {
            q: 'How does a Network VA differ from Penetration Testing (PT)?',
            a: 'A Network Vulnerability Assessment (VA) systematically identifies, classifies, and prioritizes security weaknesses across your infrastructure without actively exploiting them. It is safe, non-destructive, and ideal for continuous security hygiene and compliance.',
          },
          {
            q: 'Will Network VA disrupt our daily business operations?',
            a: 'No. Network VA uses non-intrusive scanning and validation techniques that do not cause downtime or service interruptions.',
          },
          {
            q: 'How long does a Network VA engagement take?',
            a: 'Standard network assessments typically take between 2 to 5 business days depending on the number of IP addresses and subnet sizes.',
          },
          {
            q: 'What documentation do we receive upon completion?',
            a: 'You receive an Executive Summary for management, a full Technical Remediation Report with CVSS scores and fix instructions, a Letter of Attestation, and a final verification re-scan report.',
          },
        ],
        quickAnswer:
          'Network Vulnerability Assessment (VA) is a systematic, non-disruptive evaluation of your external perimeter and internal network infrastructure to discover, validate, and prioritize security weaknesses. Led by our 3 founding technical partners, it includes a detailed technical report with actionable fix instructions, an executive summary, a Letter of Attestation, and one free re-scan within 30 days.',
        related: ['web-application-vapt', 'firewall-network-security', 'security-hardening'],
      },
      {
        id: 'web-application-vapt',
        name: 'Web Application VAPT',
        short:
          'Manual and automated security testing of web applications, APIs, and portals aligned with the OWASP Top 10 framework.',
        full: 'Web applications and customer-facing portals are prime targets for external attackers. We test your web applications and REST APIs against the OWASP Top 10 framework and application business logic flaws. We test for SQL and command injection, cross-site scripting (XSS), broken authentication, insecure direct object references (IDOR), sensitive data exposure, and permission escalation between user roles. Each issue is documented with exact reproduction HTTP requests, screenshots, and actionable code fixes.',
        standards: ['OWASP Top 10:2021', 'OWASP ASVS 4.0', 'NIST SP 800-115', 'CWE/SANS Top 25'],
        deliverables: [
          'Pre-assessment threat modeling and API endpoint inventory',
          'In-depth authenticated and unauthenticated manual penetration testing',
          'Executive summary with business risk ratings and compliance posture',
          'Detailed technical report with curl POCs, screenshots, and exact code-level patches',
          'Direct engineer-to-engineer remediation debrief call',
          'Letter of Attestation + one free verification retest (within 30 days)',
        ],
        vectors: [
          {
            title: 'Authentication & Session Management Flaws',
            badge: 'IDENTITY & PERMISSIONS',
            desc: 'Testing login workflows, session token entropy, password reset mechanisms, JWT validation, and Multi-Factor Authentication bypasses.',
            checks: [
              'JSON Web Token (JWT) signature validation, algorithm confusion, and expiration flaws',
              'Session fixation, hijacking, and improper session invalidation on logout',
              'Brute-force protection, credential stuffing, and rate limiting validation',
              'Multi-Factor Authentication (MFA) logic bypass and password reset token leakage',
            ],
          },
          {
            title: 'Server-Side Injection & Remote Code Execution',
            badge: 'SERVER-SIDE INJECTION',
            desc: 'Probing user input fields, parameters, and headers for SQL Injection, NoSQL Injection, Server-Side Template Injection (SSTI), and command execution.',
            checks: [
              'SQL Injection (Blind, Error-Based, Time-Based) across all database backends',
              'Server-Side Request Forgery (SSRF) targeting cloud metadata and internal microservices',
              'Command Injection and remote code execution through file upload parsers',
              'XML External Entity (XXE) and deserialization vulnerability exploitation',
            ],
          },
          {
            title: 'Business Logic & Access Control (IDOR)',
            badge: 'APPLICATION LOGIC',
            desc: 'Manual testing for Broken Object Level Authorization (BOLA/IDOR), vertical privilege escalation, and business process manipulation.',
            checks: [
              'Insecure Direct Object References (IDOR) exposing unauthorized user records',
              'Vertical privilege escalation (standard user to administrator role switching)',
              'Horizontal authorization bypass between tenant accounts in multi-tenant SaaS',
              'E-commerce pricing manipulation, coupon stacking, and workflow tampering',
            ],
          },
          {
            title: 'RESTful & GraphQL API Security Testing',
            badge: 'API SECURITY',
            desc: 'Testing of backend APIs, REST endpoints, and GraphQL resolvers for unauthorized data exposure and rate-limiting bypasses.',
            checks: [
              'Excessive data exposure in API JSON responses and debug endpoints',
              'Mass assignment vulnerabilities allowing unauthorized parameter updates',
              'GraphQL introspection, query depth exhaustion, and batching attack testing',
              'API rate-limiting bypass and denial-of-service endpoint abuse',
            ],
          },
          {
            title: 'Client-Side XSS & Browser Security',
            badge: 'BROWSER DEFENSE',
            desc: 'Evaluating client-side vulnerabilities that allow attackers to hijack user sessions, steal cookies, or execute malicious scripts in victim browsers.',
            checks: [
              'Stored, Reflected, and DOM-based Cross-Site Scripting (XSS) discovery',
              'Content Security Policy (CSP), CORS headers, and anti-CSRF token verification',
              'Clickjacking protection via X-Frame-Options and frame-ancestors directives',
              'Insecure cookie attributes (missing Secure, HttpOnly, SameSite flags)',
            ],
          },
          {
            title: 'Cryptographic Security & Data Exposure',
            badge: 'DATA PROTECTION',
            desc: 'Auditing data transmission security, TLS cipher suites, sensitive data masking in logs, and checks relevant to Indian DPDP Act requirements.',
            checks: [
              'Exposure of API keys, database credentials, or PII in client JavaScript source maps',
              'Improper masking of credit card, Aadhaar, PAN, or health data in logs and responses',
              'HTTPS enforcement, HSTS header implementation, and cipher suite evaluation',
              'Sensitive data storage in browser LocalStorage or SessionStorage',
            ],
          },
        ],
        faqs: [
          {
            q: 'Do you perform automated scanning or manual penetration testing?',
            a: 'We combine automated scanners with deep manual penetration testing. Automated tools cannot catch business logic flaws, IDOR issues, or multi-step privilege escalation. In fact, our manual testing uncovers over 80% of critical vulnerabilities.',
          },
          {
            q: 'Will web application penetration testing damage our live production database or site?',
            a: 'No. We conduct controlled, non-destructive testing and can perform assessments on staging or UAT environments if preferred. For production testing, we agree on strict rules of engagement to minimize the risk of data corruption or downtime.',
          },
          {
            q: 'What do our software developers receive to help them fix the findings?',
            a: 'Developers receive exact curl reproduction commands, raw HTTP request/response payloads, screenshots, and specific code-level patch recommendations specific to their framework (e.g., React, Node.js, Django, Laravel, Spring Boot).',
          },
          {
            q: 'Is a verification retest included after our developers deploy fixes?',
            a: 'Yes. Every web application VAPT engagement includes one free verification retest within 30 days of report delivery, limited to the originally reported findings. Once your developers apply patches, we retest those findings and issue an updated report and a Letter of Attestation. Additional retest rounds can be scoped separately.',
          },
        ],
        quickAnswer:
          'Manual and automated web application penetration testing covering the OWASP Top 10, business logic flaws, and API vulnerabilities. Delivered with actionable developer fix instructions, Letter of Attestation, and one free retest within 30 days.',
        related: ['network-va', 'cloud-security-review', 'grc-compliance-audit'],
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
          'Structured readiness assessments and gap analysis for DPDP Act 2023, ISO 27001, and vendor security questionnaires.',
        full: 'Security compliance should strengthen operational resilience, not just generate static paperwork. We evaluate your current technical controls, information security policies, access workflows, and data handling practices against standards including India’s Digital Personal Data Protection (DPDP) Act 2023 and ISO/IEC 27001. We identify compliance gaps, provide practical policy templates, and guide your team through implementing required technical safeguards.',
        standards: ['DPDP Act 2023', 'ISO/IEC 27001:2022', 'CERT-In Directions 2022', 'SOC 2 Type II'],
        deliverables: [
          'Full compliance gap analysis matrix against target regulation',
          'Data flow mapping and personal data inventory register',
          'Customized information security policy and standard operating procedure pack',
          'Vendor risk assessment framework and questionnaire template',
          'CERT-In readiness checklist and incident response plan',
          'Audit readiness roadmap and executive board briefing deck',
        ],
        vectors: [
          {
            title: 'DPDP Act 2023 Readiness & Data Mapping',
            badge: 'INDIAN DATA PRIVACY',
            desc: 'Auditing collection, storage, processing, and erasure workflows for personal data against India’s Digital Personal Data Protection Act 2023.',
            checks: [
              'Data mapping of Personal Identifiable Information (PII) across databases and files',
              'Valid consent management workflows and multilingual notice mechanism review',
              'Data Principal rights workflows (access, correction, erasure, grievance redressal)',
              'Data fiduciary vs. data processor contract terms and liability clauses',
            ],
          },
          {
            title: 'ISO/IEC 27001:2022 ISMS Readiness Audit',
            badge: 'INFORMATION SECURITY ISMS',
            desc: 'Evaluating organizational security governance against ISO 27001:2022 mandatory clauses and Annex A technical controls.',
            checks: [
              'Statement of Applicability (SoA) review and control implementation baseline',
              'Information asset inventory and risk assessment methodology evaluation',
              'Access control, identity lifecycle, and privilege authorization review',
              'Physical and environmental security controls audit across facilities',
            ],
          },
          {
            title: 'CERT-In Directions Readiness',
            badge: 'REGULATORY INCIDENT READINESS',
            desc: 'Aligning operational procedures with CERT-In directives, including 6-hour cybersecurity incident reporting and 180-day log retention.',
            checks: [
              'NTP server synchronization across all ICT network devices and servers',
              '180-day secure system logging and forensic evidence preservation verification',
              'Formal incident reporting workflow configured for CERT-In 6-hour mandate',
              'VPN and cloud subscriber identification records maintenance review',
            ],
          },
          {
            title: 'Vendor & Third-Party Supply Chain Risk',
            badge: 'VENDOR RISK MANAGEMENT',
            desc: 'Establishing third-party risk assessment frameworks to audit vendors, software providers, and managed service partners.',
            checks: [
              'Vendor security evaluation questionnaires and scoring matrices',
              'Data processing agreement (DPA) and confidentiality clause reviews',
              'Fourth-party subcontractor access tracking and audit rights enforcement',
              'Periodic vendor compliance re-assessment schedules',
            ],
          },
          {
            title: 'Security Policy & Procedure Pack Creation',
            badge: 'POLICY & GOVERNANCE',
            desc: 'Drafting clear, enforceable cybersecurity and data protection policies that fit how your organization actually works.',
            checks: [
              'Information Security Policy (ISP) and Acceptable Use Policy (AUP)',
              'Incident Response and Disaster Recovery (BCP/DR) documentation',
              'Password complexity, MFA enforcement, and Bring-Your-Own-Device (BYOD) policies',
              'Data classification, retention, and secure disposal standard operating procedures',
            ],
          },
          {
            title: 'Executive Audit Preparation & Certification Support',
            badge: 'AUDIT ATTESTATION',
            desc: 'Guiding executive leadership and technical teams through external audits, customer due-diligence questionnaires, and investor reviews.',
            checks: [
              'Pre-audit mock assessments to identify non-conformities before external auditors arrive',
              'Guidance during customer vendor risk security questionnaire responses',
              'Executive board presentation summarizing overall readiness posture and risk reduction',
              'Direct partner advisory throughout third-party certification body audits',
            ],
          },
        ],
        faqs: [
          {
            q: 'What are the main requirements of India’s DPDP Act 2023 for Indian businesses?',
            a: 'The DPDP Act 2023 mandates that businesses (Data Fiduciaries) collect personal data only with explicit consent, provide clear privacy notices, implement technical safeguards against breaches, enable data principals to access or erase their data, and notify the Data Protection Board and affected users in case of any data breach.',
          },
          {
            q: 'How does your GRC audit help our company achieve ISO 27001 certification?',
            a: 'We perform a full gap analysis against ISO/IEC 27001:2022, develop the required policies and Statement of Applicability (SoA), assist your team in implementing required technical controls, and conduct a pre-audit mock assessment to help your organization prepare for the Stage 1 and Stage 2 certification audits. Audit outcomes are decided by the certification body.',
          },
          {
            q: 'Can you help us complete complex security questionnaires from overseas enterprise clients?',
            a: 'Yes. We assist Indian companies in answering detailed vendor security assessments (such as SIG, CAIQ, SOC 2 questionnaires) and provide the necessary technical evidence and Letter of Attestation to support your vendor security reviews. Outcomes depend on the requesting organization.',
          },
          {
            q: 'How long does a typical compliance gap assessment take?',
            a: 'A standard DPDP Act or ISO 27001 gap assessment typically takes 1 to 2 weeks, depending on the size of your organization and the complexity of your technology infrastructure.',
          },
        ],
        quickAnswer:
          'Practical GRC advisory, DPDP Act 2023 readiness, ISO/IEC 27001:2022 gap audits, and CERT-In readiness led by senior technical partners in Gujarat and across India.',
        related: ['cloud-security-review', 'network-va', 'security-hardening'],
      },
      {
        id: 'cloud-security-review',
        name: 'Cloud Security Review',
        short:
          'Security posture assessment of AWS and Azure environments across IAM roles, storage access, network security groups, and audit logging.',
        full: 'Cloud security incidents predominantly result from misconfigured storage buckets, overly permissive IAM roles, and publicly exposed management ports. We perform a configuration and architecture review of your AWS or Azure infrastructure against CIS Cloud Benchmarks. We review identity permissions, evaluate VPC and security group configurations, verify data encryption at rest and in transit, and confirm that CloudTrail or Activity Logs are enabled and properly monitored.',
        standards: ['CIS AWS Foundations Benchmark', 'CIS Microsoft Azure Benchmark', 'CSA Cloud Controls Matrix', 'NIST SP 800-145'],
        deliverables: [
          'Cloud architecture threat model and external attack surface review',
          'IAM privilege entitlement analysis with least-privilege JSON policy fixes',
          'S3/Blob storage, RDS, and snapshot exposure audit',
          'VPC, Network Security Group (NSG), and route table hardening recommendations',
          'CloudTrail, GuardDuty, and Azure Monitor logging verification report',
          'Executive cloud risk summary + actionable CLI / Terraform remediation scripts',
        ],
        vectors: [
          {
            title: 'IAM Least-Privilege & Role Architecture',
            badge: 'IDENTITY & ACCESS MGMT',
            desc: 'Auditing AWS IAM users, Azure Active Directory / Entra ID roles, cross-account access trusts, and dormant access keys.',
            checks: [
              'Enforcing Multi-Factor Authentication (MFA) on root and administrative cloud accounts',
              'Identifying over-permissioned IAM policies (e.g., AdministratorAccess, wildcard * actions)',
              'Auditing dormant IAM access keys older than 90 days and unused service roles',
              'Reviewing cross-account trust relationships and external role assumption policies',
            ],
          },
          {
            title: 'Storage & Database Public Exposure Review',
            badge: 'DATA STORAGE POSTURE',
            desc: 'Auditing AWS S3 buckets, Azure Blob containers, RDS databases, and volume snapshots for unintended public internet exposure.',
            checks: [
              'Enforcing S3 Block Public Access and bucket policy restriction audits',
              'RDS / Azure SQL public IP accessibility and TLS connection enforcement',
              'Auditing unencrypted EBS volumes, managed disks, and database snapshots at rest',
              'Automated scanning for publicly exposed database backups and data leaks',
            ],
          },
          {
            title: 'VPC Architecture & Network Security Groups',
            badge: 'CLOUD NETWORK TOPOLOGY',
            desc: 'Reviewing Virtual Private Clouds (VPCs), subnets, Internet Gateways, Network Security Groups (NSGs), and peering connections.',
            checks: [
              'Auditing Security Group inbound rules for unrestricted 0.0.0.0/0 on SSH/RDP ports',
              'Public vs. private subnet segregation and NAT Gateway configuration',
              'VPC Peering, Transit Gateway, and VPN tunnel security evaluation',
              'Enforcing AWS Network Firewall / Azure Firewall filtering for egress traffic',
            ],
          },
          {
            title: 'Secrets Management & Hardcoded Credentials',
            badge: 'KEY & SECRET SECURITY',
            desc: 'Ensuring database passwords, API tokens, and encryption keys are securely managed via AWS Secrets Manager or Azure Key Vault.',
            checks: [
              'Auditing codebases and environment variables for hardcoded plaintext API keys',
              'AWS KMS / Azure Key Vault key rotation and access policy verification',
              'Secure secret retrieval integration for containers and serverless functions',
              'Preventing credential leakage in CloudFormation and Terraform state files',
            ],
          },
          {
            title: 'Audit Logging & Threat Detection Telemetry',
            badge: 'LOGGING & MONITORING',
            desc: 'Verifying that audit logging (AWS CloudTrail, Azure Activity Log, VPC Flow Logs) is enabled, tamper-proof, and connected to threat detection.',
            checks: [
              'Multi-region CloudTrail and Azure Activity Log enablement with log file validation',
              'VPC Flow Logs activation for network traffic visibility and forensics',
              'Enabling AWS GuardDuty, Security Hub, or Microsoft Defender for Cloud',
              'Automated alerts for high-risk root account logins and security group modifications',
            ],
          },
          {
            title: 'CIS Benchmark & Configuration Audit',
            badge: 'CONFIGURATION POSTURE',
            desc: 'Running CIS AWS/Azure Foundations Benchmark assessments with prioritized CLI fix commands and Terraform code snippets.',
            checks: [
              'Automated and manual CIS Benchmark scoring across all cloud regions',
              'Executive summary with overall cloud security posture grade',
              'Step-by-step CLI commands and Infrastructure-as-Code (IaC) fix snippets',
              'One free verification re-assessment within 30 days of report delivery',
            ],
          },
        ],
        faqs: [
          {
            q: 'How do you conduct a cloud security review without access to our sensitive customer data?',
            a: 'We require only read-only audit permissions (such as SecurityAudit IAM policy in AWS or Reader/Security Reader in Azure). We inspect metadata, configurations, IAM policies, and network rules. Our reviews are read-only, and we do not need to access or download your databases or customer files.',
          },
          {
            q: 'Which cloud providers do you support for architecture and security audits?',
            a: 'We specialize in Amazon Web Services (AWS) and Microsoft Azure environments, covering compute (EC2/VMs), serverless (Lambda/Azure Functions), containers (EKS/ECS/AKS), databases, and storage.',
          },
          {
            q: 'Will you provide exact Infrastructure-as-Code (Terraform) or CLI commands to fix the findings?',
            a: 'Yes. Our report includes exact AWS CLI, Azure CLI, and Terraform / CloudFormation code remediation snippets so your DevOps and cloud engineers can apply fixes in minutes.',
          },
          {
            q: 'Is a verification re-assessment included after our team applies cloud fixes?',
            a: 'Yes. We include one free verification re-scan within 30 days of report delivery, limited to the originally reported findings, to check whether the reported misconfigurations have been resolved, and issue a Letter of Attestation.',
          },
        ],
        quickAnswer:
          'Deep AWS and Azure cloud security reviews auditing IAM permissions, storage exposure, VPC network topology, and CIS Benchmarks. Includes Terraform/CLI fix scripts and one free re-assessment within 30 days.',
        related: ['web-application-vapt', 'grc-compliance-audit', 'firewall-network-security'],
      },
    ],
  },
];

export const serviceOptions = serviceGroups
  .flatMap((g) => g.services.map((s) => s.name))
  .concat('Careers / Future Opportunities', 'Multiple / Not Sure');

// ─────────────────────────────────────────────────────────────────────────
// Blog posts & case studies are plain arrays edited by hand — there is no
// database or admin panel. To publish something, add an object to the
// matching array below and redeploy. `body` accepts either Markdown text
// or a raw HTML string (starting with a tag, e.g. "<p>...").
//
// Fields: slug (used in the URL), title, date ('YYYY-MM-DD'), excerpt
// (shown on the list card + used as the SEO description), cover (image
// URL, optional), body (the full content), and for case studies: client
// (optional, shown on the card).
// ─────────────────────────────────────────────────────────────────────────

export const blogPosts = [
  // {
  //   slug: 'example-post',
  //   title: 'Example Post Title',
  //   date: '2026-01-15',
  //   excerpt: 'One or two sentences shown on the blog list and used for SEO.',
  //   cover: '',
  //   body: '## Heading\n\nWrite the post here in Markdown, or paste raw HTML.',
  // },
];

export const caseStudies = [
  // {
  //   slug: 'example-case-study',
  //   title: 'Example Case Study Title',
  //   client: 'Client or industry (optional)',
  //   date: '2026-01-15',
  //   excerpt: 'One or two sentences shown on the case studies list and used for SEO.',
  //   cover: '',
  //   body: '## What we did\n\nWrite the case study here in Markdown, or paste raw HTML.',
  // },
];
