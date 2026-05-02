import Link from 'next/link';
import { Logo } from './Logo';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] md:min-h-[92vh] flex items-end overflow-hidden">
      {/* Background — rusty texture / glove + wrench composition */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/55 to-bg/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-transparent to-bg" />
        <div className="absolute inset-0 grain pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-14 md:pb-28 pt-32 md:pt-32 w-full">
        <div className="max-w-2xl">
          {/* Hero badge — show on all sizes but smaller on mobile */}
          <div className="mb-5 md:mb-6">
            <div className="hidden md:block"><Logo size="lg" /></div>
            <div className="md:hidden inline-block w-32 h-32"><Logo size="lg" /></div>
          </div>
          <h1 className="heading-mega text-5xl sm:text-6xl md:text-8xl text-ink mb-2 md:mb-3 leading-none">BUILT FOR GLORY</h1>
          <p className="font-display tracking-wider-3 uppercase text-ink/85 text-base sm:text-lg md:text-2xl mb-7 md:mb-9">REAL GLOVES FOR REAL WORK.</p>
          <Link href="/shop" className="btn-primary">SHOP WORK GLOVES →</Link>
        </div>
      </div>
    </section>
  );
}
