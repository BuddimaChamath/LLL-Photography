import React, { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { SITE } from '../../lib/site';
import { useSearchParam } from '../../router/context';
import { Reveal } from '../ui/Reveal';
import { WhatsAppIcon } from '../ui/icons';

const SUBJECTS = ['Book a session', 'Wedding enquiry', 'Freelance opportunity', 'General question', 'Other'];

type Enquiry = { name: string; email: string; subject: string; date: string; message: string };

const readForm = (form: HTMLFormElement): Enquiry => {
  const data = new FormData(form);
  const get = (key: string) => String(data.get(key) ?? '').trim();
  return { name: get('name'), email: get('email'), subject: get('subject'), date: get('date'), message: get('message') };
};

const composeBody = (e: Enquiry) =>
  [e.message, '', `— ${e.name}`, e.email, e.date && `Event date: ${e.date}`].filter((line) => line !== '').join('\n');

const details = [
  { icon: MapPin, label: 'Based in', value: SITE.location, href: SITE.mapUrl, external: true },
  { icon: Phone, label: 'Phone', value: SITE.phoneDisplay, href: `tel:${SITE.phone}` },
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
];

// There's no server, so the form hands the enquiry to the visitor's email app or WhatsApp
// with everything pre-filled, instead of pretending to send it.
export const ContactSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [handedOff, setHandedOff] = useState<'email' | 'whatsapp' | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const pkg = useSearchParam('package');

  // Arriving from a package's "Enquire" link pre-fills the form.
  useEffect(() => {
    if (!pkg) return;
    setSubject(/wedding/i.test(pkg) ? 'Wedding enquiry' : 'Book a session');
    setMessage((m) => m || `Hi Tharun, I’m interested in the ${pkg}.\n\n`);
  }, [pkg]);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enquiry = readForm(e.currentTarget);
    const mailSubject = `${enquiry.subject} — ${enquiry.name}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(composeBody(enquiry))}`;
    setHandedOff('email');
  };

  const sendWhatsApp = () => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const enquiry = readForm(form);
    const text = `Hi Tharun! ${enquiry.subject}.\n\n${composeBody(enquiry)}`;
    window.open(`${SITE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setHandedOff('whatsapp');
  };

  return (
    <section aria-label="Contact details and enquiry form" className="pb-24 sm:pb-32">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-4">
          <dl className="space-y-7 border-t border-line pt-10">
            {details.map(({ icon: Icon, label, value, href, external }) => (
              <div key={label} className="flex items-start gap-4">
                <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={1.25} aria-hidden="true" />
                <div>
                  <dt className="eyebrow">{label}</dt>
                  <dd className="mt-1.5 text-[15px]">
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="break-all transition-opacity hover:opacity-60"
                    >
                      {value}
                    </a>
                  </dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="mt-10 border-t border-line pt-10">
            <p className="eyebrow">Prefer to chat?</p>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline mt-5">
              <WhatsAppIcon className="h-4 w-4" /> Message on WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-8">
          <form ref={formRef} onSubmit={sendEmail} className="grid gap-8 sm:grid-cols-2" aria-describedby="form-note">
            <h2 className="font-serif text-3xl font-light sm:col-span-2">Send an enquiry</h2>
            <label className="block">
              <span className="eyebrow">Name</span>
              <input name="name" type="text" autoComplete="name" required className="field" />
            </label>
            <label className="block">
              <span className="eyebrow">Email</span>
              <input name="email" type="email" autoComplete="email" required className="field" />
            </label>
            <label className="block">
              <span className="eyebrow">Subject</span>
              <select name="subject" required value={subject} onChange={(e) => setSubject(e.target.value)} className="field cursor-pointer">
                <option value="" disabled>
                  Select a subject
                </option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="eyebrow">
                Event date <span className="normal-case tracking-normal">(optional)</span>
              </span>
              <input name="date" type="date" className="field" />
            </label>
            <label className="block sm:col-span-2">
              <span className="eyebrow">Message</span>
              <textarea
                name="message"
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your plans — the date, venue and what you’re dreaming of."
                className="field resize-none"
              />
            </label>

            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
              <button type="submit" className="btn-solid">
                <Send size={15} strokeWidth={1.5} /> Send by email
              </button>
              <button type="button" onClick={sendWhatsApp} className="btn-outline">
                <WhatsAppIcon className="h-4 w-4" /> Send on WhatsApp
              </button>
            </div>

            <p id="form-note" className="text-sm text-muted sm:col-span-2" aria-live="polite">
              {handedOff === 'email' &&
                `Your email app should have opened with the message ready to send. If it didn’t, email ${SITE.email} directly.`}
              {handedOff === 'whatsapp' && 'WhatsApp should have opened in a new tab with your message ready to send.'}
              {!handedOff && 'Your message opens in your email app or WhatsApp, ready to send.'}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
