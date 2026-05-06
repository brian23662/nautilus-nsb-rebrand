'use client';

import { Instagram, Facebook, Youtube, Send, type LucideIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletter(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    // In production, POST this to your newsletter provider
    setSubscribed(true);
    setEmail('');
  }

  return (
    <footer className="relative border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-[var(--max-w)] px-5 py-16 md:px-10 md:py-20">
        {/* Top: oversized brand mark */}
        <div className="mb-12 border-b border-white/10 pb-12">
          <div className="font-display text-[clamp(3rem,12vw,9rem)] leading-[0.9] tracking-[0.01em] text-bone">
            NAUTILUS
            <br />
            <span className="text-sky">FITNESS</span>{' '}
            <span className="text-white/30">NSB</span>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand col */}
          <div>
            <p className="text-[0.85rem] leading-relaxed text-white/60">
              New Smyrna Beach&apos;s premier gym — built on community, expert
              coaching, and the belief that everyone deserves access to
              world-class fitness.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink
                href="https://www.instagram.com/nautilusfitnessnsb/"
                label="Instagram"
                Icon={Instagram}
              />
              <SocialLink
                href="https://www.facebook.com/nautilusfitnessnsb"
                label="Facebook"
                Icon={Facebook}
              />
              <SocialLink
                href="https://www.youtube.com/"
                label="YouTube"
                Icon={Youtube}
              />
            </div>
          </div>

          {/* Sitemap col 1 */}
          <FooterCol
            title="Explore"
            links={[
              ['About', '#about'],
              ['Services', '#services'],
              ['Classes', '#classes'],
              ['Wellness', '#wellness'],
              ['Contact', '#contact']
            ]}
          />

          {/* Sitemap col 2 */}
          <FooterCol
            title="Visit"
            links={[
              ['New Smyrna Beach, FL', '#contact'],
              ['Hours: 24/7 Members', '#contact'],
              ['Schedule a Tour', '#contact']
            ]}
          />

          {/* Newsletter */}
          <div>
            <div className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-sky">
              ◆ Newsletter
            </div>
            <p className="mb-4 text-[0.8rem] leading-relaxed text-white/60">
              Class updates, member spotlights, and the occasional pep talk —
              once a month, no spam.
            </p>
            {subscribed ? (
              <div className="border border-sky bg-sky/10 px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-sky">
                ◆ You&apos;re in. Welcome.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 border border-white/15 bg-transparent px-3 py-2.5 text-[0.85rem] text-bone placeholder:text-white/30 focus:border-sky focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex w-12 items-center justify-center border border-l-0 border-sky bg-sky text-ink transition-colors hover:bg-bone hover:border-bone"
                >
                  <Send size={14} strokeWidth={2} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[0.7rem] text-white/40 md:flex-row md:items-center">
          <p className="font-mono uppercase tracking-[0.18em]">
            © {new Date().getFullYear()} Nautilus Fitness NSB
          </p>
          <p className="font-mono uppercase tracking-[0.18em]">
            ◆ New Smyrna Beach, Florida
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  Icon
}: {
  href: string;
  label: string;
  Icon: LucideIcon;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-sky hover:text-sky"
    >
      <Icon size={14} strokeWidth={1.5} />
    </a>
  );
}

function FooterCol({
  title,
  links
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <div className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-sky">
        ◆ {title}
      </div>
      <ul className="space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="link-underline text-[0.85rem] text-white/70 transition-colors hover:text-bone"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
