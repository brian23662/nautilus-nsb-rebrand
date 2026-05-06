'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

type Service = {
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  image: string;
  href: string;
};

const services: Service[] = [
  {
    eyebrow: 'Group Energy',
    title: 'FITNESS\nCLASSES',
    body: 'From high-intensity sculpt sessions to restorative yoga and everything in between — our diverse class schedule has something for everyone.',
    tags: ['Zumba', 'Pilates', 'Yoga', 'Essentrics'],
    image: '/images/cardio.png',
    href: '#classes'
  },
  {
    eyebrow: 'Holistic Transformation',
    title: 'FOREVER HEALTH\n& WELLNESS',
    body: 'Expert coaching, personalised nutrition plans, bio-therapy, and 1-on-1 training designed to transform your health from the inside out.',
    tags: ['Coaching', 'Nutrition', 'Bio Therapy', 'Training'],
    image: '/images/plate-loaded.jpg',
    href: '#wellness'
  },
  {
    eyebrow: 'Unlimited Potential',
    title: 'PREMIUM\nEQUIPMENT',
    body: 'Plate-loaded machines, selector equipment, the Shogun sled, a full dumbbell lab up to 150 lbs, kettlebells, and pro cardio gear.',
    tags: ['Free Weights', 'Machines', 'Cardio', 'Sleds'],
    image: '/images/hero-woman-sled.png',
    href: '#contact'
  }
];

// Single 3D-tilt card — listens to mousemove and applies CSS transform
function TiltCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalised cursor position from -0.5 → 0.5 across the card
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Convert to gentle tilt — max ~6deg either axis
    el.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }

  function handleLeave() {
    if (ref.current) ref.current.style.transform = 'rotateY(0) rotateX(0)';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="tilt-card"
    >
      <a
        href={service.href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative block aspect-[3/4] overflow-hidden border border-white/10 bg-steel"
      >
        <div ref={ref} className="tilt-inner relative h-full w-full">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
          />
          {/* Dark gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
          {/* Inner content */}
          <div className="absolute inset-0 flex flex-col justify-between p-7">
            <div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-sky">
                ◆ {service.eyebrow}
              </div>
              <h3 className="mt-5 whitespace-pre-line font-display text-4xl leading-[0.95] tracking-[0.01em] text-bone md:text-5xl">
                {service.title}
              </h3>
            </div>
            <div>
              <p className="text-[0.85rem] leading-relaxed text-white/70">
                {service.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-white/20 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-bone transition-colors group-hover:text-sky">
                Learn More
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>
          {/* Brand-blue corner accent */}
          <div className="absolute right-0 top-0 h-12 w-12 border-r-2 border-t-2 border-sky opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </a>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-char py-24 md:py-32">
      <div className="mx-auto max-w-[var(--max-w)] px-5 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-sky">
            ◆ What We Offer
          </p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-[0.01em] text-bone md:text-7xl">
            BUILT FOR YOUR
            <br />
            <span className="text-sky">TRANSFORMATION</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <TiltCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
