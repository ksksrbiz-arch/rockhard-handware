import Link from 'next/link';
import { Logo } from './Logo';

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden">
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

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-20 md:pb-28 w-full">
        <div className="max-w-2xl">
          <div className="mb-6 hidden md:block">
            <Logo size="lg" />
          </div>
          <h1 className="heading-mega text-6xl md:text-8xl text-ink mb-3">BUILT FOR GLORY</h1>
          <p className="font-display tracking-wider-3 uppercase text-ink/85 text-lg md:text-2xl mb-9">REAL GLOVES FOR REAL WORK.</p>
          <Link href="/shop" className="btn-primary">SHOP WORK GLOVES →</Link>
        </div>
      </div>
    </section>
  );
}
