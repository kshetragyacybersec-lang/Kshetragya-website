import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageFadeIn } from '../usePageFadeIn.js';

export default function ResponsibleDisclosure() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Responsible Disclosure | Kshetragya Cybersec';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const mountFadeClass = usePageFadeIn();

  return (
    <div className={mountFadeClass}>
      <section className="page-hero">
        <div className="eyebrow">Security</div>
        <h1 className="page-hero-title">Responsible Disclosure</h1>
        <p className="page-hero-sub">
          Found a security issue on this website? Here's how to report it safely.
        </p>
      </section>

      <div className="svc-detail-body">
        <div className="svc-detail-full">
          <p>
            As a cybersecurity company, we take the security of our own systems seriously and
            appreciate the efforts of security researchers who help us keep them safe. If you
            believe you've found a security vulnerability on this website or in our public-facing
            systems, we want to hear from you.
          </p>

          <h2>How to report</h2>
          <p>
            Email a description of the issue to{' '}
            <a href="mailto:security@kshetragyacybersec.com">security@kshetragyacybersec.com</a>{' '}
            with:
          </p>
          <ul>
            <li>A clear description of the vulnerability and its potential impact</li>
            <li>Steps to reproduce it, including any proof-of-concept where relevant</li>
            <li>The URL, endpoint, or system affected</li>
            <li>Your contact details, so we can follow up with you</li>
          </ul>

          <h2>What we ask of you</h2>
          <ul>
            <li>Give us a reasonable amount of time to investigate and fix an issue before disclosing it publicly</li>
            <li>Do not access, modify, or delete data that isn't yours</li>
            <li>Do not perform testing that could degrade or disrupt our services (e.g. denial-of-service testing)</li>
            <li>Do not use social engineering, phishing, or physical attacks against our staff or facilities</li>
            <li>Only interact with accounts you own or have explicit permission to test</li>
          </ul>

          <h2>What you can expect from us</h2>
          <ul>
            <li>An acknowledgement of your report within a reasonable timeframe</li>
            <li>An honest assessment of the reported issue and its severity</li>
            <li>Updates as we work toward a resolution</li>
            <li>Credit, if you'd like it, once the issue is resolved</li>
          </ul>

          <p>
            We will not pursue legal action against researchers who make a good-faith effort to
            comply with this policy while reporting a vulnerability responsibly.
          </p>

          <h2>Scope</h2>
          <p>
            This policy covers this public website. If you've identified an issue with a client
            system we manage, please do not test it directly — contact us instead so we can
            coordinate with the client appropriately.
          </p>
        </div>
        <Link to="/" className="svc-detail-cta" style={{ marginTop: '2rem' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
