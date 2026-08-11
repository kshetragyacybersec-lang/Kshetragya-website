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
          <h2 className="sec-h dark" style={{ marginBottom: '0.65rem' }} id="contact-heading">
            Start with a<br />
            <em>free assessment.</em>
          </h2>
          <p className="contact-intro">
            Tell us what you're working with. We respond within 24 hours with a scoping proposal and
            a clear quote, no obligation.
          </p>
          <div className="contact-details">
            <div className="cd-item">
              <div className="cd-lbl">Location</div>
              <div className="cd-val">Ahmedabad, Gujarat, India</div>
            </div>
            <div className="cd-item">
              <div className="cd-lbl">Email</div>
              <div className="cd-val">
                <a
                  href="mailto:info@kshetragyacybersec.com"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  info@kshetragyacybersec.com
                </a>
              </div>
            </div>
            <div className="cd-item">
              <div className="cd-lbl">Service Region</div>
              <div className="cd-val">India, USA, UK, UAE and remote worldwide</div>
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

            <div className="cform-top">
              <span className="cform-td">Assessment Request</span>
              <span className="cform-te">Kshetragya Cybersec Inquiry Form</span>
            </div>
            <div className="frow two">
              <div className="fg">
                <label htmlFor="f-name">Full Name</label>
                <input
                  id="f-name"
                  type="text"
                  name="Full Name"
                  placeholder="John Smith"
                  required
                  aria-required="true"
                />
              </div>
              <div className="fg">
                <label htmlFor="f-company">Company</label>
                <input id="f-company" type="text" name="Company" placeholder="Acme Corp" />
              </div>
            </div>
            <div className="frow two">
              <div className="fg">
                <label htmlFor="f-email">Email Address</label>
                <input
                  id="f-email"
                  type="email"
                  name="Email"
                  placeholder="john@acmecorp.com"
                  required
                  aria-required="true"
                />
              </div>
              <div className="fg">
                <label htmlFor="f-country">Country</label>
                <input id="f-country" type="text" name="Country" placeholder="United States" />
              </div>
            </div>
            <div className="frow one">
              <div className="fg">
                <label htmlFor="f-service">Service or Inquiry Type</label>
                <select id="f-service" name="Service or Inquiry Type" defaultValue="">
                  <option value="">Select an option...</option>
                  {serviceOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="frow one">
              <div className="fg">
                <label htmlFor="f-reqs">Requirements & Environment</label>
                <textarea
                  id="f-reqs"
                  name="Requirements & Environment"
                  maxLength={2000}
                  placeholder="Brief description of your environment, compliance needs, or what requires testing..."
                ></textarea>
              </div>
            </div>
            <div className="cform-foot">
              <span className="cform-note">NDA available on request, no obligation</span>
              <button className="cform-btn" type="submit" disabled={sending} aria-busy={sending}>
                {sending ? 'Sending...' : 'Send Request'}
              </button>
            </div>
            {status.show && (
              <div
                id="cform-status-msg"
                className={`cform-status ${status.ok ? 'ok' : 'err'}`}
                role="status"
                aria-live="polite"
              >
                {status.msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
