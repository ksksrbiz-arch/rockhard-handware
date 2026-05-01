import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden grain">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-36 lg:py-44">
        <h1 className="heading-mega text-5xl sm:text-7xl md:text-8xl lg:text-9xl fade-in" dangerouslySetInnerHTML={{ __html: `<span className="text-ink block">BUILT FOR</span><span className="text-accent block">GLORY.</span>` }} />
        <p className="mt-6 max-w-md text-ink/85 leading-relaxed fade-in">
          Real gloves for real work.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 fade-in">
          <Link href="/shop" className="btn-primary">★ SHOP WORK GLOVES</Link>
          <Link href="/shop" className="btn-secondary">🇺🇸 BUILT FOR GLORY</Link>
        </div>
      </div>
    </section>
  );
}
