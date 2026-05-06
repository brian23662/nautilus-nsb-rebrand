'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Calendar, Grid3x3, Clock, Loader2 } from 'lucide-react';

type Category = 'All' | 'Strength' | 'Cardio' | 'Mind & Body' | 'Seniors';

type ClassItem = {
  name: string;
  blurb: string;
  duration: string;
  intensity: 'Low' | 'Medium' | 'High';
  category: Exclude<Category, 'All'>[];
  image: string;
  popular?: boolean;
};

// Class catalogue — copy adapted from nautilusnsb.com
const classes: ClassItem[] = [
  {
    name: 'Essentrics',
    blurb:
      'A full-body workout that simultaneously strengthens and stretches every muscle. Based on eccentrically contracting muscles for long, lean results.',
    duration: '55 min',
    intensity: 'Medium',
    category: ['Mind & Body', 'Strength'],
    image: '/images/essentrics.jpg',
    popular: true
  },
  {
    name: 'Cardio Sculpt',
    blurb:
      'High-energy combination of cardio and sculpting moves to torch calories and build lean muscle simultaneously.',
    duration: '45 min',
    intensity: 'High',
    category: ['Cardio', 'Strength'],
    image: '/images/cardio.png'
  },
  {
    name: 'Gentle Vinyasa Flow Yoga',
    blurb:
      'A calming, breath-linked yoga practice flowing through gentle sequences, improving flexibility, balance, and inner peace.',
    duration: '60 min',
    intensity: 'Low',
    category: ['Mind & Body'],
    image: '/images/glute-bridge.jpg'
  },
  {
    name: 'Functional Strength',
    blurb:
      'Movement patterns mirroring real life, building practical strength using barbells, dumbbells, and bodyweight exercises.',
    duration: '50 min',
    intensity: 'High',
    category: ['Strength'],
    image: '/images/functional-strength.jpg',
    popular: true
  },
  {
    name: 'Silver Sneakers',
    blurb:
      'Nationally recognised program for older adults to stay active, improve balance, strength, and social connection.',
    duration: '45 min',
    intensity: 'Low',
    category: ['Seniors'],
    image: '/images/silver-sneakers.jpg'
  },
  {
    name: 'Fit For Life',
    blurb:
      'Accessible fitness for all ages and abilities — endurance, mobility, and habits for a lifelong healthy lifestyle.',
    duration: '50 min',
    intensity: 'Medium',
    category: ['Seniors', 'Strength'],
    image: '/images/fit-for-life.jpg'
  },
  {
    name: 'Tone, Sculpt & Stretch',
    blurb:
      'A trifecta of toning, sculpting, and deep stretching. Leave feeling lean, strong, and completely refreshed.',
    duration: '55 min',
    intensity: 'Medium',
    category: ['Strength', 'Mind & Body'],
    image: '/images/tone-sculpt.jpg'
  },
  {
    name: 'Zumba',
    blurb:
      'Latin-inspired dance fitness. Burn calories to infectious rhythms without it ever feeling like a workout.',
    duration: '60 min',
    intensity: 'Medium',
    category: ['Cardio'],
    image: '/images/cardio.png',
    popular: true
  },
  {
    name: 'Pilates',
    blurb:
      'Core-focused precision movement that strengthens deep stabilising muscles and improves posture and body awareness.',
    duration: '50 min',
    intensity: 'Medium',
    category: ['Mind & Body', 'Strength'],
    image: '/images/pilates.jpg'
  }
];

const categories: Category[] = ['All', 'Strength', 'Cardio', 'Mind & Body', 'Seniors'];

// Type for events fetched from our /api/schedule route
type ScheduleEvent = {
  id: string;
  summary: string;
  start: string;     // ISO
  end: string;       // ISO
  location?: string;
};

