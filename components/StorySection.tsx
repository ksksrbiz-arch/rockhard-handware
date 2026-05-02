import { Logo } from './Logo';

export function StorySection() {
  return (
    <section className="bg-bg relative overflow-hidden py-20">
      {/* Big watermark RH on right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden md:block">
        <div className="scale-[3] origin-center">
          <Logo size="lg" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 grid md:grid-cols-2 gap-10 md:gap-14 items-center relative z-10">
        <div className="aspect-[4/3] md:aspect-auto md:h-[480px] relative overflow-hidden border border-border">
          <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg/40" />
        </div>
        <div>
          <h2 className="heading-mega text-4xl md:text-6xl text-ink mb-3 leading-none">WE DON&apos;T MAKE<br/>SOFT GEAR.</h2>
          <p className="font-display tracking-wider-3 uppercase text-accent text-lg md:text-xl mb-7 leading-tight">ROCKHARD HANDWARE WAS BUILT<br/>FOR MEN WHO DON&apos;T SIT STILL.</p>
          <p className="text-muted text-sm md:text-base leading-relaxed mb-4 max-w-md">
            Every glove we build is tested by real hands on real jobsites.
            We use premium materials, rugged construction, and zero shortcuts—
            because your work deserves more.
          </p>
          <p className="text-muted text-sm md:text-base leading-relaxed mb-7 max-w-md">
            If your hands pay the bills,<br/>you don&apos;t wear soft gear.
          </p>
          <a href="/about" className="btn-ghost-light">LEARN OUR STORY</a>
        </div>
      </div>
    </section>
  );
}
