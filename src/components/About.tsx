'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dumbbell, Users, Sparkles, HeartPulse } from 'lucide-react';

const features = [
  {
    icon: Dumbbell,
    title: 'State-of-the-Art Equipment',
    body: 'Plate-loaded, selector machines, sleds, kettlebells, and a full dumbbell lab — everything you need.'
  },
  {
    icon: Users,
    title: 'Expert Coaching',
    body: 'Certified trainers and wellness coaches dedicated to your individual goals and progress.'
  },
  {
    icon: HeartPulse,
    title: 'Inclusive Community',
    body: 'From Silver Sneakers to competitive athletes — everyone is welcome here.'
  },
  {
    icon: Sparkles,
    title: 'Science-Backed Wellness',
    body: 'Nutrition planning, bio-therapy, and holistic coaching for lasting transformation.'
  }
];

const marqueeItems = [
  'State-of-the-Art Equipment',
  'Personal Training',
  'Group Fitness Classes',
  'Nutrition Coaching',
  'Zumba & Pilates',
  'Silver Sneakers',
  'Bio Therapy',
  'Strength & Conditioning',
  'New Smyrna Beach',
  'Forever Health & Wellness'
];

export default function About() {
  return (
    <section id="about" className="relative bg-ink py-0">
      {/* Top marquee — runs above the section, doubled content for seamless loop */}
      <div className="border-y border-white/10 bg-char py-5 overflow-hidden">
        <div className="marquee-track gap-12">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-12 whitespace-nowrap font-display text-2xl tracking-[0.04em] text-bone md:text-3xl"
            >
              {item}
              <span className="text-sky">◆</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[var(--max-w)] gap-16 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/dumbbell-lab.jpg"
              alt="Nautilus Fitness dumbbell area"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover grayscale"
            />
            {/* Subtle blue tint overlay for grunge mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>

          {/* Floating stat tile */}
          <div className="absolute -bottom-6 -right-2 hidden border border-sky bg-ink p-6 md:block">
            <div className="font-display text-5xl text-sky">25+</div>
            <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/70">
              Years Serving NSB
            </div>
          </div>
        </motion.div>

        {/* Copy side */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-sky"
          >
            ◆ About Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-4 font-display text-5xl leading-[0.95] tracking-[0.01em] text-bone md:text-7xl"
          >
            MORE THAN
            <br />
            <span className="text-sky">A GYM</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 space-y-5 text-[0.95rem] leading-relaxed text-white/70"
          >
            <p>
              Nautilus Fitness NSB was founded on a simple belief: everyone
              deserves access to world-class fitness in a welcoming,
              non-intimidating environment. Nestled in the heart of New Smyrna
              Beach, we&apos;ve grown into the community&apos;s premier health
              hub.
            </p>
            <p>
              From first-time gym-goers to seasoned athletes, our diverse
              programs, cutting-edge equipment, and passionate team of coaches
              are here to meet you exactly where you are — and take you further
              than you ever imagined.
            </p>
          </motion.div>

          {/* Feature grid */}
          <ul className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="border-l border-white/15 pl-4"
                >
                  <Icon size={18} strokeWidth={1.5} className="mb-3 text-sky" />
                  <h3 className="mb-2 font-display text-lg tracking-[0.04em] text-bone">
                    {f.title.toUpperCase()}
                  </h3>
                  <p className="text-[0.8rem] leading-relaxed text-white/60">
                    {f.body}
                  </p>
                </motion.li>
              );
            })}
          </ul>

          <a href="#contact" className="btn-primary mt-10">
            Join Our Community
          </a>
        </div>
      </div>
    </section>
  );
}
