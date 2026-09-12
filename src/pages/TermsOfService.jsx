import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageFadeIn } from '../usePageFadeIn.js';

export default function TermsOfService() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Terms of Service | Kshetragya Cybersec';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const mountFadeClass = usePageFadeIn();

  return (
    <div className={mountFadeClass}>
      <section className="page-hero">
        <div className="eyebrow">Legal</div>
        <h1 className="page-hero-title">Terms of Service</h1>
        <p className="page-hero-sub">Last updated: August 2026</p>
      </section>

      <div className="svc-detail-body">
        <div className="svc-detail-full">
          <p>
            These Terms of Service govern your use of the Kshetragya Cybersec website and any
            enquiry or engagement initiated through it. By using this website, you agree to these
            terms.
          </p>

          <h2>Use of this website</h2>
          <p>
            This website is provided for informational purposes about Kshetragya Cybersec's
            services. You agree not to misuse this website, attempt unauthorized access to any
            part of it, or use it in any way that could damage, disable, or impair it.
          </p>

          <h2>Engagements &amp; services</h2>
          <p>
            Details published on this website (service descriptions, deliverables, and timelines)
            are general in nature. Actual scope, pricing, and terms for any engagement are agreed
            separately in writing (e.g. a proposal, statement of work, or contract) between
            Kshetragya Cybersec and the client before any work begins.
          </p>
          <p>
            Security testing services (VAPT, network assessments, etc.) are only ever performed
            after a signed Non-Disclosure Agreement and an agreed Rules of Engagement document
            defining scope and authorization.
          </p>

          <h2>Intellectual property</h2>
          <p>
            All content on this website — text, graphics, logos, and design — is the property of
            Kshetragya Cybersec unless otherwise noted, and may not be reproduced without
            permission.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            Information on this website is provided "as is" without warranties of any kind.
            Kshetragya Cybersec is not liable for any indirect or consequential loss arising from
            use of this website. This does not limit liability under any signed service agreement,
            which is governed by its own terms.
          </p>

          <h2>Third-party links</h2>
          <p>
            This website may link to third-party sites. We are not responsible for the content or
            practices of any linked third-party website.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of India, with courts in Ahmedabad, Gujarat
            having jurisdiction over any disputes.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may revise these terms from time to time. Continued use of this website after
            changes are posted constitutes acceptance of the updated terms.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about these terms can be sent to{' '}
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
