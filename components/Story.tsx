import Link from 'next/link';

export function Story() {
  return (
    <section className="border-t border-border bg-bg-alt">
      <div className="mx-auto max-w-7xl px-4 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] overflow-hidden border border-border grain">
          <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
        </div>
        <div>
          <h2 className="heading-mega text-3xl md:text-5xl mb-4">WE DON&apos;T MAKE SOFT GEAR.</h2>
          <p className="text-accent font-display tracking-wider-2 uppercase mb-6">ROCKHARD HANDWARE WAS BUILT FOR MEN WHO DON&apos;T SIT STILL.</p>
          <div className="text-muted leading-relaxed">
              <p className="mb-4">Every glove we build is tested by real hands on real jobsites. We use premium materials, rugged construction, and zero shortcuts — because your work deserves more.</p>
              <p className="mb-4">If your hands pay the bills, you don&apos;t wear soft gear.</p>
          </div>
          <Link href="/about" className="btn-secondary mt-6 inline-flex">LEARN OUR STORY</Link>
        </div>
      </div>
    </section>
  );
}
