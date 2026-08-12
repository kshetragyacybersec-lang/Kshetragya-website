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
    <section id="contact" aria-labelledby="contact-heading">
      <div className="contact-grid">
        <div>
          <div className="eyebrow">Get Started</div>
          <h2 className="sec-h dark" id="contact-heading">
            Request a Confidential
            <br />
            <em>Assessment.</em>
          </h2>
          <p className="contact-intro">
            Tell us about your environment. We'll respond within 24 hours with next steps, no
            spam, no sales pressure.
          </p>
          <div className="contact-details">
            <div className="cd-item">
              <div className="cd-lbl">Email</div>
              <div className="cd-val">info@kshetragyacybersec.com</div>
            </div>
            <div className="cd-item">
              <div className="cd-lbl">Location</div>
              <div className="cd-val">Ahmedabad, Gujarat, India</div>
            </div>
          </div>
        </div>

        <div className="cform">
          <form
            action="https://formsubmit.co/info@kshetragyacybersec.com"
            method="POST"
            onSubmit={handleSubmit}
            aria-describedby={status.show ? 'cform-status-msg' : undefined}
          >
            <div className="cform-top">
              <span className="cform-td">Request Assessment</span>
              <span className="cform-te">No Obligation</span>
            </div>

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
              <div className="fg">
                <label htmlFor="cf-name">Full Name *</label>
                <input id="cf-name" type="text" name="name" required autoComplete="name" />
              </div>
              <div className="fg">
                <label htmlFor="cf-company">Company</label>
                <input id="cf-company" type="text" name="company" autoComplete="organization" />
              </div>
            </div>

            <div className="frow two">
              <div className="fg">
                <label htmlFor="cf-email">Email *</label>
                <input id="cf-email" type="email" name="email" required autoComplete="email" />
              </div>
              <div className="fg">
                <label htmlFor="cf-phone">Phone</label>
                <input id="cf-phone" type="tel" name="phone" autoComplete="tel" />
              </div>
            </div>

            <div className="frow one">
              <div className="fg">
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
              <div className="fg">
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
