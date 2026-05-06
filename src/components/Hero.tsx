'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, Play, Volume2, VolumeX, Pause } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Stock gym B-roll from Pexels (free CDN, no auth) as PLACEHOLDER —
// you'll swap this with authentic gym footage later.
const HERO_VIDEO =
  'https://videos.pexels.com/video-files/4504914/4504914-hd_1920_1080_25fps.mp4';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Auto-play on mount; respect browser autoplay policies (must be muted).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      // If autoplay is blocked, user can press the play button
      setPlaying(false);
    });
  }, []);

  function toggleMute() {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  }

  function togglePlay() {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-ink"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-60' : 'opacity-0'
        }`}
        // Poster while loading — keeps hero from looking empty
        poster="/images/dumbbell-lab.jpg"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Cinematic gradient overlay — vertical fade keeps text readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
      {/* Side vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

      {/* Top eyebrow — fixed near nav */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-[5.5rem] left-1/2 -translate-x-1/2 px-6 text-center"
      >
        <p className="font-mono text-[0.65rem] tracking-[0.32em] text-sky">
          ◆ NEW SMYRNA BEACH, FL ◆
        </p>
      </motion.div>

      {/* Centerpiece — single column. All content flows naturally so
          nothing overlaps regardless of viewport height. */}
      <div className="relative z-10 flex w-full flex-col items-center px-6 pb-24 pt-28 text-center md:pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-6"
        >
          {/* Logo — uses original blue from SVG (#0049ea) */}
          <Image
            src="/logo.svg"
            alt="Nautilus Fitness NSB"
            width={520}
            height={346}
            priority
            className="h-auto w-[min(70vw,26rem)] drop-shadow-[0_0_60px_rgba(108,187,222,0.35)]"
          />
        </motion.div>

        {/* Hook headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-[clamp(2rem,6vw,4.75rem)] leading-[0.95] tracking-[0.01em] text-bone"
        >
          WHERE FITNESS
          <br />
          <span className="text-sky">MEETS</span> COMMUNITY
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white/70 md:text-base"
        >
          State-of-the-art equipment, expert coaching, and an inclusive
          community — built to unlock your full potential, every single day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a href="#contact" className="btn-primary">
            Start Your Journey
            <ArrowDown size={14} className="-rotate-45" strokeWidth={2.5} />
          </a>
          <a href="#services" className="btn-ghost">
            Explore Services
          </a>
        </motion.div>

        {/* Stats — now part of the natural flow, sits below the buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-y-6 sm:grid-cols-4"
        >
          {[
            ['1000+', 'Members Strong'],
            ['20+', 'Weekly Classes'],
            ['15+', 'Expert Trainers'],
            ['10K+', 'Sq Ft Equipped']
          ].map(([num, label]) => (
            <div key={label}>
              <div className="font-display text-2xl text-sky md:text-3xl">
                {num}
              </div>
              <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/60">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.div>
      </motion.a>

      {/* Video controls — small, top right */}
      <div className="absolute right-5 top-24 z-10 flex flex-col gap-2">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          className="flex h-9 w-9 items-center justify-center border border-white/20 bg-ink/50 text-white/80 backdrop-blur transition-colors hover:border-sky hover:text-sky"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
          className="flex h-9 w-9 items-center justify-center border border-white/20 bg-ink/50 text-white/80 backdrop-blur transition-colors hover:border-sky hover:text-sky"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
    </section>
  );
}