export default function Classes() {
  const [view, setView] = useState<'grid' | 'schedule'>('grid');
  const [filter, setFilter] = useState<Category>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return classes;
    return classes.filter((c) => c.category.includes(filter as any));
  }, [filter]);

  return (
    <section id="classes" className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[var(--max-w)] px-5 md:px-10">
        {/* Heading */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-sky">
              ◆ Group Fitness
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-[0.01em] text-bone md:text-7xl">
              FITNESS
              <br />
              <span className="text-sky">CLASSES</span>
            </h2>
          </div>

          {/* View toggle */}
          <div
            role="tablist"
            aria-label="Class view"
            className="inline-flex border border-white/15"
          >
            <button
              role="tab"
              aria-selected={view === 'grid'}
              onClick={() => setView('grid')}
              className={`flex items-center gap-2 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] transition-colors ${
                view === 'grid'
                  ? 'bg-sky text-ink'
                  : 'text-white/70 hover:text-bone'
              }`}
            >
              <Grid3x3 size={14} /> All Classes
            </button>
            <button
              role="tab"
              aria-selected={view === 'schedule'}
              onClick={() => setView('schedule')}
              className={`flex items-center gap-2 border-l border-white/15 px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] transition-colors ${
                view === 'schedule'
                  ? 'bg-sky text-ink'
                  : 'text-white/70 hover:text-bone'
              }`}
            >
              <Calendar size={14} /> Live Schedule
            </button>
          </div>
        </div>

        {/* View switcher */}
        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              {/* Category filter */}
              <div className="mb-8 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] transition-colors ${
                      filter === c
                        ? 'border-sky bg-sky text-ink'
                        : 'border-white/15 text-white/70 hover:border-white/40 hover:text-bone'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Class grid */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((c, i) => (
                  <motion.article
                    key={c.name}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    className="group relative overflow-hidden border border-white/10 bg-steel"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                      {c.popular && (
                        <span className="absolute left-4 top-4 bg-sky px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink">
                          ◆ Popular
                        </span>
                      )}
                      <div className="absolute right-4 top-4 flex flex-col items-end gap-1.5">
                        <span className="bg-ink/80 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone backdrop-blur">
                          {c.duration}
                        </span>
                        <span
                          className={`px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] backdrop-blur ${
                            c.intensity === 'High'
                              ? 'bg-sand/90 text-ink'
                              : c.intensity === 'Medium'
                                ? 'bg-sky/90 text-ink'
                                : 'bg-bone/90 text-ink'
                          }`}
                        >
                          {c.intensity}
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-2xl leading-tight tracking-[0.02em] text-bone">
                        {c.name.toUpperCase()}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-[0.78rem] leading-relaxed text-white/65">
                        {c.blurb}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <ScheduleView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   ScheduleView — fetches /api/schedule which
   talks to Google Calendar API on the server.
   Falls back to mock data if env vars aren't set.
   ────────────────────────────────────────────── */
function ScheduleView() {
  const [events, setEvents] = useState<ScheduleEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/schedule')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        setEvents(data.events ?? []);
      })
      .catch(() => setError('Could not load the schedule right now.'));
  }, []);

  // Group events by weekday for a clean tabbed UI
  const grouped = useMemo(() => {
    if (!events) return null;
    const map: Record<string, ScheduleEvent[]> = {};
    events.forEach((e) => {
      const day = new Date(e.start).toLocaleDateString('en-US', {
        weekday: 'long'
      });
      if (!map[day]) map[day] = [];
      map[day].push(e);
    });
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    );
    return map;
  }, [events]);

  const weekdayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const [activeDay, setActiveDay] = useState(todayName);

  if (!events) {
    return (
      <div className="flex items-center justify-center gap-3 border border-white/10 bg-steel py-20 text-white/60">
        <Loader2 size={16} className="animate-spin" />
        <span className="font-mono text-[0.75rem] uppercase tracking-[0.22em]">
          Loading schedule…
        </span>
      </div>
    );
  }

  return (
    <div className="border border-white/10 bg-steel">
      {error && (
        <div className="border-b border-white/10 bg-deep/30 px-6 py-3 text-center font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/80">
          ◆ Showing sample schedule — connect Google Calendar to display live data.
        </div>
      )}

      {/* Day tabs */}
      <div className="flex flex-wrap border-b border-white/10">
        {weekdayOrder.map((day) => {
          const has = grouped?.[day]?.length ?? 0;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`flex-1 min-w-[7rem] border-r border-white/10 px-4 py-4 text-left font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-colors ${
                activeDay === day
                  ? 'bg-sky text-ink'
                  : 'text-white/70 hover:bg-white/5 hover:text-bone'
              }`}
            >
              <div>{day.slice(0, 3)}</div>
              <div className="mt-1 text-[0.6rem] opacity-70">
                {has} class{has === 1 ? '' : 'es'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Day events */}
      <div className="p-6 md:p-8">
        {(grouped?.[activeDay]?.length ?? 0) === 0 ? (
          <p className="py-10 text-center font-mono text-[0.75rem] uppercase tracking-[0.22em] text-white/50">
            No classes scheduled for {activeDay}.
          </p>
        ) : (
          <ul className="divide-y divide-white/10">
            {grouped?.[activeDay]?.map((ev) => {
              const start = new Date(ev.start);
              const end = new Date(ev.end);
              const fmt = (d: Date) =>
                d.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit'
                });
              return (
                <li
                  key={ev.id}
                  className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Clock size={14} className="text-sky" />
                    <span className="font-mono text-[0.75rem] tracking-[0.1em] text-white/80">
                      {fmt(start)} – {fmt(end)}
                    </span>
                  </div>
                  <div className="font-display text-xl tracking-[0.02em] text-bone">
                    {ev.summary.toUpperCase()}
                  </div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/50">
                    {ev.location ?? 'Studio'}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-white/10 px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
        ◆ Schedule updated live from Google Calendar
      </div>
    </div>
  );
}
