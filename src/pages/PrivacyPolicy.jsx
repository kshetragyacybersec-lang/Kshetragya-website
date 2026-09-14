import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageFadeIn } from '../usePageFadeIn.js';

export default function PrivacyPolicy() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Privacy Policy | Kshetragya Cybersec';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const mountFadeClass = usePageFadeIn();

  return (
    <div className={mountFadeClass}>
      <section className="page-hero">
        <div className="eyebrow">Legal</div>
        <h1 className="page-hero-title">Privacy Policy</h1>
        <p className="page-hero-sub">Last updated: August 2026</p>
      </section>

      <div className="svc-detail-body">
        <div className="svc-detail-full">
          <p>
            Kshetragya Cybersec ("we", "us", "our") respects your privacy. This policy explains
            what information we collect through this website, how we use it, and the choices you
            have.
          </p>

          <h2>Information we collect</h2>
          <p>
            When you submit our contact form, we collect the details you provide, including your name,
            email address, phone number, company name, and the message you send us. We use this
            solely to respond to your enquiry.
          </p>
          <p>
            Like most websites, our server and analytics tools automatically log standard
            technical information such as your IP address, browser type, device type, and pages
            visited, for security and traffic-analysis purposes.
          </p>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to enquiries submitted through our contact form</li>
            <li>To provide, operate, and improve our services</li>
            <li>To maintain the security and integrity of our website</li>
            <li>To comply with applicable legal obligations</li>
          </ul>

          <h2>Sharing of information</h2>
          <p>
            We do not sell your personal information. We may share information with trusted
            service providers who help us operate this website (for example, hosting and form
            submission providers), bound by confidentiality obligations, or where required by law.
          </p>

          <h2>Data retention</h2>
          <p>
            We retain enquiry information for as long as necessary to respond to you and maintain
            our business records, after which it is deleted or anonymized.
          </p>

          <h2>Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information
            held by us at any time by contacting us at{' '}
            <a href="mailto:info@kshetragyacybersec.com">info@kshetragyacybersec.com</a>.
          </p>

          <h2>Cookies</h2>
          <p>
            This site may use basic analytics cookies to understand traffic patterns. You can
            disable cookies through your browser settings at any time.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated revision date.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about this policy can be sent to{' '}
            <a href="mailto:info@kshetragyacybersec.com">info@kshetragyacybersec.com</a>.
          </p>
        </div>
        <Link to="/" className="svc-detail-cta" style={{ marginTop: '2rem' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
