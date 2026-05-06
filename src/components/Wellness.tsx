'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const pillars = [
  {
    title: 'Personal Coaching',
    body: 'One-on-one sessions tailored to your unique goals. Our certified coaches craft customized programs that evolve as you do, keeping you challenged and progressing.'
  },
  {
    title: 'Personal Training',
    body: 'Expert strength, conditioning, and functional training with certified personal trainers who ensure proper form, prevent injury, and maximize every rep.'
  },
  {
    title: 'Nutrition Planning',
    body: 'Science-backed nutrition guidance that fuels performance and supports recovery. Meal planning, macro coaching, and habit-building strategies for lasting change.'
  },
  {
    title: 'Bio Therapy',
    body: 'Cutting-edge biofeedback and recovery therapy techniques to optimize your body\u2019s natural healing, improve sleep quality, and accelerate performance gains.'
  }
];

export default function Wellness() {
  return (
    <section id="wellness" className="relative bg-char py-24 md:py-32">
      <div className="mx-auto max-w-[var(--max-w)] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/selector.png"
                alt="Selector equipment at Nautilus Fitness"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-char via-transparent to-transparent" />
            </div>

            {/* Quote pull-out */}
            <div className="absolute -bottom-6 left-4 right-4 border-l-2 border-sky bg-ink p-6 md:left-auto md:right-6 md:max-w-sm">
              <p className="font-display text-lg leading-snug tracking-[0.01em] text-bone md:text-xl">
                &ldquo;The body achieves what the mind believes. Our job is to
                guide both.&rdquo;
              </p>
              <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-sky">
                — Coaching Team
              </p>
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
              ◆ Forever Health & Wellness
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-4 font-display text-5xl leading-[0.95] tracking-[0.01em] text-bone md:text-7xl"
            >
              HOLISTIC
              <br />
              <span className="text-sky">TRANSFORMATION</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-white/70"
            >
              True fitness is more than what happens in the gym. Our Forever
              Health &amp; Wellness program takes a 360° approach — combining
              expert coaching, precision nutrition, personal training, and
              advanced bio-therapy.
            </motion.p>

            {/* Numbered pillar list */}
            <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {pillars.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group grid grid-cols-[auto,1fr] gap-5 py-6"
                >
                  <span className="font-mono text-xs tracking-[0.1em] text-sky">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl tracking-[0.02em] text-bone transition-colors group-hover:text-sky">
                      {p.title.toUpperCase()}
                    </h3>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-white/65">
                      {p.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <a
              href="https://calendly.com/4everhealthandwellness-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-10"
            >
              Book a Consultation <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
