'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook } from 'lucide-react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#classes', label: 'Classes' },
  { href: '#wellness', label: 'Wellness' },
  { href: '#contact', label: 'Contact' }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Add a `scrolled` class once we scroll past the hero fold —
  // switches nav from transparent to solid blurred.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ink/85 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <nav
          className="mx-auto flex h-16 max-w-[var(--max-w)] items-center justify-between px-5 md:h-[4.5rem] md:px-10"
          aria-label="Main"
        >
          {/* Wordmark — sized exactly to the nav bar.
              Two-line stack: NAUTILUS FITNESS / NEW SMYRNA BEACH.
              No image logo here per spec — that lives in the hero. */}
          <a
            href="#hero"
            className="group flex flex-col leading-none"
            aria-label="Nautilus Fitness NSB — home"
          >
            <span className="font-display text-[0.95rem] tracking-[0.18em] text-bone md:text-[1.05rem]">
              NAUTILUS FITNESS
            </span>
            <span className="mt-0.5 font-mono text-[0.55rem] tracking-[0.32em] text-sky md:text-[0.6rem]">
              NEW SMYRNA BEACH
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-underline font-mono text-[0.7rem] uppercase tracking-[0.22em] text-white/80 transition-colors hover:text-bone"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href="https://www.instagram.com/nautilusfitnessnsb/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/70 transition-colors hover:text-sky"
            >
              <Instagram size={16} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.facebook.com/nautilusfitnessnsb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/70 transition-colors hover:text-sky"
            >
              <Facebook size={16} strokeWidth={1.5} />
            </a>
            <a href="#contact" className="btn-primary !py-2 !text-[0.7rem]">
              Join Today
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="md:hidden text-bone"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-display text-[0.95rem] tracking-[0.18em] text-bone">
                NAUTILUS FITNESS
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-bone"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <ul className="flex flex-1 flex-col items-start justify-center gap-7 px-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl tracking-[0.04em] text-bone"
                  >
                    {l.label.toUpperCase()}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-white/10 px-8 py-6">
              <div className="flex gap-5">
                <a
                  href="https://www.instagram.com/nautilusfitnessnsb/"
                  aria-label="Instagram"
                  className="text-white/80"
                >
                  <Instagram size={18} strokeWidth={1.5} />
                </a>
                <a
                  href="https://www.facebook.com/nautilusfitnessnsb"
                  aria-label="Facebook"
                  className="text-white/80"
                >
                  <Facebook size={18} strokeWidth={1.5} />
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary !py-2 !text-[0.7rem]"
              >
                Join Today
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
