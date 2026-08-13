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
          <div className="eyebrow">Begin Here</div>
          <h2 className="sec-h dark" id="contact-heading">
            Start with a
            <br />
            <em>free assessment.</em>
          </h2>
          <p className="contact-intro">
            Tell us what you are working with. We respond within 24 hours with a scoping proposal
            and a clear quote - no obligation.
          </p>
          <div className="contact-details">
            <div className="cd-item">
              <div className="cd-lbl">Location</div>
              <div className="cd-val">Ahmedabad, Gujarat, India</div>
            </div>
            <div className="cd-item">
              <div className="cd-lbl">Email</div>
              <div className="cd-val">info@kshetragyacybersec.com</div>
            </div>
            <div className="cd-item">
              <div className="cd-lbl">Service Region</div>
              <div className="cd-val">India · USA · UK · UAE · Global Remote</div>
            </div>
            <div className="cd-item">
              <div className="cd-lbl">Response Time</div>
              <div className="cd-val">Within 24 hours on business days</div>
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
              <span className="cform-td">Assessment Request</span>
              <span className="cform-te">KCS · Inquiry Form</span>
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
                <input
                  id="cf-name"
                  type="text"
                  name="name"
                  placeholder="John Smith"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="fg">
                <label htmlFor="cf-company">Company</label>
                <input
                  id="cf-company"
                  type="text"
                  name="company"
                  placeholder="Acme Corp"
                  autoComplete="organization"
                />
              </div>
            </div>

            <div className="frow two">
              <div className="fg">
                <label htmlFor="cf-email">Email Address *</label>
                <input
                  id="cf-email"
                  type="email"
                  name="email"
                  placeholder="john@acmecorp.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="fg">
                <label htmlFor="cf-country">Country</label>
                <input
                  id="cf-country"
                  type="text"
                  name="country"
                  placeholder="United States"
                  autoComplete="country-name"
                />
              </div>
            </div>

            <div className="frow one">
              <div className="fg">
                <label htmlFor="cf-service">Service Required</label>
                <select id="cf-service" name="service" defaultValue="">
                  <option value="" disabled>
                    Select a service...
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
                <label htmlFor="cf-message">Requirements &amp; Environment</label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows="4"
                  placeholder="Brief description of your environment, compliance needs, or what requires testing..."
                />
              </div>
            </div>

            <div className="cform-foot">
              <span className="cform-note">NDA available on request · No obligation</span>
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
