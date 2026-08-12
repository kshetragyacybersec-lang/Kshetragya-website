import { useState } from 'react';
import { serviceOptions } from '../data.js';

export default function Contact() {
  const [status, setStatus] = useState({ show: false, ok: false, msg: '' });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus({ show: false, ok: false, msg: '' });

    const form = e.target;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus({
          show: true,
          ok: true,
          msg: "Request sent, we'll be in touch within 24 hours.",
        });
        form.reset();
      } else {
        throw new Error(`Form submission failed with status ${res.status}`);
      }
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setStatus({
        show: true,
        ok: false,
        msg: 'Something went wrong. Please email info@kshetragyacybersec.com directly.',
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-wrap">
        <div className="contact-left">
          <div className="eyebrow">Get Started</div>
          <h2 className="sec-h dark">Request a Confidential Assessment</h2>
          <p className="contact-sub">
            Tell us about your environment. We'll respond within 24 hours with next steps — no
            spam, no sales pressure.
          </p>
        </div>
        <div className="contact-right">
          <form
            action="https://formsubmit.co/info@kshetragyacybersec.com"
            method="POST"
            onSubmit={handleSubmit}
            aria-describedby={status.show ? 'cform-status-msg' : undefined}
          >
            <input
              type="hidden"
              name="_subject"
              value="New Assessment Request - Kshetragya website"
            />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="text"
              name="_honey"
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />

            {status.show && (
              <div
                id="cform-status-msg"
                role="status"
                aria-live="polite"
                className={`cform-status ${status.ok ? 'ok' : 'err'}`}
              >
                {status.msg}
              </div>
            )}

            <div className="frow two">
              <div className="field">
                <label htmlFor="cf-name">Full Name *</label>
                <input id="cf-name" type="text" name="name" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="cf-company">Company</label>
                <input id="cf-company" type="text" name="company" autoComplete="organization" />
              </div>
            </div>

            <div className="frow two">
              <div className="field">
                <label htmlFor="cf-email">Email *</label>
                <input id="cf-email" type="email" name="email" required autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="cf-phone">Phone</label>
                <input id="cf-phone" type="tel" name="phone" autoComplete="tel" />
              </div>
            </div>

            <div className="frow one">
              <div className="field">
                <label htmlFor="cf-service">Service Interested In</label>
                <select id="cf-service" name="service" defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="frow one">
              <div className="field">
                <label htmlFor="cf-message">Message</label>
                <textarea id="cf-message" name="message" rows="4" />
              </div>
            </div>

            <div className="cform-foot">
              <span className="cform-note">NDA available on request, no obligation</span>
              <button className="cform-btn" type="submit" disabled={sending} aria-busy={sending}>
                {sending ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
