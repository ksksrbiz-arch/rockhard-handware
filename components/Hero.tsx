import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10 pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-accent font-display tracking-wider-3 uppercase text-sm mb-4">★ TOUGHENED GEAR</p>
          <h1 className="heading-mega text-6xl md:text-8xl whitespace-pre-line">BUILT FOR\nGLORY.</h1>
          <p className="mt-6 text-muted max-w-md text-lg">Heavy-duty handware. No fragile sh*t.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-primary">SHOP THE LINE</Link>
            <Link href="/about" className="btn-secondary">OUR STORY</Link>
          </div>
        </div>
        <div className="aspect-[4/5] bg-card border border-border relative grain rounded-sm overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80"
            alt="Rockhard Handware flagship piece"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
