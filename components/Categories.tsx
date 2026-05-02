export function Categories() {
  return (
    <section className="bg-light-bg text-light-ink py-20"
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.7' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E\")" }}>
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center mb-12">
          <h2 className="section-heading">SHOP WORK GLOVES</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
        <div className="group">
          <div className="aspect-square bg-white relative overflow-hidden border border-light-ink/10 mb-4">
            <img src="/img/lifestyle-framer.jpg" alt="HEAVY DUTY" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <p className="font-display tracking-wider-3 uppercase text-light-ink text-base md:text-lg text-center mb-1">HEAVY DUTY</p>
          <p className="text-light-ink/70 text-xs text-center mb-4">Built for the toughest jobs.</p>
          <div className="text-center">
            <a href="/shop" className="btn-secondary">SHOP NOW</a>
          </div>
        </div>
        <div className="group">
          <div className="aspect-square bg-white relative overflow-hidden border border-light-ink/10 mb-4">
            <img src="/img/glove-tactical-black.jpg" alt="CUT RESISTANT" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <p className="font-display tracking-wider-3 uppercase text-light-ink text-base md:text-lg text-center mb-1">CUT RESISTANT</p>
          <p className="text-light-ink/70 text-xs text-center mb-4">Protection when it matters.</p>
          <div className="text-center">
            <a href="/shop" className="btn-secondary">SHOP NOW</a>
          </div>
        </div>
        <div className="group">
          <div className="aspect-square bg-white relative overflow-hidden border border-light-ink/10 mb-4">
            <img src="https://images.unsplash.com/photo-1605651531144-51381895e23d?auto=format&fit=crop&w=800&q=80" alt="COLD WEATHER" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <p className="font-display tracking-wider-3 uppercase text-light-ink text-base md:text-lg text-center mb-1">COLD WEATHER</p>
          <p className="text-light-ink/70 text-xs text-center mb-4">Stay warm. Keep working.</p>
          <div className="text-center">
            <a href="/shop" className="btn-secondary">SHOP NOW</a>
          </div>
        </div>
        <div className="group">
          <div className="aspect-square bg-white relative overflow-hidden border border-light-ink/10 mb-4">
            <img src="/img/lifestyle-mechanic.jpg" alt="MECHANIC" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <p className="font-display tracking-wider-3 uppercase text-light-ink text-base md:text-lg text-center mb-1">MECHANIC</p>
          <p className="text-light-ink/70 text-xs text-center mb-4">Precision and performance.</p>
          <div className="text-center">
            <a href="/shop" className="btn-secondary">SHOP NOW</a>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
