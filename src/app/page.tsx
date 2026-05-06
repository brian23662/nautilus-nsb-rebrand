import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Classes from '@/components/Classes';
import Wellness from '@/components/Wellness';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

// Server component (default in App Router) — composes
// the client components below. Each child controls its
// own client/server boundary internally.
export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Classes />
      <Wellness />
      <Testimonials />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
