'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      "I was nervous walking in for the first time, but the coaches made me feel right at home. Six months later I'm stronger than I've been in twenty years.",
    name: 'Linda M.',
    role: 'Member since 2024'
  },
  {
    quote:
      "The dumbbell lab is incredible — actual heavy weights, plate-loaded machines that work. This is a real gym, not a fitness boutique pretending to be one.",
    name: 'Carlos R.',
    role: 'Powerlifter'
  },
  {
    quote:
      "Essentrics changed my body. After two knee surgeries I never thought I'd feel athletic again. The instructors here meet you where you are.",
    name: 'Janet S.',
    role: 'Member since 2022'
  },
  {
    quote:
      "Personal training with the team here is worth every penny. They built me a program I'd actually stick to, and now it's just part of my week.",
    name: 'Michael T.',
    role: 'Member since 2023'
  }
];

export default function Testimonials() {
  const [i, setI] = useState(0);

  // Auto-advance every 6s, paused while user interacts
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[i];

  return (
    <section
      className="relative bg-ink py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-5 text-center md:px-10">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-sky">
          ◆ Member Voices
        </p>
        <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-[0.01em] text-bone md:text-6xl">
          REAL PEOPLE.
          <br />
          <span className="text-sky">REAL RESULTS.</span>
        </h2>

        <div className="relative mt-14 min-h-[16rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="flex gap-1 text-sky">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-6 font-display text-2xl leading-snug tracking-[0.01em] text-bone md:text-3xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <div className="font-display text-base tracking-[0.04em] text-bone">
                  {t.name.toUpperCase()}
                </div>
                <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/50">
                  {t.role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setI((p) => (p - 1 + testimonials.length) % testimonials.length)}
            className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-sky hover:text-sky"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 transition-all ${
                  i === idx ? 'w-8 bg-sky' : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setI((p) => (p + 1) % testimonials.length)}
            className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-sky hover:text-sky"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
