const items = [
  { title: "BUILT TO LAST", blurb: "Tough gear that works as hard as you do." },
  { title: "WORK TESTED", blurb: "Designed by workers. Approved on the job." },
  { title: "TRUSTED QUALITY", blurb: "Premium materials. Zero shortcuts." },
  { title: "FAST SHIPPING", blurb: "Orders ship quick. You get back to work." },
];

const bgs = ["https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=70", "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=70", "https://images.unsplash.com/photo-1523293836006-bbcfd3a45ec3?w=600&q=70", "https://images.unsplash.com/photo-1508361727343-ca787442dcd7?w=600&q=70"];

export function FeatureGrid() {
  return (
    <section className="bg-bg-alt border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {items.map((it, i) => (
            <div key={it.title} className="relative aspect-[4/3] overflow-hidden border border-border group">
              <img src={bgs[i]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-5">
                <h3 className="font-display text-2xl md:text-3xl tracking-mega leading-none mb-2">{it.title}</h3>
                <p className="text-xs text-ink/80 tracking-wider-2 uppercase">{it.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
