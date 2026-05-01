const features = [
  { title: "WORK-PROVEN", body: "Field-tested on jobsites. Engineered for impact." },
  { title: "CUT-RATED", body: "ANSI A4\u2013A6 protection across the line." },
  { title: "RIPSTOP READY", body: "Reinforced palms. Knuckle pads. Storm cuffs." },
  { title: "FREE SHIP $50+", body: "Free standard shipping on every U.S. order over fifty." }
];

export function FeatureGrid() {
  return (
    <section className="bg-bg-alt border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="text-center">
            <p className="font-display tracking-wider-2 uppercase text-sm md:text-base text-accent">{f.title}</p>
            <p className="text-muted text-xs md:text-sm mt-1">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
