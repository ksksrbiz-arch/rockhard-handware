export function FooterStrip() {
  return (
    <section className="bg-bg-alt border-t border-border py-7">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink mt-0.5 shrink-0">
              <rect x="3" y="3" width="18" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontFamily="Oswald" fontWeight="700" fill="currentColor">RH</text>
            </svg>
            <div>
              <p className="font-display tracking-wider-3 uppercase text-sm text-ink mb-0.5">ROCKHARD HANDWARE</p>
              <p className="text-xs text-muted">Built for glory.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink mt-0.5 shrink-0">
              <rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
            </svg>
            <div>
              <p className="font-display tracking-wider-3 uppercase text-sm text-ink mb-0.5">SECURE CHECKOUT</p>
              <p className="text-xs text-muted">Shop with confidence.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink mt-0.5 shrink-0">
              <path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"/>
            </svg>
            <div>
              <p className="font-display tracking-wider-3 uppercase text-sm text-ink mb-0.5">30 DAY RETURNS</p>
              <p className="text-xs text-muted">No hassle. No worries.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink mt-0.5 shrink-0">
              <circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>
            </svg>
            <div>
              <p className="font-display tracking-wider-3 uppercase text-sm text-ink mb-0.5">REAL SUPPORT</p>
              <p className="text-xs text-muted">We're here to help.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
