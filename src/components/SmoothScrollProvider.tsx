'use client';

/**
 * Earlier versions of this site used Lenis for cinematic smooth scroll.
 * On macOS / trackpads it fought the OS-level momentum scrolling and
 * felt slow-then-fast. Native scrolling + CSS `scroll-behavior: smooth`
 * (set in globals.css for in-page anchor jumps) gives a much better
 * feel. This component is now just a passthrough — kept in place so
 * we don't have to refactor layout.tsx.
 */
export default function SmoothScrollProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
