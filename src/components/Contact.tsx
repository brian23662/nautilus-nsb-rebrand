'use client';

import { motion } from 'framer-motion';
import { Loader2, MapPin, Mail, Phone, ArrowRight, Check } from 'lucide-react';
import { FormEvent, useState } from 'react';

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

const empty: FormState = {
  name: '',
  email: '',
  phone: '',
  interest: '',
  message: ''
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );

  function validate(state: FormState) {
    const e: Partial<FormState> = {};
    if (!state.name.trim()) e.name = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) e.email = 'Invalid email';
    if (!state.message.trim() || state.message.trim().length < 10)
      e.message = 'Tell us a bit more (10+ characters)';
    return e;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          // Replace with your real Web3Forms key — kept as env var for safety
          access_key:
            process.env.NEXT_PUBLIC_WEB3FORMS_KEY ??
            'YOUR_WEB3FORMS_ACCESS_KEY',
          subject: `New inquiry from ${form.name}`,
          from_name: 'Nautilus Fitness NSB Website',
          ...form
        })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setForm(empty);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  return (
    <section id="contact" className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-[var(--max-w)] gap-14 px-5 md:px-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        {/* Left: details */}
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-sky">
            ◆ Get In Touch
          </p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-[0.01em] text-bone md:text-7xl">
            START
            <br />
            <span className="text-sky">YOUR JOURNEY</span>
          </h2>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/70">
            Drop in for a tour, ask about classes, or get connected with a
            coach. We&apos;ll respond within one business day.
          </p>

          <ul className="mt-12 space-y-7">
            <li className="flex items-start gap-4">
              <div className="mt-1 flex h-9 w-9 items-center justify-center border border-white/15">
                <MapPin size={14} className="text-sky" />
              </div>
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/50">
                  Visit
                </div>
                <div className="mt-1 text-bone">
                  New Smyrna Beach, FL
                  <br />
                  <span className="text-white/60">Open 24/7 for members</span>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-1 flex h-9 w-9 items-center justify-center border border-white/15">
                <Mail size={14} className="text-sky" />
              </div>
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/50">
                  Email
                </div>
                <a
                  href="mailto:hello@nautilusnsb.com"
                  className="link-underline mt-1 inline-block text-bone"
                >
                  hello@nautilusnsb.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-1 flex h-9 w-9 items-center justify-center border border-white/15">
                <Phone size={14} className="text-sky" />
              </div>
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/50">
                  Call
                </div>
                <a href="tel:+13862690000" className="link-underline mt-1 inline-block text-bone">
                  (386) 269-0000
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={onSubmit}
          noValidate
          className="border border-white/10 bg-steel p-7 md:p-10"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Name"
              required
              error={errors.name}
            >
              <input
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="form-input"
                aria-invalid={!!errors.name}
              />
            </Field>
            <Field label="Email" required error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="form-input"
                aria-invalid={!!errors.email}
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="form-input"
              />
            </Field>
            <Field label="Interest">
              <select
                value={form.interest}
                onChange={(e) => update('interest', e.target.value)}
                className="form-input"
              >
                <option value="">Select…</option>
                <option>Membership</option>
                <option>Group Classes</option>
                <option>Personal Training</option>
                <option>Wellness Coaching</option>
                <option>Tour the Facility</option>
              </select>
            </Field>
          </div>
          <div className="mt-6">
            <Field label="Message" required error={errors.message}>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className="form-input resize-none"
                aria-invalid={!!errors.message}
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            className="btn-primary mt-8 w-full justify-center sm:w-auto"
          >
            {status === 'sending' && (
              <>
                <Loader2 size={14} className="animate-spin" /> Sending…
              </>
            )}
            {status === 'sent' && (
              <>
                <Check size={14} strokeWidth={2.5} /> Message Sent
              </>
            )}
            {status === 'idle' && (
              <>
                Send Message <ArrowRight size={14} strokeWidth={2.5} />
              </>
            )}
            {status === 'error' && (
              <>Try again <ArrowRight size={14} strokeWidth={2.5} /></>
            )}
          </button>

          {status === 'error' && (
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-sand">
              ◆ Something went wrong. Please try again or email us directly.
            </p>
          )}

          {/* Form input shared style — defined inline once so we don't ship a CSS module */}
          <style jsx>{`
            :global(.form-input) {
              width: 100%;
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.15);
              padding: 0.85rem 1rem;
              color: #fff;
              font-family: var(--font-inter);
              font-size: 0.85rem;
              transition: border-color 0.2s, background 0.2s;
            }
            :global(.form-input:focus) {
              outline: none;
              border-color: var(--color-sky);
              background: rgba(108, 187, 222, 0.05);
            }
            :global(.form-input::placeholder) {
              color: rgba(255, 255, 255, 0.4);
            }
          `}</style>
        </motion.form>
      </div>
    </section>
  );
}

/* Tiny labelled-field wrapper */
function Field({
  label,
  required,
  error,
  children
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/60">
        <span>
          {label} {required && <span className="text-sky">*</span>}
        </span>
        {error && <span className="text-sand normal-case">◆ {error}</span>}
      </span>
      {children}
    </label>
  );
}
